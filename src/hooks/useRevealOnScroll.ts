'use client'
import { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// Point de départ de chaque variante, et écart avec l'élément précédent dans la cascade
const VARIANTS: Record<string, { from: gsap.TweenVars; gap: number }> = {
  up: { from: { y: 70, opacity: 0 }, gap: 0.15 },
  card: { from: { y: 140, scale: 0.88, opacity: 0 }, gap: 0.15 },
  pop: { from: { scale: 0, opacity: 0 }, gap: 0.06 },
}

// Apparitions à l'arrivée d'une section : ses éléments entrent en cascade, dans l'ordre du DOM, et repartent si l'on remonte au-dessus.
// Balisage attendu dans le scope : data-reveal-group > data-reveal="up" | "card" | "pop"
export function useRevealOnScroll(scope: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: group, start: "top 75%", toggleActions: "play none none reverse" },
        })
        group.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => {
          const { from, gap } = VARIANTS[el.dataset.reveal ?? "up"] ?? VARIANTS.up
          const pop = el.dataset.reveal === "pop"
          tl.fromTo(el, from, {
            y: 0, scale: 1, opacity: 1,
            duration: pop ? 0.5 : 1.2,
            ease: pop ? "back.out(2.5)" : "power3.out",
          }, i === 0 ? 0 : `<${gap}`)
        })
      })
    })
  }, { scope })
}
