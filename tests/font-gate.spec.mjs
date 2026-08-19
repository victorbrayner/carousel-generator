import { expect, test } from '@playwright/test';

test.describe('font gate', () => {
  test.use({ baseURL: 'http://127.0.0.1:4173' });

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      let resolver;
      window.__resolveFontsReady = () => resolver();
      Object.defineProperty(document.fonts, 'ready', {
        configurable: true,
        get: () => new Promise(r => { resolver = r; })
      });
    });
  });

  test('buttons stay disabled until document.fonts.ready resolves', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#downloadAllBtn')).toBeDisabled();
    await expect(page.locator('#downloadAllBtn')).toHaveText('Carregando fontes…');
    await expect(page.locator('.dl-btn').first()).toBeDisabled();
    await expect(page.locator('#exportStatus')).toHaveText('Carregando fontes para exportação.');

    await page.evaluate(() => window.__resolveFontsReady());

    await expect(page.locator('#downloadAllBtn')).toBeEnabled();
    await expect(page.locator('#downloadAllBtn')).toHaveText('⬇ Baixar todos os slides (ZIP)');
    await expect(page.locator('.dl-btn').first()).toBeEnabled();
    await expect(page.locator('#exportStatus')).toHaveText('Pronto para exportar.');
    await expect(page.locator('#exportStatus')).toHaveAttribute('data-state', 'success');
  });
});
