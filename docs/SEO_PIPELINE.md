# SEO Pipeline — TajweedTranslit.com

**Goal:** Make https://www.tajweedtranslit.com the #1 ranking result for all Quran transliteration + Tajweed keywords on Google and other search engines.

**Current state:** Solid foundation — dynamic metadata for 1,275 pages, JSON-LD structured data, programmatic sitemap, canonical URLs, Open Graph tags. But the site is missing several critical dimensions that separate "good SEO" from "dominant SEO."

---

## Executive Summary

This pipeline has **10 workstreams** organized into 3 tiers:

| Tier | Focus | Impact | Effort |
|------|-------|--------|--------|
| **Tier 1: Fix & Ship** | Technical SEO gaps, on-page fixes | High | 1-2 weeks |
| **Tier 2: Content Engine** | Cornerstone content, programmatic pages, blog | Very High | 2-4 weeks |
| **Tier 3: Authority & Growth** | Backlinks, community, off-page signals | Highest (long-term) | Ongoing |

---

## TIER 1: TECHNICAL SEO — FIX & SHIP

### 1.1 Fix Critical Technical Gaps

**Priority: URGENT — do these before anything else.**

#### A. Open Graph Image (og:image)

The site has NO og:image defined. Every social share shows a blank preview. This kills click-through rate from social media and messaging apps.

**Action items:**

1. Create a default OG image (1200x630px) — the app title in gold on dark background with a sample Tajweed page snippet. Save as `public/og-image.png`.

2. Create per-surah OG images (114 images) using a build script. Each shows the surah name in English + Arabic with the Tajweed colour palette. Save as `public/og/surah-{number}.png`.

3. Add to root layout metadata:
```typescript
openGraph: {
  images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Quran Tajweed Transliteration' }],
},
twitter: {
  card: 'summary_large_image',
  images: ['/og-image.png'],
},
```

4. Add dynamic OG images per page in `generateMetadata`:
```typescript
openGraph: {
  images: [{ url: `/og/surah-${surah.number}.png`, width: 1200, height: 630 }],
},
```

#### B. Manifest Link Missing

`public/manifest.json` exists but is not linked in the HTML `<head>`. Add to layout.tsx metadata:
```typescript
manifest: '/manifest.json',
```
This enables PWA install prompts and improves mobile signals.

#### C. Static Sitemap Conflict

Both `public/sitemap.xml` (static, 2 entries) and `src/app/sitemap.ts` (dynamic, 1277+ entries) exist. The static file may shadow the dynamic one depending on the build.

**Action:** Delete `public/sitemap.xml`. The dynamic `sitemap.ts` already generates the complete sitemap at build time via `force-static`.

#### D. Sitemap Enhancement — lastmod Dates

Add `lastmod` to sitemap entries. Google uses this to prioritize recrawling:
```typescript
{
  url: getAbsoluteUrl(`/page/${page}`),
  lastModified: new Date('2026-03-27'), // update on each deploy
  changeFrequency: 'monthly',
  priority: page === DEFAULT_PAGE ? 0.9 : 0.8,
}
```

#### E. Sitemap Index for Scale

With 1,277+ URLs, consider splitting into multiple sitemaps (Google recommends max 50,000 URLs per sitemap, but smaller sitemaps are crawled faster). Create:
- `sitemap-pages-1.xml` (pages 1-500)
- `sitemap-pages-2.xml` (pages 501-1000)
- `sitemap-pages-3.xml` (pages 1001-1275)
- `sitemap-core.xml` (homepage, donate, blog pages, surah landing pages)
- `sitemap.xml` — sitemap index pointing to all of the above

Use Next.js `generateSitemaps()` for this.

### 1.2 Enhanced Structured Data (Schema.org)

**Current:** WebSite, WebApplication, WebPage, BreadcrumbList.
**Missing:** Several high-value schema types that would give rich snippets in search results.

#### A. Book Schema (for the Quran itself)

Add to the homepage structured data:
```json
{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "The Holy Quran — Tajweed Transliteration Edition",
  "alternateName": ["Al-Quran", "القرآن الكريم"],
  "inLanguage": ["ar", "en"],
  "numberOfPages": 1275,
  "genre": "Religion",
  "about": {
    "@type": "Thing",
    "name": "Islam"
  },
  "workExample": {
    "@type": "Book",
    "bookFormat": "https://schema.org/EBook",
    "readonlineUrl": "https://tajweedtranslit.com/page/5"
  }
}
```

