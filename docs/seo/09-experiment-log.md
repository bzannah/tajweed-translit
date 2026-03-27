# Experiment Log

## 2026-03-25

### Experiment 1

- Hypothesis: A descriptive homepage with strong query alignment will improve impressions and clicks for broad Quran transliteration queries.
- Affected pages: `/`
- Expected metric movement: Higher impressions, better CTR, more clicks into `/page/5`
- Validation window: 14 to 28 days after deployment
- Decision rule: Keep if impressions and clicks trend upward without a major drop in reading-start engagement.

### Experiment 2

- Hypothesis: Page-route breadcrumbs and HTML prev/next links will improve crawl discovery and strengthen page coverage.
- Affected pages: `/page/[number]`
- Expected metric movement: More indexed page URLs and deeper crawl coverage
- Validation window: 14 to 28 days after deployment
- Decision rule: Keep if Search Console indexed pages and long-tail impressions increase.

### Experiment 3

- Hypothesis: A generated sitemap covering all canonical URLs will reduce crawl ambiguity compared with the old two-URL sitemap.
- Affected pages: All canonical URLs
- Expected metric movement: Better sitemap coverage and fewer omitted important URLs
- Validation window: 7 to 21 days after sitemap submission
- Decision rule: Keep if Search Console recognises the full sitemap set and coverage issues do not spike.
