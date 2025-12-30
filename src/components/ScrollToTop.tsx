// components/ScrollToTop.tsx
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLenis } from '@studio-freight/react-lenis'

export default function ScrollToTop() {
  const pathname = usePathname()
  const lenis = useLenis()

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  }, [pathname, lenis])

  return null
}
