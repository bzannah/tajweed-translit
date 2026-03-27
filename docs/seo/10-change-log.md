# Change Log

## 2026-03-25

### Entry 1

- Issue: Homepage had almost no indexable content because it redirected immediately on the client.
- Action: Replaced the redirect with a server-rendered landing page and explicit reading entry points.
- Files changed: `src/app/page.tsx`, `src/components/ui/resume-reading-link.tsx`
- Expected impact: Better homepage relevance for broad transliteration queries and stronger first-click routing into reading.
- Validation method: Search Console homepage impressions/clicks, Vercel page views to `/page/5`.
- Risk: Returning users may need one extra click.
- Rollback plan: Restore the redirecting homepage component if engagement drops materially.

### Entry 2

- Issue: Page URLs depended on images and client buttons more than crawlable HTML context.
- Action: Added reusable page SEO copy, breadcrumb navigation, structured data, and HTML previous/next links.
- Files changed: `src/lib/seo.ts`, `src/app/page/[number]/page.tsx`, `src/components/viewer/page-image.tsx`
- Expected impact: Better crawlability, stronger on-page relevance, and improved snippet readiness.
- Validation method: Search Console index coverage and long-tail page-query impressions.
- Risk: Slightly reduced viewport height for the visual reader.
- Rollback plan: Remove the summary section while keeping metadata improvements if the UI cost is too high.

### Entry 3

- Issue: Crawl assets were stale and not tied to the live route graph.
- Action: Replaced static `public/robots.txt` and `public/sitemap.xml` with generated Next.js metadata routes.
- Files changed: `src/app/robots.ts`, `src/app/sitemap.ts`, `src/lib/seo.ts`
- Expected impact: More complete sitemap coverage and lower risk of route drift.
- Validation method: Check deployed `/robots.txt` and `/sitemap.xml`, then submit sitemap in Search Console.
- Risk: Build/runtime metadata route issues if Next.js export handling changes.
- Rollback plan: Restore static files in `public/`.

### Entry 4

- Issue: The project had no local SEO operating docs or baseline inventory.
- Action: Created the `docs/seo/` artifact set, including route inventory, keyword map, backlog, schema plan, dashboard spec, and experiment log.
- Files changed: `docs/seo/*`
- Expected impact: Better execution discipline and easier iteration.
- Validation method: Review the docs during future SEO work and keep them updated with each meaningful change.
- Risk: Docs can become stale if not maintained.
- Rollback plan: Remove or regenerate outdated artifacts.
