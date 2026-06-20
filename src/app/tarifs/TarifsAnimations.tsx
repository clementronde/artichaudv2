'use client'
import { useEffect } from 'react'
import gsap from 'gsap'

export default function TarifsAnimations() {
  useEffect(() => {
    const tl = gsap.timeline()
    tl.from('.tarifs-header-line', {
      y: 120,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.1
    }).from('.tarifs-card', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.15
    }, '-=0.5')
  }, [])
  return null
}
