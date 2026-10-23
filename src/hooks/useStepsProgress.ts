'use client'
import { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// Étapes qui s'allument au scroll, à côté d'un titre sticky.
// Balisage attendu dans le scope : data-steps > data-step (x n), data-steps-progress (barre), data-steps-count (numéro affiché)
// L'étape qui croise le milieu de l'écran reçoit la classe is-active
export function useStepsProgress(scope: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const list = scope.current?.querySelector<HTMLElement>('[data-steps]')
      const count = scope.current?.querySelector<HTMLElement>('[data-steps-count]')
      if (!list) return
      const steps = gsap.utils.toArray<HTMLElement>('[data-step]', list)

      // Barre de progression sous le titre : se remplit pendant la traversée de la liste
      gsap.fromTo('[data-steps-progress]',
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 55%", end: "bottom 55%", scrub: true } }
      )

      steps.forEach((step, i) => {
        // Entrée : l'étape monte et se révèle en suivant le scroll
        gsap.fromTo(step,
          { opacity: 0.25, y: 60 },
          { opacity: 1, y: 0, ease: "power2.out", scrollTrigger: { trigger: step, start: "top 95%", end: "top 60%", scrub: 0.6 } }
        )
        // Étape en cours : surlignée, et son numéro s'affiche sous le titre
        ScrollTrigger.create({
          trigger: step,
          start: "top 55%",
          end: "bottom 55%",
          toggleClass: { targets: step, className: "is-active" },
          onToggle: ({ isActive }) => {
            if (isActive && count) count.textContent = String(i + 1).padStart(2, "0")
          },
        })
      })
    })
  }, { scope })
}
