import { describe, expect, it } from 'vitest';
import {
  getPageSeoData,
  getPageStructuredData,
  getSitemapEntries,
  SITE_URL,
} from '@/lib/seo';

describe('getPageSeoData', () => {
  it('returns Tajweed guide copy for intro pages', () => {
    const seo = getPageSeoData(1);

    expect(seo.canonicalPath).toBe('/page/1');
    expect(seo.title).toContain('Tajweed Colour Guide');
    expect(seo.breadcrumbLabel).toBe('Tajweed Guide');
  });

  it('returns surah-specific copy for Quran reading pages', () => {
    const seo = getPageSeoData(5);

    expect(seo.canonicalPath).toBe('/page/5');
    expect(seo.title).toContain('Al-Fatiha');
    expect(seo.description).toContain('page 5');
    expect(seo.previousPagePath).toBe('/page/4');
    expect(seo.nextPagePath).toBe('/page/6');
  });
});

describe('getPageStructuredData', () => {
  it('builds WebPage and BreadcrumbList schema for reading pages', () => {
    const schema = getPageStructuredData(5);

    expect(schema).toHaveLength(2);
    expect(schema[0]).toMatchObject({
      '@type': 'WebPage',
      url: `${SITE_URL}/page/5`,
    });
    expect(schema[1]).toMatchObject({
      '@type': 'BreadcrumbList',
    });
  });
});

describe('getSitemapEntries', () => {
  it('includes the homepage, donate page, and Quran page URLs', () => {
    const sitemap = getSitemapEntries();

    expect(sitemap[0]?.url).toBe(SITE_URL);
    expect(sitemap.some((entry) => entry.url === `${SITE_URL}/donate`)).toBe(
      true
    );
    expect(sitemap.some((entry) => entry.url === `${SITE_URL}/page/1275`)).toBe(
      true
    );
  });
});
