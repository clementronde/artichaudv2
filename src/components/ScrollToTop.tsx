// components/ScrollToTop.tsx
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Force le scroll en haut à gauche instantanément
    window.scrollTo(0, 0)
    
    // Si vous utilisez une balise 'html' avec smooth-scroll CSS, ceci est nécessaire :
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    
  }, [pathname]) // Se déclenche à chaque changement d'URL (pathname)

  return null // Ce composant n'affiche rien visuellement
}