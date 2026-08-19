import { expect, test } from '@playwright/test';

test('syncMonth slugifies the month input and applies it to every .tab-month', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  const tabMonths = page.locator('.tab-month');
  await expect(tabMonths).toHaveCount(4);

  await page.fill('#monthInput', 'Agosto');
  await page.evaluate(() => window.__carouselExport.syncMonth());
  await expect(tabMonths.first()).toHaveText('agosto');
  await expect(tabMonths.nth(3)).toHaveText('agosto');

  await page.fill('#monthInput', 'Mês Com Acentos');
  await page.evaluate(() => window.__carouselExport.syncMonth());
  await expect(tabMonths.first()).toHaveText('mes-com-acentos');

  await page.fill('#monthInput', '  multi   espacos  ');
  await page.evaluate(() => window.__carouselExport.syncMonth());
  await expect(tabMonths.first()).toHaveText('multi-espacos');

  await page.fill('#monthInput', '');
  await page.evaluate(() => window.__carouselExport.syncMonth());
  await expect(tabMonths.first()).toHaveText('mes');
});

test('typing in the month input triggers syncMonth via the input listener', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  await page.locator('#monthInput').fill('Setembro');
  await expect(page.locator('.tab-month').first()).toHaveText('setembro');
});
