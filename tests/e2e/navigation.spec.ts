import { test, expect } from '@playwright/test';

test.describe('Page Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/page/1');
  });

  test('should display page 1 on initial load', async ({ page }) => {
    await expect(page).toHaveURL(/\/page\/1/);
    const img = page.getByAltText(/page 1/i);
    await expect(img).toBeVisible();
  });

  test('should navigate to next page via button', async ({ page }) => {
    await page.getByRole('button', { name: /next/i }).click();
    await expect(page).toHaveURL(/\/page\/2/);
  });

  test('should navigate to previous page via button', async ({ page }) => {
    await page.goto('/page/5');
    await page.getByRole('button', { name: /previous/i }).click();
    await expect(page).toHaveURL(/\/page\/4/);
  });

  test('should disable previous button on page 1', async ({ page }) => {
    const prevBtn = page.getByRole('button', { name: /previous/i });
    await expect(prevBtn).toBeDisabled();
  });

  test('should navigate via keyboard arrow keys', async ({ page }) => {
    await page.keyboard.press('ArrowRight');
    await expect(page).toHaveURL(/\/page\/2/);
    await page.keyboard.press('ArrowLeft');
    await expect(page).toHaveURL(/\/page\/1/);
  });

  test('should navigate to a surah from sidebar', async ({ page }) => {
    // Open sidebar
    await page.getByRole('button', { name: /sidebar/i }).click();
    // Click Al-Imran (starts on page 103)
    await page.getByText('Al-Imran').click();
    await expect(page).toHaveURL(/\/page\/103/);
  });

  test('should handle direct URL navigation', async ({ page }) => {
    await page.goto('/page/100');
    await expect(page).toHaveURL(/\/page\/100/);
  });

  test('should redirect invalid page numbers to clamped value', async ({ page }) => {
    await page.goto('/page/9999');
    await expect(page).toHaveURL(/\/page\/1275/);
  });
});
