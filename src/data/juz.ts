import type { Juz } from '@/lib/types';
import juzData from '../../content/data/juz.json';

/** All 30 juz with typed data, sorted by juz number. */
export const juz: Juz[] = juzData as Juz[];

/**
 * Finds a juz by its number.
 * @param number - Juz number (1-30)
 * @returns The matching juz, or undefined if not found
 */
export function getJuzByNumber(number: number): Juz | undefined {
  return juz.find((j) => j.number === number);
}
