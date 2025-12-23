'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// --- UTILITAIRE : HighlightTitle (Pour l'effet d'apparition mot par mot) ---
const HighlightTitle = ({ text }: { text: string }) => {
  return (
    <span>
      {text.split(" ").map((word, i) => (
        <span key={i} className="title-word inline-block mr-[0.25em] text-white/30 opacity-50">
          {word}
        </span>
      ))}
    </span>
  )
}

// Données des témoignages
const testimonials = [
  {
    id: 1,
    text: "Let's be honest. You've built something great. But lately, it's been harder to capture attention, or even - the right kind. Maybe your brand feels a little out of step with where your business is heading.",
    author: "Tobias Schaller",
    role: "Managing Director, Charit.io"
  },
  {
    id: 2,
    text: "It's time to start showing up with clarity. This team is a game changer. We stripped away the noise to focus on human connection and it paid off immediately.",
    author: "Kiera Monaghan",
    role: "CEO, Disobey"
  },
  {
    id: 3,
    text: "The rebranding process was seamless. We take brands from where they are, to where they deserve to be. The strategic depth they brought was impressive.",
    author: "David Laroche",
    role: "Founder, Paradox"
  },
  {
    id: 4,
    text: "We push pixels until it feels right. Artichaud pushed us further than we thought possible. A truly 360 agency from strategy to execution.",
    author: "Elena Rodriguez",
    role: "CMO, TechFlow"
  }
]

export default function AboutIntro() {
  // Refs pour GSAP
  const container = useRef(null)
  const blackBox = useRef(null)
  
  // Refs et State pour le Slider (Framer Motion)
  const [width, setWidth] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Calcul largeur Slider
  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }
  }, [])

  // --- ANIMATIONS GSAP (Identique à la Home) ---
  useGSAP(() => {
    // 1. Expansion du bloc noir (85% -> 100%)
    gsap.fromTo(blackBox.current, 
      { width: "85%" },
      {
        width: "100%", 
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom", 
          end: "top 60%", 
          scrub: 0.5,
        }
      }
    )

    // 2. Animations Titre (mots)
    const titleWords = gsap.utils.toArray('.title-word');
    gsap.to(titleWords, {
      color: "#FFFFFF", opacity: 1, duration: 1.5, stagger: 0.05, ease: "power2.out",
      scrollTrigger: { trigger: blackBox.current, start: "top 60%", end: "center center", scrub: 1 }
    })
    
    // 3. Animations Paragraphes
    const paragraphs = gsap.utils.toArray('.para-block');
    gsap.to(paragraphs, {
      color: "#FFFFFF", opacity: 1, duration: 1, stagger: 0.3,
      scrollTrigger: { trigger: ".para-container", start: "top 70%", end: "bottom 80%", scrub: 1 }
    })

    // 4. Parallaxe de sortie
    gsap.to(blackBox.current, {
      y: '20%',
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "bottom bottom", 
        end: "bottom top", 
        scrub: true,
      }
    })

  }, { scope: container })

  return (
    <section 
      ref={container}
      // Z-INDEX : z-[70] + pointer-events-none sur le conteneur pour laisser passer le scroll si besoin
      // Mais le pointer-events-auto sur la blackBox réactive les clics (et le drag du slider)
      className="relative z-[70] w-full pb-32 pt-10 flex justify-center overflow-visible bg-transparent pointer-events-none"
    >
      
      {/* BLOC NOIR PRINCIPAL */}
      <div 
        ref={blackBox} 
        className="bg-black text-white rounded-[40px] px-6 py-12 md:p-16 mx-auto will-change-transform flex flex-col justify-between min-h-[90vh] pointer-events-auto shadow-2xl"
      >
        
        {/* --- PARTIE HAUTE : CONTENU --- */}
        <div className="grid grid-cols-1 md:grid-cols-8 gap-10 md:gap-5 mb-24">
          
          {/* Col 1 : Label "History" */}
          <div className="col-span-1">
            <span className="text-sm font-medium text-white/60 uppercase tracking-wide block mb-4 md:mb-0">
              History
            </span>
          </div>

          {/* Col 2 à 8 : Titre + Paragraphe */}
          <div className="col-span-1 md:col-span-7 grid grid-cols-1 md:grid-cols-7 gap-5">
             
             {/* Titre Principal (HighlightTitle intégré ici) */}
             <div className="md:col-span-5 mb-10 md:mb-0">
                <h2 className="text-[32px] md:text-[50px] leading-[1.1] font-normal">
                  <HighlightTitle text="Hey, we're Artichaud Studio - a branding and design agency in Paris. We take brands from where they are, to where they deserve to be." />
                </h2>
             </div>
             
             {/* Espace vide grid */}
             <div className="hidden md:block md:col-span-2"></div>

             {/* Paragraphes (Ajout de la classe 'para-container' sur le parent et 'para-block' sur les <p>) */}
             <div className="para-container md:col-start-4 md:col-span-4 text-white/40 text-lg font-light leading-relaxed space-y-6">
                <p className="para-block transition-colors">
                  Let's be honest. You've built something great. But lately, it's been harder to capture attention, or even - the right kind. Maybe your brand feels a little out of step with where your business is heading. Maybe your messaging isn't landing quite like you want it to. Or maybe you're just tired of excusing how your brand looks.
                </p>
                <p className="para-block transition-colors">
                  It's time to start showing up with the clarity and confidence you know you deserve. And that's where we come in.
                </p>
             </div>
          </div>
        </div>

        {/* --- PARTIE BASSE : SLIDER TESTIMONIALS --- */}
        {/* Le slider reste fonctionnel grâce à pointer-events-auto sur le parent blackBox */}
        <div ref={carouselRef} className="w-full overflow-hidden cursor-grab active:cursor-grabbing">
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }} 
            whileTap={{ cursor: "grabbing" }}
            className="flex gap-10 md:gap-20"
          >
            {testimonials.map((item, index) => (
              <div 
                key={item.id} 
                className={`
                  shrink-0 w-[85vw] md:w-[30%] flex flex-col justify-between select-none
                  ${index !== 0 ? 'border-l border-white/10 pl-10 md:pl-20' : ''}
                `}
              >
                {/* Texte du témoignage */}
                <div className="relative mb-8">
                  <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed">
                    {item.text}
                  </p>
                  <span className="absolute -top-2 right-0 text-4xl text-white/20 font-serif">
                    ”
                  </span>
                </div>

                {/* Auteur */}
                <div>
                  <h4 className="text-base font-bold text-white">{item.author}</h4>
                  <p className="text-sm text-white/40 mt-1">{item.role}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}