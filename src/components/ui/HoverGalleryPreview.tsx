'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// Aperçu au survol, retiré du bloc Highlight et mis de côté pour plus tard.
// Une carte suit la souris dans le conteneur et fait défiler la galerie du projet.
// Utilisation : placer <HoverGalleryPreview containerRef={ref} gallery={[...]} alt="..." />
// dans un conteneur `relative overflow-hidden` (ajouter data-hide-custom-cursor sur le conteneur)

// Dimensions exactes de la carte flottante
const CARD_WIDTH = 280
const CARD_HEIGHT = 360
const PADDING = 20 // Marge de sécurité

interface HoverGalleryPreviewProps {
  containerRef: React.RefObject<HTMLElement | null>
  gallery: string[]
  alt: string
}

export default function HoverGalleryPreview({ containerRef, gallery, alt }: HoverGalleryPreviewProps) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useGSAP(() => {
    const container = containerRef.current
    const cursor = cursorRef.current
    if (!container || !cursor) return

    const xTo = gsap.quickTo(cursor, "left", { duration: 0.3, ease: "power3.out" })
    const yTo = gsap.quickTo(cursor, "top", { duration: 0.3, ease: "power3.out" })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()

      // Position relative de la souris, bornée pour que la carte reste dans le conteneur
      const minX = (CARD_WIDTH / 2) + PADDING
      const maxX = rect.width - (CARD_WIDTH / 2) - PADDING
      const minY = (CARD_HEIGHT / 2) + PADDING
      const maxY = rect.height - (CARD_HEIGHT / 2) - PADDING

      xTo(Math.max(minX, Math.min(e.clientX - rect.left, maxX)))
      yTo(Math.max(minY, Math.min(e.clientY - rect.top, maxY)))
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.2)" })
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      setGalleryIndex(0)
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" })
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, { dependencies: [containerRef] })

  useEffect(() => {
    if (!isHovered) return
    const interval = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % gallery.length)
    }, 550)
    return () => clearInterval(interval)
  }, [isHovered, gallery.length])

  return (
    <div
      ref={cursorRef}
      className="absolute pointer-events-none z-20 opacity-0 scale-0 origin-center"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="relative w-full h-full bg-gray-200 shadow-2xl overflow-hidden">
        <Image
          src={gallery[galleryIndex]}
          alt={alt}
          fill
          sizes="320px"
          className="object-cover"
        />
      </div>
    </div>
  )
}
