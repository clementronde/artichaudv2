'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, MotionValue, Variants } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// --- CONFIGURATION ---
type LogoPosition = 'top-right' | 'left-edge' | 'top-center';

const testimonials = [
  {
    id: 1,
    name: "Sara Al Jamal",
    role: "Charit.IO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    text: "Let's be honest. You've built something great. But lately, it's been harder to capture attention, or even - the right kind. Maybe your brand feels a little out of step with where your business is heading.",
    logoPos: 'top-right' as LogoPosition
  },
  {
    id: 2,
    name: "Kiera Monaghan",
    role: "Disobey",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    text: "Maybe your messaging isn't landing quite like you want it to. Or maybe you're just tired of excusing how your brand looks. It's time to start showing up with the clarity and confidence you know you deserve.",
    logoPos: 'left-edge' as LogoPosition
  },
  {
    id: 3,
    name: "David Laroche",
    role: "Paradox",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    text: "The clarity and confidence you know you deserve. And that's where we come in. We take brands from where they are, to where they deserve to be. It's been a game changer for us.",
    logoPos: 'top-center' as LogoPosition
  }
]

// --- 1. LE LOGO CURIEUX (Caché derrière) ---
const CuriousLogo = ({ isActive, position }: { isActive: boolean, position: LogoPosition }) => {
  const variants: Record<LogoPosition, Variants> = {
    'top-right': {
      initial: { x: -30, y: 30, rotate: -45, opacity: 0, scale: 0.8 }, 
      animate: { 
        x: 50, y: -50, rotate: 15, opacity: 1, scale: 1,
        transition: { type: "spring", stiffness: 120, damping: 14, delay: 0.1 }
      }
    },
    'left-edge': {
      initial: { x: 30, rotate: 45, opacity: 0, scale: 0.8 },
      animate: { 
        x: -50, rotate: -15, opacity: 1, scale: 1,
        transition: { type: "spring", stiffness: 150, damping: 14, delay: 0.1 }
      }
    },
    'top-center': {
      initial: { y: 30, opacity: 0, scale: 0.8 },
      animate: { 
        y: -60, opacity: 1, scale: 1,
        transition: { type: "spring", stiffness: 120, damping: 14, delay: 0.1 }
      }
    }
  }

  const getPositionClasses = (pos: LogoPosition) => {
    switch(pos) {
      case 'top-right': return 'top-4 right-4';
      case 'left-edge': return 'top-1/2 -translate-y-1/2 left-4';
      case 'top-center': return 'top-4 left-1/2 -translate-x-1/2';
      default: return '';
    }
  }

  return (
    <div className={`absolute z-0 pointer-events-none ${getPositionClasses(position)}`}>
      <motion.div
        variants={variants[position]}
        initial="initial"
        animate={isActive ? "animate" : "initial"}
        className="relative w-16 h-16 drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
      >
        <Image 
          src="/Logoblanc.png" 
          alt="Artichaud Logo" 
          width={64} 
          height={64}
          className="object-contain"
        />
      </motion.div>
    </div>
  )
}
// --- COMPOSANT SPOTLIGHT LAMP (FINAL : BLANC, BARRE DYNAMIQUE) ---
const SpotlightLamp = ({ isActive, mouseX }: { isActive: boolean, mouseX: MotionValue<number> }) => {
  const x = useTransform(mouseX, (val) => val / 2.5)
  const springX = useSpring(x, { stiffness: 40, damping: 20 })

  return (
    <div className="absolute inset-0 pointer-events-none rounded-3xl z-10 overflow-hidden">
      <motion.div 
        className="relative w-full h-full flex items-start justify-center isolate"
        style={{ x: springX }}
      >
        
        {/* Cône Gauche - Retour au Blanc */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          animate={{ opacity: isActive ? 1 : 0.5, width: isActive ? "30rem" : "15rem" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundImage: `conic-gradient(from 70deg at center top, var(--tw-gradient-stops))` }}
          className="absolute inset-auto right-1/2 h-[28rem] w-[30rem] bg-gradient-to-br from-white/30 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-full left-0 h-full bottom-0 z-20" style={{ maskImage: "linear-gradient(to bottom, transparent 10%, black 40%, transparent 90%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 10%, black 40%, transparent 90%)" }} />
        </motion.div>

        {/* Cône Droit - Retour au Blanc */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          animate={{ opacity: isActive ? 1 : 0.5, width: isActive ? "30rem" : "15rem" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundImage: `conic-gradient(from 290deg at center top, var(--tw-gradient-stops))` }}
          className="absolute inset-auto left-1/2 h-[28rem] w-[30rem] bg-gradient-to-bl from-transparent via-transparent to-white/30 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-full right-0 h-full bottom-0 z-20" style={{ maskImage: "linear-gradient(to bottom, transparent 10%, black 40%, transparent 90%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 10%, black 40%, transparent 90%)" }} />
        </motion.div>

        {/* Glow Central (Background) */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#0a0a0a] blur-2xl"></div>
        
        {/* Glow Central (Lumière d'ambiance) */}
        <div className="absolute top-0 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        
        {/* Bulbe Principal (Retour au Blanc) */}
        <motion.div 
            animate={{ opacity: isActive ? 0.5 : 0.2, scale: isActive ? 1 : 0.8 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-auto z-50 h-36 w-64 top-0 -translate-y-1/2 rounded-full bg-white/40 blur-3xl"
        ></motion.div>
        
        {/* Ligne filament (La barre) */}
        <motion.div
          // Initial : invisible
          initial={{ width: "0rem", opacity: 0 }}
          animate={{ 
            // Active : 15rem (agrandi un peu), Inactive : 0rem (disparait)
            width: isActive ? "15rem" : "0rem", 
            // Active : visible, Inactive : invisible
            opacity: isActive ? 1 : 0 
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          // Retour au blanc pur
          className="absolute inset-auto z-50 h-0.5 top-0 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        ></motion.div>

      </motion.div>
    </div>
  )
}
// --- 3. CARTE INDIVIDUELLE ---
const SpotlightCard = ({ 
  item, 
  hoveredId, 
  setHoveredId 
}: { 
  item: typeof testimonials[0]
  hoveredId: number | null
  setHoveredId: (id: number | null) => void 
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Motion Value pour suivre la position X de la souris
  const mouseX = useMotionValue(0)

  const isActive = hoveredId === item.id
  const isDimmed = hoveredId !== null && !isActive

  const handleMouseMove = ({ currentTarget, clientX }: React.MouseEvent) => {
    const { left, width } = currentTarget.getBoundingClientRect()
    // 0 = centre. 
    const xPosition = clientX - left - width / 2
    mouseX.set(xPosition)
  }

  return (
    <motion.div 
      className="relative h-full"
      animate={{
        scale: isActive ? 1.02 : isDimmed ? 0.98 : 1,
        opacity: isDimmed ? 0.3 : 1,
        filter: isDimmed ? 'blur(1px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ zIndex: isActive ? 50 : 10 }}
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseLeave={() => {
        setHoveredId(null)
        mouseX.set(0) // On remet la lumière au centre quand on sort
      }}
      onMouseMove={handleMouseMove}
    >
      
      {/* LOGO (z-0) */}
      <CuriousLogo isActive={isActive} position={item.logoPos} />

      {/* CARTE (z-10) */}
      <div 
        ref={cardRef}
        className={`
          group relative z-10 rounded-3xl overflow-hidden flex flex-col min-h-[500px] h-full
          transition-all duration-500 ease-out cursor-pointer
          bg-[#0a0a0a] border
          ${isActive 
            ? 'border-white/30 shadow-[0_-20px_80px_rgba(255,255,255,0.2)]' 
            : 'border-white/5 shadow-none'
          }
        `}
      >
        
        {/* LAMP - On passe mouseX pour le mouvement */}
        <SpotlightLamp isActive={isActive} mouseX={mouseX} />

        {/* CONTENU */}
        <div className="relative z-20 flex flex-col h-full p-8 md:p-10">
          
          <div className="flex flex-col gap-6 mt-auto">
            <div className="relative w-16 h-16">
              <motion.div 
                className="absolute inset-0 rounded-full bg-white/20 blur-xl"
                animate={{ scale: isActive ? 1.5 : 0, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />
              <Image 
                src={item.image}
                alt={item.name}
                width={64}
                height={64}
                className="relative rounded-full object-cover w-full h-full border-2 border-white/20"
              />
            </div>

            <div>
              <h3 className="text-2xl font-normal text-white">{item.name}</h3>
              <p className="font-light text-gray-400 mt-1">{item.role}</p>
            </div>
          </div>

          <p className="text-lg font-light leading-relaxed mt-8 text-gray-200">
            "{item.text}"
          </p>

          <div className="mt-auto pt-8 border-t border-white/10">
            <span className="text-sm flex items-center gap-2 text-white">
              Read full story 
              <motion.span 
                animate={{ x: isActive ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>
            </span>
          </div>

        </div>

      </div>
    </motion.div>
  )
}

// --- MAIN COMPONENT ---
export default function Testimonials() {
  const container = useRef(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  useGSAP(() => {
    gsap.from(".testim-title-line", {
      y: 100, opacity: 0, duration: 1.2, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 70%" }
    })
    gsap.from(".spotlight-card-wrapper", {
      y: 80, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: ".cards-container", start: "top 80%" }
    })
  }, { scope: container })

  return (
    <section ref={container} className="relative z-20 w-full bg-white px-6 md:px-12 pb-32 pt-40 md:pt-52 overflow-hidden">
      
      <AnimatePresence>
        {hoveredId !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 pointer-events-none z-40 bg-black/90"
          />
        )}
      </AnimatePresence>

      <div className="relative z-30 grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
        <div className="col-span-12 md:col-span-2">
          <span className="text-sm font-medium uppercase tracking-wide text-gray-500">
            Testimonials
          </span>
        </div>

        <div className="col-span-12 md:col-span-7">
          <h2 className="text-[45px] md:text-[60px] leading-[1.1] font-normal">
            <span className="testim-title-line block text-[#1a1a1a]">
              Read Some of Our
            </span>
            <span className="testim-title-line block text-[#1a1a1a]">
              Success Stories
            </span>
          </h2>
          
          <div className="testim-title-line mt-8">
            <Link 
              href="/testimonials"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/10 text-arti-black hover:bg-black hover:text-white transition-all duration-500 group"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              <span className="text-sm font-bold">Read all testimonials</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="cards-container relative z-50 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-12">
        {testimonials.map((item) => (
          <div key={item.id} className="spotlight-card-wrapper h-full">
            <SpotlightCard 
              item={item} 
              hoveredId={hoveredId} 
              setHoveredId={setHoveredId} 
            />
          </div>
        ))}
      </div>

    </section>
  )
}