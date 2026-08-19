import { expect, test } from '@playwright/test';

const slides = [
  { id: 'slide1', name: '01-capa' },
  { id: 'slide2', name: '02-mentoria-como-funciona' },
  { id: 'slide3', name: '03-como-agendar' },
  { id: 'slide4', name: '04-aulas' }
];

test('slide visuals match reference screenshots', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  for (const slide of slides) {
    const dataUrl = await page.evaluate(async (id) => {
      const canvas = await window.__carouselExport.captureSlide(id);
      return canvas.toDataURL('image/png');
    }, slide.id);

    const buffer = Buffer.from(dataUrl.split(',')[1], 'base64');
    expect(buffer).toMatchSnapshot(`${slide.name}.png`);
  }
});
