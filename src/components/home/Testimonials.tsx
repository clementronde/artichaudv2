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
    avatar: "https://images.unsplash.com/photo-avatar-1...",  // ← Avatar dédié
    image: "https://images.unsplash.com/photo-project-1..."   // ← Image projet
  },
  {
    id: 2,
    name: "Kiera Monaghan",
    role: "CEO, Disobey",
    text: "It's time to start showing up with clarity. This team is a game changer for our brand identity.",
    avatar: "https://images.unsplash.com/photo-avatar-1...",  // ← Avatar dédié
    image: "https://images.unsplash.com/photo-project-1..."   // ← Image projet
  },
  {
    id: 3,
    name: "David Laroche",
    role: "Founder, Paradox",
    text: "The rebranding process was seamless. We take brands from where they are, to where they deserve to be.",
    avatar: "https://images.unsplash.com/photo-avatar-1...",  // ← Avatar dédié
    image: "https://images.unsplash.com/photo-project-1..."   // ← Image projet
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "CMO, TechFlow",
    text: "We push pixels until it feels right. Artichaud pushed us further than we thought possible.",
    avatar: "https://images.unsplash.com/photo-avatar-1...",  // ← Avatar dédié
    image: "https://images.unsplash.com/photo-project-1..."   // ← Image projet
  },
  {
    id: 5,
    name: "Marc Dupont",
    role: "Director, Studio A",
    text: "A truly 360 agency. From strategy to execution, every detail was handled with care.",
    avatar: "https://images.unsplash.com/photo-avatar-1...",  // ← Avatar dédié
    image: "https://images.unsplash.com/photo-project-1..."   // ← Image projet
  }
]// --- CARTE AVIS ---
const ReviewCard = ({ item }: { item: typeof testimonials[0] }) => {
  return (
    <div className="relative -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[400px] bg-[#111]  overflow-hidden flex flex-col shadow-2xl">
      
      {/* CONTENU AVEC PADDING */}
      <div className="p-6 md:p-8 flex flex-col gap-5">
        
        {/* 1. AVATAR + NOM + ENTREPRISE */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/10">
            <Image 
              src={item.image} 
              alt={item.name} 
              fill 
              className="object-cover"
            />
          </div>
          {/* Nom + Rôle */}
          <div className="flex flex-col gap-0.5">
            <h4 className="text-base font-bold text-white leading-tight">{item.name}</h4>
            <span className="text-xs text-white/50 font-medium uppercase tracking-wider">{item.role}</span>
          </div>
        </div>

        {/* 2. AVIS */}
        <p className="text-base text-white/80 font-light leading-relaxed">
          {item.text}
        </p>

         {/* 3. IMAGE - Hover rounded-full */}
        <div className="relative w-full aspect-[16/10]  hover:rounded-full overflow-hidden transition-all duration-500 ease-out">
          <Image 
            src={item.image} 
            alt={item.name} 
            fill 
            className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
          />
        </div>

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
    <section
      ref={containerRef}
      className="relative z-30 w-full h-[300vh] bg-white"
    >
      {/* Conteneur Sticky */}
      {/* ✅ RETIRÉ overflow-hidden pour que les cartes débordent */}
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col">

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

          {/* Cartes rotatives - z-index augmenté */}
          <motion.div 
            className="absolute left-1/2 top-0 z-[60]"  
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