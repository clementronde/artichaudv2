"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1.2 });
}

/** Courbes partagées par toutes les animations du site. */
export const EASE = {
  out: "expo.out",
  inOut: "power3.inOut",
  soft: "power2.out",
} as const;

/** Media query GSAP : on n'anime que si l'utilisateur n'a pas demandé moins de mouvement. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const MOTION_REDUCED = "(prefers-reduced-motion: reduce)";

/**
 * Les masques de lignes (overflow: clip) coupent les jambages (g, p, j) quand l'interlignage vaut 1.
 * On agrandit la zone visible vers le bas sans changer la mise en page (hauteur du titre identique).
 * Les lignes doivent partir d'au moins SPLIT_OFFSET % pour rester cachées dans ce masque agrandi.
 */
export function unclipDescenders(masks: Element[]) {
  // Seulement vers le bas : entre deux lignes, une marge haute négative fusionnerait avec la marge basse
  // de la ligne précédente (margin collapsing) et le titre grandirait de quelques pixels.
  gsap.set(masks, { paddingBottom: "0.3em", marginBottom: "-0.3em" });
}

export const SPLIT_OFFSET = 145;

export { gsap, ScrollTrigger, SplitText, useGSAP };
