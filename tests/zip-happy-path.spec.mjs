import { expect, test } from '@playwright/test';
import JSZip from 'jszip';

const expectedEntries = [
  '01-capa.png',
  '02-mentoria-como-funciona.png',
  '03-como-agendar.png',
  '04-aulas.png'
];

test('batch ZIP export contains 4 PNGs with the expected names', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#downloadAllBtn').click()
  ]);

  expect(download.suggestedFilename()).toBe('carrossel-agosto.zip');

  const path = await download.path();
  const zip = await JSZip.loadAsync(await import('node:fs/promises').then(fs => fs.readFile(path)));

  const entryNames = Object.keys(zip.files).sort();
  expect(entryNames).toEqual([...expectedEntries].sort());
});

test('each PNG inside the batch ZIP is 2160x2700', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#downloadAllBtn').click()
  ]);

  const path = await download.path();
  const zip = await JSZip.loadAsync(await import('node:fs/promises').then(fs => fs.readFile(path)));

  for (const name of expectedEntries) {
    const entry = zip.file(name);
    expect(entry, `missing entry ${name}`).not.toBeNull();
    const bytes = await entry.async('uint8array');
    expect(bytes.length, `${name} is empty`).toBeGreaterThan(0);
    expect(readPngWidth(bytes), `${name} width`).toBe(2160);
    expect(readPngHeight(bytes), `${name} height`).toBe(2700);
  }
});

function readPngDimension(bytes, offset) {
  return (bytes[offset] << 24) | (bytes[offset + 1] << 16) | (bytes[offset + 2] << 8) | bytes[offset + 3];
}

function readPngWidth(bytes) {
  return readPngDimension(bytes, 16);
}

function readPngHeight(bytes) {
  return readPngDimension(bytes, 20);
}
