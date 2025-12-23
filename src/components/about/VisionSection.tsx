'use client'

import Floating, { FloatingElement } from "@/components/ui/parallax-floating"

export default function VisionSection() {
  return (
    <section className="relative w-full h-screen bg-[#FFFFFF] overflow-hidden flex items-center justify-center">
      
      {/* 1. ÉLÉMENTS FLOTTANTS (Les rectangles gris) */}
      {/* z-0 pour être en fond. sensitivity négatif pour un effet de profondeur inversé */}
      <Floating sensitivity={-1.5} className="z-0 pointer-events-none">
        
        {/* Rectangle Haut Gauche */}
        <FloatingElement depth={0.5} className="top-[15%] left-[-5%] md:left-[5%]">
          <div className="w-[150px] h-[100px] md:w-[300px] md:h-[200px] bg-[#DBC8C3]/50 blur-[1px]" />
        </FloatingElement>

        {/* Rectangle Bas Gauche */}
        <FloatingElement depth={1} className="bottom-[20%] left-[5%] md:left-[15%]">
          <div className="w-[180px] h-[220px] md:w-[250px] md:h-[300px] bg-[#DBC8C3]/50" />
        </FloatingElement>

        {/* Rectangle Haut Droite */}
        <FloatingElement depth={2} className="top-[10%] right-[-5%] md:right-[5%]">
          <div className="w-[160px] h-[200px] md:w-[280px] md:h-[350px] bg-[#DBC8C3]/50" />
        </FloatingElement>

        {/* Rectangle Bas Droite */}
        <FloatingElement depth={1.5} className="bottom-[10%] right-[5%] md:right-[20%]">
          <div className="w-[200px] h-[120px] md:w-[350px] md:h-[220px] bg-[#DBC8C3]/50" />
        </FloatingElement>

      </Floating>

      {/* 2. CONTENU TEXTE (Sur la grille) */}
      {/* z-10 pour être au-dessus des rectangles */}
      <div className="w-full px-5 md:px-10 z-10 relative">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-5 w-full items-center">
          
          {/* Label "Our vision" centré */}
          <div className="col-span-4 md:col-start-4 md:col-span-2 text-center mb-6">
            <span 
              style={{
                fontSize: '14px',
                fontFamily: 'Helvetica Now Display, Arial, sans-serif',
                fontWeight: '400',
                color: 'black'
              }}
            >
              Our vision
            </span>
          </div>

          {/* Titre H2 centré */}
          <div className="col-span-4 md:col-start-2 md:col-span-6 text-center">
            <h2 
              style={{
                fontSize: 'clamp(28px, 3.5vw, 45px)',
                fontFamily: 'Helvetica Now Display, Arial, sans-serif',
                fontWeight: '400',
                lineHeight: '130%',
                color: 'black'
              }}
            >
              Une agence 360 qui réunit tous les métiers de la création. C’est mieux penser chaque idée
            </h2>
          </div>

        </div>
      </div>

    </section>
  )
}