'use client'

import { useRef, useCallback, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import gsap from 'gsap'
import Link from 'next/link'

// --- 1. COMPOSANT MAGNETIC AVEC DESACTIVATION ---
// Ajout de la prop 'disabled' pour couper l'effet quand on navigue
const Magnetic = ({ children, disabled }: { children: React.ReactNode, disabled?: boolean }) => {
  const magneticRef = useRef<HTMLDivElement>(null)
  const xTo = useRef<gsap.QuickToFunc | null>(null)
  const yTo = useRef<gsap.QuickToFunc | null>(null)

  useEffect(() => {
    if (!magneticRef.current) return
    xTo.current = gsap.quickTo(magneticRef.current, "x", { duration: 0.8, ease: "power3.out" })
    yTo.current = gsap.quickTo(magneticRef.current, "y", { duration: 0.8, ease: "power3.out" })
    return () => { xTo.current = null; yTo.current = null }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || !magneticRef.current || !xTo.current || !yTo.current) return
    const { height, width, left, top } = magneticRef.current.getBoundingClientRect()
    const x = e.clientX - (left + width / 2)
    const y = e.clientY - (top + height / 2)
    xTo.current(x * 0.3)
    yTo.current(y * 0.3)
  }

  const handleMouseLeave = () => {
    if (!xTo.current || !yTo.current) return
    xTo.current(0)
    yTo.current(0)
  }

  // Si disabled (navigation en cours), on force le reset de la position
  useEffect(() => {
    if (disabled && xTo.current && yTo.current) {
        xTo.current(0)
        yTo.current(0)
    }
  }, [disabled])

  return (
    <div ref={magneticRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="w-fit h-fit">
      {children}
    </div>
  )
}

// --- 2. COMPOSANT NAVBAR ---
export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const containerRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const isCollapsedRef = useRef(false)
  const isHoveringRef = useRef(false)
  // Utilisation d'un State pour déclencher le re-render du Magnetic (prop disabled)
  const isNavigatingRef = useRef(false) 

  const EXPANDED_WIDTH = 620
  const COLLAPSED_WIDTH = 150
  const MOBILE_WIDTH = 340

  // --- CONFIGURATION DES LIENS (STATIQUE) ---
  // Plus sûr que le .map dynamique pour éviter les erreurs de routing
  const navLinks = [
    { label: 'Projets', href: '/projets' },
    { label: 'Services', href: '/services' },
    { label: 'À propos', href: '/a-propos' }, // Vérifie bien que ta page s'appelle 'a-propos'
  ]

  // --- RESET TOTAL ---
  const hardReset = useCallback(() => {
    gsap.killTweensOf([navRef.current, innerRef.current, linksRef.current, ctaRef.current])
    if (linksRef.current?.children) gsap.killTweensOf(linksRef.current.children)

    const isMobile = window.innerWidth < 768
    const initialWidth = isMobile ? MOBILE_WIDTH : EXPANDED_WIDTH

    // État initial : Invisible et bloqué
    gsap.set(navRef.current, { 
        width: initialWidth, 
        y: -100, 
        autoAlpha: 0, 
        pointerEvents: 'none' 
    })
    gsap.set(innerRef.current, { width: initialWidth })
    
    // Liens visibles par défaut (pour quand la navbar apparaitra)
    gsap.set([linksRef.current, ctaRef.current], { 
      clearProps: 'all', 
      autoAlpha: 1, 
    })

    isCollapsedRef.current = false
    isNavigatingRef.current = false
    isHoveringRef.current = false 
  }, [])

  // --- ANIMATION D'ENTRÉE ---
  const animateIn = useCallback(() => {
    hardReset() 

    const tl = gsap.timeline({
      onComplete: () => {
        // On débloque la navbar seulement à la toute fin
        if (!isNavigatingRef.current && navRef.current) {
            gsap.set(navRef.current, { pointerEvents: 'auto' })
        }
      }
    })
    
    tl.to(navRef.current, {
      y: 0,
      autoAlpha: 1,
      duration: 1,
      ease: "elastic.out(1, 0.6)"
    })
    
    if (linksRef.current?.children) {
      tl.from(linksRef.current.children, {
        autoAlpha: 0,
        y: -20,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.6")
    }
    
    if (ctaRef.current) {
      tl.from(ctaRef.current, {
        autoAlpha: 0,
        y: -20,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.5")
    }
    
    tlRef.current = tl
  }, [hardReset])

  // --- GESTION DU CLIC (Navigation) ---
  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (href === pathname) {
      e.preventDefault()
      return
    }

    e.preventDefault()
    
    // 🔒 1. Verrouillage Logique
    isNavigatingRef.current = true 
    isHoveringRef.current = false
    
    // 🛑 2. Arrêt immédiat de GSAP
    if (tlRef.current) tlRef.current.kill()
    
    // 🔒 3. Verrouillage Physique (CSS)
    // Cela empêche le navigateur de détecter un "hover" si la souris bouge
    gsap.set(navRef.current, { pointerEvents: 'none' }) 
    
    // Animation de sortie
    gsap.to(navRef.current, {
      y: -100,
      autoAlpha: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        router.push(href)
      }
    })
  }

  // --- EFFET DE ROUTE ---
  useEffect(() => {
    const t = setTimeout(() => animateIn(), 50)
    return () => clearTimeout(t)
  }, [pathname, animateIn])


  // --- ANIMATIONS INTERACTION ---
  const animateCollapse = useCallback(() => {
    if (isCollapsedRef.current || isNavigatingRef.current) return
    isCollapsedRef.current = true

    if (tlRef.current) tlRef.current.kill()

    tlRef.current = gsap.timeline()
      .to([linksRef.current, ctaRef.current], {
        autoAlpha: 0,
        duration: 0.2,
        pointerEvents: 'none',
      })
      .to([navRef.current, innerRef.current], {
        width: COLLAPSED_WIDTH,
        duration: 0.5,
        ease: "power3.inOut"
      }, 0)
  }, [])

  const animateExpand = useCallback(() => {
    if (!isCollapsedRef.current || isNavigatingRef.current) return
    isCollapsedRef.current = false

    const targetWidth = window.innerWidth < 768 ? MOBILE_WIDTH : EXPANDED_WIDTH

    if (tlRef.current) tlRef.current.kill()

    tlRef.current = gsap.timeline()
    
    tlRef.current.to([navRef.current, innerRef.current], {
      width: targetWidth,
      duration: 0.5,
      ease: "power3.inOut"
    }, 0)
    .set([linksRef.current, ctaRef.current], { pointerEvents: 'auto' }, 0.2)
    .to([linksRef.current, ctaRef.current], {
      autoAlpha: 1,
      duration: 0.3,
      ease: "power2.out"
    }, 0.3)
  }, [])

  // --- SCROLL ---
  useEffect(() => {
    let lastScrollY = window.scrollY
    
    const handleScroll = () => {
      if (isNavigatingRef.current) return 
      
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)

      if (currentScrollY > 100 && isScrollingDown && !isHoveringRef.current) {
        animateCollapse()
      } 
      else if (currentScrollY < 50) {
        animateExpand()
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (!isHoveringRef.current && currentScrollY > 50 && !isNavigatingRef.current) {
          animateExpand()
        }
      }, 800)
      
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [animateCollapse, animateExpand])

  const handleMouseEnter = () => {
    if (isNavigatingRef.current) return
    isHoveringRef.current = true
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    animateExpand()
  }

  const handleMouseLeave = () => {
    isHoveringRef.current = false
  }

  return (
    <div ref={containerRef as any}>
      <nav 
        ref={navRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 
                   h-[60px]
                   opacity-0 
                   bg-black/95 backdrop-blur-md 
                   shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                   border border-white/10
                   rounded-full
                   overflow-hidden"
        style={{ willChange: 'width, transform, opacity' }}
      >
        <div 
          ref={innerRef}
          className="flex items-center justify-center h-full mx-auto"
        >
          <div className="flex items-center justify-between h-full w-full px-6 md:px-8">
            
            {/* LOGO */}
            <Link 
              href="/" 
              onClick={(e) => handleLinkClick(e, '/')}
              className="flex-shrink-0 text-xl font-bold text-white hover:text-orange-500 transition-colors duration-300 whitespace-nowrap"
            >
              <span className="font-display">Artichaud</span>
            </Link>

            {/* NAVIGATION LINKS (STATIQUES) */}
            <div 
              ref={linksRef}
              className="hidden md:flex items-center gap-2"
            >
              {navLinks.map((item) => {
                return (
                  // On passe 'isNavigatingRef.current' (via une petite astuce de re-render ou simplement disabled si on utilisait un state)
                  // Ici le pointer-events: none sur le parent suffit généralement, mais Magnetic est robuste
                  <Magnetic key={item.label} disabled={isNavigatingRef.current}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="group relative px-4 py-2 text-sm font-medium text-white/70 
                                 hover:text-white transition-colors duration-300
                                 overflow-hidden rounded-full whitespace-nowrap"
                    >
                      <span className="absolute inset-0 rounded-full bg-white/10 
                                       scale-0 opacity-0 transition-all duration-500 
                                       group-hover:scale-100 group-hover:opacity-100 -z-10" />
                      <span className="relative">{item.label}</span>
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 
                                       bg-orange-500 transition-all duration-500 ease-out
                                       group-hover:w-1/2 rounded-full" />
                    </Link>
                  </Magnetic>
                )
              })}
            </div>

            {/* CTA BUTTON */}
            <div ref={ctaRef} className="flex-shrink-0 hidden md:block">
              <Magnetic disabled={isNavigatingRef.current}>
                <Link
                  href="/contact"
                  onClick={(e) => handleLinkClick(e, '/contact')}
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