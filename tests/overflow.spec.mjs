import { expect, test } from '@playwright/test';

test('blocks export when editable text overflows the slide', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  const longText = 'A'.repeat(500);
  const subtitle = page.locator('#slide1 .sub-mono');
  await subtitle.fill(longText);
  await page.waitForTimeout(300);

  await page.locator('[data-target="slide1"]').click();
  await expect(page.locator('#exportStatus')).toContainText('Texto ultrapassa o layout');
  await expect(page.locator('#exportStatus')).toContainText('Subtítulo da capa');
  await expect(page.locator('#exportStatus')).toHaveAttribute('data-state', 'error');
  await expect(page.locator('[data-target="slide1"]')).toBeEnabled();
});

test('blocks batch export and reports overflowing fields', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  const longText = 'A'.repeat(500);
  await page.locator('#slide2 .section-heading').fill(longText);
  await page.waitForTimeout(300);

  await page.locator('#downloadAllBtn').click();
  await expect(page.locator('#exportStatus')).toContainText('Texto ultrapassa o layout');
  await expect(page.locator('#exportStatus')).toContainText('Título da mentoria');
  await expect(page.locator('#exportStatus')).toHaveAttribute('data-state', 'error');
  await expect(page.locator('#downloadAllBtn')).toBeEnabled();
});
