'use client'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Hero() {
  const container = useRef<HTMLDivElement>(null)
  const wordsContainerRef = useRef<HTMLDivElement>(null)
  const smokeLayerRef = useRef<HTMLDivElement>(null)
  const ashLayerRef = useRef<HTMLDivElement>(null)
  const currentIndexRef = useRef(0)
  
  const words = ['projets', 'idées', 'envies', 'ambitions']

  // Fonction pour créer une particule de feu/braise
  const createFireParticle = (x: number, y: number, container: HTMLElement) => {
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
    container.appendChild(particle)

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
  }

  // Fonction pour créer la fumée (dans le layer au-dessus de tout)
  const createSmoke = (x: number, y: number) => {
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
  }

  // Fonction pour créer des cendres qui tombent
  const createAsh = (x: number, y: number) => {
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

    // Animation de chute avec oscillation
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
        // Oscillation pendant la chute
        const progress = this.progress()
        const sway = Math.sin(progress * Math.PI * swayFrequency) * 30
        gsap.set(ash, { x: `+=${sway * 0.02}` })
      },
      onComplete: () => {
        // Petite animation d'atterrissage
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
  }

  // Fonction pour brûler une lettre
  const burnLetter = (letter: HTMLElement, index: number, container: HTMLElement, onComplete?: () => void) => {
    const rect = letter.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    const sectionRect = container.closest('section')?.getBoundingClientRect() || containerRect
    
    const centerX = rect.left - containerRect.left + rect.width / 2
    const centerY = rect.top - containerRect.top + rect.height / 2
    
    // Position absolue pour la fumée (par rapport à la section)
    const absoluteX = rect.left - sectionRect.left + rect.width / 2
    const absoluteY = rect.top - sectionRect.top + rect.height / 2

    // Timeline pour la combustion de la lettre
    const tl = gsap.timeline({
      onComplete: onComplete
    })

    // La lettre devient orange/rouge puis disparaît
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

    // Particules de feu pendant la combustion
    const particleDelay = index * 80
    setTimeout(() => {
      // Particules de feu (dans le container local)
      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          createFireParticle(
            centerX + (Math.random() - 0.5) * rect.width,
            centerY + (Math.random() - 0.5) * rect.height,
            container
          )
        }, i * 20)
      }
      
      // Fumée (dans le layer global au-dessus de tout)
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          createSmoke(
            absoluteX + (Math.random() - 0.5) * rect.width * 2,
            absoluteY
          )
        }, i * 40 + 50)
      }

      // Cendres qui tombent
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          createAsh(
            absoluteX + (Math.random() - 0.5) * rect.width * 3,
            absoluteY + Math.random() * 20
          )
        }, i * 60 + 200)
      }
    }, particleDelay)
  }

  // Fonction pour faire apparaître une lettre depuis la fumée
  const revealLetter = (letter: HTMLElement, index: number) => {
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
  }

  useGSAP(() => {
    const tl = gsap.timeline()

    // Animation d'entrée
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

  }, { scope: container })

  // Cycle des mots avec effet de feu
  useEffect(() => {
    const wordsContainer = wordsContainerRef.current
    if (!wordsContainer) return

    const cycleWords = () => {
      const wordElements = wordsContainer.querySelectorAll('.word-item')
      const currentWord = wordElements[currentIndexRef.current] as HTMLElement
      const nextIndex = (currentIndexRef.current + 1) % words.length
      const nextWord = wordElements[nextIndex] as HTMLElement

      if (!currentWord || !nextWord) return

      const currentLetters = currentWord.querySelectorAll('.letter') as NodeListOf<HTMLElement>
      const nextLetters = nextWord.querySelectorAll('.letter') as NodeListOf<HTMLElement>

      // Brûler chaque lettre du mot actuel
      let completedCount = 0
      currentLetters.forEach((letter, index) => {
        burnLetter(letter, index, wordsContainer, () => {
          completedCount++
          
          // Quand toutes les lettres sont brûlées
          if (completedCount === currentLetters.length) {
            // Cacher le mot actuel, afficher le suivant
            gsap.set(currentWord, { display: 'none' })
            gsap.set(nextWord, { display: 'block' })
            
            // Reset du mot qu'on vient de brûler pour le prochain cycle
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
            
            // Révéler les lettres du nouveau mot
            nextLetters.forEach((letter, idx) => {
              revealLetter(letter, idx)
            })
            
            currentIndexRef.current = nextIndex
          }
        })
      })
    }

    // Premier cycle après l'animation d'entrée
    const initialDelay = setTimeout(() => {
      cycleWords()
    }, 3000)

    // Cycles suivants
    const interval = setInterval(() => {
      cycleWords()
    }, 4500)

    return () => {
      clearTimeout(initialDelay)
      clearInterval(interval)
    }
  }, [])

  return (
    <section 
      ref={container} 
      className="relative h-screen w-full flex flex-col justify-center px-6 md:px-10 pt-20 bg-white text-arti-black overflow-hidden"
    >
      {/* Layer des cendres (derrière le contenu mais visible) */}
      <div 
        ref={ashLayerRef}
        className="absolute inset-0 pointer-events-none z-20"
        style={{ overflow: 'hidden' }}
      />

      {/* Layer de fumée (AU-DESSUS de tout) */}
      <div 
        ref={smokeLayerRef}
        className="absolute inset-0 pointer-events-none z-50"
      />

      {/* GROS TITRE */}
      <div className="flex flex-col z-10">
        
        {/* Ligne 1 */}
        <div className="overflow-hidden pb-2">
          <h1 className="hero-line block text-display font-light text-[11vw] md:text-[100px] leading-[0.9] whitespace-nowrap">
            Mettez le feu à vos
          </h1>
        </div>
        
        {/* Ligne 2 : Mots qui brûlent */}
        <div className="overflow-hidden pb-6 -mt-2 md:-mt-4">
          <h1 className="hero-line block text-display font-extrabold text-[11vw] md:text-[100px] leading-[1.1]">
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
              {/* Placeholder pour la largeur */}
              <span className="invisible">ambitions</span>
            </span>
          </h1>
        </div>

      </div>

      {/* PARAGRAPHE MANIFESTE */}
      <div className="mt-8 md:mt-12 max-w-2xl z-10">
        <p className="hero-text text-lead font-light text-arti-black/80">
          Let&apos;s be honest. You&apos;ve built something great. But lately, 
          it&apos;s been harder to capture attention, or even - the right kind.
        </p>
      </div>
    </section>
  )
}