'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'

// J'ai réécrit les avis pour qu'ils soient plus "punchy" et réalistes
// Ils couvrent maintenant : la peur du changement, la performance technique, et le ROI.
const testimonials = [
  {
    id: 1,
    name: "Thomas Vernier",
    role: "Fondateur, GreenPulse",
    text: "On avait peur que le côté 'trop technique' tue l'émotion de notre marque. Artichaud a prouvé le contraire. Ils ont réussi à coder une expérience fluide qui garde toute sa chaleur humaine. Le site est vivant, et ça se sent dans nos retours clients.",
  },
  {
    id: 2,
    name: "Sarah Lecomte",
    role: "CMO, Datadesk",
    text: "Passer de WordPress à leur stack Next.js a été le jour et la nuit. Nos pages chargent instantanément, notre score SEO a explosé, et l'équipe marketing a enfin un outil performant entre les mains. C'est de l'artisanat numérique de haut vol.",
  },
  {
    id: 3,
    name: "Julien Delmas",
    role: "CEO, Architekt Studio",
    text: "Un site beau, c'est bien. Un site qui rapporte, c'est mieux. Depuis la refonte, nos demandes de devis ont doublé. Ils ne se sont pas contentés de faire du 'joli', ils ont repensé tout notre parcours utilisateur avec une logique business implacable.",
  },
  {
    id: 4,
    name: "Eléonore B.",
    role: "Directrice Artistique, Maison Flow",
    text: "L'attention au détail frôle l'obsession chez eux. C'est la première fois qu'une agence comprend vraiment ce qu'on entend par 'minimaliste mais impactant'. Ils ont su traduire nos valeurs abstraites en une interface utilisateur concrète et élégante.",
  },
  {
    id: 5,
    name: "Marc Alibert",
    role: "Head of Growth, FinTask",
    text: "Enfin une agence qui ne parle pas qu'en jargon. De la stratégie à l'exécution, on s'est sentis accompagnés, pas juste facturés. Ils ont su challenger nos idées reçues pour nous emmener plus loin que prévu. Une collaboration précieuse.",
  }
]

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
    
    const handleResize = () => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
        }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="relative w-full bg-white py-24 z-30 overflow-hidden md:overflow-visible">
      
      {/* 1. HALO JAUNE INTENSE */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1], 
          opacity: [0.6, 0.4, 0.6] 
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] pointer-events-none z-0
                  bottom-[-20%] left-1/2 -translate-x-1/2 
                  md:top-[-10%] md:right-[-35%] md:left-auto md:translate-x-0 md:bottom-auto"
        style={{
          background: 'radial-gradient(circle, rgba(208,255,0) 0%, rgba(208,255,0,0) 70%)',
          filter: 'blur(40px)', 
        }}
      />

      <div className="container mx-auto px-0 md:px-0 relative z-10">
        
        {/* HEADER */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-12 gap-y-8 mb-12 md:mb-20"
        >
          <motion.div variants={fadeInUp} className="md:col-span-2 pt-2">
            <span className="text-sm font-medium text-black">Témoignages</span>
          </motion.div>

          <div className="md:col-span-8">
            <motion.h2
              variants={fadeInUp}
              className="text-[40px] md:text-[60px] font-normal text-black leading-[1.1] tracking-tight mb-8"
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
            >
              Ce que nos clients <br /> disent de nous
            </motion.h2>

            <motion.div variants={fadeInUp}>
              <Link
                href="/testimonials" // Assurez-vous que cette page existe, sinon mettre /works ou /contact
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-300 group"
              >
                <span className="text-sm font-medium">Lire plus d'avis</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* SLIDER */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          ref={carouselRef} 
          className="cursor-grab active:cursor-grabbing w-full"
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
                  <div className="relative group">
                      <p 
                          className="text-lg md:text-xl text-black leading-relaxed font-light pointer-events-none transition-colors duration-300 group-hover:text-black/70"
                          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                      >
                          {item.text}
                      </p>
                      {/* Guillemet décoratif */}
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + (index * 0.1) }}
                        className="absolute -top-4 -left-2 text-6xl font-serif text-black/5 leading-none select-none -z-10"
                      >
                          “
                      </motion.span>
                  </div>
                </div>

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