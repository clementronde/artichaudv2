'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    id: 1,
    name: "Sara Al Jamal",
    role: "Charit.IO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    text: "Let's be honest. You've built something great. But lately, it's been harder to capture attention, or even - the right kind. Maybe your brand feels a little out of step with where your business is heading.",
  },
  {
    id: 2,
    name: "Kiera Monaghan",
    role: "Disobey",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    text: "Maybe your messaging isn't landing quite like you want it to. Or maybe you're just tired of excusing how your brand looks. It's time to start showing up with the clarity and confidence you know you deserve.",
  },
  {
    id: 3,
    name: "David Laroche",
    role: "Paradox",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    text: "The clarity and confidence you know you deserve. And that's where we come in. We take brands from where they are, to where they deserve to be. It's been a game changer for us.",
  }
]

// --- SOUS-COMPOSANT : CARTE MAGNÉTIQUE ---
const MagneticCard = ({ item, hoveredId, setHoveredId }: { item: any, hoveredId: number | null, setHoveredId: (id: number | null) => void }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const xTo = useRef<any>(null)
  const yTo = useRef<any>(null)
  const rX = useRef<any>(null) 
  const rY = useRef<any>(null) 

  // État : Est-ce que CETTE carte est celle active ?
  const isActive = hoveredId === item.id;
  // État : Est-ce qu'une AUTRE carte est active (donc je dois m'éteindre) ?
  const isDimmed = hoveredId !== null && !isActive;

  useGSAP(() => {
    if (cardRef.current) {
      xTo.current = gsap.quickTo(cardRef.current, "x", { duration: 0.5, ease: "power3.out" })
      yTo.current = gsap.quickTo(cardRef.current, "y", { duration: 0.5, ease: "power3.out" })
      rX.current = gsap.quickTo(cardRef.current, "rotateX", { duration: 0.5, ease: "power3.out" })
      rY.current = gsap.quickTo(cardRef.current, "rotateY", { duration: 0.5, ease: "power3.out" })
    }
  }, { scope: cardRef })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || isDimmed) return // On ne bouge pas si on est éteint

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left - width / 2
    const mouseY = e.clientY - rect.top - height / 2

    xTo.current(mouseX * 0.1)
    yTo.current(mouseY * 0.1)
    rX.current(-mouseY / 20)
    rY.current(mouseX / 20)

    cardRef.current.style.setProperty("--x", `${e.clientX - rect.left}px`)
    cardRef.current.style.setProperty("--y", `${e.clientY - rect.top}px`)
  }

  const handleMouseLeave = () => {
    setHoveredId(null) // On éteint le spotlight global
    xTo.current(0)
    yTo.current(0)
    rX.current(0)
    rY.current(0)
  }

  return (
    <div 
      className={`perspective-1000 transition-all duration-500 ease-out ${isActive ? 'z-50 scale-105' : 'z-10 scale-100'}`}
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`
          group relative p-8 md:p-10 rounded-2xl overflow-hidden flex flex-col gap-8 min-h-[450px] 
          transition-all duration-500 ease-out
          ${isActive 
            ? 'bg-[#0a0a0a] border-white/30 shadow-[0_0_100px_rgba(255,255,255,0.15)]' // Style Allumé (Spotlight)
            : 'bg-[#0a0a0a] border-white/5 shadow-none' // Style Éteint
          }
          ${isDimmed ? 'opacity-30 blur-[2px] grayscale' : 'opacity-100 blur-0 grayscale-0'} // Style Dimmed (si un autre est actif)
        `}
        style={{ 
          transformStyle: "preserve-3d",
          background: isActive ? `
            radial-gradient(
              800px circle at var(--x, 50%) var(--y, 50%),
              rgba(255,255,255,0.08),
              transparent 40%
            ),
            #0a0a0a
          ` : '#0a0a0a'
        }}
      >
        
        {/* Contenu Carte */}
        <div className="flex flex-col gap-6 relative z-10 transform-gpu translate-z-10">
          <div className="relative w-16 h-16">
            <div className={`absolute inset-0 bg-white/20 rounded-full blur-lg transition-transform duration-700 ease-out ${isActive ? 'scale-150' : 'scale-0'}`}></div>
            <Image 
              src={item.image}
              alt={item.name}
              width={64}
              height={64}
              className="relative rounded-full object-cover w-full h-full border border-white/10"
            />
          </div>

          <div>
            <h3 className="text-white text-2xl font-normal">{item.name}</h3>
            <p className="text-white/50 font-light">{item.role}</p>
          </div>
        </div>

        <p className="text-white/70 text-lg font-light leading-relaxed relative z-10">
          {item.text}
        </p>

        <div className="mt-auto pt-8 border-t border-white/10 relative z-10">
           <span className={`text-sm flex items-center gap-2 transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40'}`}>
             Read full story 
             <span className={`transform transition-transform duration-300 ${isActive ? 'translate-x-1 text-white' : 'text-white/40'}`}>→</span>
           </span>
        </div>

      </div>
    </div>
  )
}

// --- COMPOSANT PRINCIPAL ---
export default function Testimonials() {
  const container = useRef(null)
  // État global pour savoir quelle carte est active
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  useGSAP(() => {
    gsap.from(".testim-title-line", {
      y: 100, opacity: 0, duration: 1.2, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 70%" }
    })
    gsap.from(".magnetic-wrapper", {
      y: 100, opacity: 0, duration: 1, stagger: 0.2, ease: "power2.out",
      scrollTrigger: { trigger: ".cards-container", start: "top 80%" }
    })
  }, { scope: container })

  return (
    <section ref={container} className="relative z-20 w-full bg-white px-6 md:px-12 pb-32 pt-40 md:pt-52">
      
      {/* --- OVERLAY GLOBAL (CINEMA MODE) --- */}
      {/* Il couvre tout l'écran (fixed) et s'active quand hoveredId n'est pas null */}
      <div 
        className={`fixed inset-0 bg-black/80 z-40 pointer-events-none transition-opacity duration-500 ease-out
          ${hoveredId !== null ? 'opacity-100' : 'opacity-0'}
        `}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 relative z-30"> {/* z-30 pour rester au dessus de l'overlay si besoin, ou dessous selon l'effet voulu */}
        <div className="col-span-12 md:col-span-2">
          <span className={`text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${hoveredId ? 'text-white/20' : 'text-arti-black/60'}`}>
            Testimonials
          </span>
        </div>

        <div className="col-span-12 md:col-span-7">
          <h2 className={`text-[45px] md:text-[60px] leading-[1.1] font-normal transition-colors duration-300 ${hoveredId ? 'text-arti-black/10' : 'text-arti-black'}`}>
            <span className="testim-title-line block">Read Some of Our</span>
            <span className="testim-title-line block">Success Stories</span>
          </h2>
          
          <div className="testim-title-line mt-8">
            <Link 
              href="/testimonials"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 group
                ${hoveredId ? 'border-white/10 text-white/20' : 'border-black/10 hover:bg-black hover:text-white'}
              `}
            >
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              <span className="text-sm font-bold">Read all testimonials</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="cards-container grid grid-cols-1 md:grid-cols-3 gap-6 relative z-30">
        {testimonials.map((item) => (
          <div key={item.id} className="magnetic-wrapper">
             {/* On passe l'état global aux enfants */}
             <MagneticCard 
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