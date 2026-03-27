# Measurement Dashboard Spec

## Goal

Track whether SEO changes increase qualified organic traffic and reading starts without relying on guesswork.

## Primary Metrics

- Google Search Console impressions
- Google Search Console clicks
- Google Search Console CTR
- Google Search Console average position
- Landing pages from organic search
- Reading starts from `/` to `/page/5`
- Visits to `/donate` from organic search
- Core Web Vitals from Vercel Speed Insights
- Indexed URL count versus sitemap URL count

## Dimensions

- Query cluster
- Landing page
- Device type
- Country
- Brand versus non-brand queries
- Template type: homepage, donate, Quran page, future guide hubs

## Setup Steps

1. Verify `https://tajweedtranslit.com` in Google Search Console.
2. Submit `/sitemap.xml` after the new deployment is live.
3. Connect Vercel Analytics and Speed Insights dashboards to deployment annotations.
4. Create a weekly snapshot sheet with impressions, clicks, CTR, average position, and top landing pages.
5. Tag each deploy that changes titles, links, schema, or landing-page copy.

## Interim Measurements Before Full Tooling

- Count sitemap URLs from the generated metadata route.
- Review route coverage in the built output.
- Use Vercel Analytics page views for `/`, `/page/5`, and `/donate` as a temporary behavioural baseline.
