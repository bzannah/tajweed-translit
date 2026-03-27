# Schema Plan

## Implemented

- Homepage: `WebSite` and `WebApplication`
- Quran page template: `WebPage` and `BreadcrumbList`

## Why These Types

- `WebSite` describes the site-level entity truthfully.
- `WebApplication` reflects the product as a free browser-based reading tool.
- `WebPage` describes each reading page without inventing editorial claims.
- `BreadcrumbList` matches visible breadcrumb navigation and helps search engines understand hierarchy.

## Deferred On Purpose

- No `FAQPage` because the homepage does not yet contain visible FAQ content.
- No `Article` because the main templates are not article pages.
- No `Review`, `AggregateRating`, or testimonial markup because there is no first-party evidence in the repo.
- No `Organization` or `Person` trust markup beyond what is already evidenced on the site.

## Validation Plan

- Validate generated schema on representative pages using Google's Rich Results Test and Schema Markup Validator after deployment.
- Re-check whenever visible breadcrumb labels or core route structure changes.
