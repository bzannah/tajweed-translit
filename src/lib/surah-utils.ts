import type { Surah } from './types';
import { surahs } from '@/data/surahs';

/**
 * Converts a surah's English name to a URL-safe slug.
 * E.g., "Al-Fatiha" → "al-fatiha", "Al-Ma'ida" → "al-maida"
 * @param name - The English surah name
 * @returns A kebab-case slug suitable for URLs
 */
export function surahToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[''`]/g, '') // Remove apostrophes and backticks
    .replace(/[^a-z0-9-]/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/-+/g, '-') // Collapse consecutive hyphens
    .replace(/^-|-$/g, ''); // Trim leading/trailing hyphens
}

/**
 * Returns the slug for a given surah.
 * @param surah - The surah object
 * @returns URL-safe slug derived from the English name
 */
export function getSurahSlug(surah: Surah): string {
  return surahToSlug(surah.name_english);
}

/**
 * Finds a surah by its URL slug.
 * @param slug - The URL slug to look up
 * @returns The matching surah, or undefined if not found
 */
export function getSurahBySlug(slug: string): Surah | undefined {
  return surahs.find((s) => getSurahSlug(s) === slug);
}

/**
 * Returns all surah slugs for static generation.
 * @returns Array of objects with a slug property for each of the 114 surahs
 */
export function getAllSurahSlugs(): Array<{ slug: string }> {
  return surahs.map((s) => ({ slug: getSurahSlug(s) }));
}

/**
 * Returns the ending page for a given surah.
 * The ending page is one less than the next surah's starting page,
 * or TOTAL_PAGES for the last surah.
 * @param surah - The surah to find the ending page for
 * @returns The last page number belonging to this surah
 */
export function getSurahEndPage(surah: Surah): number {
  const nextSurah = surahs.find((s) => s.number === surah.number + 1);
  if (!nextSurah) return 1275; // Last surah goes to the end
  return nextSurah.starting_page - 1;
}

/**
 * Returns how many pages a surah spans.
 * @param surah - The surah to count pages for
 * @returns Number of pages
 */
export function getSurahPageCount(surah: Surah): number {
  return getSurahEndPage(surah) - surah.starting_page + 1;
}
