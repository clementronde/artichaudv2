'use client'

import Image from "next/image"
import Floating, { FloatingElement } from "@/components/ui/parallax-floating"

export default function VisionSection() {
  return (
    <section className="relative w-full h-screen bg-[#FFFFFF] overflow-hidden flex items-center justify-center">

      {/* 1. ÉLÉMENTS FLOTTANTS — remplacer les src par tes images */}
      <Floating sensitivity={-1.5} className="z-0 pointer-events-none">

        {/* Image Haut Gauche — format paysage */}
        <FloatingElement depth={0.5} className="top-[15%] left-[-5%] md:left-[5%]">
          <div className="relative w-[150px] h-[100px] md:w-[300px] md:h-[200px] overflow-hidden ">
            <Image src="/charlotte_chevre.png" alt="" fill className="object-cover" sizes="300px" />
          </div>
        </FloatingElement>

        {/* Image Bas Gauche — format portrait */}
        <FloatingElement depth={1} className="bottom-[20%] left-[5%] md:left-[15%]">
          <div className="relative w-[180px] h-[220px] md:w-[250px] md:h-[300px] overflow-hidden">
            <Image src="/clement_profil.png" alt="" fill className="object-cover" sizes="250px" />
          </div>
        </FloatingElement>

        {/* Image Haut Droite — format portrait */}
        <FloatingElement depth={2} className="top-[10%] right-[-5%] md:right-[5%]">
          <div className="relative w-[160px] h-[200px] md:w-[280px] md:h-[350px] overflow-hidden">
            <Image src="/clement_heureux.png" alt="" fill className="object-cover" sizes="280px" />
          </div>
        </FloatingElement>

        {/* Image Bas Droite — format paysage */}
        <FloatingElement depth={1.5} className="bottom-[10%] right-[5%] md:right-[20%]">
          <div className="relative w-[200px] h-[120px] md:w-[350px] md:h-[220px] overflow-hidden">
            <Image src="/clement_charlotte.png" alt="" fill className="object-cover" sizes="350px" />
          </div>
        </FloatingElement>

      </Floating>

      {/* 2. CONTENU TEXTE (Sur la grille) */}
      {/* z-10 pour être au-dessus des rectangles */}
      <div className="w-full px-5 md:px-10 z-10 relative">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-5 w-full items-center">
          
          {/* Label "Notre vision" centré */}
          <div className="col-span-4 md:col-start-4 md:col-span-2 text-center mb-6">
            <span className="text-sm font-normal text-black">
              Notre vision
            </span>
          </div>

          {/* Titre H2 centré */}
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
      </div>

    </section>
  )
}