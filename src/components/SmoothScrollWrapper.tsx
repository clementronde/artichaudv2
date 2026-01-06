'use client'

import { useEffect, useState } from 'react'
import SmoothScroll from './SmoothScroll'

export default function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Détection mobile côté client uniquement
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // Désactive smooth scroll sous 1024px
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Évite le flash pendant l'hydratation
  if (!mounted) {
    return <>{children}</>
  }

  // Sur mobile, pas de smooth scroll = économie de performance
  if (isMobile) {
    return <>{children}</>
  }

  // Sur desktop, smooth scroll activé
  return <SmoothScroll>{children}</SmoothScroll>
}
