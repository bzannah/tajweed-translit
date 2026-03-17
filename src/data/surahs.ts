import type { Surah } from '@/lib/types';
import surahData from '../../content/data/surahs.json';

/** All 114 surahs with typed data, sorted by surah number. */
export const surahs: Surah[] = surahData as Surah[];

/**
 * Finds a surah by its number.
 * @param number - Surah number (1-114)
 * @returns The matching surah, or undefined if not found
 */
export function getSurahByNumber(number: number): Surah | undefined {
  return surahs.find((s) => s.number === number);
}

/**
 * Finds a surah by its English name (case-insensitive).
 * @param name - English surah name (e.g., "Al-Fatiha")
 * @returns The matching surah, or undefined if not found
 */
export function getSurahByName(name: string): Surah | undefined {
  const lower = name.toLowerCase();
  return surahs.find((s) => s.name_english.toLowerCase() === lower);
}
