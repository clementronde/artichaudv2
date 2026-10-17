'use client'

import { useRef } from 'react'
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
          {word}{" "}
        </span>
      ))}
    </span>
  )
}

export default function AboutIntro() {
  // Refs pour GSAP
  const container = useRef(null)
  const blackBox = useRef(null)

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
      // Mais le pointer-events-auto sur la blackBox réactive les clics
      className="relative z-[70] w-full pb-32 pt-10 flex justify-center overflow-visible bg-transparent pointer-events-none"
    >
      
      {/* BLOC NOIR PRINCIPAL */}
      <div 
        ref={blackBox} 
        className="bg-black text-white rounded-[40px] px-6 py-12 md:p-16 mx-auto will-change-transform pointer-events-auto shadow-2xl"
      >
        
        {/* --- PARTIE HAUTE : CONTENU --- */}
        <div className="grid grid-cols-1 md:grid-cols-8 gap-10 md:gap-5">
          
          {/* Col 1 : Label "Histoire" */}
          <div className="col-span-1">
            <span className="text-sm font-medium text-white/60 uppercase tracking-wide block mb-4 md:mb-0">
              Histoire
            </span>
          </div>

          {/* Col 2 à 8 : Titre + Paragraphe */}
          <div className="col-span-1 md:col-span-7 grid grid-cols-1 md:grid-cols-7 gap-5">

             {/* Titre Principal (HighlightTitle intégré ici) */}
             <div className="md:col-span-5 mb-10 md:mb-0">
                <h2 className="text-[32px] md:text-[50px] leading-[1.1] font-normal">
                  <HighlightTitle text="Nous sommes Artichaud Studio, l'alliance d'un développeur-marketeur et d'une directrice artistique qui construisent ensemble des marques pensées dans leur globalité." />
                </h2>
             </div>

             {/* Espace vide grid */}
             <div className="hidden md:block md:col-span-2"></div>

             {/* Paragraphes */}
             <div className="para-container md:col-start-4 md:col-span-4 text-white/40 text-lg font-light leading-relaxed space-y-6">
                <p className="para-block transition-colors">
                  Chez Artichaud, tout part d'une conviction simple : un projet réussi ne peut pas se permettre de cloisonner création, technologie et stratégie. Côté développement, marketing et data, nous comprenons comment votre marque performera, comment elle sera trouvée, et comment elle convertira. Côté direction artistique, nous façonnons son identité visuelle, son âme, sa manière de se présenter au monde.
                </p>
                <p className="para-block transition-colors">
                  Cette complémentarité n'est pas un hasard, c'est notre force. Chaque projet bénéficie d'une vision à la fois technique et créative, portée de bout en bout. Pas de brief perdu dans la traduction entre équipes. Deux expertises qui se parlent, pour un résultat cohérent, complet et vraiment à votre image.
                </p>
             </div>
          </div>
        </div>

      </div>
    </section>
  )
}