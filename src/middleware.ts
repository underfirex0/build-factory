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
 */
export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl;

  // Skip the CRM app itself and internal Next.js paths
  const isAppHost =
    hostname.startsWith('app.') ||
    hostname.startsWith('localhost') ||
    hostname.startsWith('127.0.0.1');

  if (isAppHost || url.pathname.startsWith('/_next') || url.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // yourbusiness.yako.studio -> slug = "yourbusiness"
  // a mapped custom domain resolves via a lookup table in production;
  // here we rewrite everything to a single dynamic route that does the lookup.
  const subdomain = hostname.split('.')[0];
  const rewriteTarget = `/site/${subdomain}${url.pathname}`;

  return NextResponse.rewrite(new URL(rewriteTarget, request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
