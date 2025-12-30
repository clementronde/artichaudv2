'use client'

import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Composant interne pour la synchronisation et les ancres
function ScrollSync() {
  // Récupération de l'instance Lenis
  const lenis = useLenis(({ scroll }) => {
    ScrollTrigger.update()
  })

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [])

  // --- NOUVEAU : Interception des clics sur les ancres ---
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      const href = link?.getAttribute('href')

      // Si c'est un lien d'ancrage valide (commence par #) et que Lenis est prêt
      if (link && href?.startsWith('#') && href.length > 1 && lenis) {
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
  }, [lenis])

  return null
}

// 'any' pour contourner le conflit React 18/19
export default function SmoothScroll({ children }: { children: any }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1, 
        duration: 1.5, 
        smoothWheel: true,
      }}
    >
      <ScrollSync />
      {children}
    </ReactLenis>
  )
}