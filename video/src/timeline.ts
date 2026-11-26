import { BEAT } from "./brand";

/**
 * Découpage de la vidéo (toutes les valeurs en images à 60 i/s, calées sur les temps à 120 BPM).
 * src : plan capturé (public/shots/<plan>.mp4) ; trim : première image utilisée.
 * Tous les plans sont lus à vitesse 1 : le rythme est fixé à la capture. Une vitesse non entière
 * (×1,12, ×0,66…) duplique ou saute des images à intervalles irréguliers → à-coups visibles.
 */
export const SHOTS = {
  hero: { from: 0, dur: 6 * BEAT, src: "hero", trim: 0, rate: 1 },
  bouton: { from: 6 * BEAT, dur: 4 * BEAT, src: "bouton", trim: 0, rate: 1 },
  realisations: { from: 10 * BEAT, dur: 10 * BEAT, src: "realisations", trim: 0, rate: 1 },
  contact: { from: 20 * BEAT, dur: 5 * BEAT, src: "contact", trim: 4, rate: 1 },
  mobile: { from: 25 * BEAT, dur: 6 * BEAT, src: "mobile", trim: 45, rate: 1 },
  footer: { from: 31 * BEAT, dur: 4 * BEAT, src: "footer", trim: 30, rate: 1 },
  fin: { from: 35 * BEAT, dur: 6 * BEAT },
} as const;

export const TOTAL = 41 * BEAT; // 1230 images = 20,5 s

/** Raccords en « rideau » (au milieu du rideau, le plan change). */
export const WIPES = [10, 20, 25, 31, 35].map((b) => b * BEAT);
