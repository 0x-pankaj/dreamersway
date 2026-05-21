# Dreamer's Way Consultancy — Multi-country Education Platform

A Next.js 16 + Supabase + Tailwind v4 platform for a global study-abroad consultancy.

**Destinations:** 🇳🇵 Nepal (Medical) · 🇮🇳 India (Engineering) · 🇬🇧 UK · 🇺🇸 USA · 🇯🇵 Japan (Higher Education)

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
```

### 1. Set up Supabase

1. Create a Supabase project at https://supabase.com
2. Open the SQL editor and **run the contents of `schema.sql`** — it creates all tables, RLS policies, and seeds the 5 destination countries, 4 streams, 6 services and starter FAQs.
3. In **Storage**, create a public bucket called `images` (used for logos, covers, galleries). Bucket policies are pre-configured by `schema.sql`.
4. Put your project URL + anon key in `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL="https://YOUR-PROJECT.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
   NEXT_PUBLIC_SITE_URL="https://dreamersway.com.np"   # optional, used for SEO
   ```

### 2. Create an admin user

In Supabase Auth → Users, create a user (email + password). Log in at `/admin/login` to manage content via the admin panel.

---

## Site map

| Route                          | What it is                                            |
| ------------------------------ | ----------------------------------------------------- |
| `/`                            | Multi-country homepage                                |
| `/study-in/[country]`          | Per-country landing page (nepal, india, uk, usa, japan) |
| `/universities`                | All universities — filter by country, stream, type    |
| `/universities/[slug]`         | Individual university page (SEO-optimized)            |
| `/scholarships`                | Scholarship listings                                  |
| `/services`                    | Consultancy services (shortlisting, visa, prep, etc.) |
| `/blog`, `/blog/[slug]`        | Resources / guides                                    |
| `/success-stories`             | Student testimonials                                  |
| `/notices`                     | Admission notices                                     |
| `/faqs`                        | FAQ page (auto JSON-LD)                               |
| `/about`, `/contact`, `/privacy` | Static pages                                        |
| `/admin/*`                     | Authenticated CMS                                     |
| `/sitemap.xml`, `/robots.txt`  | Auto-generated for SEO                                |

Legacy `/colleges` and `/colleges/[id]` redirect to `/universities`.

---

## Architecture

```
src/
  app/             Next.js app router pages
  components/      UI, page sections, admin forms
  lib/
    data.ts        Supabase fetchers (typed)
    site-config.ts Brand, destinations, contact info (edit here once)
    supabaseClient.ts
  types/index.ts   Shared TS types
schema.sql         Run this in Supabase once
```

### Tables created by `schema.sql`

`countries`, `streams`, `universities`, `scholarships`, `success_stories`, `blog_posts`, `faqs`, `services`, `notices`, `team_members`, `contacts`, `site_settings`.

All public reads are open. Writes require an authenticated Supabase user (the admin).

---

## SEO

- Per-page `generateMetadata` with canonical URLs and OpenGraph
- `EducationalOrganization` JSON-LD on every page (root layout)
- `CollegeOrUniversity` JSON-LD on each university page
- `BlogPosting` JSON-LD on each blog post
- `FAQPage` JSON-LD on country pages and the dedicated FAQ page
- Auto `/sitemap.xml` (includes countries, universities, blog posts)
- `/robots.txt` blocks `/admin` and `/api`

To customise brand-wide copy / contact info, edit `src/lib/site-config.ts`.
