'use client'

import { useEffect, useRef, useState } from "react"
import { ImageTrail } from "@/components/ui/image-trail"
import Image from "next/image"
import Link from "next/link"
import { useLocale } from '@/context/LocaleContext'

const HERO_TRAIL_IMAGES = [
  "/projects/charitio/charitioprojet2.avif",
  "/projects/cherico/chericoprojet2.avif",
  "/projects/comon/comonprojet2.avif",
  "/projects/disobey/disobeyprojet2.avif",
  "/projects/jobmi/jobmiprojet2.avif",
  "/projects/keleti/keletiprojet2.avif",
  "/projects/lumyn/Lumynprojet2.avif",
  "/projects/multiface/multifaceprojet2.avif",
  "/projects/rockstar/rockstarprojet2.avif",
  "/projects/yumdeal/yumdealprojet2.avif",
]

const TRAIL_INTERVAL_MS = 180
const HERO_TRAIL_ANIMATION_SEQUENCE = [
  [
    { scale: 1, opacity: 1, y: 0 },
    {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  ],
  [
    { scale: 0.8, opacity: 0, y: 40 },
    {
      duration: 1.2,
      ease: "easeOut",
    },
  ],
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
          <Image src={item.url} alt="" fill className="object-cover" sizes="150px" />
        </div>
      ))}
    </div>
  )
}

export default function HeroV3() {
  const ref = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [isCtaHovered, setIsCtaHovered] = useState(false)
  const [imagesReady, setImagesReady] = useState(false)
  const { t } = useLocale()

  useEffect(() => {
    let cancelled = false

    const preload = HERO_TRAIL_IMAGES.map((url) => {
      const img = new window.Image()
      img.src = url

      if ('decode' in img) {
        return img.decode().catch(() => undefined)
      }

      return new Promise<void>((resolve) => {
        img.onload = () => resolve()
        img.onerror = () => resolve()
      })
    })

    Promise.all(preload).then(() => {
      if (!cancelled) setImagesReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section 
      ref={ref}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className="relative z-20 w-full min-h-screen overflow-visible bg-white"
    >
      {/* TRAIL CONTAINER - desktop only */}
      <div className="hidden lg:block absolute inset-0 z-[100] pointer-events-none overflow-visible">
        <ImageTrail
          containerRef={ref}
          interval={TRAIL_INTERVAL_MS}
          rotationRange={20}
          animationSequence={HERO_TRAIL_ANIMATION_SEQUENCE}
          active={isActive && imagesReady && !isCtaHovered}
        >
          {HERO_TRAIL_IMAGES.map((url, index) => (
            <div
              key={index}
              className="relative w-[240px] h-[240px] overflow-hidden shadow-2xl"
            >
              <Image
                src={url}
                alt={`Project ${index}`}
                fill
                priority
                className="object-cover"
                sizes="240px"
              />
            </div>
          ))}
        </ImageTrail>
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
              <span className="inline lg:block">{t.hero.title[0]} </span>
              <span className="inline lg:block">{t.hero.title[1]} </span>
              <span className="inline lg:block">{t.hero.title[2]}</span>
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

      {/* PRELOAD IMAGES - Hidden images so the preloader tracks them via document.images */}
      <div aria-hidden="true" className="absolute w-0 h-0 overflow-hidden pointer-events-none">
        {HERO_TRAIL_IMAGES.map((url, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={index}
            src={url}
            alt=""
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width={1}
            height={1}
          />
        ))}
      </div>

    </section>
  )
}
