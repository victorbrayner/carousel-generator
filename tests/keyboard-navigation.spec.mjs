import { expect, test } from '@playwright/test';

async function focusFromBody(page) {
  await page.evaluate(() => {
    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }
    document.body.focus();
  });
}

async function activeDescriptor(page) {
  return page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    return {
      id: el.id || null,
      dataTarget: el.dataset ? el.dataset.target || null : null,
      tag: el.tagName.toLowerCase()
    };
  });
}

test('first Tab from body lands on the month input (toolbar precedes slides)', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await focusFromBody(page);

  await page.keyboard.press('Tab');
  const focused = await activeDescriptor(page);
  expect(focused, 'Tab should focus a control, not leave focus on body').not.toBeNull();
  expect(focused.id).toBe('monthInput');
});

test('every download control is keyboard-focusable', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  const ids = ['downloadAllBtn'];
  const dlIds = await page.evaluate(() =>
    [...document.querySelectorAll('.dl-btn')].map(b => b.dataset.target)
  );

  for (const id of ids) {
    await page.evaluate(sel => document.getElementById(sel).focus(), id);
    const focused = await activeDescriptor(page);
    expect(focused && focused.id === id, `#${id} must be focusable`).toBe(true);
  }

  for (const target of dlIds) {
    const ok = await page.evaluate(t => {
      const btn = document.querySelector(`[data-target="${t}"]`);
      btn.focus();
      return document.activeElement === btn;
    }, target);
    expect(ok, `slide download button for ${target} must be focusable`).toBe(true);
  }
});

test('toolbar controls appear in Tab order before any slide', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await focusFromBody(page);

  const firstStop = await (async () => {
    await page.keyboard.press('Tab');
    return activeDescriptor(page);
  })();
  expect(firstStop, 'first Tab stop must exist').not.toBeNull();
  expect(['monthInput', 'downloadAllBtn']).toContain(firstStop.id);

  await page.keyboard.press('Tab');
  const secondStop = await activeDescriptor(page);
  expect(secondStop, 'second Tab stop must exist').not.toBeNull();
  expect(['monthInput', 'downloadAllBtn']).toContain(secondStop.id);

  const distinct = new Set([firstStop.id, secondStop.id]);
  expect(distinct.size, 'first two stops must be the two toolbar controls').toBe(2);
});

test('Shift+Tab moves focus backwards', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  await page.evaluate(() => document.getElementById('downloadAllBtn').focus());
  const before = await activeDescriptor(page);
  expect(before && before.id === 'downloadAllBtn').toBe(true);

  await page.keyboard.press('Shift+Tab');
  const after = await activeDescriptor(page);
  expect(after, 'Shift+Tab should focus a control').not.toBeNull();
  expect(after.id).not.toBe('downloadAllBtn');
});