#### B. Chapter Schema (for each surah)

Create surah landing pages (see Section 2.2) with:
```json
{
  "@context": "https://schema.org",
  "@type": "Chapter",
  "name": "Surah Al-Fatiha — The Opening",
  "position": 1,
  "isPartOf": {
    "@type": "Book",
    "name": "The Holy Quran — Tajweed Transliteration Edition"
  },
  "pagination": "Page 5",
  "url": "https://tajweedtranslit.com/surah/al-fatiha"
}
```

#### C. FAQPage Schema

Add FAQ structured data to educational pages (Tajweed guide, surah landing pages). This gives expandable FAQ rich snippets in Google:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Tajweed transliteration?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tajweed transliteration is a system that converts Arabic Quranic text into English letters while preserving the pronunciation rules (Tajweed) through colour coding..."
      }
    }
  ]
}
```

#### D. Organization Schema

Add to homepage for brand recognition in knowledge panels:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Quran Tajweed Transliteration",
  "url": "https://tajweedtranslit.com",
  "logo": "https://tajweedtranslit.com/logo.png",
  "sameAs": [
    "https://github.com/your-org/tajweed-translit",
    "https://twitter.com/tajweedtranslit",
    "https://www.youtube.com/@tajweedtranslit"
  ]
}
```

#### E. SoftwareApplication Schema (enhanced)

