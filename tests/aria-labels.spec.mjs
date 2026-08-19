import { expect, test } from '@playwright/test';

test('download all button exposes an accessible name via aria-label', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  const accessibleName = await page.evaluate(() => {
    const btn = document.getElementById('downloadAllBtn');
    return btn ? btn.getAttribute('aria-label') : null;
  });

  expect(accessibleName, '#downloadAllBtn must have aria-label').toBeTruthy();
  expect(accessibleName.length).toBeGreaterThan(0);
});
