import { describe, it, expect } from 'vitest';
import {
  clampPage,
  isValidPage,
  getDualPages,
  getNextPage,
  getPreviousPage,
  getSurahForPage,
  getJuzForPage,
  parsePageParam,
  getPageImagePath,
} from '@/lib/page-utils';
import type { Surah } from '@/lib/types';

// ─── clampPage ──────────────────────────────────────────────

describe('clampPage', () => {
  it('should return 1 for page numbers below 1', () => {
    expect(clampPage(0)).toBe(1);
    expect(clampPage(-1)).toBe(1);
    expect(clampPage(-999)).toBe(1);
  });

  it('should return 1275 for page numbers above 1275', () => {
    expect(clampPage(1276)).toBe(1275);
    expect(clampPage(9999)).toBe(1275);
  });

  it('should return the page number when within valid range', () => {
    expect(clampPage(1)).toBe(1);
    expect(clampPage(500)).toBe(500);
    expect(clampPage(1275)).toBe(1275);
  });

  it('should floor decimal page numbers', () => {
    expect(clampPage(42.7)).toBe(42);
    expect(clampPage(1.1)).toBe(1);
  });

  it('should return 1 for NaN and Infinity', () => {
    expect(clampPage(NaN)).toBe(1);
    expect(clampPage(Infinity)).toBe(1);
    expect(clampPage(-Infinity)).toBe(1);
  });
});

// ─── isValidPage ────────────────────────────────────────────

describe('isValidPage', () => {
  it('should return true for valid page numbers', () => {
    expect(isValidPage(1)).toBe(true);
    expect(isValidPage(500)).toBe(true);
    expect(isValidPage(1275)).toBe(true);
  });

  it('should return false for out-of-range numbers', () => {
    expect(isValidPage(0)).toBe(false);
    expect(isValidPage(-1)).toBe(false);
    expect(isValidPage(1276)).toBe(false);
  });

  it('should return false for non-integers', () => {
    expect(isValidPage(1.5)).toBe(false);
    expect(isValidPage(NaN)).toBe(false);
  });
});

// ─── getDualPages ───────────────────────────────────────────

describe('getDualPages', () => {
  it('should return [1, 2] for page 1', () => {
    expect(getDualPages(1)).toEqual([1, 2]);
  });

  it('should return [1, 2] for page 2', () => {
    expect(getDualPages(2)).toEqual([1, 2]);
  });

  it('should return odd page first (right side of spread)', () => {
    expect(getDualPages(5)).toEqual([5, 6]);
    expect(getDualPages(6)).toEqual([5, 6]);
    expect(getDualPages(99)).toEqual([99, 100]);
    expect(getDualPages(100)).toEqual([99, 100]);
  });

  it('should handle last page (1275 is odd, no partner)', () => {
    expect(getDualPages(1275)).toEqual([1275, null]);
  });

  it('should handle page 1274 (even, pairs with 1273)', () => {
    expect(getDualPages(1274)).toEqual([1273, 1274]);
  });
});

// ─── getNextPage ────────────────────────────────────────────

describe('getNextPage', () => {
  it('should advance by 1 in single mode', () => {
    expect(getNextPage(1, false)).toBe(2);
    expect(getNextPage(100, false)).toBe(101);
  });

  it('should advance by 2 in dual mode', () => {
    expect(getNextPage(1, true)).toBe(3);
    expect(getNextPage(100, true)).toBe(102);
  });

  it('should return null when at the last page', () => {
    expect(getNextPage(1275, false)).toBeNull();
    expect(getNextPage(1275, true)).toBeNull();
  });

  it('should return null when next would exceed total', () => {
    expect(getNextPage(1274, true)).toBeNull();
  });
});

// ─── getPreviousPage ────────────────────────────────────────

