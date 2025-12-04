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
    avatar: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop", 
    image: "/projects/Charit.avif" 
  },
  {
    id: 2,
    name: "Kiera Monaghan",
    role: "CEO, Disobey",
    text: "It's time to start showing up with clarity. This team is a game changer for our brand identity.",
    avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop", 
    image: "/projects/Disobey.avif" 
  },
  {
    id: 3,
    name: "David Laroche",
    role: "Founder, Paradox",
    text: "The rebranding process was seamless. We take brands from where they are, to where they deserve to be.",
    avatar: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop", 
    image: "/projects/Keleti.avif" 
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "CMO, TechFlow",
    text: "We push pixels until it feels right. Artichaud pushed us further than we thought possible.",
    avatar: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop", 
    image: "/projects/Lumyn.avif" 
  },
  {
    id: 5,
    name: "Marc Dupont",
    role: "Director, Studio A",
    text: "A truly 360 agency. From strategy to execution, every detail was handled with care.",
    avatar: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2864&auto=format&fit=crop", 
    image: "/projects/Multiface.avif" 
  }
]

// --- CARTE AVIS (Réutilisable) ---
const ReviewCard = ({ item, isMobile = false }: { item: typeof testimonials[0], isMobile?: boolean }) => {
  return (
    <div 
      className={`
        relative bg-[#111] overflow-hidden flex flex-col justify-between shadow-2xl
        ${isMobile 
          ? 'w-[85vw] h-[350px] shrink-0 snap-center' // Mobile : Largeur écran
          : 'w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2' // Desktop : Carré centré
        }
      `}
    >
      <div className="p-6 md:p-8 flex flex-col gap-5 h-full relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/10">
            <Image src={item.avatar} alt={item.name} fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-0.5">
            <h4 className="text-base font-bold text-white leading-tight">{item.name}</h4>
            <span className="text-xs text-white/50 font-medium uppercase tracking-wider">{item.role}</span>
          </div>
        </div>

        <p className="text-base text-white/80 font-light leading-relaxed">
          {item.text}
        </p>

        <div className="relative w-full aspect-[16/10] mt-auto hover:rounded-full overflow-hidden transition-all duration-500 ease-out border border-white/10">
          <Image src={item.image} alt={item.name} fill className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  // --- LOGIQUE DESKTOP ---
  const desktopContainerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: desktopContainerRef,
    offset: ["start start", "end end"]
  })
  
  const currentRotation = useTransform(scrollYProgress, [0, 1], [25, -25])
  
  const angleStep = 18 
  const radius = 1800 
  const pivotTopPosition = radius + 450 

  return (
    <section className="bg-white w-full">
      
      {/* =========================================
          VERSION MOBILE (Slider Simple)
          Visible uniquement sur < md
         ========================================= */}
      <div className="md:hidden py-24 w-full">
        {/* Header Mobile */}
        <div className="container mx-auto px-6 mb-12">
          <span className="text-sm font-medium text-arti-black block mb-4">Testimonials</span>
          <h2 className="text-[40px] leading-[1.1] font-normal text-arti-black tracking-tight">
            Loved by founders <br /> & industry leaders
          </h2>
        </div>

        {/* Slider Mobile */}
        <div className="w-full overflow-x-auto pb-8 px-6 snap-x snap-mandatory scroll-smooth no-scrollbar">
          <div className="flex gap-4 w-fit">
            {testimonials.map((item) => (
              <ReviewCard key={item.id} item={item} isMobile={true} />
            ))}
            <div className="w-2 shrink-0" />
          </div>
        </div>
      </div>


      {/* =========================================
          VERSION DESKTOP (Roue Sticky)
          Visible uniquement sur >= md
         ========================================= */}
      {/* IMPORTANT FIX : 
          1. Pas de overflow-hidden ici pour ne pas casser le sticky.
          2. Hauteur réduite à 250vh pour limiter l'espace blanc de fin.
      */}
      <div 
        ref={desktopContainerRef} 
        className="hidden md:block relative z-30 w-full h-[250vh]"
      >
        
        <div className="sticky top-0 left-0 w-full h-screen flex flex-col overflow-visible">
          
          {/* Header Desktop */}
          <div className="absolute top-20 w-full z-40 px-12 pointer-events-none">
            <div className="container mx-auto grid grid-cols-8 gap-x-5">
              <div className="col-span-1 pt-2">
                <span className="text-sm font-medium text-arti-black block">Testimonials</span>
              </div>
              <div className="col-span-5 col-start-2">
                <h2 className="text-[60px] leading-[1.1] font-normal text-arti-black tracking-tight">
                  Loved by founders <br /> & industry leaders
                </h2>
              </div>
            </div>
          </div>

          {/* Roue Desktop */}
          <div className="relative w-full h-full flex justify-center">
            {/* Cercle */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 pointer-events-none opacity-100 z-0" 
              style={{ top: pivotTopPosition, width: radius * 2, height: radius * 2, marginTop: -radius }}
            >
              <div className="w-full h-full border-2 border-dashed border-black/10 rounded-full" />
            </div>

            {/* Cartes */}
            <motion.div 
              className="absolute left-1/2 top-0 z-[60]"  
              style={{ top: pivotTopPosition, rotate: currentRotation }}
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
                    <ReviewCard item={item} isMobile={false} />
                  </div>
                )
              })}
            </motion.div>
          </div>

        </div>
      </div>

    </section>
  )
}