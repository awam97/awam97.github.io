# awam97.github.io

Portfolio of Awam Zeyad, WordPress & PHP web developer. Live at https://awam97.github.io (Italian) and https://awam97.github.io/en/ (English).

- Edit **`src/page.html`** only. It holds both languages (Italian in the HTML, English in the `EN` object in its script).
- On push, the "Build pages" Action runs `scripts/build.mjs`, which renders static `index.html` and `en/index.html` with no JavaScript. Locally: `node scripts/build.mjs` (needs Playwright).
- `assets/shots/`: project screenshots plus 640px WebP copies, refreshed monthly by the "Project screenshots" Action (run it from the Actions tab after adding a project).
- `assets/brand/`: logos and icons copied from awam.ly. `assets/og.png`: social share image.
