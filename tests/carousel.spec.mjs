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

test('reports individual and batch export failures in the interface', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  await page.evaluate(() => {
    window.html2canvas = () => Promise.reject(new Error('forced export failure'));
  });
  await page.locator('[data-target="slide1"]').click();
  await expect(page.locator('#exportStatus')).toHaveText('Não foi possível gerar 01-capa. Tente novamente.');
  await expect(page.locator('#exportStatus')).toHaveAttribute('data-state', 'error');
  await expect(page.locator('[data-target="slide1"]')).toBeEnabled();

  await page.locator('#downloadAllBtn').click();
  await expect(page.locator('#exportStatus')).toHaveText('0 de 4 slides foram gerados. Falharam: 01-capa, 02-mentoria-como-funciona, 03-como-agendar, 04-aulas.');
  await expect(page.locator('#downloadAllBtn')).toBeEnabled();
});

test('reports a successful individual export', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  await page.locator('[data-target="slide1"]').click();
  await expect(page.locator('#exportStatus')).toHaveText('01-capa foi gerado. Confira o download do navegador.');
  await expect(page.locator('#exportStatus')).toHaveAttribute('data-state', 'success');
});
