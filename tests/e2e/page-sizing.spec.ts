import { test, expect } from '@playwright/test';

/**
 * Viewport configurations to verify page images never overflow their containers.
 * Covers phones, tablets, laptops, and desktops in both orientations.
 */
const VIEWPORTS = [
  // Phones
  { name: 'iPhone SE', width: 360, height: 740 },
  { name: 'iPhone 14', width: 393, height: 852 },
  { name: 'Pixel 7', width: 412, height: 915 },
  { name: 'Galaxy S21', width: 360, height: 800 },
  // Tablets
  { name: 'iPad Mini portrait', width: 768, height: 1024 },
  { name: 'iPad Mini landscape', width: 1024, height: 768 },
  { name: 'iPad Air portrait', width: 820, height: 1180 },
  { name: 'iPad Air landscape', width: 1180, height: 820 },
  { name: 'Surface Pro portrait', width: 912, height: 1368 },
  { name: 'Surface Pro landscape', width: 1368, height: 912 },
  // Laptops / Desktops
  { name: 'Laptop 1024', width: 1024, height: 768 },
  { name: 'Laptop 1366', width: 1366, height: 768 },
  { name: 'Desktop 1440', width: 1440, height: 900 },
  { name: 'Desktop 1920', width: 1920, height: 1080 },
  { name: 'Ultrawide 2560', width: 2560, height: 1440 },
];

test.describe('Page Sizing — no overflow at any viewport', () => {
  for (const vp of VIEWPORTS) {
    test(`${vp.name} (${vp.width}x${vp.height}): page image fits within viewport`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      const page = await context.newPage();
      await page.goto('/page/3');

      // Wait for at least one page image to be present
      const img = page.locator('[data-testid^="page-image-"] img').first();
      await expect(img).toBeVisible({ timeout: 10_000 });

      // The image's right edge must not exceed the viewport width
      const imgBox = await img.boundingBox();
      expect(imgBox).not.toBeNull();
      if (imgBox) {
        expect(imgBox.x).toBeGreaterThanOrEqual(0);
        expect(imgBox.x + imgBox.width).toBeLessThanOrEqual(vp.width + 1); // 1px tolerance
        expect(imgBox.y).toBeGreaterThanOrEqual(0);
        expect(imgBox.y + imgBox.height).toBeLessThanOrEqual(vp.height + 1);
      }

      // The page viewer itself must not produce a horizontal scrollbar
      const hasHScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(hasHScroll).toBe(false);

      await context.close();
    });
  }
});
