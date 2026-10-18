'use client'

import { useEffect, useRef, useState } from "react"
import { preload } from "react-dom"
import Link from "next/link"
import HeroImageTrail from "@/components/home/HeroImageTrail"
import TypewriterWords from "@/components/home/TypewriterWords"
import { useLocale } from '@/context/LocaleContext'

// Vignettes 420x480 dédiées : légères et préchargées dès le HTML, la traînée est instantanée
const HERO_TRAIL_IMAGES = [
  "/hero/trail/charitio.webp",
  "/hero/trail/remembraance.webp",
  "/hero/trail/cherico.webp",
  "/hero/trail/comon.webp",
  "/hero/trail/caisse-epargne.webp",
  "/hero/trail/disobey.webp",
  "/hero/trail/jobmi.webp",
  "/hero/trail/keleti.webp",
  "/hero/trail/lumyn.webp",
  "/hero/trail/multiface.webp",
  "/hero/trail/rockstar.webp",
  "/hero/trail/yumdeal.webp",
]

type FloatingItem = { id: number; url: string; x: number; y: number }

const FLOAT_IMG_SIZE = 150
const FLOAT_IMG_MARGIN = 20

function MobileFloatingImages() {
  const [items, setItems] = useState<FloatingItem[]>([])
  const counter = useRef(0)
  const activeUrls = useRef<Set<string>>(new Set())
  const activeItems = useRef<FloatingItem[]>([])

  useEffect(() => {
    const DURATION = 3200

    const spawn = () => {
      const available = HERO_TRAIL_IMAGES.filter(url => !activeUrls.current.has(url))
      if (available.length === 0) return

      const url = available[Math.floor(Math.random() * available.length)]
      const id = counter.current++
      const vw = window.innerWidth
      const vh = window.innerHeight

      // Zone réservée en bas : titre (≈150px) + boutons (≈125px) + pb-28 (112px) + marge
      const BOTTOM_RESERVED = 450
      const maxYpx = vh - BOTTOM_RESERVED - FLOAT_IMG_SIZE
      if (maxYpx < 50) return  // écran trop petit pour placer une image sans chevaucher le texte
      const maxYPercent = (maxYpx / vh) * 100

      let x = 0, y = 0, placed = false

      for (let attempt = 0; attempt < 15; attempt++) {
        x = Math.random() * 90 - 12  // -12–78% (débordement possible gauche/droite)
        y = Math.random() * (maxYPercent - 3) + 3  // dynamique : jamais sous le texte

        const nx = (x / 100) * vw
        const ny = (y / 100) * vh

        const overlaps = activeItems.current.some(item => {
          const ix = (item.x / 100) * vw
          const iy = (item.y / 100) * vh
          return !(
            nx + FLOAT_IMG_SIZE + FLOAT_IMG_MARGIN <= ix ||
            ix + FLOAT_IMG_SIZE + FLOAT_IMG_MARGIN <= nx ||
            ny + FLOAT_IMG_SIZE + FLOAT_IMG_MARGIN <= iy ||
            iy + FLOAT_IMG_SIZE + FLOAT_IMG_MARGIN <= ny
          )
        })

        if (!overlaps) { placed = true; break }
      }

      if (!placed) return

      const item: FloatingItem = { id, url, x, y }
      activeUrls.current.add(url)
      activeItems.current = [...activeItems.current, item]
      setItems(prev => [...prev, item])

      setTimeout(() => {
        activeUrls.current.delete(url)
        activeItems.current = activeItems.current.filter(i => i.id !== id)
        setItems(prev => prev.filter(i => i.id !== id))
      }, DURATION)
    }

    spawn()
    const t1 = setTimeout(spawn, 500)
    const t2 = setTimeout(spawn, 1100)
    const interval = setInterval(spawn, 950)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map(item => (
        <div
          key={item.id}
          className="absolute overflow-hidden shadow-2xl"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: FLOAT_IMG_SIZE,
            height: FLOAT_IMG_SIZE,
            animation: 'floatImageIn 3.2s ease-in-out forwards',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.url} alt="" className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  )
}

export default function HeroV3() {
  const ref = useRef<HTMLDivElement>(null)
  const [isCtaHovered, setIsCtaHovered] = useState(false)
  const { t } = useLocale()

  HERO_TRAIL_IMAGES.forEach((url) => preload(url, { as: "image" }))

  return (
    <section 
      ref={ref}
      className="relative z-20 w-full min-h-screen overflow-visible bg-white"
    >
      {/* TRAIL CONTAINER - desktop only */}
      <div className="hidden lg:block absolute inset-0 z-[100] pointer-events-none overflow-visible">
        <HeroImageTrail images={HERO_TRAIL_IMAGES} containerRef={ref} paused={isCtaHovered} />
      </div>

      {/* FLOATING IMAGES - mobile & tablet only */}
      <div className="lg:hidden absolute inset-0 z-[5]">
        <MobileFloatingImages />
      </div>

      {/* TEXTE PRINCIPAL */}
      <div className="absolute inset-0 z-20 w-full h-full pointer-events-none flex flex-col justify-end items-start px-6 pb-28 md:px-[7vw] md:pb-[12vh]">
        <div className="max-w-[980px] text-left">
            <h1
              className="font-normal text-black tracking-tight"
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: 'clamp(42px, 5.4vw, 86px)',
                lineHeight: 1.18,
              }}
            >
              {/* Phrase complète pour les lecteurs d'écran et les moteurs, la version animée est masquée pour eux */}
              <span className="sr-only">
                {t.hero.title.start} {t.hero.title.services.join(', ')}.
              </span>
              <span aria-hidden="true">
                <span>{t.hero.title.start} </span>
                <span className="block">
                  <TypewriterWords words={t.hero.title.services} />
                </span>
              </span>
            </h1>
            <div
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
              className="mt-8 flex flex-col gap-3 pointer-events-auto sm:flex-row"
            >
              <Link
                href="/contact"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-black px-7 text-base font-medium text-white transition-colors duration-300 hover:bg-[#F70046]"
              >
                <span>→</span>
                <span>{t.hero.ctaDiscuss}</span>
              </Link>
              <Link
                href="/works"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-black/15 px-7 text-base font-medium text-black transition-colors duration-300 hover:border-black hover:bg-black hover:text-white"
              >
                {t.hero.ctaProjects}
              </Link>
            </div>
        </div>
      </div>
      
      {/* BOUTON SCROLL */}
      <div className="absolute bottom-8 right-8 z-30 pointer-events-auto">
        <button 
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="flex items-center gap-2 text-sm font-medium tracking-wider text-black hover:opacity-70 transition-opacity"
        >
          {t.hero.scroll}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

    </section>
  )
}
