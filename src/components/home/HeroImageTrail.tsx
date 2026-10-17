'use client'

import { useEffect, useRef } from "react"
import { animate } from "framer-motion"

// Reprise du comportement mesuré sur libra-studio.fr : une image tous les 100px parcourus,
// centrée sur le curseur, qui grandit puis se rétracte au bout d'une demi-seconde
const SPAWN_DISTANCE = 100
const IMAGE_WIDTH = 210
const IMAGE_HEIGHT = 240
const VISIBLE_MS = 500
const ENTER_SPRING = { type: "spring", stiffness: 100, damping: 20, mass: 1 } as const
const EXIT_SPRING = { type: "spring", stiffness: 400, damping: 33, mass: 1 } as const

interface HeroImageTrailProps {
  images: string[]
  containerRef: React.RefObject<HTMLElement | null>
  // Coupe l'apparition de nouvelles images (survol des CTA)
  paused?: boolean
}

export default function HeroImageTrail({ images, containerRef, paused = false }: HeroImageTrailProps) {
  const layerRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(paused)

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    const container = containerRef.current
    const layer = layerRef.current
    if (!container || !layer || images.length === 0) return

    let lastSpawn: { x: number; y: number } | null = null
    let index = 0

    const spawn = (x: number, y: number) => {
      // Les DOM nodes sont créés à la main : aucun re-render React pendant le mouvement
      const el = document.createElement("div")
      el.style.cssText = `position:absolute;left:${x - IMAGE_WIDTH / 2}px;top:${y - IMAGE_HEIGHT / 2}px;width:${IMAGE_WIDTH}px;height:${IMAGE_HEIGHT}px;background-image:url("${images[index]}");background-size:cover;background-position:center;pointer-events:none;transform:scale(0);will-change:transform`
      index = (index + 1) % images.length
      layer.appendChild(el)

      animate(el, { scale: 1 }, ENTER_SPRING)
      window.setTimeout(() => {
        animate(el, { scale: 0 }, EXIT_SPRING).then(() => el.remove())
      }, VISIBLE_MS)
    }

    const handleMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || pausedRef.current) return

      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      if (lastSpawn && Math.hypot(x - lastSpawn.x, y - lastSpawn.y) < SPAWN_DISTANCE) return

      lastSpawn = { x, y }
      spawn(x, y)
    }

    const handleLeave = () => {
      lastSpawn = null
    }

    container.addEventListener("pointermove", handleMove)
    container.addEventListener("pointerleave", handleLeave)

    return () => {
      container.removeEventListener("pointermove", handleMove)
      container.removeEventListener("pointerleave", handleLeave)
      layer.replaceChildren()
    }
  }, [containerRef, images])

  return <div ref={layerRef} className="absolute inset-0 overflow-visible pointer-events-none" />
}
