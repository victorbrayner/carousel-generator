import { expect, test } from '@playwright/test';

test('opens the four-slide carousel without page errors', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));

  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveTitle('Carrossel — Carreira em T.I.');
  await expect(page.locator('.slide')).toHaveCount(4);
  await expect(page.locator('.slide').first()).toHaveCSS('width', '1080px');
  await expect(page.locator('#downloadAllBtn')).toBeEnabled();
  expect(pageErrors).toEqual([]);
});
