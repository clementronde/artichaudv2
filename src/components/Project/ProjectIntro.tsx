'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ProjectIntroProps {
  label?: string;
  title: string;
  description: string[];
}

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

export default function ProjectIntro({ label = "The Challenge", title, description }: ProjectIntroProps) {
  const container = useRef(null)
  const blackBox = useRef(null)

  useGSAP(() => {
    // 1. Expansion
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

    // 2. Textes Titre
    const titleWords = gsap.utils.toArray('.title-word');
    gsap.to(titleWords, {
      color: "#FFFFFF", opacity: 1, duration: 1.5, stagger: 0.05, ease: "power2.out",
      scrollTrigger: { trigger: blackBox.current, start: "top 60%", end: "center center", scrub: 1 }
    })

    // 3. Paragraphes
    const paragraphs = gsap.utils.toArray('.para-block');
    gsap.to(paragraphs, {
      color: "#FFFFFF", opacity: 1, duration: 1, stagger: 0.3,
      scrollTrigger: { trigger: ".para-container", start: "top 70%", end: "bottom 80%", scrub: 1 }
    })

    // 4. Parallaxe de sortie
    gsap.to(blackBox.current, {
      y: '20%', 
      scale: 0.98,
      opacity: 1, 
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
    // MODIFICATIONS ICI :
    // 1. 'bg-transparent' (au lieu de bg-white) pour ne pas cacher l'image du dessus
    // 2. 'pt-0' (au lieu de pt-10) pour coller la boîte noire tout en haut du conteneur
    <section ref={container} className="relative z-0 w-full bg-transparent pb-32 pt-0 flex justify-center overflow-hidden"> 
      <div 
        ref={blackBox} 
        className="bg-[#0a0a0a] text-white rounded-[40px] px-6 py-12 md:p-16 mx-auto will-change-transform flex flex-col justify-between min-h-[80vh]"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 h-full">

          <div className="col-span-12 md:col-span-2">
            <span className="text-sm font-medium text-white/60 uppercase tracking-wide">
              {label}
            </span>
          </div>

          <div className="col-span-12 md:col-span-10">
            <h2 className="text-[32px] md:text-[50px] leading-[1.1] font-normal">
              <HighlightTitle text={title} />
            </h2>
          </div>

          <div className="hidden md:block md:col-span-6"></div>

          <div className="para-container col-span-12 md:col-span-6 flex flex-col gap-8 mt-auto">
            {description.map((paragraph, i) => (
                <p key={i} className="para-block text-white/40 text-lg md:text-xl font-light leading-relaxed transition-colors">
                    {paragraph}
                </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}