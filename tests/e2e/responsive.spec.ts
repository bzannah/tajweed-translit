import { test, expect } from '@playwright/test';

test.describe('Responsive Layout', () => {
  test('should show single page on mobile (390px)', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto('/page/3');

    // Sidebar should NOT be visible by default on mobile
    const sidebar = page.locator('[data-testid="sidebar"]');
    await expect(sidebar).not.toBeVisible();

    // Should show single page, not dual spread
    const dualSpread = page.locator('[data-testid="dual-spread"]');
    await expect(dualSpread).not.toBeVisible();

    // Single page image should be visible
    const pageImage = page.getByAltText(/page 3/i);
    await expect(pageImage).toBeVisible();

    await context.close();
  });

  test('should show dual page spread on desktop (1440px)', async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();
    await page.goto('/page/3');

    // Dual spread should be visible on desktop
    const dualSpread = page.locator('[data-testid="dual-spread"]');
    await expect(dualSpread).toBeVisible();

    await context.close();
  });

  test('should toggle sidebar on mobile via hamburger menu', async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto('/page/1');

    // Sidebar should be hidden
    const sidebar = page.locator('[data-testid="sidebar"]');
    await expect(sidebar).not.toBeVisible();

    // Open via hamburger
    await page.getByRole('button', { name: /menu/i }).click();
    await expect(sidebar).toBeVisible();

    // Close via X button
    await page.getByRole('button', { name: /close/i }).click();
    await expect(sidebar).not.toBeVisible();

    await context.close();
  });

  test('should show persistent sidebar on desktop', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();
    await page.goto('/page/1');

    // Open sidebar
    await page.getByRole('button', { name: /menu/i }).click();
    const sidebar = page.locator('[data-testid="sidebar"]');
    await expect(sidebar).toBeVisible();

    // Should remain visible (no overlay, persistent)
    await expect(sidebar).toBeVisible();

    await context.close();
  });
});
