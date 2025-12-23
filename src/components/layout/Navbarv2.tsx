'use client'

import { useRef, useCallback, useEffect, useLayoutEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import gsap from 'gsap'
import Link from 'next/link'
import Image from 'next/image'

// --- COMPOSANT MAGNETIC ---
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

  return (
    <div 
        ref={magneticRef} 
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave} 
        className="w-fit h-fit pointer-events-auto cursor-pointer"
    >
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
  const logoWrapperRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null)
  
  const isCollapsedRef = useRef(false)
  const isNavigatingRef = useRef(false) 
  const isAnimatingInRef = useRef(false)
  const isLoadedRef = useRef(false)

  const DESKTOP_OPEN_WIDTH = 400 
  
  const navLinks = [
    { label: 'Works', href: '/works' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
  ]

  // --- 1. RESET ---
  const hardReset = useCallback(() => {
    gsap.killTweensOf([navRef.current, innerRef.current, linksRef.current, ctaRef.current, logoWrapperRef.current])
    
    gsap.set([navRef.current, logoWrapperRef.current], { 
        y: -100, 
        autoAlpha: 0, 
    })
    
    gsap.set(navRef.current, { 
      width: DESKTOP_OPEN_WIDTH, 
      display: 'flex',
      marginLeft: 8, 
      pointerEvents: 'none' 
    })
    
    gsap.set([linksRef.current, ctaRef.current], { autoAlpha: 1, x: 0, display: 'flex' })

    isCollapsedRef.current = false
    isNavigatingRef.current = false
    isLoadedRef.current = false
  }, [])

  // --- 2. ANIMATION D'ENTRÉE ---
  const animateIn = useCallback(() => {
    if (isAnimatingInRef.current) return
    isAnimatingInRef.current = true
    isLoadedRef.current = true
    
    const tl = gsap.timeline({
      onComplete: () => { 
        isAnimatingInRef.current = false 
        gsap.set(navRef.current, { pointerEvents: 'auto' })
      }
    })
    
    tl.to([logoWrapperRef.current, navRef.current], {
      y: 0,
      autoAlpha: 1,
      duration: 1.2,
      stagger: 0.1, 
      ease: "elastic.out(1, 0.75)"
    })
    
    if (linksRef.current?.children) {
      tl.from(linksRef.current.children, {
        autoAlpha: 0,
        y: 15,
        stagger: 0.05,
        duration: 0.5,
        ease: "back.out(1.7)" 
      }, "-=0.8")
    }

    if (ctaRef.current) {
         tl.from(ctaRef.current, { autoAlpha: 0, scale: 0.5, rotation: -10, duration: 0.6, ease: "back.out(1.5)" }, "-=0.7")
    }
    
    tlRef.current = tl
  }, [])

  // --- 3. ANIMATION COLLAPSE (FUNKY CLOSING) ---
  const animateCollapse = useCallback(() => {
    if (isCollapsedRef.current || isNavigatingRef.current || !isLoadedRef.current) return
    isCollapsedRef.current = true

    if (tlRef.current) tlRef.current.kill()
    const tl = gsap.timeline()

    tl.to([linksRef.current, ctaRef.current], {
        autoAlpha: 0,
        x: -20,
        duration: 0.2,
        ease: "power2.in"
    }, 0)

    tl.to(navRef.current, {
        width: 0,
        marginLeft: 0, 
        paddingLeft: 0,
        paddingRight: 0,
        autoAlpha: 0,
        duration: 0.5,
        ease: "back.in(1.5)", 
        pointerEvents: 'none'
    }, 0.1)

    tl.to(logoWrapperRef.current, {
        scale: 1.1,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
    }, 0.4)

    tlRef.current = tl
  }, [])

  // --- 4. ANIMATION EXPAND (FUNKY OPENING) ---
  const animateExpand = useCallback(() => {
    if (!isCollapsedRef.current || isNavigatingRef.current || !isLoadedRef.current) return
    isCollapsedRef.current = false

    if (tlRef.current) tlRef.current.kill()
    const tl = gsap.timeline()

    tl.to(navRef.current, {
        width: DESKTOP_OPEN_WIDTH,
        marginLeft: 8,
        paddingLeft: 8,
        paddingRight: 8,
        autoAlpha: 1,
        duration: 0.9, 
        ease: "elastic.out(1, 0.6)", 
        pointerEvents: 'auto'
    }, 0)

    tl.fromTo([linksRef.current, ctaRef.current], 
        { autoAlpha: 0, x: -15 },
        { autoAlpha: 1, x: 0, duration: 0.4, ease: "power2.out", stagger: 0.05 },
        0.2 
    )

    tlRef.current = tl
  }, [])

  // --- 5. GESTION DE L'INACTIVITÉ ---
  useEffect(() => {
    const resetIdleTimer = () => {
      if (isNavigatingRef.current || !isLoadedRef.current) return
      if (isCollapsedRef.current) animateExpand()
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      
      idleTimerRef.current = setTimeout(() => {
        animateCollapse()
      }, 2000)
    }

    window.addEventListener('mousemove', resetIdleTimer)
    window.addEventListener('scroll', resetIdleTimer)
    window.addEventListener('click', resetIdleTimer)
    resetIdleTimer()

    return () => {
      window.removeEventListener('mousemove', resetIdleTimer)
      window.removeEventListener('scroll', resetIdleTimer)
      window.removeEventListener('click', resetIdleTimer)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [animateCollapse, animateExpand])

  // --- 6. NAVIGATION CLICK ---
  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (href === pathname) { e.preventDefault(); return }
    e.preventDefault()
    
    isNavigatingRef.current = true 
    
    gsap.to([navRef.current, logoWrapperRef.current], {
      y: -100,
      autoAlpha: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => router.push(href)
    })
  }

  useLayoutEffect(() => { hardReset() }, [pathname, hardReset])

  useEffect(() => {
    const handlePreloaderComplete = () => setTimeout(() => animateIn(), 100)
    if (pathname === '/') {
       window.addEventListener('preloaderComplete', handlePreloaderComplete)
       const fallbackTimer = setTimeout(() => { if (!isLoadedRef.current) animateIn() }, 2500)
       return () => {
         window.removeEventListener('preloaderComplete', handlePreloaderComplete)
         clearTimeout(fallbackTimer)
       }
    } else {
       const t = setTimeout(() => animateIn(), 500)
       return () => clearTimeout(t)
    }
  }, [pathname, animateIn])

  return (
    <div 
      ref={containerRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[5000] flex items-center h-[60px]"
    >
      
      {/* BULLE 1 : LOGO */}
      <div 
        ref={logoWrapperRef}
        className="h-[60px] w-[60px] rounded-full 
                   bg-[#000000] border border-white/5
                   shadow-[0_8px_20px_rgba(0,0,0,0.2)]
                   flex items-center justify-center
                   flex-shrink-0 cursor-pointer overflow-hidden relative z-20 pointer-events-auto"
      >
        <Link 
            href="/" 
            onClick={(e) => handleLinkClick(e, '/')}
            className="relative w-full h-full flex items-center justify-center hover:scale-105 transition-transform duration-300"
        >
            <Image 
                src="/icon.png" 
                alt="Artichaud Logo" 
                width={36} 
                height={36} 
                className="object-contain"
            />
        </Link>
      </div>

      {/* BULLE 2 : NAVIGATION */}
      <nav 
        ref={navRef}
        className="h-[60px] rounded-full 
                   bg-[#000000] border border-white/5
                   shadow-[0_8px_20px_rgba(0,0,0,0.2)]
                   flex items-center overflow-hidden origin-left z-10"
        style={{ width: DESKTOP_OPEN_WIDTH, marginLeft: 8 }}
      >
        <div 
          ref={innerRef}
          className="flex items-center justify-center gap-1 w-[400px] h-full flex-shrink-0 px-2"
        >
            {/* GROUPE GAUCHE : LIENS */}
            <div ref={linksRef} className="flex items-center gap-1">
              {navLinks.map((item) => (
                <Magnetic key={item.label} disabled={isNavigatingRef.current}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="relative px-4 py-2 text-[15px] font-medium text-[#FDF4E7] 
                               hover:text-white transition-colors duration-300
                               rounded-full whitespace-nowrap pointer-events-auto"
                  >
                    {item.label}
                  </Link>
                </Magnetic>
              ))}
            </div>

            {/* GROUPE DROITE : CTA (MODIFIÉ EN GLASSMORPHISM) */}
            <div ref={ctaRef} className="flex-shrink-0">
              <Magnetic disabled={isNavigatingRef.current}>
                <Link
                  href="/contact"
                  onClick={(e) => handleLinkClick(e, '/contact')}
                  // MODIFICATION ICI : Remplacement des couleurs solides par le style glassmorphism
                  className="group relative overflow-hidden
                             inline-flex items-center justify-center
                             px-5 py-3
                             rounded-full
                             text-[15px] font-medium
                             transition-all duration-300
                             whitespace-nowrap pointer-events-auto
                             
                             bg-white/10 backdrop-blur-md border border-white/10 text-[#FDF4E7]
                             hover:bg-white/20 hover:border-white/30 hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <span className="transition-transform duration-300 group-hover:-translate-x-1">→</span>
                    <span>Let's talk</span>
                  </span>
                </Link>
              </Magnetic>
            </div>
            
        </div>
      </nav>
    </div>
  )
}