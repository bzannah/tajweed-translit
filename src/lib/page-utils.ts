import { TOTAL_PAGES } from './constants';
import type { Surah } from './types';

/**
 * Clamps a page number to the valid range [1, TOTAL_PAGES].
 * @param page - The page number to clamp
 * @returns A valid page number between 1 and 1275
 */
export function clampPage(page: number): number {
  if (!Number.isFinite(page) || Number.isNaN(page)) return 1;
  return Math.max(1, Math.min(Math.floor(page), TOTAL_PAGES));
}

/**
 * Checks whether a page number is within the valid range.
 * @param page - The page number to validate
 * @returns True if the page is between 1 and 1275 inclusive
 */
export function isValidPage(page: number): boolean {
  return Number.isInteger(page) && page >= 1 && page <= TOTAL_PAGES;
}

/**
 * Returns the two page numbers for a dual-page spread.
 * In Mushaf convention, the right page (odd) is displayed first.
 * @param page - Any page number in the spread
 * @returns Tuple of [rightPage, leftPage] or [rightPage, null] if last page is odd
 */
export function getDualPages(page: number): [number, number | null] {
  const clamped = clampPage(page);
  // Odd pages go on the right, even on the left
  const oddPage = clamped % 2 === 1 ? clamped : clamped - 1;
  const evenPage = oddPage + 1;

  if (evenPage > TOTAL_PAGES) {
    return [oddPage, null];
  }
  return [oddPage, evenPage];
}

/**
 * Calculates the next page number based on display mode.
 * @param currentPage - The current page number
 * @param isDualMode - Whether dual-page mode is active
 * @returns The next page number, or null if at the end
 */
export function getNextPage(
  currentPage: number,
  isDualMode: boolean
): number | null {
  const step = isDualMode ? 2 : 1;
  const next = currentPage + step;
  if (next > TOTAL_PAGES) return null;
  return clampPage(next);
}

/**
 * Calculates the previous page number based on display mode.
 * @param currentPage - The current page number
 * @param isDualMode - Whether dual-page mode is active
 * @returns The previous page number, or null if at the beginning
 */
export function getPreviousPage(
  currentPage: number,
  isDualMode: boolean
): number | null {
  const step = isDualMode ? 2 : 1;
  const prev = currentPage - step;
  if (prev < 1) return null;
  return clampPage(prev);
}

/**
 * Finds the surah that a given page belongs to.
 * Returns the last surah whose starting_page is <= the given page.
 * @param page - The page number to look up
 * @param surahs - Array of all surahs sorted by number
 * @returns The surah containing this page
 */
export function getSurahForPage(page: number, surahs: Surah[]): Surah {
  const clamped = clampPage(page);
  let result = surahs[0]!;
  for (const surah of surahs) {
    if (surah.starting_page <= clamped) {
      result = surah;
    } else {
      break;
    }
  }
  return result;
}

/**
 * Finds the juz number that a given page belongs to.
 * @param page - The page number to look up
 * @param juzData - Array of all juz entries sorted by number
 * @returns The juz number (1-30)
 */
export function getJuzForPage(
  page: number,
  juzData: { number: number; starting_page: number }[]
): number {
  const clamped = clampPage(page);
  let result = 1;
  for (const juz of juzData) {
    if (juz.starting_page <= clamped) {
      result = juz.number;
    } else {
      break;
    }
  }
  return result;
}

/**
 * Parses a page number from a URL parameter string.
 * Returns 1 if the parameter is invalid.
 * @param param - The URL parameter string
 * @returns A valid page number
 */
export function parsePageParam(param: string | undefined): number {
  if (!param) return 1;
  const parsed = parseInt(param, 10);
  if (Number.isNaN(parsed)) return 1;
  return clampPage(parsed);
}

/**
 * Returns the path to a page image file.
 * @param page - The page number
 * @returns Path string like "/pages/42.webp"
 */
export function getPageImagePath(page: number): string {
  return `/pages/${clampPage(page)}.webp`;
}
