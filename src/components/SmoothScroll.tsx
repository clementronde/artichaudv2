'use client'

import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Composant interne pour la synchronisation et les ancres
function ScrollSync({ enabled }: { enabled: boolean }) {
  // Récupération de l'instance Lenis
  const lenis = useLenis(({ scroll }) => {
    if (enabled) {
      ScrollTrigger.update()
    }
  })

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [])

  useEffect(() => {
    if (!lenis) return

    lenis.start()

    if (enabled) {
      ScrollTrigger.refresh()
    }
  }, [enabled, lenis])

  // --- NOUVEAU : Interception des clics sur les ancres ---
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      const href = link?.getAttribute('href')

      // Si c'est un lien d'ancrage valide (commence par #) et que Lenis est prêt
      if (enabled && link && href?.startsWith('#') && href.length > 1 && lenis) {
        e.preventDefault()
        
        lenis.scrollTo(href, {
          offset: 0, // Ajustez si vous avez un header fixe (ex: -100)
          duration: 1.5, 
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing exponentiel fluide
        })
      }
    }

    // On écoute tous les clics sur la page
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [enabled, lenis])

  return null
}

// 'any' pour contourner le conflit React 18/19
export default function SmoothScroll({ children, enabled = true }: { children: any, enabled?: boolean }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1, 
        duration: 1.5, 
        smoothWheel: enabled,
        smoothTouch: enabled,
      }}
    >
      <ScrollSync enabled={enabled} />
      {children}
    </ReactLenis>
  )
}
