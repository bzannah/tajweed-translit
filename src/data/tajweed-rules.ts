import type { TajweedRule } from '@/lib/types';
import rulesData from '../../content/data/tajweed-rules.json';

/** All Tajweed colour-coding rules. */
export const tajweedRules: TajweedRule[] = rulesData as TajweedRule[];

/**
 * Finds a Tajweed rule by its ID.
 * @param id - Rule identifier (e.g., "madd-necessary")
 * @returns The matching rule, or undefined if not found
 */
export function getTajweedRuleById(id: string): TajweedRule | undefined {
  return tajweedRules.find((r) => r.id === id);
}
