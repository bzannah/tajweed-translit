import { useMemo } from 'react';
import { surahs } from '@/data/surahs';
import { juz } from '@/data/juz';
import { getSurahForPage, getJuzForPage } from '@/lib/page-utils';
import type { PageContext, PageContent } from '@/lib/types';

/**
 * Returns surah and juz context for a given page number.
 * Uses the surah and juz data to determine which surah the page belongs to
 * and which juz it falls within.
 *
 * @param page - Current page number (1-1275)
 * @returns PageContext with primary surah, juz number, and page
 */
export function usePageContext(page: number): PageContext {
  return useMemo(() => {
    const surah = getSurahForPage(page, surahs);
    const juzNumber = getJuzForPage(page, juz);

    const primarySurah: PageContent = {
      surah: surah.number,
      surah_name: surah.name_english,
      start_verse: 1, // Approximate — exact verse mapping requires page-surah-map.json
      end_verse: surah.total_verses,
    };

    return {
      primarySurah,
      juz: juzNumber,
      page,
    };
  }, [page]);
}
