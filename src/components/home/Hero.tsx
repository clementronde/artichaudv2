'use client'
import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'

export default function Hero() {
  const container = useRef<HTMLDivElement>(null)
  const wordsContainerRef = useRef<HTMLDivElement>(null)
  const smokeLayerRef = useRef<HTMLDivElement>(null)
  const ashLayerRef = useRef<HTMLDivElement>(null)
  const fireLayerRef = useRef<HTMLDivElement>(null)
  const leftEyeRef = useRef<HTMLDivElement>(null)
  const rightEyeRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const logoWrapperRef = useRef<HTMLDivElement>(null)
  const currentIndexRef = useRef(0)
  const isAnimatingRef = useRef(false)
  const isInViewRef = useRef(true)
  const eyesReadyRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  const words = ['projets', 'idées', 'envies', 'ambitions']

  // Observer pour détecter si le hero est visible
  useEffect(() => {
    const heroSection = container.current
    if (!heroSection) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInViewRef.current = entry.isIntersecting
          
          // Si on quitte le hero, on nettoie les particules
          if (!entry.isIntersecting) {
            if (smokeLayerRef.current) smokeLayerRef.current.innerHTML = ''
            if (ashLayerRef.current) ashLayerRef.current.innerHTML = ''
            if (fireLayerRef.current) fireLayerRef.current.innerHTML = ''
          }
        })
      },
      {
        threshold: 0.3 // 30% du hero doit être visible
      }
    )

    observer.observe(heroSection)
    return () => observer.disconnect()
  }, [])

  // Effet des yeux qui suivent la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyesReadyRef.current) return
      
      const leftEye = leftEyeRef.current
      const rightEye = rightEyeRef.current
      const logo = logoWrapperRef.current
      
      if (!leftEye || !rightEye || !logo) return

      const logoRect = logo.getBoundingClientRect()
      const logoCenterX = logoRect.left + logoRect.width / 2
      const logoCenterY = logoRect.top + logoRect.height * 0.38

      const deltaX = e.clientX - logoCenterX
      const deltaY = e.clientY - logoCenterY
      const angle = Math.atan2(deltaY, deltaX)
      
      const distance = Math.min(Math.hypot(deltaX, deltaY) / 15, 12)

      const eyeX = Math.cos(angle) * distance
      const eyeY = Math.sin(angle) * distance

      gsap.to([leftEye, rightEye], {
        x: eyeX,
        y: eyeY,
        duration: 0.12,
        ease: "power2.out",
        overwrite: 'auto'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Nettoyer toutes les particules
  const clearAllParticles = useCallback(() => {
    if (smokeLayerRef.current) {
      smokeLayerRef.current.innerHTML = ''
    }
    if (ashLayerRef.current) {
      ashLayerRef.current.innerHTML = ''
    }
    if (fireLayerRef.current) {
      fireLayerRef.current.innerHTML = ''
    }
  }, [])

  // Reset complet de l'état
  const resetState = useCallback(() => {
    isAnimatingRef.current = false
    clearAllParticles()
    
    if (wordsContainerRef.current) {
      const allLetters = wordsContainerRef.current.querySelectorAll('.letter')
      gsap.killTweensOf(allLetters)
      
      const wordElements = wordsContainerRef.current.querySelectorAll('.word-item')
      wordElements.forEach((word, index) => {
        const el = word as HTMLElement
        gsap.set(el, { display: index === currentIndexRef.current ? 'block' : 'none' })
        
        const letters = el.querySelectorAll('.letter')
        letters.forEach(letter => {
          gsap.set(letter, {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'none',
            color: 'inherit',
            textShadow: 'none'
          })
        })
      })
    }
  }, [clearAllParticles])

  // Fonction pour créer une particule de feu/braise
  const createFireParticle = useCallback((x: number, y: number) => {
    if (!document.hasFocus() || !isInViewRef.current) return
    
    const fireLayer = fireLayerRef.current
    if (!fireLayer) return
    
    const particle = document.createElement('div')
    const isEmber = Math.random() > 0.3
    const size = isEmber ? Math.random() * 6 + 2 : Math.random() * 4 + 1
    
    particle.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      pointer-events: none;
      background: ${isEmber 
        ? `radial-gradient(circle, #fff 0%, #ffaa00 30%, #ff4400 70%, transparent 100%)`
        : `radial-gradient(circle, rgba(100,100,100,0.8) 0%, rgba(50,50,50,0.4) 50%, transparent 100%)`
      };
      box-shadow: ${isEmber ? `0 0 ${size * 2}px #ff4400, 0 0 ${size * 4}px #ff6600` : 'none'};
    `
    fireLayer.appendChild(particle)

    const angle = Math.random() * Math.PI * 2
    const velocity = Math.random() * 60 + 20
    const xEnd = Math.cos(angle) * velocity
    const yEnd = isEmber 
      ? -(Math.random() * 120 + 60) 
      : -(Math.random() * 80 + 40)

    gsap.to(particle, {
      x: xEnd,
      y: yEnd,
      opacity: 0,
      scale: isEmber ? 0 : Math.random() * 3 + 1,
      duration: isEmber ? Math.random() * 0.8 + 0.4 : Math.random() * 1.2 + 0.8,
      ease: isEmber ? "power2.out" : "power1.out",
      onComplete: () => particle.remove()
    })
  }, [])

  // Fonction pour créer la fumée
  const createSmoke = useCallback((x: number, y: number) => {
    if (!document.hasFocus() || !isInViewRef.current) return
    
    const smokeLayer = smokeLayerRef.current
    if (!smokeLayer) return

    const smoke = document.createElement('div')
    const size = Math.random() * 40 + 30
    
    smoke.style.cssText = `
      position: absolute;
      left: ${x - size/2}px;
      top: ${y - size/2}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle, rgba(60,60,60,0.7) 0%, rgba(40,40,40,0.4) 40%, transparent 70%);
      filter: blur(12px);
    `
    smokeLayer.appendChild(smoke)

    gsap.to(smoke, {
      y: -(Math.random() * 250 + 150),
      x: (Math.random() - 0.5) * 120,
      scale: Math.random() * 3 + 2.5,
      opacity: 0,
      duration: Math.random() * 2 + 1.5,
      ease: "power1.out",
      onComplete: () => smoke.remove()
    })
  }, [])

  // Fonction pour créer des cendres
  const createAsh = useCallback((x: number, y: number) => {
    if (!document.hasFocus() || !isInViewRef.current) return
    
    const ashLayer = ashLayerRef.current
    if (!ashLayer) return

    const ash = document.createElement('div')
    const size = Math.random() * 4 + 2
    const isLarge = Math.random() > 0.7
    
    ash.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${isLarge ? size * 2 : size}px;
      height: ${size}px;
      border-radius: ${isLarge ? '40%' : '50%'};
      pointer-events: none;
      background: ${isLarge 
        ? 'linear-gradient(135deg, rgba(80,80,80,0.9) 0%, rgba(40,40,40,0.7) 100%)'
        : 'rgba(60,60,60,0.8)'
      };
      transform: rotate(${Math.random() * 360}deg);
    `
    ashLayer.appendChild(ash)

    const fallDuration = Math.random() * 3 + 2
    const swayAmount = Math.random() * 100 + 50
    const swayFrequency = Math.random() * 3 + 2

    gsap.to(ash, {
      y: window.innerHeight - y + 100,
      x: `+=${Math.sin(Math.random() * Math.PI) * swayAmount}`,
      rotation: Math.random() * 720 - 360,
      duration: fallDuration,
      ease: "none",
      onUpdate: function() {
        const progress = this.progress()
        const sway = Math.sin(progress * Math.PI * swayFrequency) * 30
        gsap.set(ash, { x: `+=${sway * 0.02}` })
      },
      onComplete: () => {
        gsap.to(ash, {
          opacity: 0,
          scale: 0.5,
          duration: 1,
          delay: Math.random() * 2,
          ease: "power2.in",
          onComplete: () => ash.remove()
        })
      }
    })
  }, [])

  // Fonction pour brûler une lettre
  const burnLetter = useCallback((
    letter: HTMLElement, 
    index: number, 
    onComplete?: () => void
  ) => {
    if (!document.hasFocus() || !isInViewRef.current) {
      onComplete?.()
      return
    }

    const rect = letter.getBoundingClientRect()
    const sectionRect = container.current?.getBoundingClientRect()
    if (!sectionRect) {
      onComplete?.()
      return
    }
    
    const absoluteX = rect.left - sectionRect.left + rect.width / 2
    const absoluteY = rect.top - sectionRect.top + rect.height / 2

    const tl = gsap.timeline({ onComplete })

    tl.to(letter, {
      color: '#ff6600',
      textShadow: '0 0 10px #ff4400, 0 0 20px #ff6600, 0 0 30px #ff8800',
      duration: 0.15,
      delay: index * 0.08
    })
    .to(letter, {
      color: '#ff2200',
      textShadow: '0 0 15px #ff0000, 0 0 30px #ff4400',
      scale: 1.1,
      duration: 0.1
    })
    .to(letter, {
      opacity: 0,
      scale: 0.5,
      filter: 'blur(2px)',
      y: -10,
      duration: 0.3,
      ease: "power2.in"
    })

    const particleDelay = index * 80
    const particleTimeout = setTimeout(() => {
      if (!document.hasFocus() || !isInViewRef.current) return
      
      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          if (!document.hasFocus() || !isInViewRef.current) return
          createFireParticle(
            absoluteX + (Math.random() - 0.5) * rect.width,
            absoluteY + (Math.random() - 0.5) * rect.height
          )
        }, i * 20)
      }
      
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          if (!document.hasFocus() || !isInViewRef.current) return
          createSmoke(
            absoluteX + (Math.random() - 0.5) * rect.width * 2,
            absoluteY
          )
        }, i * 40 + 50)
      }

      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          if (!document.hasFocus() || !isInViewRef.current) return
          createAsh(
            absoluteX + (Math.random() - 0.5) * rect.width * 3,
            absoluteY + Math.random() * 20
          )
        }, i * 60 + 200)
      }
    }, particleDelay)

    return () => clearTimeout(particleTimeout)
  }, [createFireParticle, createSmoke, createAsh])

  // Fonction pour révéler une lettre
  const revealLetter = useCallback((letter: HTMLElement, index: number) => {
    gsap.set(letter, {
      opacity: 0,
      y: 20,
      filter: 'blur(8px)',
      scale: 0.8
    })

    gsap.to(letter, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      duration: 0.5,
      delay: index * 0.06,
      ease: "power3.out"
    })
  }, [])

  // Animation d'entrée
  useGSAP(() => {
    const tl = gsap.timeline()
    const leftEye = leftEyeRef.current
    const rightEye = rightEyeRef.current

    tl.from(".hero-line", {
      y: 150,
      duration: 1.5,
      ease: "power4.out",
      stagger: 0.15,
      delay: 0.2
    })
    .from(".hero-text", {
      opacity: 0,
      y: 20,
      duration: 1,
    }, "-=1.0")

    tl.fromTo(".hero-logo", 
      {
        opacity: 0,
        x: 100,
        scale: 0.9,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      }, 
      "-=1.4"
    )

    if (leftEye && rightEye) {
      tl.to([leftEye, rightEye], {
        x: -8,
        y: -5,
        duration: 0.25,
        ease: "power2.inOut"
      }, "-=0.5")
      .to([leftEye, rightEye], {
        x: 10,
        y: 3,
        duration: 0.35,
        ease: "power2.inOut"
      })
      .to([leftEye, rightEye], {
        x: -6,
        y: 6,
        duration: 0.28,
        ease: "power2.inOut"
      })
      .to([leftEye, rightEye], {
        x: 8,
        y: -4,
        duration: 0.32,
        ease: "power2.inOut"
      })
      .to([leftEye, rightEye], {
        x: -4,
        y: 0,
        duration: 0.2,
        ease: "power2.inOut"
      })
      .to([leftEye, rightEye], {
        x: 0,
        y: 0,
        duration: 0.35,
        ease: "elastic.out(1, 0.5)",
        onComplete: () => {
          eyesReadyRef.current = true
        }
      })
    }

  }, { scope: container })

  // Cycle des mots
  useEffect(() => {
    const wordsContainer = wordsContainerRef.current
    if (!wordsContainer) return

    const cycleWords = () => {
      // Ne pas animer si hors vue
      if (isAnimatingRef.current || !document.hasFocus() || !isInViewRef.current) return
      
      isAnimatingRef.current = true

      const wordElements = wordsContainer.querySelectorAll('.word-item')
      const currentWord = wordElements[currentIndexRef.current] as HTMLElement
      const nextIndex = (currentIndexRef.current + 1) % words.length
      const nextWord = wordElements[nextIndex] as HTMLElement

      if (!currentWord || !nextWord) {
        isAnimatingRef.current = false
        return
      }

      const currentLetters = currentWord.querySelectorAll('.letter') as NodeListOf<HTMLElement>
      const nextLetters = nextWord.querySelectorAll('.letter') as NodeListOf<HTMLElement>

      let completedCount = 0
      currentLetters.forEach((letter, index) => {
        burnLetter(letter, index, () => {
          completedCount++
          
          if (completedCount === currentLetters.length) {
            gsap.set(currentWord, { display: 'none' })
            gsap.set(nextWord, { display: 'block' })
            
            currentLetters.forEach(l => {
              gsap.set(l, {
                opacity: 1,
                scale: 1,
                y: 0,
                filter: 'none',
                color: 'inherit',
                textShadow: 'none'
              })
            })
            
            nextLetters.forEach((letter, idx) => {
              revealLetter(letter, idx)
            })
            
            currentIndexRef.current = nextIndex
            isAnimatingRef.current = false
          }
        })
      })
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        if (intervalRef.current) clearInterval(intervalRef.current)
        resetState()
      } else {
        clearAllParticles()
        isAnimatingRef.current = false
        
        timeoutRef.current = setTimeout(() => {
          cycleWords()
          intervalRef.current = setInterval(cycleWords, 4500)
        }, 2000)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    timeoutRef.current = setTimeout(() => {
      cycleWords()
      intervalRef.current = setInterval(cycleWords, 4500)
    }, 3000)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
      resetState()
    }
  }, [burnLetter, revealLetter, resetState, clearAllParticles, words.length])

  return (
    <section 
      ref={container} 
      className="relative h-screen w-full flex flex-col md:flex-row justify-center px-6 md:px-10 bg-white text-arti-black overflow-hidden"
    >
      {/* Layer des cendres */}
      <div 
        ref={ashLayerRef}
        className="absolute inset-0 pointer-events-none z-20"
      />

      {/* Layer du feu/braises */}
      <div 
        ref={fireLayerRef}
        className="absolute inset-0 pointer-events-none z-30"
      />

      {/* Layer de fumée */}
      <div 
        ref={smokeLayerRef}
        className="absolute inset-0 pointer-events-none z-50"
      />

      {/* CONTENU GAUCHE */}
      <div className="flex flex-col justify-center z-10 md:flex-1 pt-20">
        
        <div className="overflow-hidden pb-2">
          <h1 className="hero-line block text-display font-light text-[11vw] md:text-[80px] lg:text-[100px] leading-[0.9] whitespace-nowrap">
            Mettez le feu à vos
          </h1>
        </div>
        
        <div className="pb-6 -mt-2 md:-mt-4">
          <h1 className="hero-line block text-display font-extrabold text-[11vw] md:text-[80px] lg:text-[100px] leading-[1.1]">
            <span 
              ref={wordsContainerRef}
              className="relative inline-block"
              style={{ minWidth: '4.5em' }}
            >
              {words.map((word, wordIndex) => (
                <span 
                  key={word}
                  className="word-item absolute left-0 top-0"
                  style={{ display: wordIndex === 0 ? 'block' : 'none' }}
                >
                  {word.split('').map((letter, letterIndex) => (
                    <span 
                      key={letterIndex} 
                      className="letter inline-block"
                      style={{ willChange: 'transform, opacity, filter' }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              ))}
              <span className="invisible">ambitions</span>
            </span>
          </h1>
        </div>

        {/* PARAGRAPHE MANIFESTE */}
        <div className="mt-8 md:mt-12 max-w-2xl">
          <p className="hero-text text-lead font-light text-arti-black/80">
            Let&apos;s be honest. You&apos;ve built something great. But lately, 
            it&apos;s been harder to capture attention, or even - the right kind.
          </p>
        </div>
      </div>

      {/* LOGO ARTICHAUD - RÉDUIT ET PLUS À DROITE */}
      <div 
        ref={logoRef}
        className="hero-logo hidden md:flex items-end justify-end md:w-[40%] lg:w-[35%] z-10 pr-4 lg:pr-8"
      >
        <div 
          ref={logoWrapperRef}
          className="relative w-[200px] lg:w-[280px] xl:w-[320px]"
        >
          {/* Image PNG du logo */}
          <Image
            src="/logonoirhero.png"
            alt="Artichaud Studio"
            width={320}
            height={400}
            className="w-full h-auto"
            priority
          />

          {/* Œil gauche */}
          <div 
            ref={leftEyeRef}
            className="absolute rounded-full bg-white"
            style={{
              width: '5.5%',
              paddingBottom: '5.5%',
              left: '40%',
              top: '35%',
              transform: 'translate(-50%, -50%)',
              willChange: 'transform'
            }}
          />

          {/* Œil droit */}
          <div 
            ref={rightEyeRef}
            className="absolute rounded-full bg-white"
            style={{
              width: '5.5%',
              paddingBottom: '5.5%',
              left: '60%',
              top: '35%',
              transform: 'translate(-50%, -50%)',
              willChange: 'transform'
            }}
          />
        </div>
      </div>
    </section>
  )
}