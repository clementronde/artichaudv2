'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import Link from 'next/link'

// --- COMPOSANT MAGNETIC ---
const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const magneticRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magneticRef.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = magneticRef.current.getBoundingClientRect()
    
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    
    gsap.to(magneticRef.current, { 
      x: x * 0.2, 
      y: y * 0.2, 
      duration: 0.8, 
      ease: "power3.out" 
    })
  }

  const handleMouseLeave = () => {
    if (!magneticRef.current) return
    gsap.to(magneticRef.current, { 
      x: 0, 
      y: 0, 
      duration: 0.8, 
      ease: "elastic.out(1, 0.5)" 
    })
  }

  return (
    <div 
      ref={magneticRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      className="w-fit h-fit" 
    >
      {children}
    </div>
  )
}

// --- COMPOSANT NAVBAR DYNAMIC ISLAND ---
export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const animationRef = useRef<gsap.core.Timeline | null>(null)
  
  const [isHovering, setIsHovering] = useState(false)
  const isCollapsedRef = useRef(false)
  const hasAnimatedRef = useRef(false)

  // Fonction d'animation collapse
  const animateCollapse = useCallback(() => {
    const nav = navRef.current
    const inner = innerRef.current
    const links = linksRef.current
    const cta = ctaRef.current
    
    if (!nav || !inner || !links || !cta || !hasAnimatedRef.current) return
    if (isCollapsedRef.current) return
    
    isCollapsedRef.current = true
    
    // Kill animation précédente
    if (animationRef.current) {
      animationRef.current.kill()
    }
    
    gsap.set([links, cta], {
      opacity: 0,
      visibility: 'hidden',
      pointerEvents: 'none'
    })
    
    animationRef.current = gsap.timeline()
    animationRef.current.to([nav, inner], {
      width: 180,
      duration: 0.5,
      ease: "power3.inOut"
    })
  }, [])

  // Fonction d'animation expand
  const animateExpand = useCallback(() => {
    const nav = navRef.current
    const inner = innerRef.current
    const links = linksRef.current
    const cta = ctaRef.current
    
    if (!nav || !inner || !links || !cta || !hasAnimatedRef.current) return
    if (!isCollapsedRef.current) return
    
    isCollapsedRef.current = false
    
    // Kill animation précédente
    if (animationRef.current) {
      animationRef.current.kill()
    }
    
    animationRef.current = gsap.timeline()
    
    animationRef.current.to([nav, inner], {
      width: 620,
      duration: 0.5,
      ease: "power3.inOut"
    }, 0)
    
    animationRef.current.set([links, cta], {
      visibility: 'visible'
    }, 0.4)
    
    animationRef.current.to([links, cta], {
      opacity: 1,
      pointerEvents: 'auto',
      duration: 0.3,
      ease: "power2.out",
      stagger: 0.05
    }, 0.4)
  }, [])

  // Détection du scroll
  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      if (currentScrollY > 100 && currentScrollY > lastScrollY && !isHovering) {
        animateCollapse()
      } 
      else if (currentScrollY < 50) {
        animateExpand()
      }
      
      // Réouvrir après 1 seconde d'arrêt
      scrollTimeoutRef.current = setTimeout(() => {
        if (!isHovering) {
          animateExpand()
        }
      }, 1000)
      
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [isHovering, animateCollapse, animateExpand])

  // Animation d'entrée initiale (une seule fois)
  useEffect(() => {
    const nav = navRef.current
    const inner = innerRef.current
    const links = linksRef.current
    const cta = ctaRef.current
    
    if (!nav || !inner) return
    
    gsap.set(nav, { width: 620 })
    gsap.set(inner, { width: 620 })
    
    const tl = gsap.timeline({ 
      delay: 0.5,
      onComplete: () => {
        hasAnimatedRef.current = true
      }
    })
    
    tl.from(nav, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "elastic.out(1, 0.6)"
    })
    
    if (links?.children) {
      tl.from(links.children, {
        opacity: 0,
        y: -20,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
    }
    
    if (cta) {
      tl.from(cta, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3")
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
    animateExpand()
  }, [animateExpand])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    if (window.scrollY > 100) {
      animateCollapse()
    }
  }, [animateCollapse])

  return (
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
                 transition-shadow duration-300
                 hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)]
                 overflow-hidden"
      style={{ willChange: 'width' }}
    >
      <div 
        ref={innerRef}
        className="flex items-center justify-center h-full mx-auto"
      >
        <div className="flex items-center justify-between h-full w-full px-8">
          
          {/* LOGO */}
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
          <div ref={ctaRef} className="flex-shrink-0">
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
                         hover:shadow-lg hover:shadow-orange-500/30
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
  )
}