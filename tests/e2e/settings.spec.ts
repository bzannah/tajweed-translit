import { test, expect } from '@playwright/test';

test.describe('Settings Persistence', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/page/1');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should persist theme preference across reloads', async ({ page }) => {
    // Open settings
    await page.getByRole('button', { name: /settings/i }).click();

    // Switch to light theme
    await page.getByRole('button', { name: /light/i }).click();

    // Close settings
    await page.keyboard.press('Escape');

    // Verify light theme is applied
    const html = page.locator('html');
    await expect(html).toHaveClass(/light/);

    // Reload and verify persistence
    await page.reload();
    await expect(html).toHaveClass(/light/);
  });

  test('should persist last read page across sessions', async ({ page }) => {
    // Navigate to page 100
    await page.goto('/page/100');

    // Reload and expect redirect to last read page
    await page.goto('/');
    await expect(page).toHaveURL(/\/page\/100/);
  });
});
