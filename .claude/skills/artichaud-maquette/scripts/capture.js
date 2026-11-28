#!/usr/bin/env node
/**
 * Capture d'un site pour la comparaison avec Figma.
 *
 *   node capture.js <url> <largeur> <hauteur> <sortie.png> [--motion] [--scroll <y>] [--wait <ms>] [--dpr <n>]
 *
 * Par défaut : mouvement réduit (état final de toutes les animations), images forcées en chargement immédiat,
 * page parcourue de haut en bas, capture pleine page. Affiche la position de chaque section, header et footer.
 * --motion : animations actives ; avec --scroll <y>, capture de l'écran à cette position (états épinglés).
 * Playwright est préinstallé dans les sessions cloud (require('playwright') fonctionne partout).
 */
const { chromium } = require("playwright");

const [url, w, h, out, ...rest] = process.argv.slice(2);
if (!url || !w || !h || !out) {
  console.error("usage : node capture.js <url> <largeur> <hauteur> <sortie.png> [--motion] [--scroll <y>] [--wait <ms>] [--dpr <n>]");
  process.exit(1);
}
const flag = (name) => rest.includes(name);
const opt = (name, def) => (rest.includes(name) ? Number(rest[rest.indexOf(name) + 1]) : def);
const motion = flag("--motion");
const scrollY = opt("--scroll", null);
const wait = opt("--wait", motion ? 4500 : 800);
const dpr = opt("--dpr", 1);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: Number(w), height: Number(h) },
    deviceScaleFactor: dpr,
    reducedMotion: motion ? "no-preference" : "reduce",
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("response", (r) => r.status() >= 400 && errors.push(`${r.status()} ${r.url()}`));

  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Images en chargement différé : sinon elles manquent sur une capture pleine page
  await page.evaluate(() => document.querySelectorAll("img").forEach((i) => (i.loading = "eager")));
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo(0, 0);
  });
  await page.evaluate(() =>
    Promise.race([
      Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => (i.onload = i.onerror = r))))),
      new Promise((r) => setTimeout(r, 8000)),
    ]),
  );
  await page.waitForTimeout(wait);

  if (motion && scrollY !== null) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(2200);
    await page.screenshot({ path: out });
  } else {
    await page.screenshot({ path: out, fullPage: !motion });
  }

  const boxes = await page.evaluate(() =>
    [...document.querySelectorAll("header, main > *, section, footer")].map((e) => {
      const r = e.getBoundingClientRect();
      const name = e.id ? `#${e.id}` : e.tagName.toLowerCase();
      return `${name.padEnd(18)} x=${Math.round(r.x)} y=${Math.round(r.y + scrollY)} w=${Math.round(r.width)} h=${Math.round(r.height)}`;
    }),
  );
  const width = await page.evaluate(() => [document.documentElement.scrollWidth, innerWidth]);
  console.log([...new Set(boxes)].join("\n"));
  console.log(width[0] > width[1] ? `ATTENTION défilement horizontal : ${width[0]} > ${width[1]}` : "pas de défilement horizontal");
  if (errors.length) console.log("erreurs :", errors);
  await browser.close();
})();
