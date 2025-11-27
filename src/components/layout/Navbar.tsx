'use client'

import { useRef, useLayoutEffect, useCallback, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import gsap from 'gsap'
import Link from 'next/link'

// --- COMPOSANT MAGNETIC ---
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

// --- COMPOSANT NAVBAR ---
export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const previousPathnameRef = useRef(pathname)
  
  const containerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const isCollapsedRef = useRef(false)
  const isHoveringRef = useRef(false)
  const isNavigatingRef = useRef(false)

  const EXPANDED_WIDTH = 620
  const COLLAPSED_WIDTH = 150
  const MOBILE_WIDTH = 340

  // Animation d'entrée de la navbar
  const animateIn = useCallback(() => {
    const targetWidth = window.innerWidth < 768 ? MOBILE_WIDTH : EXPANDED_WIDTH
    
    if (tlRef.current) tlRef.current.kill()
    
    isCollapsedRef.current = false
    isHoveringRef.current = false
    isNavigatingRef.current = false
    
    gsap.set(navRef.current, { width: targetWidth, y: -100, opacity: 0 })
    gsap.set(innerRef.current, { width: targetWidth })
    gsap.set([linksRef.current, ctaRef.current], { 
      opacity: 1, 
      visibility: 'visible',
      pointerEvents: 'auto'
    })
    
    tlRef.current = gsap.timeline()
    
    tlRef.current.to(navRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.7)"
    })
    
    if (linksRef.current?.children) {
      tlRef.current.from(linksRef.current.children, {
        opacity: 0,
        y: -15,
        stagger: 0.05,
        duration: 0.4,
        ease: "power3.out"
      }, "-=0.5")
    }
    
    if (ctaRef.current) {
      tlRef.current.from(ctaRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.4,
        ease: "power3.out"
      }, "-=0.3")
    }
  }, [])

  // Animation de sortie puis navigation
  const navigateTo = useCallback((href: string) => {
    if (isNavigatingRef.current) return
    if (href === pathname) return
    
    isNavigatingRef.current = true
    isHoveringRef.current = false
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    if (tlRef.current) {
      tlRef.current.kill()
    }
    
    // Animation de sortie PUIS navigation
    gsap.to(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        router.push(href)
      }
    })
  }, [pathname, router])

  // Handler pour les clics sur les liens
  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault() // TOUJOURS bloquer la navigation par défaut
    navigateTo(href)
  }, [navigateTo])

  // Détecter le changement de route et animer l'entrée
  useEffect(() => {
    if (pathname !== previousPathnameRef.current) {
      previousPathnameRef.current = pathname
      window.scrollTo(0, 0)
      
      // Délai pour laisser le DOM se mettre à jour
      const timer = setTimeout(() => {
        animateIn()
      }, 50)
      
      return () => clearTimeout(timer)
    }
  }, [pathname, animateIn])

  // Animation initiale au premier mount
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      animateIn()
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const animateCollapse = useCallback(() => {
    if (isCollapsedRef.current || isNavigatingRef.current) return
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

  // Gestion du scroll
  useEffect(() => {
    let lastScrollY = window.scrollY
    
    const handleScroll = () => {
      if (isNavigatingRef.current) return
      
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

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

  const navLinks = [
    { label: 'Projets', href: '/projets' },
    { label: 'Services', href: '/services' },
    { label: 'À propos', href: '/a-propos' }
  ]

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
            
            {/* LOGO */}
            <Link 
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="flex-shrink-0 text-xl font-bold text-white hover:text-orange-500 transition-colors duration-300 whitespace-nowrap"
            >
              <span className="font-display">Artichaud</span>
            </Link>

            {/* NAVIGATION LINKS */}
            <div 
              ref={linksRef}
              className="hidden md:flex items-center gap-2"
            >
              {navLinks.map((item) => {
                const isActive = pathname === item.href
                
                return (
                  <Magnetic key={item.label}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className={`group relative px-4 py-2 text-sm font-medium 
                                 transition-colors duration-300
                                 overflow-hidden rounded-full whitespace-nowrap
                                 ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}
                    >
                      <span className="absolute inset-0 rounded-full bg-white/10 
                                       scale-0 opacity-0 transition-all duration-500 
                                       group-hover:scale-100 group-hover:opacity-100 -z-10" />
                      <span className="relative">{item.label}</span>
                      <span className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 h-0.5 
                                       bg-orange-500 transition-all duration-500 ease-out
                                       rounded-full
                                       ${isActive ? 'w-1/2' : 'w-0 group-hover:w-1/2'}`} />
                    </Link>
                  </Magnetic>
                )
              })}
            </div>

            {/* CTA BUTTON */}
            <div ref={ctaRef} className="flex-shrink-0 hidden md:block">
              <Magnetic>
                <Link
                  href="/contact"
                  onClick={(e) => handleLinkClick(e, '/contact')}
                  className={`group relative overflow-hidden
                             inline-flex items-center justify-center
                             px-6 py-2.5
                             rounded-full
                             text-sm font-semibold
                             transition-all duration-500 ease-out
                             whitespace-nowrap
                             ${pathname === '/contact' 
                               ? 'bg-orange-500 text-white' 
                               : 'bg-white text-black hover:bg-orange-500 hover:text-white'}`}
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