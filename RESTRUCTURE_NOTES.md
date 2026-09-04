# Restructure notes — Phase 1

## What changed
- **Fixed the core bug**: `MembershipPayment` now actually renders on `/membership` (it existed in the old code but was never imported into the page — visitors couldn't pay before this).
- Split the single-page site into 9 real routes: `/`, `/about`, `/programs`, `/programs/$slug`, `/membership`, `/team`, `/gallery`, `/blog`, `/blog/$slug`, `/contact` — each with unique SEO metadata via `src/lib/seo.ts`.
- New shared layout system: `SiteHeader` (responsive mobile menu), `SiteFooter`, `Section`/`PageHero`/`Breadcrumb` in `src/components/layout/`.
- New reusable content blocks in `src/components/common/`: stats strip, CTA section, team card, testimonial card, blog card, gallery grid with lightbox.
- Redesigned visual system: refined green/gold palette, Manrope + Cormorant Garamond type pairing, a "pathway" line/node motif used structurally (breadcrumbs, vision/mission markers) instead of decoratively, asymmetric hero replacing the old centered gradient + circular photo rotator.
- Added a **working contact form** (new `contact_messages` Supabase table + RLS policy + migration) — the old site had no way to message ECCO at all.
- Rebuilt `MembershipPayment`: the working "Send & confirm" M-Pesa flow (manual code, same Supabase table as before) plus a clearly-labeled "Instant (STK Push) — coming soon" tab — UI-ready for the Daraja API integration once you have credentials, but intentionally not wired to a backend yet per your instruction.
- Added `sitemap.xml`, `robots.txt` sitemap reference, Organization + BreadcrumbList JSON-LD schema.
- All copy in `src/lib/content/*.ts` is placeholder — swap it for real content without touching any component.

## Verified
- `npx tsc --noEmit` — clean
- `npx eslint .` — clean
- `npm run build` — full SSR production build succeeds for all 9 routes

## Not yet done (next phases)
- Real content/photos (you said you'll supply these)
- STK Push backend (Supabase Edge Function + Daraja API — waiting on your credentials)
- Admin view for verifying membership payments / reading contact messages
- Real OG image, favicon refresh
- Performance pass (image formats/sizes) once real photos are in
