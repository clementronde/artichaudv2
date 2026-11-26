import { continueRender, delayRender, staticFile } from "remotion";

export const C = {
  bleu: "#01292c",
  fluo: "#3cfff2",
  blanc: "#fcfcfc",
  gris: "#f0f0f0",
  // Artichaud (repris de la charte du site artichaud-studio.fr)
  artiBg: "#30041B",
  artiRouge: "#F70046",
};

export const FONT = {
  aquapure: "Satoshi, system-ui, sans-serif",
  artichaud: "'Helvetica Now Display', Helvetica, Arial, sans-serif",
};

/** Grille de montage : 120 BPM à 60 i/s → 1 temps = 30 images, 1 mesure = 120 images. */
export const FPS = 60;
export const BEAT = 30;

// Chargement des polices avant le rendu de la première image
const faces: Array<[string, string, string]> = [
  ["Satoshi", "brand/Satoshi-Regular.woff2", "400"],
  ["Satoshi", "brand/Satoshi-Medium.woff2", "500"],
  ["Helvetica Now Display", "brand/HelveticaNowDisplay-Regular.woff2", "400"],
  ["Helvetica Now Display", "brand/HelveticaNowDisplay-Medium.woff2", "500"],
  ["Helvetica Now Display", "brand/HelveticaNowDisplay-Bold.woff2", "700"],
];
const handle = delayRender("Chargement des polices");
Promise.all(
  faces.map(([family, file, weight]) => {
    const f = new FontFace(family, `url(${staticFile(file)}) format("woff2")`, { weight });
    return f.load().then((loaded) => document.fonts.add(loaded));
  }),
)
  .then(() => continueRender(handle))
  .catch((e) => {
    console.error(e);
    continueRender(handle);
  });
