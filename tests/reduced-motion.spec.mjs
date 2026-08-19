import { expect, test } from '@playwright/test';

test('cursor-blink animation is disabled under prefers-reduced-motion', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();

  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  const result = await page.evaluate(() => {
    const els = [...document.querySelectorAll('.cursor-blink')];
    return els.map(el => {
      const style = window.getComputedStyle(el);
      return {
        animationName: style.animationName,
        opacity: style.opacity
      };
    });
  });

  expect(result.length, 'expected at least one .cursor-blink element').toBeGreaterThan(0);
  for (const r of result) {
    expect(r.animationName, 'animation-name must be "none" under reduced motion').toBe('none');
    expect(r.opacity, 'opacity must be 1 under reduced motion').toBe('1');
  }

  await context.close();
});

test('cursor-blink animation runs under default motion preferences', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'no-preference' });
  const page = await context.newPage();

  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  const animationName = await page.evaluate(() => {
    const el = document.querySelector('.cursor-blink');
    return el ? window.getComputedStyle(el).animationName : null;
  });

  expect(animationName, 'animation-name should not be "none" under default motion').not.toBe('none');

  await context.close();
});
