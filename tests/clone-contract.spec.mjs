import { expect, test } from '@playwright/test';

const slides = [
  { id: 'slide1', name: '01-capa' },
  { id: 'slide2', name: '02-mentoria-como-funciona' },
  { id: 'slide3', name: '03-como-agendar' },
  { id: 'slide4', name: '04-aulas' }
];

test('captureSlide removes contenteditable from the clone passed to html2canvas', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  await page.evaluate(() => {
    window.__capturedClones = [];
    const originalAppendChild = document.body.appendChild.bind(document.body);
    document.body.appendChild = function (node) {
      window.__capturedClones.push(node);
      return originalAppendChild(node);
    };
  });

  await page.evaluate(() => window.__carouselExport.captureSlide('slide1'));

  const result = await page.evaluate(() => {
    const clones = window.__capturedClones;
    return {
      count: clones.length,
      hasContentEditableDescendant: clones.some(c => c && c.querySelector && c.querySelector('[contenteditable]') !== null),
      hasContentEditableAttr: clones.some(c => c && c.getAttribute && c.getAttribute('contenteditable') !== null),
      originalHadContentEditable: !!document.querySelector('#slide1 [contenteditable]')
    };
  });

  expect(result.count).toBeGreaterThan(0);
  expect(result.hasContentEditableDescendant).toBe(false);
  expect(result.hasContentEditableAttr).toBe(false);
  expect(result.originalHadContentEditable).toBe(true);
});

test('every slide clone strips contenteditable', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  for (const slide of slides) {
    await page.evaluate(() => {
      window.__capturedClones = [];
      const originalAppendChild = document.body.appendChild.bind(document.body);
      document.body.appendChild = function (node) {
        window.__capturedClones.push(node);
        return originalAppendChild(node);
      };
    });

    await page.evaluate(id => window.__carouselExport.captureSlide(id), slide.id);

    const result = await page.evaluate(() => {
      const clones = window.__capturedClones;
      return clones.some(c => c && c.querySelector && c.querySelector('[contenteditable]') !== null);
    });

    expect(result, `${slide.name} clone must not contain [contenteditable]`).toBe(false);
  }
});
