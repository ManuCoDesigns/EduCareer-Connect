# EduCareer Connect Organization (ECCO)

Website for EduCareer Connect Organization — CBC-aligned career guidance,
counselling and mentorship for Kenyan learners.

## Stack

- [TanStack Start](https://tanstack.com/start) (React 19, SSR)
- Tailwind CSS v4
- shadcn/ui components
- Supabase (membership payments + contact messages)

## Development

Requires Node.js and npm.

```sh
npm install
npm run dev
```

The dev server runs on `http://localhost:8080` (configurable in `vite.config.ts`).

## Environment variables

Copy `.env` and set:

```
SUPABASE_URL=...
SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

## Build

```sh
npm run build
```

Outputs a server bundle to `.output/` using the `node-server` Nitro preset by
default. To target a different host (Vercel, Netlify, Cloudflare, etc.),
change the `nitro({ preset: ... })` option in `vite.config.ts` — see the
[Nitro deploy docs](https://nitro.build/deploy) for the full preset list.

## Project structure

- `src/routes/` — pages (file-based routing)
- `src/components/layout/` — header, footer, section/hero primitives
- `src/components/common/` — reusable content blocks (stats, CTA, cards)
- `src/components/site/` — feature-specific components (payment form, contact form)
- `src/lib/content/` — placeholder site copy, swap for real content
- `src/lib/seo.ts` — per-page metadata + schema.org helpers
- `supabase/migrations/` — database schema
