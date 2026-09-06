import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { isSupabaseConfigured } from '@/lib/supabase/config';

/**
 * This is the core of "one Next.js app per template, not one deploy per business."
 *
 * A request to `le-riad-bleu.yako.studio` or a mapped custom domain like
 * `pizzerianapoli.ma` never hits a per-business deployment — it hits this one
 * running app, which resolves the hostname to a site record and rewrites the
 * request to /site/[slug], where the template fetches that business's
 * TemplateContent and renders. Bulk-building 500 sites is 500 database rows,
 * not 500 deploys.
 *
 * This same middleware also gates the CRM behind login — but ONLY once
 * Supabase is actually configured. In mock mode (no env vars set yet) the CRM
 * stays fully open, exactly like every screenshot so far — there'd be no way
 * to log in otherwise, since no real user account exists until you connect a
 * project and create one.
 *
 * ROOT_DOMAIN is the domain business subdomains live under (e.g. "yako.studio").
 * Until that's configured, this must default to something that will never
 * match a real request host (Vercel preview URLs, localhost, custom domains
 * added later) — otherwise every one of those gets mistaken for a business
 * subdomain and 404s.
 */
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || '';
const PUBLIC_PATHS = ['/login', '/auth/callback'];

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl;

  if (url.pathname.startsWith('/_next') || url.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const isBusinessSubdomain =
    ROOT_DOMAIN && hostname.endsWith(`.${ROOT_DOMAIN}`) && hostname !== `app.${ROOT_DOMAIN}`;

  if (isBusinessSubdomain) {
    const subdomain = hostname.replace(`.${ROOT_DOMAIN}`, '');
    return NextResponse.rewrite(new URL(`/site/${subdomain}${url.pathname}`, request.url));
  }

  // This request is for the CRM app itself. Only enforce auth once Supabase
  // is actually connected — otherwise there's no account to log in with yet.
  if (!isSupabaseConfigured || PUBLIC_PATHS.includes(url.pathname)) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options });
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', url.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
