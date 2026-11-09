// Builds static pages from src/page.html: index.html (Italian) and en/index.html (English).
// Run: node scripts/build.mjs   (needs playwright)
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import { writeFileSync, mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const src = pathToFileURL(resolve('src/page.html')).href;
const browser = await chromium.launch();
for (const lang of ['it', 'en']) {
  const page = await browser.newPage();
  await page.addInitScript(l => { window.__LANG = l; }, lang);
  await page.route(/\.(woff2|webp|jpg|png|ico)$/, r => r.abort());
  await page.goto(src);
  let html = await page.evaluate(() => {
    document.getElementById('app').remove();
    document.querySelectorAll('[data-i18n]').forEach(e => e.removeAttribute('data-i18n'));
    document.querySelectorAll('[id^="m-"]').forEach(e => e.removeAttribute('id'));
    return '<!doctype html>\n' + document.documentElement.outerHTML + '\n';
  });
  if (lang === 'en') {
    html = html.replace(/(src|href|srcset)="(assets|cv)\//g, '$1="../$2/')
               .replace(/, (assets|cv)\//g, ', ../$1/')
               .replace(/url\("assets\//g, 'url("../assets/');
    mkdirSync('en', { recursive: true });
    writeFileSync('en/index.html', html);
  } else {
    writeFileSync('index.html', html);
  }
  console.log('built', lang, html.length);
  await page.close();
}
await browser.close();
