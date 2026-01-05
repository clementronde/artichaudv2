'use client'

import { useRef, useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import gsap from 'gsap'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion' // Assurez-vous d'avoir framer-motion

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

  return (
    <div 
        ref={magneticRef} 
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave} 
        className="w-fit h-fit pointer-events-auto cursor-pointer flex-shrink-0"
    >
      {children}
    </div>
  )
}

// --- MENU MOBILE OVERLAY ---
const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[6000] bg-black flex flex-col items-center justify-center"
                >
                    {/* Bouton Fermer */}
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 p-4 text-white"
                    >
                        Fermer
                    </button>

                    <nav className="flex flex-col items-center gap-8">
                        {[
                            { label: 'Projets', href: '/works' },
                            { label: 'Services', href: '/services' },
                            { label: 'À propos', href: '/about' },
                            { label: 'Contact', href: '/contact' }
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={onClose}
                                className="text-4xl font-bold text-white hover:text-[#D0FF00] transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// --- COMPOSANT NAVBAR PRINCIPAL ---
export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Refs pour la version Desktop (GSAP)
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
    { label: 'Projets', href: '/works' },
    { label: 'Services', href: '/services' },
    { label: 'À propos', href: '/about' },
  ]

  // --- LOGIQUE GSAP DESKTOP (Inchangée) ---
  const hardReset = useCallback(() => {
    // Cette fonction ne s'exécute que si les refs existent (donc sur desktop)
    if (!navRef.current) return;
    
    gsap.killTweensOf([navRef.current, innerRef.current, linksRef.current, ctaRef.current, logoWrapperRef.current])
    gsap.set([navRef.current, logoWrapperRef.current], { y: -100, autoAlpha: 0 })
    gsap.set(navRef.current, { width: DESKTOP_OPEN_WIDTH, display: 'flex', marginLeft: 8, pointerEvents: 'none' })
    gsap.set([linksRef.current, ctaRef.current], { autoAlpha: 1, x: 0, display: 'flex' })
    isCollapsedRef.current = false
    isNavigatingRef.current = false
    isLoadedRef.current = false
  }, [])

  const animateIn = useCallback(() => {
    if (isAnimatingInRef.current || !navRef.current) return
    isAnimatingInRef.current = true
    isLoadedRef.current = true
    
    const tl = gsap.timeline({
      onComplete: () => { 
        isAnimatingInRef.current = false 
        if(navRef.current) gsap.set(navRef.current, { pointerEvents: 'auto' })
      }
    })
    
    tl.to([logoWrapperRef.current, navRef.current], {
      y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.1, ease: "elastic.out(1, 0.75)"
    })
    
    if (linksRef.current?.children) {
      tl.from(linksRef.current.children, {
        autoAlpha: 0, y: 15, stagger: 0.05, duration: 0.5, ease: "back.out(1.7)" 
      }, "-=0.8")
    }

    if (ctaRef.current) {
         tl.from(ctaRef.current, { autoAlpha: 0, scale: 0.5, rotation: -10, duration: 0.6, ease: "back.out(1.5)" }, "-=0.7")
    }
    tlRef.current = tl
  }, [])

  // ... (Garder animateCollapse et animateExpand ici, identiques à votre code précédent, avec check if !navRef.current return) ...
  const animateCollapse = useCallback(() => {
    if (isCollapsedRef.current || isNavigatingRef.current || !isLoadedRef.current || !navRef.current) return
    isCollapsedRef.current = true
    if (tlRef.current) tlRef.current.kill()
    const tl = gsap.timeline()
    tl.to([linksRef.current, ctaRef.current], { autoAlpha: 0, x: -20, duration: 0.2, ease: "power2.in" }, 0)
    tl.to(navRef.current, { width: 0, marginLeft: 0, paddingLeft: 0, paddingRight: 0, autoAlpha: 0, duration: 0.5, ease: "back.in(1.5)", pointerEvents: 'none' }, 0.1)
    tl.to(logoWrapperRef.current, { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }, 0.4)
    tlRef.current = tl
  }, [])

  const animateExpand = useCallback(() => {
    if (!isCollapsedRef.current || isNavigatingRef.current || !isLoadedRef.current || !navRef.current) return
    isCollapsedRef.current = false
    if (tlRef.current) tlRef.current.kill()
    const tl = gsap.timeline()
    tl.to(navRef.current, { width: DESKTOP_OPEN_WIDTH, marginLeft: 8, paddingLeft: 8, paddingRight: 8, autoAlpha: 1, duration: 0.9, ease: "elastic.out(1, 0.6)", pointerEvents: 'auto' }, 0)
    tl.fromTo([linksRef.current, ctaRef.current], { autoAlpha: 0, x: -15 }, { autoAlpha: 1, x: 0, duration: 0.4, ease: "power2.out", stagger: 0.05 }, 0.2)
    tlRef.current = tl
  }, [])

  // --- HOOKS ---
  useEffect(() => {
    const resetIdleTimer = () => {
      if (isNavigatingRef.current || !isLoadedRef.current) return
      if (isCollapsedRef.current) animateExpand()
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      idleTimerRef.current = setTimeout(() => { animateCollapse() }, 3000)
    }
    // On n'attache les listeners que si on est sur un écran qui affiche le desktop menu
    if (window.innerWidth > 768) {
        window.addEventListener('mousemove', resetIdleTimer)
        window.addEventListener('scroll', resetIdleTimer)
        window.addEventListener('click', resetIdleTimer)
        resetIdleTimer()
    }
    return () => {
      window.removeEventListener('mousemove', resetIdleTimer)
      window.removeEventListener('scroll', resetIdleTimer)
      window.removeEventListener('click', resetIdleTimer)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [animateCollapse, animateExpand])

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (href === pathname) { e.preventDefault(); return }
    e.preventDefault()
    isNavigatingRef.current = true 
    gsap.to([navRef.current, logoWrapperRef.current], {
      y: -100, autoAlpha: 0, duration: 0.4, stagger: 0.05, ease: "power2.in",
      onComplete: () => router.push(href)
    })
  }

  useLayoutEffect(() => { hardReset() }, [pathname, hardReset])

  useEffect(() => {
    const handlePreloaderComplete = () => setTimeout(() => animateIn(), 100)
    if (pathname === '/') {
       window.addEventListener('preloaderComplete', handlePreloaderComplete)
       const fallbackTimer = setTimeout(() => { if (!isLoadedRef.current) animateIn() }, 2500)
       return () => { window.removeEventListener('preloaderComplete', handlePreloaderComplete); clearTimeout(fallbackTimer) }
    } else {
       const t = setTimeout(() => animateIn(), 500)
       return () => clearTimeout(t)
    }
  }, [pathname, animateIn])

  return (
    <>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* --- 1. VERSION MOBILE (VISIBLE UNIQUEMENT SUR < MD) --- */}
      <div className="fixed top-6 left-0 w-full px-6 z-[5000] flex justify-between items-center md:hidden">
          {/* Logo Mobile */}
          <Link href="/" className="h-[50px] w-[50px] rounded-full bg-black flex items-center justify-center shadow-lg">
             <Image src="/icon.png" alt="Logo" width={28} height={28} className="object-contain" />
          </Link>

          {/* Bouton Burger Mobile */}
          <button 
             onClick={() => setIsMobileMenuOpen(true)}
             className="h-[50px] px-6 rounded-full bg-black text-[#FDF4E7] font-medium shadow-lg flex items-center justify-center"
          >
             Menu
          </button>
      </div>

      {/* --- 2. VERSION DESKTOP (VISIBLE UNIQUEMENT SUR MD+) --- */}
      <div 
        ref={containerRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[5000] hidden md:flex items-center h-[60px]"
      >
        {/* LOGO BUBBLE */}
        <div 
          ref={logoWrapperRef}
          className="h-[60px] w-[60px] rounded-full bg-[#000000] border border-white/5 shadow-[0_8px_20px_rgba(0,0,0,0.2)] flex items-center justify-center flex-shrink-0 cursor-pointer overflow-hidden relative z-20 pointer-events-auto"
        >
          <Link href="/" onClick={(e) => handleLinkClick(e, '/')} className="relative w-full h-full flex items-center justify-center hover:scale-105 transition-transform duration-300">
              <Image src="/icon.png" alt="Artichaud Logo" width={36} height={36} className="object-contain" />
          </Link>
        </div>

        {/* CAPSULE NAVIGATION */}
        <nav 
          ref={navRef}
          className="h-[60px] rounded-full bg-[#000000] border border-white/5 shadow-[0_8px_20px_rgba(0,0,0,0.2)] flex items-center overflow-hidden origin-left z-10 flex-shrink-0"
          style={{ width: DESKTOP_OPEN_WIDTH, marginLeft: 8 }}
        >
          <div ref={innerRef} className="flex items-center justify-center gap-1 w-full h-full flex-shrink-0 px-2">
              <div ref={linksRef} className="flex items-center gap-1 flex-shrink-0">
                {navLinks.map((item) => (
                  <Magnetic key={item.label} disabled={isNavigatingRef.current}>
                    <Link href={item.href} onClick={(e) => handleLinkClick(e, item.href)} className="relative px-4 py-2 text-[15px] font-medium text-[#FDF4E7] hover:text-white transition-colors duration-300 rounded-full whitespace-nowrap pointer-events-auto block">
                      {item.label}
                    </Link>
                  </Magnetic>
                ))}
              </div>

              <div ref={ctaRef} className="flex-shrink-0">
                <Magnetic disabled={isNavigatingRef.current}>
                  <Link href="/contact" onClick={(e) => handleLinkClick(e, '/contact')} className="group relative overflow-hidden inline-flex items-center justify-center px-5 py-3 rounded-full text-[15px] font-medium transition-all duration-300 whitespace-nowrap pointer-events-auto bg-white/10 backdrop-blur-md border border-white/10 text-[#FDF4E7] hover:bg-white/20 hover:border-white/30 hover:text-white">
                    <span className="flex items-center gap-2">
                      <span className="transition-transform duration-300 group-hover:-translate-x-1">→</span>
                      <span>Parlons-en</span>
                    </span>
                  </Link>
                </Magnetic>
              </div>
          </div>
        </nav>
      </div>
    </>
  )
}