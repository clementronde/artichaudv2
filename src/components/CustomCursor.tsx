'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Only on devices with a real pointer (not touch-only)
    if (!window.matchMedia('(pointer: fine)').matches) return

    let mouseX = 0
    let mouseY = 0
    let prevMouseX = 0
    let prevMouseY = 0
    let rotation = 0
    let targetRotation = 0
    let rafId: number
    let visible = false

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!visible && cursorRef.current) {
        cursorRef.current.style.opacity = '1'
        visible = true
      }
    }

    const tick = () => {
      const dx = mouseX - prevMouseX
      const dy = mouseY - prevMouseY
      prevMouseX = mouseX
      prevMouseY = mouseY

      const speed = Math.sqrt(dx * dx + dy * dy)

      if (speed > 0.3) {
        // +90 because the image points upward by default
        targetRotation = Math.atan2(dy, dx) * (180 / Math.PI) + 90
      }

      // Shortest-path smooth rotation
      let diff = targetRotation - rotation
      while (diff > 180) diff -= 360
      while (diff < -180) diff += 360
      rotation += diff * 0.1

      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouseX}px`
        cursorRef.current.style.top = `${mouseY}px`
        cursorRef.current.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`
      }

      rafId = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={cursorRef}
      src="/sourisartichaud.png"
      alt=""
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 'auto',
        height: '48px',
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: 0,
        willChange: 'transform',
        userSelect: 'none',
      }}
    />
  )
}
