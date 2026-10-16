'use client'

import { useRef } from "react"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion"

// Parallax au scroll : chaque image a sa propre vitesse, le texte bouge à peine
const images = [
  {
    src: "/charlotte_chevre.png",
    alt: "Charlotte, Artichaud Studio",
    className: "top-[12%] left-[-5%] md:left-[5%] w-[150px] h-[100px] md:w-[300px] md:h-[200px]",
    sizes: "300px",
    distance: 120,
  },
  {
    src: "/clement_profil.png",
    alt: "Clément, Artichaud Studio",
    className: "bottom-[14%] left-[5%] md:left-[15%] w-[180px] h-[220px] md:w-[250px] md:h-[300px]",
    sizes: "250px",
    distance: 120,
  },
  {
    src: "/clement_heureux.png",
    alt: "Clément, Artichaud Studio",
    className: "top-[8%] right-[-5%] md:right-[5%] w-[160px] h-[200px] md:w-[280px] md:h-[350px]",
    sizes: "280px",
    distance: 240,
  },
  {
    src: "/clement_charlotte.png",
    alt: "Clément et Charlotte, l'équipe d'Artichaud Studio",
    className: "bottom-[6%] right-[5%] md:right-[20%] w-[200px] h-[120px] md:w-[350px] md:h-[220px]",
    sizes: "350px",
    distance: 90,
  },
]

function ParallaxImage({ image, progress, still }: { image: typeof images[number]; progress: MotionValue<number>; still: boolean }) {
  const y = useTransform(progress, [0, 1], still ? [0, 0] : [image.distance, -image.distance])

  return (
    <motion.div style={{ y }} className={`absolute overflow-hidden will-change-transform ${image.className}`}>
      <Image src={image.src} alt={image.alt} fill className="object-cover" sizes={image.sizes} />
    </motion.div>
  )
}

export default function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const still = Boolean(useReducedMotion())
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const textY = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [60, -60])

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#FFFFFF] overflow-hidden flex items-center justify-center">

      <div className="absolute inset-0 z-0 pointer-events-none">
        {images.map((image) => (
          <ParallaxImage key={image.src} image={image} progress={scrollYProgress} still={still} />
        ))}
      </div>

      <motion.div style={{ y: textY }} className="w-full px-5 md:px-10 z-10 relative">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-5 w-full items-center">

          <div className="col-span-4 md:col-start-4 md:col-span-2 text-center mb-6">
            <span className="text-sm font-normal text-black">
              Notre vision
            </span>
          </div>

          <div className="col-span-4 md:col-start-2 md:col-span-6 text-center">
            <h2
              className="text-black leading-[1.3] font-normal"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 45px)'
              }}
            >
              Une agence 360 qui réunit tous les métiers de la création. C'est mieux pour penser chaque idée
            </h2>
          </div>

        </div>
      </motion.div>

    </section>
  )
}