describe('getPreviousPage', () => {
  it('should go back by 1 in single mode', () => {
    expect(getPreviousPage(2, false)).toBe(1);
    expect(getPreviousPage(100, false)).toBe(99);
  });

  it('should go back by 2 in dual mode', () => {
    expect(getPreviousPage(3, true)).toBe(1);
    expect(getPreviousPage(100, true)).toBe(98);
  });

  it('should return null when at the first page', () => {
    expect(getPreviousPage(1, false)).toBeNull();
    expect(getPreviousPage(1, true)).toBeNull();
  });
});

// ─── getSurahForPage ────────────────────────────────────────

describe('getSurahForPage', () => {
  const mockSurahs: Surah[] = [
    { number: 1, name_english: 'Al-Fatiha', name_arabic: '', name_meaning: '', revelation_type: 'meccan', starting_page: 1, total_verses: 7 },
    { number: 2, name_english: 'Al-Baqara', name_arabic: '', name_meaning: '', revelation_type: 'medinan', starting_page: 2, total_verses: 286 },
    { number: 3, name_english: 'Al-Imran', name_arabic: '', name_meaning: '', revelation_type: 'medinan', starting_page: 50, total_verses: 200 },
  ];

  it('should return the correct surah for a page', () => {
    expect(getSurahForPage(1, mockSurahs).name_english).toBe('Al-Fatiha');
    expect(getSurahForPage(2, mockSurahs).name_english).toBe('Al-Baqara');
    expect(getSurahForPage(30, mockSurahs).name_english).toBe('Al-Baqara');
    expect(getSurahForPage(50, mockSurahs).name_english).toBe('Al-Imran');
    expect(getSurahForPage(999, mockSurahs).name_english).toBe('Al-Imran');
  });
});

// ─── getJuzForPage ──────────────────────────────────────────

describe('getJuzForPage', () => {
  const mockJuz = [
    { number: 1, starting_page: 1 },
    { number: 2, starting_page: 22 },
    { number: 3, starting_page: 42 },
  ];

  it('should return the correct juz for a page', () => {
    expect(getJuzForPage(1, mockJuz)).toBe(1);
    expect(getJuzForPage(21, mockJuz)).toBe(1);
    expect(getJuzForPage(22, mockJuz)).toBe(2);
    expect(getJuzForPage(41, mockJuz)).toBe(2);
    expect(getJuzForPage(42, mockJuz)).toBe(3);
    expect(getJuzForPage(999, mockJuz)).toBe(3);
  });
});

// ─── parsePageParam ─────────────────────────────────────────

describe('parsePageParam', () => {
  it('should parse valid number strings', () => {
    expect(parsePageParam('42')).toBe(42);
    expect(parsePageParam('1')).toBe(1);
    expect(parsePageParam('1275')).toBe(1275);
  });

  it('should redirect sub-1 values to default page (Al-Fatiha)', () => {
    expect(parsePageParam('0')).toBe(5);
    expect(parsePageParam('-1')).toBe(5);
    expect(parsePageParam('-100')).toBe(5);
  });

  it('should clamp over-range values to last page', () => {
    expect(parsePageParam('9999')).toBe(1275);
  });

  it('should return default page for invalid inputs', () => {
    expect(parsePageParam('abc')).toBe(5);
    expect(parsePageParam(undefined)).toBe(5);
    expect(parsePageParam('')).toBe(5);
  });

  it('should floor float strings to integer', () => {
    expect(parsePageParam('3.7')).toBe(3);
    expect(parsePageParam('100.9')).toBe(100);
  });
});

// ─── getPageImagePath ───────────────────────────────────────

describe('getPageImagePath', () => {
  it('should return correct path for valid pages', () => {
    expect(getPageImagePath(1)).toBe('/pages/1.webp');
    expect(getPageImagePath(42)).toBe('/pages/42.webp');
    expect(getPageImagePath(1275)).toBe('/pages/1275.webp');
  });

  it('should clamp invalid page numbers', () => {
    expect(getPageImagePath(0)).toBe('/pages/1.webp');
    expect(getPageImagePath(9999)).toBe('/pages/1275.webp');
  });
});
