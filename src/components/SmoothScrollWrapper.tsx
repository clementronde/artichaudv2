'use client'

import { useEffect, useState } from 'react'
import SmoothScroll from './SmoothScroll'

export default function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Détection mobile côté client uniquement
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // Désactive smooth scroll sous 1024px
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return <SmoothScroll enabled={!isMobile}>{children}</SmoothScroll>
}
