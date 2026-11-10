import { expect, test } from '@playwright/test';

const inlineFieldSlides = [
  { id: 'slide3', name: '03-como-agendar' },
  { id: 'slide4', name: '04-aulas' }
];

test('exports slides 3 and 4 with default content after changing the month', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  await page.fill('#monthInput', 'Novembro');
  await expect(page.locator('.tab-month').first()).toHaveText('novembro');

  for (const slide of inlineFieldSlides) {
    const dims = await page.evaluate(async (id) => {
      const canvas = await window.__carouselExport.captureSlide(id);
      return { width: canvas.width, height: canvas.height };
    }, slide.id);
    expect(dims, `${slide.name} must export with default content`).toEqual({ width: 2160, height: 2700 });
  }
});

test('still blocks genuinely overflowing inline fields', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  await page.fill('#monthInput', 'Novembro');
  await page.locator('#slide3 .note .val').fill('A'.repeat(500));
  await expect(page.locator('[data-target="slide3"]')).toBeEnabled();

  await page.locator('[data-target="slide3"]').click();
  await expect(page.locator('#exportStatus')).toContainText('Dica do agendamento');
  await expect(page.locator('#exportStatus')).toHaveAttribute('data-state', 'error');

  await page.locator('#slide4 .price-highlight').fill('A'.repeat(500));
  await expect(page.locator('[data-target="slide4"]')).toBeEnabled();

  await page.locator('[data-target="slide4"]').click();
  await expect(page.locator('#exportStatus')).toContainText('Preço');
  await expect(page.locator('#exportStatus')).toHaveAttribute('data-state', 'error');
});
