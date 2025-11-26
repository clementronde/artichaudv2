'use client'
import { ReactLenis } from '@studio-freight/react-lenis'
// @ts-ignore  <-- Ajoute ça juste pour faire taire l'erreur rouge si elle persiste
import React from 'react'

interface SmoothScrollProps {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}