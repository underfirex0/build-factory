import { NextRequest, NextResponse } from 'next/server';

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
 * ROOT_DOMAIN is the domain business subdomains live under (e.g. "yako.studio").
 * Until that's configured, this must default to something that will never
 * match a real request host (Vercel preview URLs, localhost, custom domains
 * added later) — otherwise every one of those gets mistaken for a business
 * subdomain and 404s, which is exactly what happened on the *.vercel.app URL.
 */
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || '';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl;

  if (url.pathname.startsWith('/_next') || url.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // No root domain configured yet, or this request isn't on it (Vercel's own
  // *.vercel.app URL, localhost, a not-yet-mapped domain) -> this is the CRM
  // app itself, serve it normally, no rewrite.
  const isBusinessSubdomain =
    ROOT_DOMAIN && hostname.endsWith(`.${ROOT_DOMAIN}`) && hostname !== `app.${ROOT_DOMAIN}`;

  if (!isBusinessSubdomain) {
    return NextResponse.next();
  }

  // yourbusiness.yako.studio -> slug = "yourbusiness"
  // a mapped custom domain resolves via a lookup table in production;
  // here we rewrite everything to a single dynamic route that does the lookup.
  const subdomain = hostname.replace(`.${ROOT_DOMAIN}`, '');
  const rewriteTarget = `/site/${subdomain}${url.pathname}`;

  return NextResponse.rewrite(new URL(rewriteTarget, request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
