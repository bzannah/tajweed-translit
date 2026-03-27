import type { MetadataRoute } from 'next';
import { introPages, isIntroPage } from '@/data/intro-pages';
import { surahs } from '@/data/surahs';
import { juz } from '@/data/juz';
import { DEFAULT_PAGE, TOTAL_PAGES } from './constants';
import { clampPage, getSurahForPage, getJuzForPage } from './page-utils';
import { getSurahSlug, getSurahEndPage } from './surah-utils';

export const SITE_NAME = 'Quran Tajweed Transliteration';
export const SITE_URL = 'https://www.tajweedtranslit.com';
export const SITE_DESCRIPTION =
  'Read the complete Quran in English transliteration with colour-coded Tajweed rules. Free online Quran reader with 1,275 pages, surah navigation, bookmarks, audio recitation, and mobile-friendly reading.';

/** Last deployment date — update on each deploy for sitemap lastmod. */
export const LAST_MODIFIED = '2026-03-27';

export interface PageSeoData {
  canonicalPath: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  breadcrumbLabel: string;
  previousPagePath: string | null;
  nextPagePath: string | null;
  surahSlug: string | null;
}

/** Returns an absolute URL for a site path. */
export function getAbsoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/** Returns the primary SEO copy for a Quran page route. */
export function getPageSeoData(page: number): PageSeoData {
  const pageNumber = clampPage(page);
  const canonicalPath = `/page/${pageNumber}`;
  const previousPagePath = pageNumber > 1 ? `/page/${pageNumber - 1}` : null;
  const nextPagePath =
    pageNumber < TOTAL_PAGES ? `/page/${pageNumber + 1}` : null;

  if (isIntroPage(pageNumber)) {
    return {
      canonicalPath,
      title: `Tajweed Colour Guide — Page ${pageNumber} | Free Quran Reader`,
      description:
        'Study the Tajweed colour guide and reading introduction before starting the Quran transliteration pages. Learn how colour coding helps correct recitation.',
      heading: `Tajweed Guide and Introduction — Page ${pageNumber}`,
      intro:
        'Use these opening guide pages to understand the colour-coded Tajweed system before you continue to the Quran transliteration reading pages.',
      breadcrumbLabel: 'Tajweed Guide',
      previousPagePath,
      nextPagePath,
      surahSlug: null,
    };
  }

  const surah = getSurahForPage(pageNumber, surahs);
  const juzNumber = getJuzForPage(pageNumber, juz);

  return {
    canonicalPath,
    title: `Surah ${surah.name_english} Transliteration with Tajweed — Page ${pageNumber} | Free Quran Reader`,
    description: `Read Surah ${surah.name_english} (${surah.name_arabic}) page ${pageNumber} in English transliteration with colour-coded Tajweed rules. ${surah.revelation_type === 'meccan' ? 'Meccan' : 'Medinan'} surah, ${surah.total_verses} verses. Juz ${juzNumber}. Free online.`,
    heading: `Surah ${surah.name_english} Transliteration — Page ${pageNumber}`,
    intro: `You are reading page ${pageNumber} of the Quran in English transliteration with Tajweed colour coding. This page contains Surah ${surah.name_english} (${surah.name_arabic}), meaning "${surah.name_meaning}". It is a ${surah.revelation_type === 'meccan' ? 'Meccan' : 'Medinan'} surah with ${surah.total_verses} verses, located in Juz ${juzNumber}.`,
    breadcrumbLabel: surah.name_english,
    previousPagePath,
    nextPagePath,
    surahSlug: getSurahSlug(surah),
  };
}

