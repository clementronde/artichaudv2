'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: "Sara Al Jamal",
    role: "Founder, Charit.IO",
    text: "Artichaud helped us find our voice. We stripped away the noise to focus on human connection.",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2727&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Kiera Monaghan",
    role: "CEO, Disobey",
    text: "It's time to start showing up with clarity. This team is a game changer for our brand identity.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "David Laroche",
    role: "Founder, Paradox",
    text: "The rebranding process was seamless. We take brands from where they are, to where they deserve to be.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2864&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "CMO, TechFlow",
    text: "We push pixels until it feels right. Artichaud pushed us further than we thought possible.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e0c7a8?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Marc Dupont",
    role: "Director, Studio A",
    text: "A truly 360 agency. From strategy to execution, every detail was handled with care.",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2940&auto=format&fit=crop"
  }
]

// --- CARTE AVIS ---
const ReviewCard = ({ item }: { item: typeof testimonials[0] }) => {
  return (
    <div className="relative -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[400px] bg-[#111] border border-black/5 rounded-none overflow-hidden flex flex-col shadow-2xl">
      <div className="p-8 pb-6 flex flex-col gap-6">
        <div className="relative">
          <span className="absolute -top-3 -left-1 text-4xl text-white/20 font-serif">“</span>
          <p className="text-lg text-white/90 font-light leading-relaxed relative z-10 pl-2">
            {item.text}
          </p>
        </div>
        <div className="flex flex-col border-t border-white/10 pt-4">
          <h4 className="text-base font-bold text-white">{item.name}</h4>
          <span className="text-xs text-white/50 font-medium uppercase tracking-wider">{item.role}</span>
        </div>
      </div>

      <div className="relative w-full h-[200px] mt-auto">
        <Image 
          src={item.image} 
          alt={item.name} 
          fill 
          className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#111]/90 pointer-events-none" />
      </div>
    </div>
  )
}

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const rotationRange = [25, -25] 
  const currentRotation = useTransform(scrollYProgress, [0, 1], rotationRange)

  const angleStep = 18 
  const radius = 1800 
  const pivotTopPosition = radius + 450 

  return (
    // ✅ z-30 pour que les cartes passent AU-DESSUS de la section suivante
    <section
      ref={containerRef}
      className="relative z-30 w-full h-[300vh] bg-white"
    >
      {/* Conteneur Sticky */}
      {/* ✅ overflow-hidden pour ne PAS créer de scroll horizontal */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col">

        {/* HEADER */}
        <div className="absolute top-20 w-full z-40 px-6 md:px-12 pointer-events-none">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5">
              <div className="col-span-1 hidden md:block pt-2">
                <span className="text-sm font-medium text-arti-black block">
                  Testimonials
                </span>
              </div>
              <div className="col-span-1 md:col-span-5 md:col-start-2">
                <h2 className="text-[40px] md:text-[60px] leading-[1.1] font-normal text-arti-black tracking-tight">
                  Loved by founders <br /> & industry leaders
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* ROUE */}
        <div className="relative w-full h-full flex justify-center">
          {/* Cercle pointillé */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none opacity-100 z-0" 
            style={{ 
              top: pivotTopPosition,
              width: radius * 2,
              height: radius * 2,
              marginTop: -radius,
            }}
          >
            <div className="w-full h-full border-2 border-dashed border-black/10 rounded-full" />
          </div>

          {/* Cartes rotatives */}
          <motion.div 
            className="absolute left-1/2 top-0 z-20"
            style={{ 
              top: pivotTopPosition,
              rotate: currentRotation, 
            }}
          >
            {testimonials.map((item, index) => {
              const middleIndex = Math.floor(testimonials.length / 2)
              const initialAngle = (index - middleIndex) * angleStep

              return (
                <div
                  key={item.id}
                  className="absolute left-0 top-0 flex justify-center items-center origin-bottom"
                  style={{
                    transform: `rotate(${initialAngle}deg) translateY(-${radius}px)`,
                    transformOrigin: '0 0'
                  }}
                >
                  <ReviewCard item={item} />
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
