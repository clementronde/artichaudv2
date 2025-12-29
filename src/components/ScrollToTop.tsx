// components/ScrollToTop.tsx
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLenis } from '@studio-freight/react-lenis'

export default function ScrollToTop() {
  const pathname = usePathname()
  const lenis = useLenis()

  useEffect(() => {
    // Utilise l'API Lenis pour scroller en haut instantanément
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
    } else {
      // Fallback si Lenis n'est pas disponible
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  }, [pathname, lenis]) // Se déclenche à chaque changement d'URL

  return null // Ce composant n'affiche rien visuellement
}