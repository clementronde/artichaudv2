'use client'
import { ReactLenis } from '@studio-freight/react-lenis'

// On utilise 'any' pour contourner le conflit de version React 18/19
export default function SmoothScroll({ children }: { children: any }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}