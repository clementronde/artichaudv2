'use client'

import Image from "next/image"
// Importez le nouveau composant
import VisionSection from "@/components/about/VisionSection"

export default function About() {
  return (
    <main className="w-full bg-[#FDF4E7] min-h-screen">
      
      {/* --- VOTRE HERO EXISTANT --- */}
      <div className="pt-32 md:pt-48 pb-20">
        <div className="w-full px-5 md:px-10 mb-20 md:mb-32">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-5 w-full">
            <div className="col-span-4 md:col-span-1">
              <div className="text-black text-[16px]">Services</div>
            </div>
            <div className="col-span-4 md:col-span-3 mt-4 md:mt-0">
              <h1 className="text-black text-[32px] md:text-[45px] leading-[140%]">
                Une agence 360 qui réunit tous les métiers de la création. C’est mieux penser chaque idée.
              </h1>
            </div>
          </div>
        </div>

        <div className="w-full h-[50vh] md:h-[80vh] relative overflow-hidden">
          <Image 
            src="/images/office-team.jpg" 
            alt="Team"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* --- AJOUT DU NOUVEAU BLOC VISION --- */}
      <VisionSection />

    </main>
  )
}