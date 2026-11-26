/**
 * Plans du site AquaPure pour les vidéos 4:5 (fil) et 9:16 (Reels).
 * Usage : node capture/capture.cjs [nom-du-plan ...]   (sans argument : tous les plans)
 * Le site doit tourner : cd ../aquapure && npm run build && npx next start -p 3100
 */
const { run, ease } = require("./engine.cjs");

const URL = process.env.SITE_URL || "http://localhost:3100";
const FRAME = { width: 1080, height: 1350 }; // le site rendu nativement en 4:5 (mise en page desktop ≥ 1024 px)
const REEL = { width: 1080, height: 1920 }; // 9:16 Reels : le hero remplit tout l'écran (100svh)

/** Interpole une trajectoire de curseur entre deux points (courbe douce, léger arc). */
function path2(a, b, t, arc = 40) {
  const k = ease.inOutCubic(t);
  return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k - Math.sin(Math.PI * k) * arc };
}
const clamp01 = (v) => Math.max(0, Math.min(1, v));

/** Scroll « à la molette » : accélère, garde une vitesse constante, puis freine (profil trapézoïdal). */
function cruise(t, ramp = 0.12) {
  t = clamp01(t);
  const v = 1 / (1 - ramp); // vitesse de croisière pour couvrir 0 → 1
  if (t < ramp) return (v * t * t) / (2 * ramp);
  if (t > 1 - ramp) return 1 - (v * (1 - t) * (1 - t)) / (2 * ramp);
  return v * (t - ramp / 2);
}

