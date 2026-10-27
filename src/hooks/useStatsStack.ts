'use client'
import { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// Chiffres clés au scroll : le texte s'allume mot à mot, puis chaque carte monte et se pose par-dessus la précédente.
// Balisage attendu dans le scope : data-stack-pin (bloc collé) > data-stack-word (mots du texte) + data-stack-card > data-stack-content
// Les chiffres sont affichés d'emblée à leur valeur (pas de compteur) pour être lisibles sans attendre le scroll
// Le scope passe en data-stack="on" pendant l'animation : la mise en page empilée et sticky est portée par ses variantes CSS
export function useStatsStack(scope: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = scope.current
      if (!section) return

      const pin = section.querySelector<HTMLElement>('[data-stack-pin]')
      if (!pin) return
      const cards = gsap.utils.toArray<HTMLElement>('[data-stack-card]', section)
      const contents = cards.map((card) => card.querySelector<HTMLElement>('[data-stack-content]'))

      gsap.set(section, { attr: { 'data-stack': 'on' } })
      // Le bloc colle à `top` (variante CSS) ; il se décolle quand le bas de la section atteint son bas
      const pinTop = () => parseFloat(getComputedStyle(pin).top) || 0

      // Texte du constat : les mots passent d'estompés à pleins en suivant le scroll (comme l'intro de la home)
      gsap.fromTo('[data-stack-word]',
        { opacity: 0.12 },
        {
          opacity: 1, stagger: 0.05, ease: "power2.out",
          scrollTrigger: { trigger: '[data-stack-word]', start: "top 80%", endTrigger: section, end: () => `top+=300 ${pinTop()}px`, scrub: 0.5, invalidateOnRefresh: true },
        }
      )

      // Les cartes suivantes attendent sous l'écran ; une carte recouverte recule d'un cran (plus petite, sa tranche dépasse en haut)
      const depth = (d: number) => ({ y: -d * 18, scale: 1 - d * 0.05 })
      cards.forEach((card, i) => {
        gsap.set(card, { zIndex: i + 1, transformOrigin: "50% 0%", y: i === 0 ? 0 : () => window.innerHeight })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: () => `top+=300 ${pinTop()}px`,
          end: () => `bottom ${pinTop() + pin.offsetHeight}px`,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
      for (let i = 1; i < cards.length; i++) {
        tl.to(cards[i], { y: 0, duration: 1, ease: "power2.out" }, i)
        // Les cartes déjà posées reculent d'un cran et s'estompent sous la nouvelle
        cards.slice(0, i).forEach((card, k) => {
          tl.to(card, { ...depth(i - k), duration: 1, ease: "power2.out" }, i)
          tl.to(contents[k], { opacity: 0.3, duration: 1 }, i)
        })
      }
      // Temps de pause sur la dernière carte avant de libérer la section
      tl.to({}, { duration: 0.5 })
    })
  }, { scope })
}
