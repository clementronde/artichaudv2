'use client'

import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Composant interne pour la synchronisation
function ScrollSync() {
  useLenis(() => {
    ScrollTrigger.update()
  })

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [])

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