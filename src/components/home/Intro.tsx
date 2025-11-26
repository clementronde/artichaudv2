'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// --- UTILITAIRE : Découpe le texte en mots (Uniquement pour le Titre H2) ---
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

export default function Intro() {
  const container = useRef(null)
  const blackBox = useRef(null)

  useGSAP(() => {
    // 1. Expansion de la Boîte Noire (Inchangé)
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

    // 2. Animation H2 (TITRE) : Mot par mot, mais SMOOTH
    const titleWords = gsap.utils.toArray('.title-word');
    gsap.to(titleWords, {
      color: "#FFFFFF",
      opacity: 1,
      duration: 1.5, // Durée un peu plus longue pour la douceur
      stagger: 0.05, // Délai très court entre les mots pour un effet "vague" liquide
      ease: "power2.out", // Courbe naturelle
      scrollTrigger: {
        trigger: blackBox.current,
        start: "top 60%",
        end: "center center", // On finit l'anim plus tôt pour que le titre soit vite lisible
        scrub: 1,
      }
    })

    // 3. Animation PARAGRAPHES : Fluide (Bloc par Bloc)
    // On cible les paragraphes entiers (.para-block)
    const paragraphs = gsap.utils.toArray('.para-block');
    
    gsap.to(paragraphs, {
      color: "#FFFFFF",
      opacity: 1,
      duration: 1,
      stagger: 0.3, // Les paragraphes s'allument les uns après les autres
      scrollTrigger: {
        trigger: ".para-container", // Déclencheur sur le conteneur du texte
        start: "top 70%",
        end: "bottom 80%",
        scrub: 1,
      }
    })

  }, { scope: container })

  return (
    <section ref={container} className="w-full bg-white pb-32 pt-10 flex justify-center overflow-hidden">
      
      {/* LA CARTE NOIRE */}
      <div 
        ref={blackBox} 
        className="bg-black text-white rounded-[40px] px-6 py-12 md:p-16 mx-auto will-change-transform flex flex-col justify-between min-h-[80vh]"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 h-full">

          {/* LABEL */}
          <div className="col-span-12 md:col-span-2">
            <span className="text-sm font-medium text-white/60 uppercase tracking-wide">
              Our approach
            </span>
          </div>

          {/* TITRE (H2) - Animation Mot par Mot (HighlightTitle) */}
          <div className="col-span-12 md:col-span-10">
            <h2 className="text-[32px] md:text-[50px] leading-[1.1] font-normal">
              <HighlightTitle text="Hey, we're Artichaud Studio - a branding and design agency in Paris. We take brands from where they are, to where they deserve to be." />
            </h2>
          </div>

          <div className="hidden md:block md:col-span-6"></div>

          {/* TEXTE CORPS (Paragraphes) - Animation Fluide */}
          <div className="para-container col-span-12 md:col-span-6 flex flex-col gap-8 mt-auto">
            
            {/* On applique la classe .para-block et la couleur grise par défaut */}
            <p className="para-block text-white/40 text-lg md:text-xl font-light leading-relaxed transition-colors">
              Let's be honest. You’ve built something great. But lately, it’s been harder to capture attention, or even - the right kind. Maybe your brand feels a little out of step with where your business is heading. Maybe your messaging isn’t landing quite like you want it to. Or maybe you’re just tired of excusing how your brand looks. It's time to start showing up with the clarity and confidence you know you deserve. And that’s where we come in.
            </p>

            <p className="para-block text-white/40 text-lg md:text-xl font-light leading-relaxed transition-colors">
              Or maybe you’re just tired of excusing how your brand looks. It's time to start showing up with the clarity and confidence you know you deserve. And that’s where we come in.
            </p>

            <div className="mt-4 pt-4">
               <button className="group flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-white text-sm font-bold hover:bg-white hover:text-black transition-all duration-300">
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  Learn more
               </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}