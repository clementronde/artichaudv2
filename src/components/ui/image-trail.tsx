'use client'

import { Children, useCallback, useMemo, useRef, useEffect } from "react"
import {
  AnimationSequence,
  motion,
  useAnimate,
  useAnimationFrame,
} from "framer-motion"
import { v4 as uuidv4 } from "uuid"
import { useMouseVector } from "@/hooks/use-mouse-vector"

interface ImageTrailProps {
  children: React.ReactNode
  containerRef?: React.RefObject<HTMLElement | null>
  newOnTop?: boolean
  rotationRange?: number
  animationSequence?: any
  interval?: number
  active?: boolean
}

interface TrailItem {
  id: string
  x: number
  y: number
  rotation: number
  animationSequence: any
  child: React.ReactNode
}

// --- NOUVELLE SÉQUENCE D'ANIMATION FLUIDE ---
// C'est ici que se joue toute la différence.
const fluidAnimationSequence = [
  // ÉTAPE 1 : Apparition dynamique et élastique
  [
    { scale: 1, opacity: 1 }, // État cible
    { 
      duration: 0.4, // Durée un peu plus longue pour sentir le mouvement
      // Courbe de Bézier personnalisée pour un effet "pop" élastique et doux
      // Cela commence vite et ralentit très progressivement à la fin.
      ease: [0.23, 1, 0.32, 1] 
    },
  ],
  // ÉTAPE 2 : Disparition lente et continue (le "drift")
  [
    { scale: 0.8, opacity: 0 }, // On rétrécit légèrement en disparaissant
    { 
      duration: 1.2, // Durée longue pour une traînée persistante
      ease: "easeOut" // Décélération douce vers la fin
      // Note : on retire le "at: 0.5" pour que ça enchaîne direct après l'étape 1
    },
  ],
];


export const ImageTrail = ({
  children,
  newOnTop = true,
  rotationRange = 15,
  containerRef,
  // On utilise notre nouvelle séquence par défaut
  animationSequence = fluidAnimationSequence,
  interval = 100,
  active = true,
}: ImageTrailProps) => {
  const trailRef = useRef<TrailItem[]>([])
  const lastAddedTimeRef = useRef<number>(0)
  const { position: mousePosition } = useMouseVector(containerRef)
  const lastMousePosRef = useRef(mousePosition)
  const currentIndexRef = useRef(0)
  
  const childrenArray = useMemo(() => Children.toArray(children), [children])

  const addToTrail = useCallback(
    (mousePos: { x: number; y: number }) => {
      if (childrenArray.length === 0) return;

      // On ajoute une rotation aléatoire initiale pour plus de naturel
      const randomRotationOffset = (Math.random() - 0.5) * rotationRange * 2;

      const newItem: TrailItem = {
        id: uuidv4(),
        x: mousePos.x,
        y: mousePos.y,
        rotation: randomRotationOffset,
        animationSequence,
        child: childrenArray[currentIndexRef.current],
      }

      currentIndexRef.current = (currentIndexRef.current + 1) % childrenArray.length

      if (newOnTop) {
        trailRef.current.push(newItem)
      } else {
        trailRef.current.unshift(newItem)
      }
    },
    [childrenArray, rotationRange, animationSequence, newOnTop]
  )

  const removeFromTrail = useCallback((itemId: string) => {
    const index = trailRef.current.findIndex((item) => item.id === itemId)
    if (index !== -1) {
      trailRef.current.splice(index, 1)
    }
  }, [])

  useAnimationFrame((time) => {
    if (!active) return

    if (
      lastMousePosRef.current.x === mousePosition.x &&
      lastMousePosRef.current.y === mousePosition.y
    ) {
      return
    }
    lastMousePosRef.current = mousePosition

    const currentTime = time
    if (currentTime - lastAddedTimeRef.current < interval) {
      return
    }

    lastAddedTimeRef.current = currentTime
    addToTrail(mousePosition)
  })

  const [, forceUpdate] = useMemo(() => [{}, () => {}], [trailRef.current.length])

  return (
    <div className="relative w-full h-full pointer-events-none">
      {trailRef.current.map((item) => (
        <TrailItem key={item.id} item={item} onComplete={removeFromTrail} />
      ))}
    </div>
  )
}

const TrailItem = ({ item, onComplete }: { item: TrailItem; onComplete: (id: string) => void }) => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const sequence = item.animationSequence.map((segment: any) => [
      scope.current,
      ...segment,
    ])

    animate(sequence as AnimationSequence).then(() => {
      onComplete(item.id)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      ref={scope}
      // --- AJOUT CRUCIAL ---
      // On définit l'état INITIAL ici pour que l'animation d'apparition fonctionne.
      // L'image part de plus petit (scale 0.5) et transparente, avec une rotation inclinée.
      initial={{ opacity: 0, scale: 0.5, rotate: item.rotation - 15 }}
      
      className="absolute -translate-x-1/2 -translate-y-1/2 origin-center" // origin-center aide pour la rotation
      style={{
        left: item.x,
        top: item.y,
        // La rotation finale est gérée par l'animation, plus besoin de la fixer ici
        // rotate: item.rotation, 
      }}
    >
      {item.child}
    </motion.div>
  )
}