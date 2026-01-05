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
    text: "Soyons honnêtes. Vous avez construit quelque chose de génial. Mais depuis peu, il est devenu plus difficile de capter l'attention, ou même le bon type d'attention. Peut-être que votre marque semble un peu décalée par rapport à la direction de votre entreprise.",
    author: "Tobias Schaller",
    role: "Directeur Général, Charit.io"
  },
  {
    id: 2,
    text: "Il est temps de se présenter avec clarté. Cette équipe change la donne. Nous avons éliminé le bruit pour nous concentrer sur la connexion humaine et cela a porté ses fruits immédiatement.",
    author: "Kiera Monaghan",
    role: "PDG, Disobey"
  },
  {
    id: 3,
    text: "Le processus de rebranding s'est déroulé sans accroc. Nous accompagnons les marques là où elles sont, vers là où elles méritent d'être. La profondeur stratégique qu'ils ont apportée était impressionnante.",
    author: "David Laroche",
    role: "Fondateur, Paradox"
  },
  {
    id: 4,
    text: "Nous ajustons chaque pixel jusqu'à ce que ce soit parfait. Artichaud nous a poussés plus loin que nous ne le pensions possible. Une véritable agence 360, de la stratégie à l'exécution.",
    author: "Elena Rodriguez",
    role: "Directrice Marketing, TechFlow"
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
                  <HighlightTitle text="Nous sommes Artichaud Studio - une agence de branding et design à Paris. Nous accompagnons les marques là où elles sont, vers là où elles méritent d'être." />
                </h2>
             </div>

             {/* Espace vide grid */}
             <div className="hidden md:block md:col-span-2"></div>

             {/* Paragraphes (Ajout de la classe 'para-container' sur le parent et 'para-block' sur les <p>) */}
             <div className="para-container md:col-start-4 md:col-span-4 text-white/40 text-lg font-light leading-relaxed space-y-6">
                <p className="para-block transition-colors">
                  Soyons honnêtes. Vous avez construit quelque chose de génial. Mais depuis peu, il est devenu plus difficile de capter l'attention, ou même le bon type d'attention. Peut-être que votre marque semble un peu décalée par rapport à la direction de votre entreprise. Peut-être que votre message ne résonne pas comme vous le souhaitez. Ou peut-être êtes-vous simplement fatigué de justifier l'apparence de votre marque.
                </p>
                <p className="para-block transition-colors">
                  Il est temps de vous présenter avec la clarté et la confiance que vous méritez. Et c'est là que nous intervenons.
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