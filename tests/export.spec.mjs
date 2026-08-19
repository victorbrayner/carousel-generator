import { expect, test } from '@playwright/test';

const expectedSlides = [
  { id: 'slide1', name: '01-capa' },
  { id: 'slide2', name: '02-mentoria-como-funciona' },
  { id: 'slide3', name: '03-como-agendar' },
  { id: 'slide4', name: '04-aulas' }
];

test('each individual download button triggers a PNG download', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  for (const slide of expectedSlides) {
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator(`[data-target="${slide.id}"]`).click()
    ]);
    expect(download.suggestedFilename()).toBe(`${slide.name}.png`);
  }
});

test('captureSlide produces a 2160x2700 canvas for each slide', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  for (const slide of expectedSlides) {
    const dims = await page.evaluate(async (id) => {
      const canvas = await window.__carouselExport.captureSlide(id);
      return { width: canvas.width, height: canvas.height };
    }, slide.id);
    expect(dims.width).toBe(2160);
    expect(dims.height).toBe(2700);
  }
});

test('reports a failure message when an individual export fails', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  await page.evaluate(() => {
    window.html2canvas = () => Promise.reject(new Error('forced export failure'));
  });

  await page.locator('[data-target="slide1"]').click();
  await expect(page.locator('#exportStatus')).toHaveText('Não foi possível gerar 01-capa. Tente novamente.');
  await expect(page.locator('#exportStatus')).toHaveAttribute('data-state', 'error');
});
