import type { Metadata } from 'next';
import { TOTAL_PAGES } from '@/lib/constants';
import {
  getPageSeoData,
  getPageStructuredData,
  getAbsoluteUrl,
  SITE_URL,
} from '@/lib/seo';
import { parsePageParam } from '@/lib/page-utils';
import { PageSeoContent } from '@/components/seo/page-seo-content';
import { JsonLd } from '@/components/seo/json-ld';
import { PageRoute } from './page-route';

/**
 * Generates static params for all 1275 pages.
 * Required for Next.js static export with dynamic routes.
 */
export function generateStaticParams() {
  return Array.from({ length: TOTAL_PAGES }, (_, i) => ({
    number: String(i + 1),
  }));
}

/**
 * Generates dynamic metadata for each page route.
 * Includes enhanced SEO: unique titles, descriptions, OG images,
 * canonical URLs, and pagination links.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ number: string }>;
}): Promise<Metadata> {
  const { number } = await params;
  const pageNum = parsePageParam(number);
  const seo = getPageSeoData(pageNum);

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.canonicalPath,
    },
    openGraph: {
      type: 'article',
      url: getAbsoluteUrl(seo.canonicalPath),
      title: seo.title,
      description: seo.description,
      siteName: 'Quran Tajweed Transliteration',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: seo.heading,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/og-image.png'],
    },
    other: {
      ...(seo.previousPagePath
        ? { 'link-prev': `${SITE_URL}${seo.previousPagePath}` }
        : {}),
      ...(seo.nextPagePath
        ? { 'link-next': `${SITE_URL}${seo.nextPagePath}` }
        : {}),
    },
  };
}

/**
 * Dynamic page route that displays a specific Quran page.
 * Includes server-rendered SEO content and structured data.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const pageNum = parsePageParam(number);
  const structuredData = getPageStructuredData(pageNum);

  return (
    <>
      <JsonLd data={structuredData} />
      <PageSeoContent page={pageNum} />
      <PageRoute params={params} />
    </>
  );
}
