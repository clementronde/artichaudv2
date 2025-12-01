'use client'

import { useRef, useCallback, useEffect, useLayoutEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import gsap from 'gsap'
import Link from 'next/link'

// --- COMPOSANT MAGNETIC (Inchangé) ---
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

// --- COMPOSANT NAVBAR ---
export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const containerRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  
  // Refs pour les éléments
  const logoRef = useRef<HTMLAnchorElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const isCollapsedRef = useRef(false)
  const isHoveringRef = useRef(false)
  const isNavigatingRef = useRef(false) 

  // --- CONFIGURATION TAILLES ---
  const DESKTOP_OPEN_WIDTH = 620
  const DESKTOP_COLLAPSED_WIDTH = 150
  const MOBILE_OPEN_WIDTH = 320 
  const MOBILE_COLLAPSED_WIDTH = 240 

  const navLinks = [
    { label: 'Projets', href: '/works' },
    { label: 'Services', href: '/services' },
    { label: 'À propos', href: '/a-propos' },
  ]

  // --- 1. RESET ---
  const hardReset = useCallback(() => {
    gsap.killTweensOf([navRef.current, innerRef.current, linksRef.current, ctaRef.current, logoRef.current])
    if (linksRef.current?.children) gsap.killTweensOf(linksRef.current.children)

    const isMobile = window.innerWidth < 768
    const initialWidth = isMobile ? MOBILE_OPEN_WIDTH : DESKTOP_OPEN_WIDTH

    gsap.set(navRef.current, { 
        width: initialWidth, 
        y: -100, 
        autoAlpha: 0, 
        pointerEvents: 'none',
        overwrite: 'auto'
    })
    gsap.set(innerRef.current, { width: initialWidth })
    
    if (isMobile) {
      gsap.set([logoRef.current, ctaRef.current], { autoAlpha: 0, display: 'none' })
      gsap.set(linksRef.current, { autoAlpha: 1, display: 'flex' })
    } else {
      gsap.set([logoRef.current, ctaRef.current, linksRef.current], { autoAlpha: 1, display: 'flex' })
    }

    isCollapsedRef.current = false
    isNavigatingRef.current = false
    isHoveringRef.current = false 
  }, [])

  // --- 2. ANIMATION D'ENTRÉE ---
  const animateIn = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: () => {
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

    if (window.innerWidth >= 768 && ctaRef.current) {
         tl.from(ctaRef.current, { autoAlpha: 0, y: -20, duration: 0.6 }, "-=0.5")
    }
    
    tlRef.current = tl
  }, [])

  // --- 3. NAVIGATION CLICK ---
  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (href === pathname) {
      e.preventDefault()
      return
    }
    e.preventDefault()
    
    isNavigatingRef.current = true 
    isHoveringRef.current = false
    
    if (tlRef.current) tlRef.current.kill()
    gsap.set(navRef.current, { pointerEvents: 'none' }) 
    
    gsap.to(navRef.current, {
      y: -100,
      autoAlpha: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => router.push(href)
    })
  }

  // --- 4. HOOKS CYCLE DE VIE ---
  useLayoutEffect(() => {
    hardReset()
  }, [pathname, hardReset])

  useEffect(() => {
    const t = setTimeout(() => animateIn(), 100)
    return () => clearTimeout(t)
  }, [pathname, animateIn])


  // --- 5. ANIMATION COLLAPSE (FERMETURE) ---
  const animateCollapse = useCallback(() => {
    if (isCollapsedRef.current || isNavigatingRef.current) return
    isCollapsedRef.current = true
    
    const isMobile = window.innerWidth < 768

    if (tlRef.current) tlRef.current.kill()
    tlRef.current = gsap.timeline()

    // 1. Cacher les liens
    tlRef.current.to(linksRef.current, {
        autoAlpha: 0,
        duration: 0.2,
        pointerEvents: 'none',
        onComplete: () => {
             if (isMobile) gsap.set(linksRef.current, { display: 'none' })
        }
    })
    
    // Sur Desktop, on cache aussi le CTA
    if (!isMobile) {
        tlRef.current.to(ctaRef.current, { autoAlpha: 0, duration: 0.2 }, 0)
    }

    // 2. Réduire la largeur
    tlRef.current.to([navRef.current, innerRef.current], {
      width: isMobile ? MOBILE_COLLAPSED_WIDTH : DESKTOP_COLLAPSED_WIDTH,
      duration: 0.5,
      ease: "power3.inOut"
    }, 0)

    // 3. MOBILE SPÉCIFIQUE : Afficher Logo + CTA
    if (isMobile) {
        tlRef.current.set([logoRef.current, ctaRef.current], { display: 'flex' }, 0.2)
        tlRef.current.to([logoRef.current, ctaRef.current], { 
            autoAlpha: 1, 
            duration: 0.3 
        }, 0.3)
    }

  }, [])

  // --- 6. ANIMATION EXPAND (OUVERTURE) ---
  const animateExpand = useCallback(() => {
    if (!isCollapsedRef.current || isNavigatingRef.current) return
    isCollapsedRef.current = false

    const isMobile = window.innerWidth < 768
    const targetWidth = isMobile ? MOBILE_OPEN_WIDTH : DESKTOP_OPEN_WIDTH

    if (tlRef.current) tlRef.current.kill()
    tlRef.current = gsap.timeline()

    // -------------------------------------------------------
    // LE FIX EST ICI : SÉCURITÉ POUR LE LAYOUT DESKTOP
    // -------------------------------------------------------
    if (!isMobile) {
      // Avant toute animation, on s'assure que TOUS les éléments desktop 
      // ont le bon 'display' pour que Flexbox calcule l'espace correctement.
      gsap.set([logoRef.current, ctaRef.current, linksRef.current], { display: 'flex' })
    }
    // -------------------------------------------------------


    // 1. MOBILE SPÉCIFIQUE : Cacher Logo + CTA d'abord

if (isMobile) {
  // 1. On anime l'opacité
  tlRef.current.to([logoRef.current, ctaRef.current], {
    autoAlpha: 0,
    duration: 0.2,
  })
  // 2. On change le display IMMÉDIATEMENT après (séquentiel)
  .set([logoRef.current, ctaRef.current], { display: 'none' })
}

    // 2. Agrandir la navbar
    tlRef.current.to([navRef.current, innerRef.current], {
      width: targetWidth,
      duration: 0.5,
      ease: "power3.inOut"
    }, isMobile ? ">" : 0) 

    // 3. Afficher les liens
    // Note: Sur desktop, le 'set display: flex' est déjà fait par la sécurité au début de la fonction
    if (isMobile) {
      tlRef.current.set(linksRef.current, { display: 'flex', pointerEvents: 'auto' }, "-=0.2")
    } else {
      tlRef.current.set(linksRef.current, { pointerEvents: 'auto' }, "-=0.2")
    }
    
    tlRef.current.to(linksRef.current, {
      autoAlpha: 1,
      duration: 0.3,
      ease: "power2.out"
    }, "-=0.1")

    // 4. Desktop : Réafficher le CTA
    if (!isMobile) {
         // L'autoAlpha suffit ici car le display est déjà forcé au début
         tlRef.current.to(ctaRef.current, { autoAlpha: 1, duration: 0.3 }, "-=0.1")
    }

  }, [])

  // --- 7. SCROLL HANDLER ---
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
    <div ref={containerRef as any} id="navbar-wrapper">
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
          <div className="flex items-center justify-center md:justify-between w-full px-6 md:px-8 relative">
            
            {/* LOGO */}
            <Link 
              ref={logoRef}
              href="/" 
              onClick={(e) => handleLinkClick(e, '/')}
              className="flex-shrink-0 text-xl font-bold text-white hover:text-orange-500 transition-colors duration-300 whitespace-nowrap"
            >
              <span className="font-display">Artichaud</span>
            </Link>

            {/* NAVIGATION LINKS */}
            <div 
              ref={linksRef}
              className="flex items-center gap-2"
            >
              {navLinks.map((item) => {
                return (
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
            <div ref={ctaRef} className="flex-shrink-0">
              <Magnetic disabled={isNavigatingRef.current}>
                <Link
                  href="/contact"
                  onClick={(e) => handleLinkClick(e, '/contact')}
                  className="group relative overflow-hidden
                             inline-flex items-center justify-center
                             px-5 py-2
                             bg-white text-black
                             rounded-full
                             text-sm font-semibold
                             transition-all duration-500 ease-out
                             hover:bg-orange-500 hover:text-white
                             whitespace-nowrap ml-4 md:ml-0"
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