import { expect, test } from '@playwright/test';

const BASE_WIDTH = 1080;
const BASE_HEIGHT = 1350;

async function readFirstWrap(page) {
  return page.evaluate(() => {
    const wrap = document.querySelector('.slide-wrap');
    return {
      width: wrap.clientWidth,
      height: wrap.style.height,
      slideTransform: wrap.querySelector('.slide').style.transform
    };
  });
}

function expectedHeight(width) {
  return BASE_HEIGHT * (width / BASE_WIDTH);
}

async function waitForStableFit(page, timeout = 2000) {
  await page.waitForFunction(
    () => {
      const wrap = document.querySelector('.slide-wrap');
      const target = 1350 * (wrap.clientWidth / 1080);
      const actual = parseFloat(wrap.style.height);
      return Math.abs(actual - target) < 0.5;
    },
    { timeout }
  );
}

test('fitSlides scales the slide and wrap proportionally to its width', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await waitForStableFit(page);

  const before = await readFirstWrap(page);
  expect(before.width).toBeGreaterThan(0);
  expect(parseFloat(before.height)).toBeGreaterThan(0);
  expect(before.slideTransform).toMatch(/scale\(/);
  expect(parseFloat(before.height)).toBeCloseTo(expectedHeight(before.width), 0);

  await page.setViewportSize({ width: 900, height: 1000 });
  await waitForStableFit(page);

  const after = await readFirstWrap(page);
  expect(after.width).not.toBe(before.width);
  expect(parseFloat(after.height)).toBeCloseTo(expectedHeight(after.width), 0);
});

test('fitSlides re-scales on viewport shrink and restore', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await waitForStableFit(page);

  const originalViewport = page.viewportSize();

  await page.setViewportSize({ width: 700, height: 1000 });
  await waitForStableFit(page);
  const shrunk = await readFirstWrap(page);
  expect(parseFloat(shrunk.height)).toBeCloseTo(expectedHeight(shrunk.width), 0);

  await page.setViewportSize(originalViewport);
  await waitForStableFit(page);
  const restored = await readFirstWrap(page);
  expect(parseFloat(restored.height)).toBeCloseTo(expectedHeight(restored.width), 0);
});
