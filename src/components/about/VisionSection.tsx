'use client'

import { useRef } from "react"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion"

// Au départ, les photos sont toutes sous le texte (bas de la section), de part et d'autre.
// En plus du défilement normal, chacune monte d'une distance différente : elles glissent à des vitesses différentes.
// Sur un même côté, la photo du bas est la plus lente : l'écart grandit au scroll, elles ne se superposent jamais.
const images = [
  {
    src: "/charlotte_chevre.png",
    alt: "Charlotte, Artichaud Studio",
    className: "top-[30%] left-[2%] lg:left-[3%] w-[130px] h-[90px] md:w-[200px] md:h-[135px] lg:w-[300px] lg:h-[200px]",
    sizes: "(min-width: 1024px) 300px, 200px",
    rise: 700,
  },
  {
    src: "/clement_heureux.png",
    alt: "Clément, Artichaud Studio",
    className: "top-[45%] right-[2%] lg:right-[3%] w-[120px] h-[150px] md:w-[190px] md:h-[240px] lg:w-[280px] lg:h-[350px]",
    sizes: "(min-width: 1024px) 280px, 190px",
    rise: 550,
  },
  {
    src: "/clement_profil.png",
    alt: "Clément, Artichaud Studio",
    className: "top-[62%] left-[4%] lg:left-[6%] w-[130px] h-[160px] md:w-[180px] md:h-[220px] lg:w-[250px] lg:h-[300px]",
    sizes: "(min-width: 1024px) 250px, 180px",
    rise: 300,
  },
  {
    src: "/clement_charlotte.png",
    alt: "Clément et Charlotte, l'équipe d'Artichaud Studio",
    className: "top-[82%] right-[3%] lg:right-[4%] w-[150px] h-[95px] md:w-[220px] md:h-[140px] lg:w-[300px] lg:h-[190px]",
    sizes: "(min-width: 1024px) 300px, 220px",
    rise: 150,
  },
]

function ParallaxImage({ image, progress, still }: { image: typeof images[number]; progress: MotionValue<number>; still: boolean }) {
  const y = useTransform(progress, [0, 1], still ? [0, 0] : [0, -image.rise])

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

  return (
    // Section plus haute que l'écran : le texte reste centré (sticky) pendant que les photos défilent autour
    // overflow-clip (et non overflow-hidden) : coupe les photos qui dépassent sans désactiver le sticky
    <section ref={sectionRef} className="relative w-full h-[200vh] bg-[#FFFFFF] overflow-clip">

      <div className="absolute inset-0 z-0 pointer-events-none">
        {images.map((image) => (
          <ParallaxImage key={image.src} image={image} progress={scrollYProgress} still={still} />
        ))}
      </div>

      <div className="sticky top-0 h-screen flex items-center z-10 pointer-events-none">
        <div className="w-full px-5 md:px-10">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-5 w-full items-center">

            <div className="col-span-4 md:col-start-3 md:col-span-4 text-center mb-6">
              <span className="text-sm font-normal text-black">
                Notre vision
              </span>
            </div>

            {/* Colonnes centrales uniquement : les photos passent sur les côtés sans recouvrir le texte */}
            <div className="col-span-4 md:col-start-3 md:col-span-4 text-center">
              <h2
                className="text-black leading-[1.3] font-normal"
                style={{
                  fontSize: 'clamp(28px, 3.5vw, 45px)'
                }}
              >
                Une agence 360 qui réunit tous les métiers de la création. C&apos;est mieux pour penser chaque idée
              </h2>
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}
