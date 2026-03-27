# Internal Link Plan

## Implemented Now

- Homepage links directly to `/page/5`, `/page/1`, and `/donate`.
- Homepage includes a local-progress resume link for returning users.
- Every `/page/[number]` route now exposes crawlable HTML links to the previous page, next page, `/page/5`, and `/donate`.
- Page routes now include visible breadcrumb navigation: `Home > Quran Pages/Tajweed Guide > Page N`.

## Next Internal Link Layer

- Add a dedicated Tajweed guide hub and link to it from the homepage, intro pages, and donate page.
- Add surah hub pages and link to them from the page template when a page belongs to a surah.
- Add “related next step” blocks on homepage and donate page to route users into reading, learning Tajweed, and supporting the project.

## Anchor Text Rules

- Prefer descriptive anchors such as `Start reading at Al-Fatiha`, `Open the Tajweed guide`, and `Support this free Quran reader`.
- Avoid vague anchors like `click here`.
- Keep one dominant destination per query cluster to avoid cannibalisation, which means two pages on the same site competing for the same search intent.
