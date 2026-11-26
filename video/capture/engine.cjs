/**
 * Moteur de capture déterministe d'un site animé.
 *
 * - L'horloge de la page (Date, performance.now, requestAnimationFrame, timers) est simulée
 *   par Playwright : GSAP, ScrollTrigger et Lenis avancent d'exactement 1/FPS s par image,
 *   quel que soit le temps réel que prend chaque capture.
 * - Les transitions / animations CSS (survols Tailwind, labels du formulaire…) ne suivent pas
 *   cette horloge : on fige la timeline du document (Animation.setPlaybackRate 0) et on les
 *   positionne nous-mêmes à chaque image via le protocole DevTools (Animation.seekAnimations).
 * - Un curseur dessiné dans la page remplace le curseur système, pour des trajectoires propres.
 */
const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const FPS = 60;
const ROOT = path.join(__dirname, "..");

const CURSOR_SVG =
  '<svg width="34" height="34" viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg"><path d="M5 3l22 12.5-9.5 2.6L12.8 27 5 3z" fill="#01292c" stroke="#fcfcfc" stroke-width="2" stroke-linejoin="round"/></svg>';

const ease = {
  inOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  outExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  inOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2),
};

async function captureShot(shot, { url, browser }) {
  const outDir = path.join(ROOT, "capture", "frames", shot.name);
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  const context = await browser.newContext({
    viewport: shot.viewport,
    deviceScaleFactor: shot.dpr ?? 1,
    isMobile: !!shot.mobile,
    hasTouch: !!shot.mobile,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));

  // install() laisse le temps s'écouler en réel : pauseAt() le fige, on l'avance ensuite nous-mêmes.
  const T0 = new Date("2026-11-26T10:00:00").getTime();
  await page.clock.install({ time: T0 });
  await page.clock.pauseAt(T0 + 1);

  // Timeline CSS figée + suivi des animations créées
  const cdp = await context.newCDPSession(page);
  await cdp.send("Animation.enable");
  await cdp.send("Animation.setPlaybackRate", { playbackRate: 0 });
  let now = 0; // ms écoulées sur l'horloge simulée
  const cssAnims = new Map(); // id -> { start, end }
  cdp.on("Animation.animationStarted", ({ animation }) => {
    const src = animation.source || {};
    const total = (src.delay || 0) + (src.duration || 0) * Math.max(1, src.iterations || 1) + (src.endDelay || 0);
    cssAnims.set(animation.id, { start: now, end: now + (Number.isFinite(total) ? total : 1e9) });
  });

  await page.goto(url, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);

  // Curseur maison
  await page.evaluate((svg) => {
    const c = document.createElement("div");
    c.id = "__cursor";
    c.innerHTML = svg;
    Object.assign(c.style, {
      position: "fixed", left: "0", top: "0", zIndex: "2147483647", pointerEvents: "none",
      transform: "translate(-200px,-200px)", filter: "drop-shadow(0 4px 10px rgba(0,0,0,.25))",
      transition: "none",
    });
    document.documentElement.appendChild(c);
    document.documentElement.style.cursor = "none";
  }, CURSOR_SVG);

  const api = {
    page,
    ease,
    /** Avance l'horloge simulée de `ms` et recale les animations CSS. */
    async tick(ms) {
      await page.clock.runFor(ms);
      now += ms;
      await seekCss();
    },
    async cursor(x, y, visible = true) {
      await page.evaluate(([x, y, v]) => {
        const c = document.getElementById("__cursor");
        c.style.transform = `translate(${x - 5}px, ${y - 3}px)`;
        c.style.opacity = v ? "1" : "0";
      }, [x, y, visible]);
      await page.mouse.move(x, y);
    },
    async scrollTo(y) {
      await page.evaluate((y) => {
        window.scrollTo(0, y);
        window.dispatchEvent(new Event("scroll"));
      }, y);
    },
    rect: (sel) =>
      page.evaluate((sel) => {
        const r = document.querySelector(sel).getBoundingClientRect();
        return { x: r.x, y: r.y + window.scrollY, w: r.width, h: r.height, vy: r.y };
      }, sel),
    get now() { return now; },
  };

  async function seekCss() {
    const groups = new Map();
    for (const [id, a] of cssAnims) {
      const t = Math.min(now - a.start, a.end - a.start);
      const key = Math.round(t);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(id);
      if (now >= a.end) cssAnims.delete(id); // dernier recalage à la fin, puis on l'oublie
    }
    for (const [t, ids] of groups) {
      try { await cdp.send("Animation.seekAnimations", { animations: ids, currentTime: t }); } catch { /* animation déjà retirée */ }
    }
  }

  // Préparation éventuelle (avance silencieuse, scroll initial…)
  if (shot.setup) await shot.setup(api);

  const frameMs = 1000 / FPS;
  let acc = 0;
  for (let i = 0; i < shot.frames; i++) {
    if (shot.perFrame) await shot.perFrame(api, i, i / FPS);
    // pas entiers qui restent calés sur 60 i/s (17, 17, 16…)
    const target = Math.round((i + 1) * frameMs);
    const step = target - acc;
    acc = target;
    await page.screenshot({ path: path.join(outDir, `${String(i).padStart(5, "0")}.jpg`), type: "jpeg", quality: 92 });
    await api.tick(step);
  }

  if (shot.done) await shot.done(api);
  await context.close();
  if (errors.length) console.warn(`[${shot.name}] erreurs page :`, errors);
  return outDir;
}

/** Encode une séquence d'images en MP4 (ffmpeg fourni par Remotion). */
function encode(name) {
  const inDir = path.join(ROOT, "capture", "frames", name);
  const out = path.join(ROOT, "public", "shots", `${name}.mp4`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  execFileSync(
    "npx",
    ["remotion", "ffmpeg", "-y", "-loglevel", "error", "-framerate", String(FPS), "-i", path.join(inDir, "%05d.jpg"),
      "-c:v", "libx264", "-crf", "14", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out],
    { cwd: ROOT, stdio: "inherit" },
  );
  return out;
}

async function run(shots, url) {
  const browser = await chromium.launch();
  try {
    for (const shot of shots) {
      const t0 = Date.now();
      await captureShot(shot, { url, browser });
      const out = encode(shot.name);
      console.log(`✓ ${shot.name} : ${shot.frames} images en ${((Date.now() - t0) / 1000).toFixed(0)} s → ${path.relative(ROOT, out)}`);
    }
  } finally {
    await browser.close();
  }
}

module.exports = { run, ease, FPS };
