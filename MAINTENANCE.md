# ECCO website: monthly maintenance

Content lives in `src/lib/content/*.ts`. Edit the data, never the components.

## Monthly checklist
1. **Press**: add any new coverage to `PRESS` in `src/lib/content/press.ts` (own-words summary, credit, link, quote under 15 words). Newest first.
2. **Blog**: add a post to `BLOG_POSTS` in `gallery-blog.ts`, then add its URL to `public/sitemap.xml`.
3. **Gallery**: drop photos in `public/images/`, add an entry to `GALLERY`.
4. **Testimonials**: add real ones to `TESTIMONIALS` in `misc.ts`.
5. **Social links**: set `href` in `SOCIAL_LINKS` (`site.ts`) once accounts exist.
6. **Team**: update `GOVERNANCE` seats and `FOUNDER_HIGHLIGHTS` in `team.ts`.
7. **Check messages**: review `contact_messages` and `membership_payments` in Supabase; mark handled rows.
8. **Dependencies**: `npm outdated`, then `npm update`, `npm run build`, test, commit.
9. **Health**: open every page on the live site, send a test contact message, check Search Console for errors.

## Other content files
- **Events**: add to `UPCOMING` in `events.ts` (move finished ones to `PAST`).
- **Resources**: put the PDF in `public/resources/`, then add an entry in `resources.ts`.
- **Swahili**: add `"English text": "Kiswahili"` to `sw.ts`; the text must match the English exactly and be wrapped in `t()`.
- **Admin**: `/admin` (not linked anywhere). Sign in with the admin account to review messages, bookings, payments, donations and subscribers, change statuses and export CSV.

## Adding a press item
Copy the existing object in `PRESS`, change every field, keep `slug` unique. The Press page, home teaser and chat assistant pick it up automatically (the home teaser and chat show the first item).

## Setting up the admin account (once)
1. Supabase: Authentication > Users > Add user (email + password, tick "Auto Confirm User").
2. SQL Editor: `INSERT INTO public.admin_users (user_id) SELECT id FROM auth.users WHERE email = 'YOUR-ADMIN-EMAIL';`
3. Visit `/admin` on the live site and sign in. Turn off public sign-ups in Authentication > Sign In / Providers so nobody else can register.
