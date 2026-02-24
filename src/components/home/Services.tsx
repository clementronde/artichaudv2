'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale } from '@/context/LocaleContext'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Services() {
  const container = useRef(null)
  const { t } = useLocale()
  const servicesData = t.services.list

  return (
    <section ref={container} className="relative w-full z-10 bg-white">
      
      {servicesData.map((service, index) => {
        // Logique de taille de police pour éviter le dépassement
        const titleSizeClass = service.title.length > 15 
          ? "text-[32px] md:text-[42px] lg:text-[52px]" 
          : "text-[42px] md:text-[52px] lg:text-[72px]";

        return (
          <div 
            key={service.id} 
            className={`sticky top-0 h-screen flex flex-col justify-center bg-white text-arti-black overflow-hidden border-t border-black/5
              ${index > 0 ? 'shadow-[0_-10px_30px_rgba(0,0,0,0.08)]' : 'shadow-none'} 
            `} 
            style={{ zIndex: index + 1 }}
          >
            
            {/* MODIFICATION MARGES :
                - w-full : Prend toute la largeur
                - px-[40px] : Marge stricte de 40px à gauche et à droite
                - Pas de max-w, pas de mx-auto
            */}
            <div className="w-full px-6 md:px-[40px] py-12 md:py-24 flex flex-col justify-center h-full">
              
              {/* GRID : 8 Colonnes avec gap 20px */}
              <div className="grid grid-cols-1 md:grid-cols-8 gap-3 md:gap-[20px] w-full md:h-full items-stretch">
                
                {/* --- COLONNE 1 : Numéro --- */}
                <div className="hidden md:block col-span-1 pt-3 border-t border-transparent">
                   <span className="text-sm font-medium opacity-100 block">
                    {service.id}
                  </span>
                </div>

                {/* --- COLONNES 2 à 3 : Titre + Liste + Bouton --- */}
                <div className="col-span-1 md:col-span-2 flex flex-col relative z-20">
                  <span className="md:hidden text-sm font-medium opacity-60 mb-4 block">
                    {service.id}
                  </span>

                  <div className="flex flex-col">
                    
                    {/* TITRE */}
                    <div className="mb-8 md:mb-12">
                      <h2 className={`${titleSizeClass} leading-[1] font-normal tracking-tight whitespace-nowrap`}>
                        {service.title}
                      </h2>
                    </div>

                    {/* LISTE */}
                    <ul className="group flex flex-col gap-2.5">
                      {service.items.map((item, i) => (
                        <li 
                          key={i} 
                          className="group/item relative flex items-center cursor-pointer transition-all duration-300 hover:!opacity-100 group-hover:opacity-30"
                        >
                          <span className="absolute right-full mr-6 w-1.5 h-1.5 rounded-full bg-arti-black opacity-0 transition-all duration-300 ease-out 
                            group-hover/item:opacity-100 group-hover/item:translate-x-2">
                          </span>
                          <span className="text-base md:text-lg font-light text-arti-black leading-normal">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* BOUTON */}
                    <div className="mt-8 mb-8 md:mt-12">
                      <Link
                        href="/contact"
                        suppressHydrationWarning={true}
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium border border-black/10 hover:border-black transition-all duration-300 group/btn"
                      >
                        <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                        <span>{t.services.cta}</span>
                      </Link>
                    </div>

                  </div>
                </div>

                {/* --- COLONNE 4 : VIDE (Espaceur) --- */}
                <div className="hidden md:block col-span-1"></div>

                {/* --- COLONNES 5 à 8 : Bloc Droit --- */}
                {/* Note : md:col-start-5 force le démarrage à la colonne 5 */}
                <div className="col-span-1 md:col-span-4 md:col-start-5 flex flex-col md:justify-between md:h-full z-10 pl-0 md:pl-0">
                  
                  {/* DESCRIPTION : masquée sur mobile, visible desktop uniquement */}
                  <div className="hidden md:block pt-2 md:pt-3 md:w-[50%] md:ml-[25%]">
                    <p className="text-base md:text-lg text-arti-black/80 font-normal leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* IMAGE : Occupant 3 colonnes sur 4 (75% de largeur) aligné à droite */}
                  <div className={`
                    relative overflow-hidden bg-black/5 rounded-sm
                    w-full md:w-[75%] md:ml-auto aspect-[16/10] md:mt-auto
                    shadow-sm
                  `}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                </div>

              </div>
            </div>

          </div>
        )
      })}
    </section>
  )
}