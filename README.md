# BuildFactory

A bulk website factory + CRM: scrape businesses, bulk-build demo sites on premium templates,
send them out, and activate the ones that pay — all synced through one data model.

Real, building, type-checked Next.js app. `npm run build` passes clean. Runs in one of two modes:

- **Mock mode** (no env vars set): every page reads `src/lib/mock-data.ts`, no auth enforced.
  This is what's been running in every screenshot so far.
- **Connected mode** (Supabase env vars set): every page reads/writes real tables, and the CRM
  is gated behind login.

## What's actually built and working

- **Full CRM**, now backed by a real data-access layer (`src/lib/db.ts`): Dashboard, Pipeline,
  Leads + lead detail with a working activation flow, Templates, Sites, Bulk Build — every page
  is an async Server Component reading through `db.ts`, not importing mock arrays directly.
- **Real server actions** (`src/lib/actions.ts`): `logPayment`, `generateUploadLink`,
  `publishSite`, `buildDemos` all do real Supabase writes once connected — insert/update the
  right rows, log an activity, revalidate the right pages. In mock mode they throw a clear
  "connect Supabase" error instead of pretending to work.
- **Auth**: `middleware.ts` gates the whole CRM behind Supabase Auth login — but only once
  Supabase is actually configured, so mock mode stays fully open (there's no account to log in
  with otherwise). Sign-in page at `/login`, sign-out in the sidebar.
- **The multi-tenant rendering engine**, unchanged in principle: `middleware.ts` resolves any
  hostname to a business and rewrites to `/site/[slug]`; `db.ts`'s `getSiteContentBySlug` now
  pulls the real company + media + reviews + services rows when connected.
- **Two fully-built premium templates**: `elite-restaurant` and `pro-dental` (the latter
  researched against 2026's actual best dental sites — see
  `src/templates/pro-dental/design-notes.md` for the reasoning).
- **The full data model** (`supabase/schema.sql`), now including `company_services` and
  `upload_tokens` to back the services list and the content-intake link.

## What's still not wired

- **Only two templates exist** (restaurant, dental). Lumière (salon) and Forge (gym) are rows
  with no component behind them yet.
- **The content-intake upload page** (`/upload/[token]`) doesn't exist yet — `generateUploadLink`
  creates a real token in `upload_tokens`, but there's nowhere for a client to actually drop
  photos yet.
- **WhatsApp / scraping / enrichment**: the previous build's Apify + WhatsApp-VM integrations
  aren't ported over.
- **Brand color per business** isn't sourced from a real field yet (`db.ts` hardcodes a default) —
  add a `brand_color` column to `companies` when a template actually needs to vary it per business.
- **No test suite** beyond `tsc --noEmit` + `next build` passing clean. That proves the app
  compiles and every page/action is wired correctly — it does NOT prove the Supabase queries
  are 100% correct against a live database, since this was built and verified without a
  reachable Supabase project. Test the real flows (log a payment, bulk-build, sign in) against
  your actual project after connecting it, and expect to fix small query issues if the schema
  drifted at all from `supabase/schema.sql`.

## Running it

```bash
npm install
cp .env.example .env.local   # fill in once you create a Supabase project
npm run dev
```

Leave every Supabase var blank to stay in mock mode — everything still works, exactly as before.

## Suggested next steps, in order

1. Create the Supabase project, run `supabase/schema.sql`, fill in `.env.local`, create your
   first user from the Supabase Studio Authentication tab, sign in at `/login`.
2. Actually click through every flow once connected (bulk build, log payment, generate upload
   link, publish) and fix any query mismatch you hit — see the test-suite caveat above.
3. Build the `/upload/[token]` page so `generateUploadLink` links somewhere real.
4. Build the salon/gym templates from `buildfactory-template-brief.md`.
5. Re-port the Apify scraper and WhatsApp outreach as background jobs feeding into `deals`.
