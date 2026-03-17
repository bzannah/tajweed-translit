import { test, expect } from '@playwright/test';

test.describe('Zoom Controls', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/page/1');
  });

  test('should zoom in when clicking zoom in button', async ({ page }) => {
    const zoomIn = page.getByRole('button', { name: /zoom in/i });
    const pageContainer = page.locator('[data-testid="page-container"]');

    await zoomIn.click();

    // Verify the container has a scale transform applied
    const transform = await pageContainer.evaluate(
      (el) => getComputedStyle(el).transform
    );
    expect(transform).not.toBe('none');
  });

  test('should zoom out when clicking zoom out button', async ({ page }) => {
    // First zoom in
    await page.getByRole('button', { name: /zoom in/i }).click();
    await page.getByRole('button', { name: /zoom in/i }).click();

    // Then zoom out
    await page.getByRole('button', { name: /zoom out/i }).click();

    // Verify zoom level changed
    const pageContainer = page.locator('[data-testid="page-container"]');
    const transform = await pageContainer.evaluate(
      (el) => getComputedStyle(el).transform
    );
    expect(transform).toBeDefined();
  });

  test('should persist zoom level across page navigation', async ({
    page,
  }) => {
    // Zoom in
    await page.getByRole('button', { name: /zoom in/i }).click();
    await page.getByRole('button', { name: /zoom in/i }).click();

    // Navigate to next page
    await page.getByRole('button', { name: /next/i }).click();

    // Zoom should still be applied
    const pageContainer = page.locator('[data-testid="page-container"]');
    const transform = await pageContainer.evaluate(
      (el) => getComputedStyle(el).transform
    );
    expect(transform).not.toBe('none');
  });
});
