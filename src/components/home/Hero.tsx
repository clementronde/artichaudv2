'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Hero() {
  const container = useRef(null)

  useGSAP(() => {
    // Timeline d'animation
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // 1. Le texte principal monte (Reveal)
    tl.from(".hero-line", {
      y: 150,        // Vient du bas
      duration: 1.8,
      stagger: 0.15, // Décalage entre chaque ligne
      delay: 0.2
    })
    
    // 2. Le paragraphe apparaît doucement après
    .from(".hero-text", {
      opacity: 0,
      y: 20,
      duration: 1,
    }, "-=1.0") // Commence 1sec avant la fin de l'anim précédente

  }, { scope: container })

  return (
    <section ref={container} className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-10 pt-20 bg-white text-arti-black">
      
      {/* GROS TITRE */}
      <div className="flex flex-col leading-[0.9]">
        {/* Ligne 1 : Masque pour l'animation */}
        <div className="overflow-hidden">
          <h1 className="hero-line block text-display font-light">
            Mettez le feu à vos
          </h1>
        </div>
        
        {/* Ligne 2 */}
        <div className="overflow-hidden">
          <h1 className="hero-line block text-display font-extrabold">
            projets
          </h1>
        </div>
      </div>

      {/* PARAGRAPHE MANIFESTE */}
      <div className="mt-12 max-w-2xl">
        <p className="hero-text text-lead font-light text-arti-black">
          Let&apos;s be honest. You&apos;ve built something great. But lately, 
          it&apos;s been harder to capture attention, or even - the right kind.
        </p>
      </div>

    </section>
  )
}