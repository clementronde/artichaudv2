'use client'
import { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// Pile de chiffres clés au scroll : la carte de devant s'envole, la suivante avance, son chiffre défile.
// Balisage attendu dans le scope : data-stack-card > data-stack-content + data-stack-value (data-value, data-prefix, data-suffix)
// Le scope passe en data-stack="on" pendant l'animation : la mise en page empilée et sticky est portée par ses variantes CSS
export function useStatsStack(scope: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const section = scope.current
      if (!section) return

      const cards = gsap.utils.toArray<HTMLElement>('[data-stack-card]', section)
      const contents = cards.map((card) => card.querySelector<HTMLElement>('[data-stack-content]'))
      const values = cards.map((card) => card.querySelector<HTMLElement>('[data-stack-value]')!)
      const format = (el: HTMLElement, v: number) => `${el.dataset.prefix ?? ''}${v}${el.dataset.suffix ?? ''}`

      gsap.set(section, { attr: { 'data-stack': 'on' } })

      // Position dans la pile : 0 = devant, puis chaque carte un cran plus bas, plus petite et estompée
      const slot = (k: number) => ({ y: k * 45, scale: 1 - k * 0.06 })
      cards.forEach((card, i) => {
        gsap.set(card, { ...slot(i), zIndex: cards.length - i, transformOrigin: "50% 50%" })
        gsap.set(contents[i], { opacity: i === 0 ? 1 : 0.35 })
        values[i].textContent = format(values[i], 0)
      })

      // Le chiffre suit le scroll : il remonte à 0 si l'on revient en arrière
      const count = (el: HTMLElement) => {
        const counter = { v: 0 }
        return gsap.to(counter, {
          v: Number(el.dataset.value),
          duration: 0.7,
          ease: "power1.out",
          onUpdate: () => { el.textContent = format(el, Math.round(counter.v)) },
        })
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.6 },
      })
      tl.add(count(values[0]), 0)

      for (let i = 1; i < cards.length; i++) {
        tl.to(cards[i - 1], { y: -60, scale: 1.03, opacity: 0, duration: 1, ease: "power2.in" }, i)
        cards.slice(i).forEach((card, k) => tl.to(card, { ...slot(k), duration: 1, ease: "power2.inOut" }, i))
        tl.to(contents[i], { opacity: 1, duration: 0.6 }, i + 0.3)
        tl.add(count(values[i]), i + 0.5)
      }
      // Temps de pause sur la dernière carte avant de libérer la section
      tl.to({}, { duration: 0.5 })

      // Le texte n'est pas suivi par le revert de GSAP : on rend les vraies valeurs
      return () => values.forEach((el) => { el.textContent = format(el, Number(el.dataset.value)) })
    })
  }, { scope })
}
