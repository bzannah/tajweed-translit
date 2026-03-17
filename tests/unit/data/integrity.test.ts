import { describe, it, expect } from 'vitest';
import { surahs } from '@/data/surahs';
import { juz } from '@/data/juz';
import { tajweedRules } from '@/data/tajweed-rules';

describe('surahs.json data integrity', () => {
  it('should have exactly 114 surahs', () => {
    expect(surahs).toHaveLength(114);
  });

  it('should have sequential surah numbers 1-114', () => {
    surahs.forEach((s, i) => {
      expect(s.number).toBe(i + 1);
    });
  });

  it('should have ascending starting pages', () => {
    for (let i = 1; i < surahs.length; i++) {
      expect(surahs[i].starting_page).toBeGreaterThanOrEqual(
        surahs[i - 1].starting_page
      );
    }
  });

  it('should have valid revelation types', () => {
    surahs.forEach((s) => {
      expect(['meccan', 'medinan']).toContain(s.revelation_type);
    });
  });

  it('should have valid page ranges', () => {
    surahs.forEach((s) => {
      expect(s.starting_page).toBeGreaterThanOrEqual(1);
      expect(s.starting_page).toBeLessThanOrEqual(1275);
    });
  });

  it('should have positive verse counts', () => {
    surahs.forEach((s) => {
      expect(s.total_verses).toBeGreaterThan(0);
    });
  });

  it('should have required string fields', () => {
    surahs.forEach((s) => {
      expect(s.name_english).toBeTruthy();
      expect(s.name_arabic).toBeTruthy();
      expect(s.name_meaning).toBeTruthy();
    });
  });

  it('should start with Al-Fatiha on page 1', () => {
    expect(surahs[0].name_english).toBe('Al-Fatiha');
    expect(surahs[0].starting_page).toBe(1);
  });

  it('should end with An-Nas', () => {
    expect(surahs[113].name_english).toBe('An-Nas');
  });
});

describe('juz.json data integrity', () => {
  it('should have exactly 30 juz', () => {
    expect(juz).toHaveLength(30);
  });

  it('should have sequential juz numbers 1-30', () => {
    juz.forEach((j, i) => {
      expect(j.number).toBe(i + 1);
    });
  });

  it('should have ascending starting pages', () => {
    for (let i = 1; i < juz.length; i++) {
      expect(juz[i].starting_page).toBeGreaterThan(
        juz[i - 1].starting_page
      );
    }
  });

  it('should have valid surah references', () => {
    const surahNumbers = new Set(surahs.map((s) => s.number));
    juz.forEach((j) => {
      expect(surahNumbers.has(j.starting_surah)).toBe(true);
    });
  });

  it('should start Juz 1 on page 1', () => {
    expect(juz[0].starting_page).toBe(1);
    expect(juz[0].starting_surah).toBe(1);
  });
});

describe('tajweed-rules.json data integrity', () => {
  it('should have at least 5 rules', () => {
    expect(tajweedRules.length).toBeGreaterThanOrEqual(5);
  });

  it('should have unique IDs', () => {
    const ids = tajweedRules.map((r) => r.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have all required fields', () => {
    tajweedRules.forEach((rule) => {
      expect(rule.id).toBeTruthy();
      expect(rule.name).toBeTruthy();
      expect(rule.colour).toBeTruthy();
      expect(rule.description).toBeTruthy();
      expect(rule.explanation).toBeTruthy();
    });
  });

  it('should have valid hex colour values', () => {
    tajweedRules.forEach((rule) => {
      expect(rule.colour).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });
});
