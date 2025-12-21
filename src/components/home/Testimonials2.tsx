'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: "Tobias Schaller",
    role: "Managing Director, Charit.io",
    text: "Let's be honest. You've built something great. But lately, it's been harder to capture attention, or even - the right kind. Maybe your brand feels a little out of step with where your business is heading.",
  },
  {
    id: 2,
    name: "Kiera Monaghan",
    role: "CEO, Disobey",
    text: "It's time to start showing up with clarity. This team is a game changer. We stripped away the noise to focus on human connection and it paid off immediately.",
  },
  {
    id: 3,
    name: "David Laroche",
    role: "Founder, Paradox",
    text: "The rebranding process was seamless. We take brands from where they are, to where they deserve to be. The strategic depth they brought was impressive.",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "CMO, TechFlow",
    text: "We push pixels until it feels right. Artichaud pushed us further than we thought possible. A truly 360 agency from strategy to execution.",
  },
  {
    id: 5,
    name: "Marc Dupont",
    role: "Director, Studio A",
    text: "A truly 360 agency. From strategy to execution, every detail was handled with care. The result exceeded our expectations in every way.",
  }
]

export default function Testimonials() {
  const [width, setWidth] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Calcul de la limite de drag : Largeur totale du contenu - Largeur visible de l'écran
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }
  }, [])

  return (
    <section className="relative w-full bg-white py-24 overflow-hidden">
      
      {/* 1. HALO JAUNE (D0FF00) */}
      <div 
        className="absolute right-[-10%] top-[10%] w-[60vw] h-[60vw] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(208,255,0,0.6) 0%, rgba(208,255,0,0) 70%)',
          filter: 'blur(120px)',
          opacity: 0.8
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* 2. HEADER */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 mb-20">
          <div className="md:col-span-2 pt-2">
            <span className="text-sm font-medium text-black">Testimonials</span>
          </div>

          <div className="md:col-span-8">
            <h2 
              className="text-[40px] md:text-[60px] font-normal text-black leading-[1.1] tracking-tight mb-8"
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
            >
              Read Some of Our <br /> Success Stories
            </h2>
            
            <Link 
              href="/testimonials" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-300 group"
            >
              <span className="text-sm font-medium">Read all testimonials</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* 3. SLIDER DRAGGABLE (Framer Motion) */}
        {/* 'overflow-hidden' cache tout ce qui dépasse, y compris la scrollbar native */}
        <div ref={carouselRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
          
          <motion.div 
            drag="x" // Active le drag horizontal
            dragConstraints={{ right: 0, left: -width }} // Limite le mouvement pour ne pas sortir du cadre
            whileTap={{ cursor: "grabbing" }} // Change le curseur quand on clique
            className="flex"
          >
            {testimonials.map((item, index) => (
              <div 
                key={item.id} 
                className={`
                  shrink-0 w-[85vw] md:w-[450px] pr-8 md:pr-12 flex flex-col justify-between h-auto min-h-[300px] select-none
                  ${index !== 0 ? 'border-l border-gray-200 pl-8 md:pl-12' : ''} 
                `}
              >
                
                <div className="flex flex-col gap-6">
                  {/* Texte et Quote Icon */}
                  <div className="relative">
                      <p 
                          className="text-lg md:text-xl text-black leading-relaxed font-light pointer-events-none" // pointer-events-none évite de sélectionner le texte pendant le drag
                          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                      >
                          {item.text}
                      </p>
                      <span className="absolute -top-2 -right-0 md:-right-4 text-4xl font-serif text-black leading-none select-none">
                          ”
                      </span>
                  </div>
                </div>

                {/* Auteur en bas */}
                <div className="mt-8 pt-6 pointer-events-none">
                  <h4 className="text-base font-bold text-black">{item.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{item.role}</p>
                </div>

              </div>
            ))}
          </motion.div>
          
        </div>

      </div>
    </section>
  )
}