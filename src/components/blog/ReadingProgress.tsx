'use client'

import { useEffect, useRef } from 'react'

// Fine barre rose en haut de l'écran qui avance avec la lecture de l'article
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = document.getElementById(targetId)
    if (!target) return

    let frame = 0
    const update = () => {
      frame = 0
      const { top, height } = target.getBoundingClientRect()
      const total = height - window.innerHeight
      const progress = total > 0 ? Math.min(1, Math.max(0, -top / total)) : 1
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
    }
    // Une seule mise à jour par image, même si le scroll envoie beaucoup d'événements
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [targetId])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[6001] h-[3px]">
      <div ref={barRef} className="h-full origin-left scale-x-0 bg-[#F70046]" />
    </div>
  )
}
