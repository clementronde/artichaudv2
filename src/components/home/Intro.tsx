'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// Utilitaire HighlightTitle (inchangé)
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
    // 1. Expansion du bloc noir
    gsap.fromTo(blackBox.current, 
      { width: "85%" },
      {
        width: "100%", 
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom", // Commence quand le haut de la section arrive en bas de l'écran
          end: "top 60%", 
          scrub: 0.5,
        }
      }
    )

    // 2. Animations Textes (Apparition progressive)
    const titleWords = gsap.utils.toArray('.title-word');
    gsap.to(titleWords, {
      color: "#FFFFFF", opacity: 1, duration: 1.5, stagger: 0.05, ease: "power2.out",
      scrollTrigger: { trigger: blackBox.current, start: "top 60%", end: "center center", scrub: 1 }
    })
    
    const paragraphs = gsap.utils.toArray('.para-block');
    gsap.to(paragraphs, {
      color: "#FFFFFF", opacity: 1, duration: 1, stagger: 0.3,
      scrollTrigger: { trigger: ".para-container", start: "top 70%", end: "bottom 80%", scrub: 1 }
    })

    // 3. Parallaxe de sortie (Le bloc noir remonte moins vite que le scroll pour un effet de profondeur)
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
      // Z-INDEX CRUCIAL : z-[70] est supérieur au z-20 du Hero.
      // Le bloc noir passera donc PAR-DESSUS le halo qui dépasse du Hero.
      className="relative z-[70] w-full pb-32 pt-10 flex justify-center overflow-visible bg-transparent pointer-events-none"
    >
      <div 
        ref={blackBox} 
        // Le fond est NOIR opaque, donc il cache le halo qui est derrière lui.
        className="bg-black text-white rounded-[40px] px-6 py-12 md:p-16 mx-auto will-change-transform flex flex-col justify-between min-h-[80vh] pointer-events-auto shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 h-full">

          <div className="col-span-12 md:col-span-2">
            <span className="text-sm font-medium text-white/60 uppercase tracking-wide">
              Our approach
            </span>
          </div>

          <div className="col-span-12 md:col-span-10">
            <h2 className="text-[32px] md:text-[50px] leading-[1.1] font-normal">
              <HighlightTitle text="Hey, we're Artichaud Studio - a branding and design agency in Paris. We take brands from where they are, to where they deserve to be." />
            </h2>
          </div>

          <div className="hidden md:block md:col-span-6"></div>

          <div className="para-container col-span-12 md:col-span-6 flex flex-col gap-8 mt-auto">
            <p className="para-block text-white/40 text-lg md:text-xl font-light leading-relaxed transition-colors">
              Let's be honest. You've built something great. But lately, it's been harder to capture attention, or even - the right kind. Maybe your brand feels a little out of step with where your business is heading. Maybe your messaging isn't landing quite like you want it to. Or maybe you're just tired of excusing how your brand looks. It's time to start showing up with the clarity and confidence you know you deserve. And that's where we come in.
            </p>
            <p className="para-block text-white/40 text-lg md:text-xl font-light leading-relaxed transition-colors">
              Or maybe you're just tired of excusing how your brand looks. It's time to start showing up with the clarity and confidence you know you deserve. And that's where we come in.
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