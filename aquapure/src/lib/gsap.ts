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

export { gsap, ScrollTrigger, SplitText, useGSAP };
