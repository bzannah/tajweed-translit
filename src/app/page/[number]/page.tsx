import type { Metadata } from 'next';
import { TOTAL_PAGES } from '@/lib/constants';
import { getSurahForPage } from '@/lib/page-utils';
import { surahs } from '@/data/surahs';
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
 * Pages 1-4 are the Tajweed guide; all others show surah name + page number.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ number: string }>;
}): Promise<Metadata> {
  const { number } = await params;
  const pageNum = parseInt(number, 10);
  const surah = getSurahForPage(pageNum, surahs);

  const isIntro = pageNum <= 4;
  const title = isIntro
    ? 'Tajweed Guide'
    : `${surah.name_english} — Page ${pageNum}`;
  const description = isIntro
    ? 'Introduction to Tajweed colour coding rules for Quran recitation.'
    : `Read ${surah.name_english} (${surah.name_arabic}) in English transliteration with Tajweed colour coding. Page ${pageNum}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/page/${pageNum}`,
    },
  };
}

/**
 * Dynamic page route that displays a specific Quran page.
 */
export default function Page({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  return <PageRoute params={params} />;
}
