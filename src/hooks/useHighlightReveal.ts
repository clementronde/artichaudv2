'use client'
import { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// Animation de la grille « À la une » de la home, réutilisable sur toute grille balisée avec :
// data-hl-row="pair" | "full" > data-hl-tile > data-hl-parallax > data-hl-zoom > image
export function useHighlightReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add({
      isDesktop: "(min-width: 768px)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      const { isDesktop, reduceMotion } = context.conditions as { isDesktop: boolean; reduceMotion: boolean }
      if (reduceMotion) return

      // Joue à l'entrée, se referme en remontant au-dessus du déclencheur
      const REVEAL_TOGGLE = "play none none reverse"

      // 1. Révélation par masque : rideau de bas en haut + léger dézoom de l'image
      gsap.utils.toArray<HTMLElement>('[data-hl-row="pair"]').forEach((row) => {
        const tiles = row.querySelectorAll('[data-hl-tile]')
        const zooms = row.querySelectorAll('[data-hl-zoom]')
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 85%", toggleActions: REVEAL_TOGGLE } })
        tl.fromTo(tiles,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.out", stagger: 0.15 }
        )
        tl.fromTo(zooms,
          { scale: 1.25 },
          { scale: 1, duration: 1.6, ease: "power3.out", stagger: 0.15 },
          0
        )
      })

      // Sur mobile, le masque suffit (ligne pleine largeur comprise)
      if (!isDesktop) {
        gsap.utils.toArray<HTMLElement>('[data-hl-row="full"]').forEach((row) => {
          gsap.fromTo(row.querySelector('[data-hl-tile]'),
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: row, start: "top 85%", toggleActions: REVEAL_TOGGLE } }
          )
        })
        return
      }

      // 2. Ligne pleine largeur : carte étroite au centre qui s'étire jusqu'à la pleine largeur au fil du scroll
      gsap.utils.toArray<HTMLElement>('[data-hl-row="full"]').forEach((row) => {
        const scrollTrigger = { trigger: row, start: "top 95%", end: "top 20%", scrub: 0.6 }
        gsap.fromTo(row.querySelector('[data-hl-tile]'),
          { clipPath: "inset(0% 30% 0% 30%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out", scrollTrigger }
        )
        gsap.fromTo(row.querySelector('[data-hl-zoom]'),
          { scale: 1.2 },
          { scale: 1, ease: "power2.out", scrollTrigger }
        )
      })

      // 3. Parallaxe interne : l'image défile un peu moins vite que son cadre
      gsap.utils.toArray<HTMLElement>('[data-hl-tile]').forEach((tile) => {
        gsap.fromTo(tile.querySelector('[data-hl-parallax]'),
          { yPercent: -7 },
          { yPercent: 7, ease: "none", scrollTrigger: { trigger: tile, start: "top bottom", end: "bottom top", scrub: true } }
        )
      })
    })
  }, { scope })
}
