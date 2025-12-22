'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
// On importe le type Variants pour corriger l'erreur TypeScript
import { motion, Variants } from 'framer-motion'

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

// Variants typés correctement
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Testimonials() {
  const [width, setWidth] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }
  }, [])

  return (
    // CORRECTION MAJEURE ICI :
    // 1. On retire 'overflow-x-hidden' pour autoriser le débordement vertical (le halo qui descend).
    // 2. On ajoute 'z-30' pour que cette section passe AU-DESSUS de la section suivante (sinon le halo passerait dessous).
    <section className="relative w-full bg-white py-24 z-30">
      
      {/* 1. HALO JAUNE ANIMÉ */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.3, 0.5]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute right-[-15%] top-[10%] w-[70vw] h-[70vw] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(208,255,0,0.5) 0%, rgba(208,255,0,0) 70%)',
          filter: 'blur(100px)',
          // Le halo va maintenant déborder naturellement sur la section du dessous grâce à l'absence d'overflow sur la section parente
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* 2. HEADER AVEC MICRO-ANIMATIONS */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-12 gap-y-8 mb-20"
        >
          <motion.div variants={fadeInUp} className="md:col-span-2 pt-2">
            <span className="text-sm font-medium text-black">Testimonials</span>
          </motion.div>

          <div className="md:col-span-8">
            <motion.h2 
              variants={fadeInUp}
              className="text-[40px] md:text-[60px] font-normal text-black leading-[1.1] tracking-tight mb-8"
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
            >
              Read Some of Our <br /> Success Stories
            </motion.h2>
            
            <motion.div variants={fadeInUp}>
              <Link 
                href="/testimonials" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-300 group"
              >
                <span className="text-sm font-medium">Read all testimonials</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* 3. SLIDER DRAGGABLE */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          ref={carouselRef} 
          className="overflow-visible cursor-grab active:cursor-grabbing"
        >
          
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }} 
            whileTap={{ cursor: "grabbing" }}
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
                  <div className="relative group">
                      <p 
                          className="text-lg md:text-xl text-black leading-relaxed font-light pointer-events-none transition-colors duration-300 group-hover:text-black/70"
                          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                      >
                          {item.text}
                      </p>
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + (index * 0.1) }}
                        className="absolute -top-2 -right-0 md:-right-4 text-4xl font-serif text-black leading-none select-none"
                      >
                          ”
                      </motion.span>
                  </div>
                </div>

                {/* Auteur en bas */}
                <div className="mt-8 pt-6 pointer-events-none border-t border-transparent group-hover:border-black/5 transition-colors duration-500">
                  <h4 className="text-base font-bold text-black">{item.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{item.role}</p>
                </div>

              </div>
            ))}
          </motion.div>
          
        </motion.div>

      </div>
    </section>
  )
}