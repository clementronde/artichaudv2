'use client'
import { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// Entrée du hero puis parallaxe au scroll.
// Balisage attendu dans le scope : data-hero-photo > data-hero-zoom (image plus haute que son cadre) + data-hero-cover (rideau, invisible par défaut),
// data-hero-word (mots du titre, chacun dans un masque overflow-hidden), data-hero-fade, data-hero-badge, data-hero-content,
// data-hero-ring (pastille WhatsApp qui sonne) > data-hero-ring-wave (onde)
export function useHeroIntro(scope: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add({
      motion: "(prefers-reduced-motion: no-preference)",
      desktop: "(min-width: 768px)",
    }, (ctx) => {
      const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean }
      if (!motion) return

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } })

      // Desktop : un rideau bordeaux au bord dégradé glisse vers la gauche et découvre la photo de droite à gauche.
      // Mobile (photo en fond plein écran) : simple fondu. Dans les deux cas l'image dézoome
      if (desktop) {
        tl.fromTo('[data-hero-cover]', { opacity: 1, xPercent: 0 }, { xPercent: -100, duration: 1.6, ease: "expo.inOut" }, 0)
      } else {
        tl.from('[data-hero-photo]', { opacity: 0, duration: 1.4, ease: "power2.out" }, 0)
      }
      tl.from('[data-hero-zoom]', { scale: 1.25, duration: 2.2 }, 0)

      // Les mots du titre sortent de leur masque l'un après l'autre
      tl.from('[data-hero-word]', { yPercent: 110, rotate: 4, duration: 1.1, stagger: 0.06 }, 0.35)
      tl.from('[data-hero-fade]', { y: 24, opacity: 0, duration: 1 }, 0.85)

      // Les pastilles éclosent en cascade
      tl.from('[data-hero-badge]', { y: 20, scale: 0.6, opacity: 0, duration: 0.8, ease: "back.out(1.8)", stagger: 0.08 }, 1)

      // Le logo WhatsApp sort de sa pastille et sonne, de temps en temps
      const ring = gsap.timeline({ repeat: -1, repeatDelay: 3.5, delay: 2.2 })
      ring.to('[data-hero-ring]', { scale: 1.35, x: -4, y: -8, duration: 0.35, ease: "back.out(3)" })
        .fromTo('[data-hero-ring]', { rotate: -14 }, { rotate: 14, duration: 0.07, repeat: 9, yoyo: true, ease: "sine.inOut" }, ">-0.05")
        .fromTo('[data-hero-ring-wave]', { scale: 1, opacity: 0.8 }, { scale: 2.2, opacity: 0, duration: 0.9, ease: "power2.out" }, "<")
        .to('[data-hero-ring]', { scale: 1, x: 0, y: 0, rotate: 0, duration: 0.5, ease: "power3.inOut" }, ">+0.05")

      // Au scroll : la photo descend moins vite que la page, le texte s'éloigne
      const scroll = { trigger: scope.current, start: "top top", end: "bottom top", scrub: true }
      gsap.to('[data-hero-zoom]', { yPercent: 12, ease: "none", scrollTrigger: scroll })
      gsap.to('[data-hero-content]', { y: -90, opacity: 0.3, ease: "none", scrollTrigger: scroll })
    })
  }, { scope })
}
