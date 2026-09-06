# BuildFactory

A bulk website factory + CRM: scrape businesses, bulk-build demo sites on premium templates,
send them out, and activate the ones that pay — all synced through one data model.

This is a real, building, type-checked Next.js app — not a mockup. `npm run build` passes clean.
It runs on mock data (`src/lib/mock-data.ts`) until you connect a real Supabase project.

## What's actually built

- **Full CRM**: Dashboard, Pipeline (Kanban across the real deal stages), Leads list + detail page
  with the manual activation flow (log payment, generate content-intake link, publish), Templates
  library, Sites registry, Bulk Build (select many leads + one template, build in one shot).
- **The multi-tenant rendering engine**: `middleware.ts` resolves any hostname to a business and
  rewrites to `/site/[slug]`. This is the core architectural decision from our discussion —
  bulk-building 500 sites is 500 database rows, not 500 deployments. Improve a template once,
  every business on it updates.
- **One fully-built premium template** (`src/templates/elite-restaurant`): real GSAP ScrollTrigger
  parallax hero, Framer Motion reveals, Lenis smooth scroll, a magnetic CTA button, clip-path
  gallery reveals, bento-style services grid, demo-vs-active banner handling — all driven purely
  by the `TemplateContent` prop, zero hardcoded business data anywhere in it.
- **The full data model** (`supabase/schema.sql`): companies, media, reviews, templates, sites,
  build jobs, deals, activities, invoices — this is what CRM/pipeline/billing all sync against.
- **The shared content contract** (`src/lib/schema.ts`): the single Zod schema every page, the
  build engine, and every template render from. This is what `buildfactory-template-brief.md`
  briefs new templates against.

Preview the template live: run the app, then visit `/preview/elite-restaurant?state=demo` and
`/preview/elite-restaurant?state=active` to see both states.

## What's still mocked / not wired

- **Database**: everything currently reads from `src/lib/mock-data.ts`. `src/lib/db.ts` is
  structured so swapping in real Supabase queries doesn't require touching any page — only that
  one file changes.
- **Auth**: no login yet. Add Supabase Auth + a simple role check (admin/rep) before this goes
  to a real team.
- **WhatsApp / scraping / enrichment**: the previous build's Apify + WhatsApp-VM integrations
  aren't ported over yet — the CRM's activity timeline and "generate upload link" button are UI
  only right now, not wired to a real messaging/storage backend.
- **Payments**: "Log payment" writes nowhere yet — wire it to insert into the `deals` /
  `invoices` tables per the schema.
- **Only one template exists** (`elite-restaurant`). Use `buildfactory-template-brief.md` to brief
  the next ones (dental, salon, gym) in any AI tool, then drop the result into
  `src/templates/<slug>/` and register it in `TEMPLATE_REGISTRY` in
  `src/app/preview/[slug]/page.tsx` and `src/app/site/[slug]/page.tsx`.

## Running it

```bash
npm install
cp .env.example .env.local   # fill in once you create a Supabase project
npm run dev
```

## Suggested next steps, in order

1. Create the Supabase project, run `supabase/schema.sql`, wire `src/lib/db.ts` to it for real.
2. Add auth + role-gating on the CRM routes.
3. Build the dental/salon/gym templates from the brief.
4. Wire "Log payment" and "Generate upload link" to actually write to the DB / send a real link.
5. Re-port the Apify scraper and WhatsApp outreach as background jobs feeding into `deals`.
