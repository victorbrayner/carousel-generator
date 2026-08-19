import { expect, test } from '@playwright/test';

test('disables exports and shows an error when html2canvas fails to load', async ({ page }) => {
  await page.route('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js', route => route.fulfill({ status: 404, body: '' }));

  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  await expect(page.locator('#downloadAllBtn')).toBeDisabled();
  await expect(page.locator('#downloadAllBtn')).toHaveText('Exportação indisponível');
  await expect(page.locator('.dl-btn').first()).toBeDisabled();
  await expect(page.locator('#exportStatus')).toContainText('Não foi possível carregar as bibliotecas de exportação');
  await expect(page.locator('#exportStatus')).toHaveAttribute('data-state', 'error');
});

test('disables exports and shows an error when JSZip fails to load', async ({ page }) => {
  await page.route('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js', route => route.fulfill({ status: 404, body: '' }));

  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  await expect(page.locator('#downloadAllBtn')).toBeDisabled();
  await expect(page.locator('#downloadAllBtn')).toHaveText('Exportação indisponível');
  await expect(page.locator('.dl-btn').first()).toBeDisabled();
  await expect(page.locator('#exportStatus')).toContainText('Não foi possível carregar as bibliotecas de exportação');
  await expect(page.locator('#exportStatus')).toHaveAttribute('data-state', 'error');
});