/** Returns JSON-LD for the homepage. */
export function getHomeStructuredData() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: 'en',
      potentialAction: {
        '@type': 'ReadAction',
        target: `${SITE_URL}/page/${DEFAULT_PAGE}`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      applicationCategory: 'EducationalApplication',
      applicationSubCategory: 'Religious Education',
      browserRequirements: 'Requires a modern web browser',
      inLanguage: 'en',
      isAccessibleForFree: true,
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList:
        'Tajweed colour coding, 1275 pages, 114 surahs, audio recitation, bookmarks, notes, offline support',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Book',
      name: 'The Holy Quran — Tajweed Transliteration Edition',
      alternateName: ['Al-Quran', 'القرآن الكريم'],
      inLanguage: ['ar', 'en'],
      numberOfPages: TOTAL_PAGES,
      genre: 'Religion',
      about: {
        '@type': 'Thing',
        name: 'Islam',
      },
      workExample: {
        '@type': 'Book',
        bookFormat: 'https://schema.org/EBook',
        readonlineUrl: `${SITE_URL}/page/${DEFAULT_PAGE}`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/og-image.png`,
      description:
        'Helping the global community recite the Quran with confidence and precision, bridging language barriers through expert transliteration that honors the rules of Tajweed.',
    },
  ];
}

/** Returns JSON-LD for a Quran page route. */
export function getPageStructuredData(page: number) {
  const pageNumber = clampPage(page);
  const seo = getPageSeoData(pageNumber);
  const url = getAbsoluteUrl(seo.canonicalPath);
  const breadcrumbHubPath = isIntroPage(pageNumber)
    ? `/page/${introPages.pages[0] ?? 1}`
    : `/page/${DEFAULT_PAGE}`;

  const surah = isIntroPage(pageNumber)
    ? null
    : getSurahForPage(pageNumber, surahs);

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: seo.heading,
      url,
      description: seo.description,
      inLanguage: 'en',
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
      },
      ...(surah
        ? {
            about: {
              '@type': 'Chapter',
              name: `Surah ${surah.name_english} (${surah.name_arabic})`,
              position: surah.number,
              isPartOf: {
                '@type': 'Book',
                name: 'The Holy Quran',
              },
            },
          }
        : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        ...(surah && seo.surahSlug
          ? [
              {
                '@type': 'ListItem' as const,
                position: 2,
                name: `Surah ${surah.name_english}`,
                item: getAbsoluteUrl(`/surah/${seo.surahSlug}`),
              },
            ]
          : [
              {
                '@type': 'ListItem' as const,
                position: 2,
                name: seo.breadcrumbLabel,
                item: getAbsoluteUrl(breadcrumbHubPath),
              },
            ]),
        {
          '@type': 'ListItem',
          position: 3,
          name: `Page ${pageNumber}`,
          item: url,
        },
      ],
    },
  ];

  return schemas;
}

/** Returns JSON-LD for a surah landing page. */
export function getSurahStructuredData(surahData: (typeof surahs)[number]) {
  const slug = getSurahSlug(surahData);
  const url = getAbsoluteUrl(`/surah/${slug}`);
  const endPage = getSurahEndPage(surahData);

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Chapter',
      name: `Surah ${surahData.name_english} (${surahData.name_arabic}) — ${surahData.name_meaning}`,
      position: surahData.number,
      pagination: `Pages ${surahData.starting_page}–${endPage}`,
      url,
      inLanguage: ['ar', 'en'],
      isPartOf: {
        '@type': 'Book',
        name: 'The Holy Quran — Tajweed Transliteration Edition',
        url: SITE_URL,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Surahs',
          item: getAbsoluteUrl('/surah/al-fatiha'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `Surah ${surahData.name_english}`,
          item: url,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `How many verses are in Surah ${surahData.name_english}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Surah ${surahData.name_english} (${surahData.name_arabic}) contains ${surahData.total_verses} verses (ayat).`,
          },
        },
        {
          '@type': 'Question',
          name: `Is Surah ${surahData.name_english} Meccan or Medinan?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Surah ${surahData.name_english} is a ${surahData.revelation_type === 'meccan' ? 'Meccan' : 'Medinan'} surah, meaning it was revealed in ${surahData.revelation_type === 'meccan' ? 'Mecca' : 'Medina'}.`,
          },
        },
        {
          '@type': 'Question',
          name: `What does ${surahData.name_english} mean?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `The name "${surahData.name_english}" (${surahData.name_arabic}) translates to "${surahData.name_meaning}" in English.`,
          },
        },
        {
          '@type': 'Question',
          name: `How to read Surah ${surahData.name_english} with Tajweed?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `You can read Surah ${surahData.name_english} with proper Tajweed using the colour-coded transliteration at tajweedtranslit.com. Each colour represents a different Tajweed rule, helping you pronounce every letter correctly.`,
          },
        },
      ],
    },
  ];
}

/** Returns JSON-LD for a juz landing page. */
export function getJuzStructuredData(juzData: (typeof juz)[number]) {
  const url = getAbsoluteUrl(`/juz/${juzData.number}`);
  const startSurah = surahs.find((s) => s.number === juzData.starting_surah);

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `Juz ${juzData.number} (${juzData.name_arabic}) — Quran Part ${juzData.number}`,
      url,
      description: `Read Juz ${juzData.number} (${juzData.name_arabic}) of the Quran in English transliteration with Tajweed colour coding. Starting from ${startSurah?.name_english ?? 'the Quran'}.`,
      inLanguage: 'en',
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Juz',
          item: getAbsoluteUrl('/juz/1'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `Juz ${juzData.number}`,
          item: url,
        },
      ],
    },
  ];
}

/** Returns the crawlable route set for sitemap generation. */
export function getSitemapEntries(): MetadataRoute.Sitemap {
  const lastModified = new Date(LAST_MODIFIED);

  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: getAbsoluteUrl('/donate'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Surah landing pages — high priority content hubs
  for (const surah of surahs) {
    entries.push({
      url: getAbsoluteUrl(`/surah/${getSurahSlug(surah)}`),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  }

  // Juz landing pages
  for (const j of juz) {
    entries.push({
      url: getAbsoluteUrl(`/juz/${j.number}`),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // Learn pages — cornerstone content
  for (const slug of ['tajweed-rules', 'tajweed-for-beginners', 'how-to-read-quran-in-english']) {
    entries.push({
      url: getAbsoluteUrl(`/learn/${slug}`),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  }

  // All 1275 Quran page routes
  for (let page = 1; page <= TOTAL_PAGES; page += 1) {
    entries.push({
      url: getAbsoluteUrl(`/page/${page}`),
      lastModified,
      changeFrequency: 'monthly',
      priority: page === DEFAULT_PAGE ? 0.9 : 0.7,
    });
  }

  return entries;
}
