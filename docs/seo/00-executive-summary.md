# Executive Diagnosis

Quran Tajweed Transliteration has a strong product-to-query fit for `quran transliteration` and `quran transliteration with tajweed`, but the current site architecture was under-explaining that value to search engines. The two biggest blockers were a client-only homepage redirect and page templates that relied heavily on images and client navigation instead of crawlable HTML text and links.

This pass fixes the highest-leverage technical gaps without changing the product shape dramatically. The homepage is now a real landing page, Quran page routes now expose server-rendered context and crawlable internal links, and sitemap/robots output now comes from the Next.js route graph instead of a stale static file.

## Top 20 Issues And Opportunities

1. Homepage immediately redirected with almost no indexable content.
2. Root URL did not clearly own the primary keyword cluster.
3. `sitemap.xml` only listed two URLs instead of the full route set.
4. `robots.txt` was static and easy to drift from the app.
5. Quran page routes were mostly image-led and weak on supporting copy.
6. Previous/next page navigation depended on buttons instead of crawlable links.
7. Page route metadata existed, but it was thin and inconsistent for search intent.
8. Homepage had no structured data.
9. Page routes had no structured data.
10. Donation page metadata was not fully canonicalised.
11. Alt text on page images was generic.
12. Root keyword coverage was spread across UI copy instead of a landing page.
13. Internal linking did not clearly reinforce `/page/5` as the reading start point.
14. No repo-local SEO backlog or change log existed.
15. No query-to-page ownership map existed.
16. No route inventory existed for indexability decisions.
17. No measurement dashboard spec existed for Search Console and Vercel data.
18. Missing future content hubs for surah-level and Tajweed education intent.
19. Donation page is useful, but not yet connected to a wider trust/support content system.
20. There are still no dedicated pages for `quran transliteration for beginners`, `quran reader with audio`, or surah-specific entry intent outside raw page routes.

## 90-Day Plan

### Do Now

1. Fix homepage indexability and query ownership. Impact: High. Effort: Medium. Dependency: None.
2. Add server-rendered copy, breadcrumb context, and HTML links on `/page/[number]`. Impact: High. Effort: Medium. Dependency: None.
3. Replace stale crawl assets with generated sitemap and robots metadata routes. Impact: High. Effort: Low. Dependency: None.
4. Add truthful JSON-LD for homepage and page routes. Impact: Medium. Effort: Low. Dependency: None.
5. Create the SEO operating docs in `docs/seo/`. Impact: Medium. Effort: Low. Dependency: None.

### Do Next

1. Launch a dedicated Tajweed colour guide hub page at `/tajweed-colour-guide`. Impact: High. Effort: Medium. Dependency: Content.
2. Create surah hub pages for the highest-demand surahs. Impact: High. Effort: Medium. Dependency: Template work.
3. Create a beginner-focused landing page for non-Arabic readers and reverts. Impact: High. Effort: Medium. Dependency: Content.
4. Add more descriptive surrounding copy around page images and audio features. Impact: Medium. Effort: Medium. Dependency: UX review.
5. Add richer trust pages: about, privacy, and methodology for transliteration/Tajweed guidance. Impact: Medium. Effort: Medium. Dependency: Owner input.

### Later

1. Build surah-by-surah and juz hub architecture with unique value, not mass-produced thin pages.
2. Add audio-focused landing pages once the experience is differentiated and documented.
3. Add editorial freshness and release annotations when real updates occur.
4. Add automated HTML/link/schema checks in CI.
5. Expand the experiment log with Search Console-backed title and internal-link tests.

## Shipped In This Pass

- Replaced the client-only homepage redirect with a crawlable landing page.
- Added reusable SEO helpers for metadata, JSON-LD, and sitemap generation.
- Added server-rendered page summaries and crawlable links on `/page/[number]`.
- Added generated `robots` and `sitemap` metadata routes.
- Added a repo-local SEO artifact set and unit tests for the SEO helpers.