const SHOTS = {
  // 1. Intro du hero, depuis le chargement (rideau, titre ligne par ligne, CTA, badges, nav)
  hero: {
    viewport: FRAME,
    frames: 200,
  },

  // 2. Survol du bouton téléphone (capturé en 2× pour le zoom caméra au montage)
  bouton: {
    viewport: FRAME,
    dpr: 2,
    frames: 130,
    async setup(api) {
      await api.cursor(1130, 1250);
      await api.tick(3000); // exactement la fin du plan hero (180 images = 3 s) : la coupe ne se voit pas
      this.btn = await api.rect("[data-hero-cta]");
    },
    async perFrame(api, i) {
      const from = { x: 1130, y: 1250 }; // hors cadre : le curseur entre dans l'image
      const to = { x: this.btn.x + 150, y: this.btn.vy + this.btn.h / 2 + 4 };
      const p = path2(from, to, clamp01(i / 48), 60);
      await api.cursor(p.x, p.y);
    },
  },

  // 1 bis / 2 bis. Mêmes plans d'accroche en 9:16 (Reels), plein cadre
  "hero-9x16": {
    viewport: REEL,
    frames: 200,
  },
  "bouton-9x16": {
    viewport: REEL,
    dpr: 2,
    frames: 130,
    async setup(api) {
      await api.cursor(1130, 1700);
      await api.tick(3000); // raccord exact avec la fin du plan hero-9x16
      this.btn = await api.rect("[data-hero-cta]");
    },
    async perFrame(api, i) {
      const from = { x: 1130, y: 1700 }; // hors cadre : le curseur entre dans l'image
      const to = { x: this.btn.x + 150, y: this.btn.vy + this.btn.h / 2 + 4 };
      const p = path2(from, to, clamp01(i / 48), 60);
      await api.cursor(p.x, p.y);
    },
  },

  // 3. Descente vers les services puis survol d'une carte
  services: {
    viewport: FRAME,
    frames: 190,
    async setup(api) {
      await api.cursor(1200, 1200, false);
      await api.tick(3600);
      const ul = await api.rect("#services ul");
      this.target = ul.y - 170; // cartes en haut de l'écran : l'accroche (lorem ipsum) reste hors champ
      this.card = ul;
    },
    async perFrame(api, i) {
      const s = ease.inOutQuart(clamp01(i / 80));
      await api.scrollTo(this.target * s);
      if (i > 80) {
        const vy = this.card.y - this.target; // position à l'écran une fois arrivé
        const from = { x: 980, y: vy + this.card.h + 120 };
        const to = { x: this.card.x + this.card.w * 0.5, y: vy + this.card.h * 0.45 };
        const p = path2(from, to, clamp01((i - 80) / 40), 50);
        await api.cursor(p.x, p.y);
      }
    },
  },

  // 4. Réalisations : séquence pilotée par le scroll (rendu « fenêtre de navigateur », 1512 × 944)
  realisations: {
    viewport: { width: 1512, height: 944 },
    frames: 300,
    async setup(api) {
      await api.cursor(-100, -100, false);
      await api.tick(3600);
      // On descend progressivement jusqu'au contact pour déclencher les animations au-dessus
      const contact = await api.rect("#contact");
      for (let y = 0; y <= contact.y; y += 300) { await api.scrollTo(y); await api.tick(50); }
      const spacer = await api.page.evaluate(() => {
        const s = document.querySelector("#projets");
        const sp = s.parentElement;
        const r = sp.getBoundingClientRect();
        return { top: r.top + window.scrollY, h: r.height, secH: s.offsetHeight };
      });
      // La section se fixe quand son centre atteint le centre de l'écran, et le reste sur (spacer − section) px.
      const pinStart = spacer.top + spacer.secH / 2 - 944 / 2;
      const pinEnd = pinStart + (spacer.h - spacer.secH);
      this.start = pinStart - 560; // la page défile d'abord : le contact remonte, la section arrive
      this.end = pinEnd + 300; // puis repart une fois la séquence finie
      this.track = { viewport: 944, docH: await api.page.evaluate(() => document.documentElement.scrollHeight), pinStart, pinEnd, y: [] };
      await api.scrollTo(this.start);
      await api.tick(800);
    },
    async perFrame(api, i) {
      const y = this.start + (this.end - this.start) * cruise(i / (this.frames - 1));
      this.track.y.push(Math.round(y));
      await api.scrollTo(y);
    },
    // Position de scroll image par image → barre de défilement synchronisée au montage
    async done() {
      require("node:fs").writeFileSync(require("node:path").join(__dirname, "..", "src", "data", "realisations-scroll.json"), JSON.stringify(this.track));
    },
  },

  // 5. Formulaire de contact : clics et saisie
  contact: {
    viewport: FRAME,
    frames: 160,
    async setup(api) {
      await api.cursor(-100, -100, false);
      await api.tick(3600);
      const c = await api.rect("#contact");
      for (let y = 0; y <= c.y; y += 300) { await api.scrollTo(y); await api.tick(50); }
      this.top = c.y + c.h - FRAME.height + 0;
      await api.scrollTo(this.top);
      await api.tick(2500); // révélations de la section terminées
      const r = async (sel) => { const b = await api.rect(sel); return { x: b.x + 30, y: b.y - this.top + b.h / 2 }; };
      this.fields = [
        { sel: 'input[name="prenom"]', text: "Marie", at: await r('input[name="prenom"]') },
        { sel: 'input[name="nom"]', text: "Durand", at: await r('input[name="nom"]') },
        { sel: 'input[name="email"]', text: "marie.durand@mail.fr", at: await r('input[name="email"]') },
        { sel: 'textarea[name="message"]', text: "Fuite sous l'évier, dispo samedi ?", at: await r('textarea[name="message"]') },
      ];
      this.plan = [];
      let f = 0, prev = { x: 900, y: 1250 };
      for (const fld of this.fields) {
        this.plan.push({ type: "move", from: prev, to: fld.at, start: f, end: f + 12 });
        f += 12;
        this.plan.push({ type: "click", sel: fld.sel, start: f });
        f += 3;
        this.plan.push({ type: "type", sel: fld.sel, text: fld.text, start: f, per: 1 });
        f += fld.text.length + 4;
        prev = fld.at;
      }
      this.typed = new Map();
    },
    async perFrame(api, i) {
      for (const step of this.plan) {
        if (step.type === "move" && i >= step.start && i <= step.end) {
          const p = path2(step.from, step.to, (i - step.start) / (step.end - step.start), 30);
          await api.cursor(p.x, p.y);
        }
        if (step.type === "click" && i === step.start) await api.page.click(step.sel, { position: { x: 20, y: 14 } });
        if (step.type === "type" && i >= step.start && (i - step.start) % step.per === 0) {
          const n = (i - step.start) / step.per;
          if (n < step.text.length) await api.page.keyboard.type(step.text[n]);
        }
      }
    },
  },

  // 6. Mobile : intro puis ouverture du menu (affiché dans un téléphone au montage)
  mobile: {
    viewport: { width: 390, height: 844 },
    dpr: 2,
    mobile: true,
    frames: 230,
    async setup(api) { await api.cursor(-100, -100, false); },
    async perFrame(api, i) {
      if (i === 165) await api.page.tap('button[aria-controls="menu-mobile"]');
    },
  },

  // 7. Footer : le wordmark géant monte
  footer: {
    viewport: FRAME,
    frames: 150,
    async setup(api) {
      await api.cursor(-100, -100, false);
      await api.tick(3600);
      const max = await api.page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
      for (let y = 0; y <= max - 1400; y += 300) { await api.scrollTo(y); await api.tick(50); }
      this.from = max - 650; // démarre sur les actualités, après les témoignages
      this.to = max;
      await api.scrollTo(this.from);
      await api.tick(1500);
    },
    async perFrame(api, i) {
      const s = ease.inOutCubic(clamp01(i / 110));
      await api.scrollTo(this.from + (this.to - this.from) * s);
    },
  },
};

const wanted = process.argv.slice(2);
const list = Object.entries(SHOTS)
  .filter(([name]) => !wanted.length || wanted.includes(name))
  .map(([name, s]) => ({ name, ...s }));

run(list, URL).catch((e) => { console.error(e); process.exit(1); });