Upgrade the existing WebApplication schema:
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Quran Tajweed Transliteration",
  "applicationCategory": "EducationalApplication",
  "applicationSubCategory": "Religious Education",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "150"
  },
  "featureList": "Tajweed colour coding, 1275 pages, audio recitation, bookmarks, offline support"
}
```

### 1.3 Core Web Vitals Optimization

Google uses Core Web Vitals (LCP, INP, CLS) as direct ranking factors.

#### A. LCP (Largest Contentful Paint) — Target < 2.5s

The largest element is the page image (WebP). Optimize:

1. **Preload the current page image** — add a `<link rel="preload">` for the visible page image
2. **Responsive srcSet** — generate multiple sizes (400w, 600w, 800w, 1200w) at build time and use `srcSet` with `sizes`
3. **Use next/image priority** — already done for current page; verify it's working
4. **CDN cache headers** — configure Vercel's edge cache for `/pages-reinked/*.webp` with `Cache-Control: public, max-age=31536000, immutable`

#### B. CLS (Cumulative Layout Shift) — Target < 0.1

1. **Set explicit width/height on all images** — prevent layout shift as images load
2. **Reserve space for slide-up panels** — use CSS `min-height` on panel containers
3. **Font display: swap** — already using this; good

#### C. INP (Interaction to Next Paint) — Target < 200ms

1. **Debounce zoom controls** — avoid re-rendering on every scroll tick
2. **Use `startTransition`** for page navigation — keep the UI responsive
3. **Lazy load sidebar components** — use `React.lazy()` + `Suspense` for SurahList (114 items)

### 1.4 Crawlability & Indexing

#### A. Google Search Console Setup

1. Verify ownership of `tajweedtranslit.com` in Google Search Console
2. Submit the sitemap: `https://tajweedtranslit.com/sitemap.xml`
3. Request indexing for key pages manually (homepage, page 5, surah landing pages)
4. Monitor Coverage report for crawl errors
5. Set up Bing Webmaster Tools (mirrors GSC setup)

#### B. Internal Linking Structure

The site's internal linking is weak. Pages link forward/back but lack semantic connections.

**Create a hub-and-spoke model:**

```
Homepage (hub)
├── /tajweed-guide (spoke — links to pages 1-4)
├── /surah/al-fatiha (spoke — links to pages 5-6)
├── /surah/al-baqara (spoke — links to pages 7-102)
├── ... (114 surah spokes)
├── /juz/1 (spoke — links to relevant pages)
├── ... (30 juz spokes)
├── /learn/tajweed-rules (spoke — cornerstone content)
├── /learn/how-to-read-quran (spoke — cornerstone content)
└── /blog (spoke — fresh content hub)
```

Each page should link to:
- Its surah landing page
- Previous/next pages (already done)
- Related surahs (by theme, revelation period, or proximity)
- The Tajweed guide (for beginners)

#### C. Pagination SEO

Add `rel="prev"` and `rel="next"` links for page sequences:
```typescript
// In generateMetadata for /page/[number]
alternates: {
  canonical: `/page/${pageNum}`,
},
// Add link tags in the page head
other: {
  'link-prev': pageNum > 1 ? `/page/${pageNum - 1}` : undefined,
  'link-next': pageNum < TOTAL_PAGES ? `/page/${pageNum + 1}` : undefined,
},
```

### 1.5 Page Speed & Performance

#### A. Image Optimization Pipeline

1. **WebP quality audit** — check if current images are optimally compressed. Target 85-90% quality for readability with minimum file size
2. **AVIF fallback** — generate AVIF versions (30-50% smaller than WebP) for browsers that support it
3. **Blur placeholders** — generate 10px-wide base64 blur images at build time for instant perceived loading

#### B. JavaScript Bundle

1. **Analyze bundle** — run `pnpm build && npx @next/bundle-analyzer` to identify large chunks
2. **Code split aggressively** — audio player, settings panel, notes editor should all be lazy loaded
3. **Tree-shake data imports** — ensure only the needed surah data is loaded per page, not all 114 surahs

#### C. HTTP Headers (Vercel)

Create/update `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/pages-reinked/(.*).webp",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

---

## TIER 2: CONTENT ENGINE — THE RANKING MULTIPLIER

Content is what actually wins rankings. Technical SEO gets you indexed; content gets you to #1.

### 2.1 Surah Landing Pages (114 new routes)

**This is the single highest-impact SEO action you can take.**

Create `/surah/[slug]` routes for all 114 surahs. Each page becomes a keyword-rich, content-dense landing page that targets "surah X transliteration" searches.

**Route structure:** `/surah/al-fatiha`, `/surah/al-baqara`, etc.

**Each surah landing page contains:**

1. **H1:** "Surah Al-Fatiha (الفاتحة) — The Opening | English Transliteration with Tajweed"
2. **Summary block:** Surah number, revelation type (Meccan/Medinan with icon), total verses, total pages, juz location
3. **Quick facts:** Where it was revealed, its themes, its position in the Quran
4. **"Start Reading" CTA:** Links directly to the first page of this surah
5. **Page thumbnails:** Small previews of each page in this surah (clickable)
6. **Related surahs:** Links to surahs revealed in the same period or with similar themes
7. **Tajweed rules preview:** Which Tajweed rules appear most in this surah
8. **FAQ section:** 3-5 questions specific to each surah (with FAQPage schema)
   - "How many verses are in Surah Al-Fatiha?"
   - "Is Surah Al-Fatiha Meccan or Medinan?"
   - "What does Al-Fatiha mean?"
   - "How to recite Surah Al-Fatiha with proper Tajweed?"

**Target keywords per surah page:**
- "[surah name] transliteration"
- "[surah name] in english"
- "[surah name] tajweed"
- "[surah name] meaning"
- "how to read [surah name]"
- "surah [surah name] english transliteration"

**SEO metadata example:**
```typescript
title: "Surah Al-Fatiha Transliteration with Tajweed | Read in English"
description: "Read Surah Al-Fatiha (The Opening) in English transliteration with colour-coded Tajweed rules. 7 verses, Meccan surah. Free online Quran reader with audio."
```

### 2.2 Juz Landing Pages (30 new routes)

Create `/juz/[number]` routes. Similar structure to surah pages but organized by juz.

**Each juz landing page contains:**
1. **H1:** "Juz 1 (آلم) — Quran Part 1 | English Transliteration with Tajweed"
2. **Surahs in this juz** with links to surah landing pages
3. **Page range** with direct links
4. **Start Reading CTA**

**Target keywords:**
- "juz [number] transliteration"
- "quran part [number] english"
- "para [number] transliteration" (South Asian terminology)

### 2.3 Tajweed Educational Pages

Create a `/learn/` section with cornerstone content targeting educational keywords:

#### Page 1: `/learn/tajweed-rules` — "Complete Guide to Tajweed Rules"
- Visual guide showing each Tajweed rule with its colour code
- Audio examples of each rule
- Practice exercises linking to relevant Quran pages
- **Target:** "tajweed rules", "tajweed rules chart", "tajweed colour coding"

#### Page 2: `/learn/how-to-read-quran-transliteration` — "How to Read the Quran in Transliteration"
- Step-by-step beginner's guide
- Explanation of the transliteration system used
- Comparison with Arabic text
- **Target:** "how to read quran in english", "quran transliteration guide", "quran for beginners"

#### Page 3: `/learn/tajweed-for-beginners` — "Tajweed for Beginners: A Complete Guide"
- What is Tajweed and why it matters
- The 5 categories of Tajweed rules
- Interactive examples from the app
- **Target:** "tajweed for beginners", "learn tajweed", "what is tajweed"

#### Page 4: `/learn/quran-pronunciation-guide` — "Quran Pronunciation Guide"
- Arabic letter pronunciation in transliteration
- Common mistakes and corrections
- Audio demonstrations
- **Target:** "quran pronunciation", "arabic pronunciation guide", "how to pronounce quran"

#### Page 5: `/learn/meccan-vs-medinan-surahs` — "Meccan vs Medinan Surahs: Complete Guide"
- Differences between Meccan and Medinan surahs
- Complete list with classification
- Historical context
- **Target:** "meccan surahs", "medinan surahs", "meccan vs medinan"

### 2.4 Blog / Articles Section

Create `/blog` with a consistent publishing cadence. Fresh content signals to Google that the site is alive and authoritative.

**Content calendar (publish 2-4 articles per month):**

**Month 1 — Foundation:**
- "What is Tajweed and Why Every Muslim Should Learn It"
- "The 10 Most Important Tajweed Rules You Need to Know"
- "How Colour-Coded Tajweed Makes Quran Recitation Easier"
- "Beginner's Guide to Reading the Quran in English Transliteration"

**Month 2 — Surah Deep Dives:**
- "Understanding Surah Al-Fatiha: Meaning, Tajweed, and Transliteration"
- "Surah Ya-Sin: Complete Guide to Reading with Tajweed"
- "Surah Al-Kahf: Friday Reading Guide with Transliteration"
- "The Last 10 Surahs: Perfect for Memorization with Tajweed"

**Month 3 — Seasonal/Event Content:**
- "Ramadan Quran Reading Schedule with Tajweed Transliteration"
- "How to Complete the Quran in 30 Days (Juz-by-Juz Guide)"
- "Best Surahs to Read During Ramadan"
- "Laylatul Qadr: Which Surahs to Recite"

**Month 4 — Educational:**
- "Idgham, Ikhfa, Iqlab: Understanding Noon Sakinah Rules"
- "Madd Rules Explained: When to Extend Your Recitation"
- "Common Tajweed Mistakes and How to Fix Them"
- "How AI and Technology are Helping Muslims Learn Tajweed"

**Ongoing:**
- "Surah of the Week" series (114 articles over 2+ years)
- "Tajweed Tip of the Day" micro-content
- "Reader Stories" — community testimonials
- Seasonal content (Ramadan, Hajj season, Eid, Mawlid)

### 2.5 On-Page SEO Enhancement for Existing Pages

#### A. Add Visible Text Content to Page Routes

Currently, `/page/[number]` routes are primarily images. Google can't read text in images. Add visible, crawlable text content:

1. **Page heading (H1):** "Surah Al-Fatiha Transliteration — Page 5"
2. **Page context paragraph:** "You are reading page 5 of the Quran in English transliteration with Tajweed colour coding. This page contains Surah Al-Fatiha (The Opening), a Meccan surah with 7 verses."
3. **Navigation breadcrumbs** (visible, not just schema): Home > Quran Pages > Surah Al-Fatiha > Page 5
4. **Footer text:** Brief explanation of Tajweed rules visible on this page

This text should be concise and below/above the page image — not overlaying it. It gives Google textual signals while maintaining the clean reading experience.

#### B. Heading Hierarchy

Ensure every route has a proper H1 → H2 → H3 hierarchy:

```
<h1>Surah Al-Fatiha Transliteration — Page 5</h1>
  <h2>Read with Tajweed Colour Coding</h2>
  [page image]
  <h2>About This Page</h2>
    <h3>Surah Details</h3>
    <h3>Tajweed Rules on This Page</h3>
  <h2>Continue Reading</h2>
    [prev/next navigation]
```

#### C. Alt Text Enhancement

Current: `"Quran transliteration page {n}"`
Better: `"Surah Al-Fatiha English transliteration with Tajweed colour coding — page 5 of 1275"`

Include the surah name, "transliteration", "Tajweed", and the page number.

#### D. Title Tag Optimization

Current: `"Al-Fatiha — Page 5 | Quran Tajweed Transliteration"`
Optimized: `"Surah Al-Fatiha Transliteration with Tajweed — Page 5 | Free Quran Reader"`

Include "Surah" prefix (many users search for "Surah X"), include "Transliteration" and "Tajweed" in every title, and add "Free" as a value signal.

---

## TIER 3: AUTHORITY & GROWTH — LONG-TERM DOMINANCE

### 3.1 Backlink Strategy

Backlinks are the #1 off-page ranking factor. Here's how to build them:

#### A. Islamic Education Partnerships

1. **Reach out to Islamic schools and Quran academies** — offer TajweedTranslit as a free classroom resource. Many will link to it from their resources pages.
2. **Contact online Quran tutoring platforms** — offer embeddable page widgets they can use in their courses.
3. **Partner with mosque websites** — offer to be listed as a recommended Quran learning resource.

#### B. Content-Driven Backlinks

1. **Create "Best Quran Apps" comparison content** — objective comparisons that naturally attract links.
2. **Guest post on Islamic blogs** — write about Tajweed education with links back to relevant surah/guide pages.
3. **Create embeddable infographics:** "The Complete Tajweed Colour Chart" — bloggers embed it and link back.
4. **Publish on Medium/Substack** — cross-post educational articles with canonical links.

#### C. Directory & Resource Submissions

Submit to:
- IslamicFinder.org resource directory
- Muslim app directories
- GitHub Awesome Islamic lists
- ProductHunt (for launch)
- Hacker News (Show HN)
- Reddit: r/islam, r/MuslimLounge, r/Quran, r/LearnQuran

#### D. Digital PR

1. **Press release on launch** — target Islamic news outlets (AboutIslam.net, MuslimMatters.org)
2. **Ramadan feature pitches** — pitch to tech blogs covering Ramadan apps each year
3. **Interview series** — interview Quran teachers about the importance of Tajweed; publish on your blog

### 3.2 Social Media SEO Signals

Social signals aren't direct ranking factors, but they drive traffic and attract backlinks.

#### A. Create Accounts

1. **YouTube channel** — short Tajweed lesson videos (< 3 min), each linking to the relevant page on the site
2. **TikTok / Instagram Reels** — 30-second Tajweed tips with the app shown in use
3. **Twitter/X** — daily Tajweed tips, surah facts, share reader milestones
4. **Facebook group** — "Learn Tajweed with TajweedTranslit" community

#### B. YouTube SEO

YouTube is the #2 search engine. Create:
- "How to Read Surah Al-Fatiha with Tajweed" (for each of the 114 surahs)
- "Tajweed Rules Explained" series
- "Quran Reading Challenge" series
- App walkthrough and tutorial videos

Each video description links to the relevant page on tajweedtranslit.com.

### 3.3 Google Business Profile

If applicable, create a Google Business Profile as an "Online Education" service. This can trigger knowledge panel features.

### 3.4 Multi-Language Expansion (Future)

Consider translating the site interface (not the Quran content) into:
- Urdu (huge Quran learner demographic)
- Bahasa (Indonesia — largest Muslim population)
- Turkish
- French (West Africa)
- Malay

Each language version gets its own `hreflang` tags and dramatically expands keyword coverage.

Implement with Next.js i18n:
```
tajweedtranslit.com/en/surah/al-fatiha
tajweedtranslit.com/ur/surah/al-fatiha
tajweedtranslit.com/id/surah/al-fatiha
```

---

## MONITORING & CONTINUOUS OPTIMIZATION

### 4.1 Analytics Setup

1. **Google Search Console** — monitor impressions, clicks, CTR, position for all keywords
2. **Google Analytics 4** — track user behavior, page views, bounce rate, session duration
3. **Vercel Analytics** — already integrated; use for Core Web Vitals monitoring
4. **Ahrefs/SEMrush** — track keyword rankings, backlink profile, competitor movements (paid tool)

### 4.2 Monthly SEO Review Checklist

- [ ] Check Google Search Console for crawl errors and fix them
- [ ] Review top performing keywords and create more content targeting them
- [ ] Review declining keywords and optimize those pages
- [ ] Check Core Web Vitals scores and fix any regressions
- [ ] Publish 2-4 new blog articles
- [ ] Build 5-10 new backlinks through outreach
- [ ] Update sitemap if new pages were added
- [ ] Review competitor rankings and identify new keyword opportunities
- [ ] Share content on social media channels
- [ ] Respond to any user feedback or feature requests

### 4.3 Key Performance Indicators (KPIs)

| Metric | Baseline | 3-Month Target | 6-Month Target | 12-Month Target |
|--------|----------|----------------|----------------|-----------------|
| Organic traffic (monthly) | TBD | 5,000 | 25,000 | 100,000 |
| Indexed pages | ~1,277 | 1,500+ | 1,700+ | 2,000+ |
| Keywords in top 10 | TBD | 50 | 200 | 500+ |
| Keywords in top 3 | TBD | 10 | 50 | 150+ |
| Backlinks (referring domains) | TBD | 30 | 100 | 300+ |
| Domain authority | TBD | 20 | 35 | 50+ |
| Average position (target keywords) | TBD | 30 | 15 | 5 |
| Core Web Vitals pass rate | TBD | 90% | 95% | 100% |

### 4.4 Automated SEO Validation (CI/CD)

Add to the build pipeline:

```bash
# pnpm validate:seo — run in CI before deploy
```

Create `scripts/validate-seo.ts`:
1. Every page has a unique `<title>` tag (no duplicates across 1275+ pages)
2. Every page has a unique `meta description` (150-160 chars)
3. Every page has an H1 tag
4. Every image has alt text
5. No broken internal links
6. Sitemap contains all expected URLs
7. robots.txt is valid
8. All canonical URLs resolve correctly
9. JSON-LD validates against schema.org
10. OG images exist for all pages

---

## PRIORITY IMPLEMENTATION ORDER

Here's the exact sequence to execute for maximum impact:

### Week 1-2: Technical Foundation
1. Delete `public/sitemap.xml` (5 min)
2. Add `manifest` link to metadata (5 min)
3. Create default OG image and add to metadata (2 hours)
4. Add `lastmod` to sitemap entries (30 min)
5. Add visible H1, breadcrumbs, and context text to `/page/[number]` routes (4 hours)
6. Enhance alt text with surah names (1 hour)
7. Optimize title tags with "Surah" prefix and "Free" signal (1 hour)
8. Add Book, Organization, and FAQPage schemas (3 hours)
9. Set up Google Search Console + submit sitemap (30 min)
10. Set up Bing Webmaster Tools (15 min)
11. Add `rel="prev"` / `rel="next"` pagination links (1 hour)
12. Configure Vercel cache headers (30 min)

### Week 3-4: Surah Landing Pages
13. Create `/surah/[slug]` route with generateStaticParams for all 114 surahs (8 hours)
14. Add rich content to each surah page (surah facts, FAQ, page thumbnails) (8 hours)
15. Add Chapter schema to surah pages (2 hours)
16. Create `/juz/[number]` routes for all 30 juz (4 hours)
17. Build internal linking between pages, surahs, and juz (4 hours)

### Week 5-6: Cornerstone Content
18. Create `/learn/tajweed-rules` guide (4 hours)
19. Create `/learn/how-to-read-quran-transliteration` guide (4 hours)
20. Create `/learn/tajweed-for-beginners` guide (4 hours)
21. Set up `/blog` infrastructure with Next.js MDX (4 hours)
22. Write and publish first 4 blog articles (8 hours)

### Week 7-8: Authority Building
23. Create social media accounts (YouTube, Twitter, Instagram) (2 hours)
24. Submit to Islamic directories and resource lists (4 hours)
25. Begin outreach to Islamic schools and academies (ongoing)
26. Create first YouTube videos — "How to Read Surah Al-Fatiha with Tajweed" (4 hours)
27. Launch on ProductHunt / Reddit / Hacker News (2 hours)

### Ongoing (Monthly)
28. Publish 2-4 blog articles per month
29. Create 2-4 YouTube videos per month
30. Build 5-10 backlinks per month through outreach
31. Review Google Search Console and optimize underperforming pages
32. Run Core Web Vitals audit and fix regressions
33. Create seasonal content (Ramadan, Eid, etc.)
34. Monitor competitor rankings and adapt strategy

---

## TARGET KEYWORD MAP

### Primary Keywords (highest priority — aim for #1)

| Keyword | Target Page | Current Rank | Notes |
|---------|-------------|-------------|-------|
| quran transliteration with tajweed | Homepage | TBD | Core keyword |
| tajweed transliteration | Homepage | TBD | Exact brand match |
| quran tajweed transliteration | Homepage | TBD | Core keyword |
| tajweed colour coding quran | /learn/tajweed-rules | TBD | Unique differentiator |
| read quran in english transliteration | Homepage + /page/5 | TBD | High volume |
| free quran transliteration online | Homepage | TBD | "Free" differentiator |

### Secondary Keywords (per surah — 114 clusters)

| Keyword Pattern | Target Page | Volume Estimate |
|----------------|-------------|-----------------|
| surah [name] transliteration | /surah/[slug] | Medium per surah |
| surah [name] in english | /surah/[slug] | Medium-High |
| surah [name] tajweed | /surah/[slug] | Low-Medium |
| how to read surah [name] | /surah/[slug] | Low-Medium |
| surah [name] meaning | /surah/[slug] | Medium |

### Long-Tail Keywords (blog targets)

| Keyword | Target Article |
|---------|---------------|
| how to learn tajweed at home | /blog/learn-tajweed-at-home |
| tajweed rules for beginners | /learn/tajweed-for-beginners |
| idgham ikhfa iqlab rules | /blog/noon-sakinah-rules |
| ramadan quran reading schedule | /blog/ramadan-reading-schedule |
| best way to read quran without knowing arabic | /blog/quran-without-arabic |
| quran reading plan 30 days | /blog/30-day-quran-plan |
| what is tajweed in quran | /learn/tajweed-for-beginners |
| meccan vs medinan surahs list | /learn/meccan-vs-medinan |
| tajweed rules chart pdf | /learn/tajweed-rules |
| surah al kahf friday | /blog/surah-al-kahf-friday |

---

## COMPETITIVE ADVANTAGES TO EMPHASIZE

Your site has unique strengths no competitor matches. Lean into these in all content:

1. **Free and open web** — no app download, no paywall, works on any device
2. **Tajweed colour coding** — visual learning that paper books can't offer
3. **1,275 complete pages** — the entire Quran, not just popular surahs
4. **Page-faithful layout** — matches the physical Mushaf exactly
5. **Fast and lightweight** — WebP images load instantly vs PDF.js bloat
6. **Privacy-first** — no tracking, no accounts required, data stays on device
7. **Mobile-friendly** — designed for the way people actually read today

Use these in meta descriptions, blog articles, comparison pages, and social media.

---

## TOOLS & SERVICES NEEDED

| Tool | Purpose | Cost |
|------|---------|------|
| Google Search Console | Index monitoring, keyword tracking | Free |
| Google Analytics 4 | Traffic analytics | Free |
| Bing Webmaster Tools | Bing/Yahoo index monitoring | Free |
| Ahrefs or SEMrush | Keyword research, backlink monitoring | $99-199/mo |
| Canva | OG images, social media graphics | Free tier |
| Screaming Frog | Technical SEO audit | Free (500 URLs) |
| PageSpeed Insights | Core Web Vitals testing | Free |
| Schema Markup Validator | JSON-LD validation | Free |

---

*This pipeline is designed to be a living document. Update it monthly as you gather data from Google Search Console and adjust priorities based on what's working.*
