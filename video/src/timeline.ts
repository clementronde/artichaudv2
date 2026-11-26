import { BEAT } from "./brand";

/**
 * Découpage de la vidéo (toutes les valeurs en images à 60 i/s, calées sur les temps à 120 BPM).
 * src* : position dans le plan capturé (public/shots/<plan>.mp4) et vitesse de lecture.
 */
export const SHOTS = {
  hero: { from: 0, dur: 6 * BEAT, src: "hero", trim: 0, rate: 1 },
  bouton: { from: 6 * BEAT, dur: 4 * BEAT, src: "bouton", trim: 0, rate: 1 },
  services: { from: 10 * BEAT, dur: 6 * BEAT, src: "services", trim: 70, rate: 0.66 },
  realisations: { from: 16 * BEAT, dur: 8 * BEAT, src: "realisations", trim: 20, rate: 1.12 },
  contact: { from: 24 * BEAT, dur: 5 * BEAT, src: "contact", trim: 24, rate: 1.62 },
  mobile: { from: 29 * BEAT, dur: 6 * BEAT, src: "mobile", trim: 40, rate: 1.05 },
  footer: { from: 35 * BEAT, dur: 4 * BEAT, src: "footer", trim: 40, rate: 0.9 },
  fin: { from: 39 * BEAT, dur: 6 * BEAT },
} as const;

export const TOTAL = 45 * BEAT; // 1350 images = 22,5 s

/** Raccords en « rideau » (au milieu du rideau, le plan change). */
export const WIPES = [10, 16, 24, 29, 35, 39].map((b) => b * BEAT);
