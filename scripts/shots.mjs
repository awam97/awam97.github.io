// Captures a desktop screenshot of each project site into assets/shots/<id>.jpg
import { chromium } from 'playwright';
const sites = {
  'al-amal': 'https://al-amal.ly/',
  'najm-ashamal': 'https://najm-ashamal.ly/',
  'i-volunteer': 'https://i-volunteer.ly/',
  'orgs': 'https://orgs.ly/',
  'athar': 'https://atharcso.org/',
  'tafarrod': 'https://tafarrod.ly/',
};
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1, locale: 'ar' });
let failed = 0;
for (const [id, url] of Object.entries(sites)) {
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
    await page.waitForTimeout(3500);
    await page.screenshot({ path: `assets/shots/${id}.jpg`, type: 'jpeg', quality: 72 });
    console.log('ok', id);
  } catch (e) { failed++; console.error('fail', id, e.message); }
  await page.close();
}
await browser.close();
if (failed === Object.keys(sites).length) process.exit(1);
