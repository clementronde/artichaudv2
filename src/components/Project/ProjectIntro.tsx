'use client'

import { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// --- UTILITAIRE : Découpe le texte pour l'animation ---
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

interface ProjectIntroProps {
  description: string[]
  services: string[]
  year: string
  client: string
}

export default function ProjectIntro({ description, services, year, client }: ProjectIntroProps) {
  const container = useRef(null)
  const blackBox = useRef(null)

  useGSAP(() => {
    // 1. Expansion du bloc noir (85% -> 100%)
    gsap.fromTo(blackBox.current, 
      { width: "85%" },
      {
        width: "100%", 
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom", // Commence quand le haut du bloc entre dans l'écran
          end: "top 60%", 
          scrub: 0.5,
        }
      }
    )

    // 2. Animations Textes (Apparition progressive des mots du titre)
    const titleWords = gsap.utils.toArray('.title-word');
    gsap.to(titleWords, {
      color: "#FFFFFF", opacity: 1, duration: 1.5, stagger: 0.05, ease: "power2.out",
      scrollTrigger: { trigger: blackBox.current, start: "top 60%", end: "center center", scrub: 1 }
    })
    
    // 3. Animation des paragraphes et services
    const elements = gsap.utils.toArray('.anim-fade');
    gsap.to(elements, {
      color: "#FFFFFF", opacity: 1, duration: 1, stagger: 0.1,
      scrollTrigger: { trigger: ".content-grid", start: "top 70%", end: "bottom 80%", scrub: 1 }
    })

    // 4. Parallaxe de sortie
    gsap.to(blackBox.current, {
      y: '10%', // Légère remontée
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
      // z-[70] pour passer au-dessus du Hero (comme demandé)
      className="relative z-[70] w-full pb-10 flex justify-center overflow-visible bg-transparent pointer-events-none -mt-20 md:-mt-32"
    >
      <div 
        ref={blackBox} 
        className="bg-black text-white rounded-[20px] md:rounded-[40px] px-6 py-12 md:p-16 mx-auto will-change-transform flex flex-col justify-between min-h-[60vh] pointer-events-auto shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 h-full content-grid">

          {/* LABEL */}
          <div className="col-span-12 md:col-span-2">
            <span className="text-sm font-medium text-white/60 uppercase tracking-wide">
              Overview
            </span>
          </div>

          {/* TITRE PRINCIPAL (Première phrase de la description) */}
          <div className="col-span-12 md:col-span-10">
            <h2 className="text-[28px] md:text-[45px] lg:text-[50px] leading-[1.1] font-normal">
              <HighlightTitle text={description[0]} />
            </h2>
          </div>

          {/* COLONNE GAUCHE : Services & Année (Remplissage de l'espace vide) */}
          <div className="col-span-12 md:col-span-5 flex flex-col gap-8 mt-auto md:pr-12">
             <div className="anim-fade text-white/40 opacity-0">
                <span className="text-xs uppercase tracking-wider mb-3 block text-white/60">Services</span>
                <div className="flex flex-wrap gap-2">
                  {services.map((s, i) => (
                    <span key={i} className="px-3 py-1 border border-white/20 rounded-full text-sm">
                      {s}
                    </span>
                  ))}
                </div>
             </div>
             
             <div className="anim-fade text-white/40 opacity-0">
                <span className="text-xs uppercase tracking-wider mb-1 block text-white/60">Year</span>
                <span className="text-lg">{year}</span>
             </div>
          </div>

          <div className="hidden md:block md:col-span-1"></div>

          {/* COLONNE DROITE : Paragraphes suivants + CTA */}
          <div className="col-span-12 md:col-span-6 flex flex-col gap-8 mt-auto">
            {description.slice(1).map((para, i) => (
              <p key={i} className="anim-fade text-white/40 opacity-0 text-lg md:text-xl font-light leading-relaxed">
                {para}
              </p>
            ))}
            
            <div className="mt-4 pt-4 anim-fade opacity-0">
               <Link href="/contact" className="group w-fit flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-white text-sm font-bold hover:bg-white hover:text-black transition-all duration-300">
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  Start a project like this
               </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}