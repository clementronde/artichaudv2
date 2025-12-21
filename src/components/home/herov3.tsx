'use client'

import { useRef, useState } from "react" // AJOUT useState
import { ImageTrail } from "@/components/ui/image-trail"
import Image from "next/image"

export default function HeroV3() {
  const ref = useRef<HTMLDivElement>(null)
  
  // AJOUT : État pour savoir si la souris est dans le Hero
  const [isActive, setIsActive] = useState(false)

  const images = [
    "/projects/charitio/charitioprojet2.avif",
    "/projects/cherico/chericoprojet2.avif",
    "/projects/comon/comonprojet2.avif",
    "/projects/disobey/disobeyprojet2.avif",
    "/projects/jobmi/jobmiprojet2.avif",
    "/projects/keleti/keletiprojet2.avif",
    "/projects/lumyn/lumynprojet2.avif",
    "/projects/multiface/multifaceprojet2.avif",
    "/projects/rockstar/rockstarprojet2.avif",
    "/projects/yumdeal/yumdealprojet2.avif",
  ]

  return (
    <section 
      ref={ref}
      // AJOUT : Gestionnaires d'événements pour activer/désactiver le trail
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className="relative w-full h-screen bg-white"
    >
      
      {/* CONTENEUR DONUTS (Overflow Hidden pour protéger le site) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* DONUT Desktop Flou */}
          <div 
            className="absolute hidden md:block"
            style={{
              width: '1560px', height: '1560px', right: '-400px', top: '-800px',
              borderRadius: '50%', background: 'transparent',
              border: '250px solid #D0FF00', filter: 'blur(250px)',
              opacity: 1, willChange: 'transform'
            }}
          />
          {/* DONUT Desktop Net */}
          <div 
            className="absolute hidden md:block"
            style={{
              width: '1560px', height: '1560px', right: '-400px', top: '-800px',
              borderRadius: '50%', background: 'transparent',
              border: '350px solid #D0FF00', filter: 'blur(20px)',
              opacity: 0.6, willChange: 'transform'
            }}
          />
          {/* DONUT Mobile Flou */}
          <div 
            className="absolute md:hidden"
            style={{
              width: '800px', height: '800px', right: '-300px', top: '-400px',
              borderRadius: '50%', background: 'transparent',
              border: '120px solid #D0FF00', filter: 'blur(150px)', opacity: 1
            }}
          />
          {/* DONUT Mobile Net */}
          <div 
            className="absolute md:hidden"
            style={{
              width: '800px', height: '800px', right: '-300px', top: '-400px',
              borderRadius: '50%', background: 'transparent',
              border: '120px solid #D0FF00', filter: 'blur(15px)', opacity: 0.4
            }}
          />
      </div>

      {/* TRAIL CONTAINER */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        <ImageTrail 
          containerRef={ref} 
          interval={100}
          rotationRange={20}
          active={isActive} // AJOUT : On passe l'état actif
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
                className="object-cover"
                sizes="240px"
              />
            </div>
          ))}
        </ImageTrail>
      </div>

     {/* TEXTE PRINCIPAL */}
      <div className="absolute inset-0 z-20 w-full h-full pointer-events-none flex flex-col justify-end items-end p-6 md:p-12 pb-32">
        <div className="text-right">
            <h1 
              className="font-normal text-black tracking-tight"
              style={{ 
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: 'clamp(40px, 5.5vw, 80px)', 
              }}
            >
              <span className="block">Artichaud, c&rsquo;est le</span>
              <span className="block">studio de création web qui fait</span>
              <span className="block text-left">monter la température.</span>
            </h1>
        </div>
      </div>
      
      {/* BOUTON SCROLL */}
      <div className="absolute bottom-8 right-8 z-30 pointer-events-auto">
        <button 
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="flex items-center gap-2 text-sm font-medium tracking-wider text-black hover:opacity-70 transition-opacity"
        >
          SCROLL
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

    </section>
  )
}