import { expect, test } from '@playwright/test';

const slides = [
  { id: 'slide1', name: '01-capa' },
  { id: 'slide2', name: '02-mentoria-como-funciona' },
  { id: 'slide3', name: '03-como-agendar' },
  { id: 'slide4', name: '04-aulas' }
];

async function waitForStableFit(page) {
  await page.waitForFunction(
    () => {
      const wrap = document.querySelector('.slide-wrap');
      const target = 1350 * (wrap.clientWidth / 1080);
      const actual = parseFloat(wrap.style.height);
      return Math.abs(actual - target) < 0.5;
    },
    { timeout: 2000 }
  );
}

test('slide visuals match reference screenshots', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await waitForStableFit(page);

  for (const slide of slides) {
    const wrap = page.locator(`#${slide.id}`).locator('..');
    await expect(wrap).toHaveScreenshot(`${slide.name}.png`, {
      mask: [page.locator('.tab-month'), page.locator('.cursor-blink')],
      maxDiffPixelRatio: 0.02
    });
  }
});
