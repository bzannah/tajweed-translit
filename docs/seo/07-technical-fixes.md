# Technical Fixes

## Implemented In This Pass

- Replaced the homepage auto-redirect with server-rendered landing content.
- Added generated metadata helpers so titles, descriptions, canonicals, schema, and sitemap entries share one source of truth.
- Added HTML internal links on page routes instead of relying only on client-side buttons.
- Replaced stale static `robots.txt` and `sitemap.xml` files with Next.js metadata routes.
- Improved page image alt text to mention Tajweed colour coding.
- Added unit tests for SEO helper logic.

## Still Open

- No dedicated Tajweed hub page yet.
- No surah hub pages yet.
- No Search Console or GA4 configuration in the repo.
- No automated broken-link or schema-validation step in CI.
- Page templates are still image-heavy and could use more visible explanatory text over time.

## Risk Notes

- The homepage UX changed from instant redirect to landing page plus explicit CTAs. This improves indexability but should be monitored for user friction.
- All page routes remain indexable. Reassess after new surah hubs exist so query ownership stays clean.
