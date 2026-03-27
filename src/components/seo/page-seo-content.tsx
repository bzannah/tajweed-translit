import { getPageSeoData, getAbsoluteUrl, SITE_URL } from '@/lib/seo';

/** Props for the PageSeoContent component. */
export interface PageSeoContentProps {
  /** Page number (1-1275) */
  page: number;
}

/**
 * Renders visible, crawlable SEO content for a Quran page route.
 * This gives Google textual signals for each page image while
 * remaining unobtrusive to the reading experience.
 * Server component — no client-side JS.
 */
export function PageSeoContent({ page }: PageSeoContentProps) {
  const seo = getPageSeoData(page);

  return (
    <div className="sr-only" aria-hidden="false">
      <h1>{seo.heading}</h1>
      <p>{seo.intro}</p>
      <nav aria-label="Breadcrumb">
        <ol>
          <li>
            <a href={SITE_URL}>Home</a>
          </li>
          {seo.surahSlug && (
            <li>
              <a href={getAbsoluteUrl(`/surah/${seo.surahSlug}`)}>
                {seo.breadcrumbLabel}
              </a>
            </li>
          )}
          <li aria-current="page">Page {page}</li>
        </ol>
      </nav>
      {seo.previousPagePath && (
        <a rel="prev" href={getAbsoluteUrl(seo.previousPagePath)}>
          Previous page
        </a>
      )}
      {seo.nextPagePath && (
        <a rel="next" href={getAbsoluteUrl(seo.nextPagePath)}>
          Next page
        </a>
      )}
    </div>
  );
}
