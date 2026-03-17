import { test, expect } from '@playwright/test';

test.describe('Bookmarks', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to start fresh
    await page.goto('/page/1');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should bookmark the current page', async ({ page }) => {
    await page.goto('/page/42');
    const bookmarkBtn = page.getByRole('button', { name: /bookmark/i });
    await bookmarkBtn.click();

    // Open sidebar and check bookmarks tab
    await page.getByRole('button', { name: /menu/i }).click();
    await page.getByRole('tab', { name: /bookmarks/i }).click();

    await expect(page.getByText(/page 42/i)).toBeVisible();
  });

  test('should navigate to a bookmarked page', async ({ page }) => {
    // Bookmark page 42
    await page.goto('/page/42');
    await page.getByRole('button', { name: /bookmark/i }).click();

    // Go to a different page
    await page.goto('/page/1');

    // Navigate via bookmark
    await page.getByRole('button', { name: /menu/i }).click();
    await page.getByRole('tab', { name: /bookmarks/i }).click();
    await page.getByText(/page 42/i).click();

    await expect(page).toHaveURL(/\/page\/42/);
  });

  test('should remove a bookmark', async ({ page }) => {
    // Bookmark page 42
    await page.goto('/page/42');
    await page.getByRole('button', { name: /bookmark/i }).click();

    // Unbookmark by clicking again
    await page.getByRole('button', { name: /bookmark/i }).click();

    // Check bookmarks tab is empty
    await page.getByRole('button', { name: /menu/i }).click();
    await page.getByRole('tab', { name: /bookmarks/i }).click();

    await expect(page.getByText(/no bookmarks/i)).toBeVisible();
  });
});
