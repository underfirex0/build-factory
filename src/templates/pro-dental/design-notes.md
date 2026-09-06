# Design notes — Clarity (Pro Dental)

Researched against 2026's actual best-performing dental sites (Zen Dental Studio,
Jackson Family Dental, Grand Street Dental, Madison Park Family Dentistry, The
Gleamery) before designing anything. The pattern that repeats across all of them:
calm, muted color, generous whitespace, real photography, upfront pricing, a
booking CTA that's never far away — the opposite of "exciting."

## Color
- `#FBF9F5` — warm porcelain background (not the cream+terracotta combo that's
  become an AI-generated-page tell)
- `#1E2B26` — deep pine, primary text (warm-neutral dark, not pure black)
- `#6E8F7C` — muted sage, primary accent / CTA
- `#C98C7D` — dusty clay-rose, used sparingly for warmth (accent shape, rating stars)
- `#5C6E64` / `#A79C8E` — secondary text tones

## Type
- Display: Fraunces (soft-edged serif — trustworthy, not clinical-cold)
- Body: Plus Jakarta Sans (rounded, humanist — not default Inter)
- Both wired via Tailwind `font-display` / `font-warm`; swap in `next/font/google`
  at deploy time for the actual font files (not done here — this sandbox has no
  network access to fonts.googleapis.com).

## Layout
- Asymmetric hero, organic blob shapes (not stock circle crops) — echoes the
  "modern art gallery" feel Grand Street Dental is praised for.
- Sections separated by color washes, not identical rounded-shadow cards.
- Pricing shown upfront on the Treatments section — cost anxiety is patients'
  #1 concern per every source reviewed; hiding it works against trust.

## Motion
- One orchestrated hero moment: an organic clip-path mask reveal on load.
- Everything else: gentle `whileInView` fades, longer duration/softer easing
  than the restaurant template — the whole job here is lowering anxiety, not
  creating excitement, so nothing should feel fast or aggressive.
- Lenis smooth scroll uses a slower, cubic-out easing curve for the same reason.

## What NOT to change without reconsidering the brief
- Don't add fabricated trust badges/stats — `TrustBar` renders nothing if the
  business record has no real `badges`/`reviewCount`.
- Don't swap the sage/clay palette for something punchier "to stand out" —
  every high-performing example in the research leans muted, not vibrant,
  specifically because the audience is anxious, not excited.
