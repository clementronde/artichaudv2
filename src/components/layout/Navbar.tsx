'use client'

import { useRef, useState, useLayoutEffect, useCallback, useEffect } from 'react'
import gsap from 'gsap'
import Link from 'next/link'

// --- COMPOSANT MAGNETIC (Inchangé car il fonctionne bien) ---
const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const magneticRef = useRef<HTMLDivElement>(null)
  const xTo = useRef<gsap.QuickToFunc | null>(null)
  const yTo = useRef<gsap.QuickToFunc | null>(null)

  useEffect(() => {
    if (!magneticRef.current) return
    xTo.current = gsap.quickTo(magneticRef.current, "x", { duration: 0.8, ease: "power3.out" })
    yTo.current = gsap.quickTo(magneticRef.current, "y", { duration: 0.8, ease: "power3.out" })
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magneticRef.current || !xTo.current || !yTo.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = magneticRef.current.getBoundingClientRect()
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    xTo.current(x * 0.3)
    yTo.current(y * 0.3)
  }

  const handleMouseLeave = () => {
    if (!xTo.current || !yTo.current) return
    xTo.current(0)
    yTo.current(0)
  }

  return (
    <div ref={magneticRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="w-fit h-fit">
      {children}
    </div>
  )
}

// --- COMPOSANT NAVBAR CORRIGÉ ---
export default function Navbar() {
  const containerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null) // Ref pour le timer d'arrêt
  
  const isCollapsedRef = useRef(false)
  const isHoveringRef = useRef(false)

  // Configuration des largeurs
  const EXPANDED_WIDTH = 620
  const COLLAPSED_WIDTH = 150 // Augmenté pour voir "Artichaud" (était ~60px avant)
  const MOBILE_WIDTH = 340

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const initialWidth = window.innerWidth < 768 ? MOBILE_WIDTH : EXPANDED_WIDTH
      
      gsap.set(navRef.current, { width: initialWidth, y: -100, opacity: 0 })
      gsap.set(innerRef.current, { width: initialWidth })
      
      const introTl = gsap.timeline({ delay: 0.5 })
      
      introTl.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "elastic.out(1, 0.6)"
      })
      
      if (linksRef.current?.children) {
        introTl.from(linksRef.current.children, {
          opacity: 0,
          y: -20,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out"
        }, "-=0.6")
      }
      
      if (ctaRef.current) {
        introTl.from(ctaRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: "power3.out"
        }, "-=0.5")
      }

    }, containerRef)
    return () => ctx.revert()
  }, [])

  const animateCollapse = useCallback(() => {
    if (isCollapsedRef.current) return
    isCollapsedRef.current = true

    if (tlRef.current) tlRef.current.kill()

    tlRef.current = gsap.timeline()
      .to([linksRef.current, ctaRef.current], {
        opacity: 0,
        duration: 0.2,
        pointerEvents: 'none',
        onComplete: () => {
          gsap.set([linksRef.current, ctaRef.current], { visibility: 'hidden' })
        }
      })
      .to([navRef.current, innerRef.current], {
        width: COLLAPSED_WIDTH, // Utilisation de la nouvelle largeur (150px)
        duration: 0.5,
        ease: "power3.inOut"
      }, 0)
  }, [])

  const animateExpand = useCallback(() => {
    if (!isCollapsedRef.current) return
    isCollapsedRef.current = false

    const targetWidth = window.innerWidth < 768 ? MOBILE_WIDTH : EXPANDED_WIDTH

    if (tlRef.current) tlRef.current.kill()

    tlRef.current = gsap.timeline()
    
    tlRef.current.to([navRef.current, innerRef.current], {
      width: targetWidth,
      duration: 0.5,
      ease: "power3.inOut"
    }, 0)
    
    tlRef.current.set([linksRef.current, ctaRef.current], { 
      visibility: 'visible',
      pointerEvents: 'auto'
    }, 0.3)
    
    tlRef.current.to([linksRef.current, ctaRef.current], {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    }, 0.3)
  }, [])

  // --- GESTION DU SCROLL ---
  useEffect(() => {
    let lastScrollY = window.scrollY
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY
      const isScrollingUp = currentScrollY < lastScrollY

      // 1. Nettoyage du timer précédent à chaque mouvement de scroll
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // 2. Logique de direction (Collapse / Expand)
      if (currentScrollY > 100 && isScrollingDown && !isHoveringRef.current) {
        animateCollapse()
      } 
      else if (isScrollingUp || currentScrollY < 50) {
        animateExpand()
      }

      // 3. Logique d'arrêt du scroll (Réouverture)
      // Si on ne scrolle plus pendant 800ms, on réouvre
      scrollTimeoutRef.current = setTimeout(() => {
        if (!isHoveringRef.current && currentScrollY > 50) {
          animateExpand()
        }
      }, 800) // 800ms est un bon équilibre (ni trop nerveux, ni trop lent)
      
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [animateCollapse, animateExpand])

  const handleMouseEnter = () => {
    isHoveringRef.current = true
    // Si l'utilisateur survole pendant que le timer d'arrêt tourne, on l'annule pour éviter un glitch
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    animateExpand()
  }

  const handleMouseLeave = () => {
    isHoveringRef.current = false
    // Optionnel : Si on sort de la souris et qu'on est bas dans la page, on peut vouloir refermer immédiatement
    // Mais pour l'instant on laisse la logique de scroll gérer
  }

  return (
    <div ref={containerRef as any}>
      <nav 
        ref={navRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 
                   h-[60px]
                   bg-black/95 backdrop-blur-md 
                   shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                   border border-white/10
                   rounded-full
                   overflow-hidden"
        style={{ willChange: 'width, transform' }}
      >
        <div 
          ref={innerRef}
          className="flex items-center justify-center h-full mx-auto"
        >
          <div className="flex items-center justify-between h-full w-full px-6 md:px-8">
            
            {/* LOGO - Ajout de 'mx-auto' conditionnel ou centrage flex pour le mode fermé */}
            <Link 
              href="/" 
              className="flex-shrink-0 text-xl font-bold text-white hover:text-orange-500 transition-colors duration-300 whitespace-nowrap"
            >
              <span className="font-display">Artichaud</span>
            </Link>

            {/* NAVIGATION LINKS */}
            <div 
              ref={linksRef}
              className="hidden md:flex items-center gap-2"
            >
              {['Projets', 'Services', 'À propos'].map((item) => (
                <Magnetic key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace('à ', '')}`}
                    className="group relative px-4 py-2 text-sm font-medium text-white/70 
                               hover:text-white transition-colors duration-300
                               overflow-hidden rounded-full whitespace-nowrap"
                  >
                    <span className="absolute inset-0 rounded-full bg-white/10 
                                     scale-0 opacity-0 transition-all duration-500 
                                     group-hover:scale-100 group-hover:opacity-100 -z-10" />
                    <span className="relative">{item}</span>
                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 
                                     bg-orange-500 transition-all duration-500 ease-out
                                     group-hover:w-1/2 rounded-full" />
                  </Link>
                </Magnetic>
              ))}
            </div>

            {/* CTA BUTTON */}
            <div ref={ctaRef} className="flex-shrink-0 hidden md:block">
              <Magnetic>
                <Link
                  href="/contact"
                  className="group relative overflow-hidden
                             inline-flex items-center justify-center
                             px-6 py-2.5
                             bg-white text-black
                             rounded-full
                             text-sm font-semibold
                             transition-all duration-500 ease-out
                             hover:bg-orange-500 hover:text-white
                             whitespace-nowrap"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Let's talk</span>
                    <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}