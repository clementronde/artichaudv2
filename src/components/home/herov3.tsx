'use client'

import { useEffect, useRef, useState } from "react"
import { ImageTrail } from "@/components/ui/image-trail"
import Image from "next/image"
import Link from "next/link"
import { useLocale } from '@/context/LocaleContext'

export default function HeroV3() {
  const ref = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [imagesReady, setImagesReady] = useState(false)
  const { t } = useLocale()

  const images = [
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

  useEffect(() => {
    let cancelled = false

    const preload = images.map((url) => {
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
      className="relative w-full min-h-screen bg-white z-10 overflow-hidden"
    >
      {/* TRAIL CONTAINER */}
      <div className="absolute inset-0 z-[100] pointer-events-none overflow-visible">
        <ImageTrail 
          containerRef={ref} 
          interval={100}
          rotationRange={20}
          active={isActive && imagesReady}
        >
          {images.map((url, index) => (
            <div
              key={index}
              className="relative w-[180px] h-[180px] md:w-[240px] md:h-[240px] overflow-hidden shadow-2xl"
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
              <span className="block">{t.hero.title[0]}</span>
              <span className="block">{t.hero.title[1]}</span>
              <span className="block">{t.hero.title[2]}</span>
            </h1>
            <div className="mt-8 flex flex-col gap-3 pointer-events-auto sm:flex-row">
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
        {images.map((url, index) => (
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
