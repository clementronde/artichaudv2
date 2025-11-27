'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const servicesData = [
  {
    id: "001",
    title: "Brand Strategy",
    description: "Your brand's compass. It defines purpose, sharpens positioning, and ensures every decision you make resonates with your audience while driving business growth.",
    items: ["Research & Insight", "Go-to-Market Strategy", "Brand Architecture", "Purpose, Mission, Vision", "Communication Strategy"],
    image: "/services/projetkeletitautuservices.png",
  },
  {
    id: "002",
    title: "Visual Identity",
    description: "More than just a logo. We craft a visual language that speaks to your audience before you even say a word. Colors, typography, and art direction that stand out.",
    items: ["Logo Design", "Graphic Charter", "Art Direction", "Motion Design", "Illustration & Iconography"],
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2727&auto=format&fit=crop",
  },
  {
    id: "003",
    title: "Webdesign",
    description: "Digital experiences that convert. We design immersive websites that blend aesthetics with performance, ensuring a seamless user journey across all devices.",
    items: ["UX/UI Design", "Prototyping", "Interaction Design", "Design Systems", "Mobile First Approach"],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2864&auto=format&fit=crop",
  },
  {
    id: "004",
    title: "Webmarketing",
    description: "Amplifying your voice. We build data-driven strategies to acquire, convert, and retain your customers through precise targeting and compelling content.",
    items: ["SEO & SEA", "Social Media Strategy", "Content Marketing", "Emailing Automation", "Analytics & Reporting"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
  },
  {
    id: "005",
    title: "Shooting Produit",
    description: "Visuals that sell. High-end photography and videography to showcase your products in their best light, creating desire and elevating perceived value.",
    items: ["Artistic Direction", "Studio Photography", "Lifestyle Shooting", "Post-production", "Video Reels"],
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2940&auto=format&fit=crop",
  }
]

export default function Services() {
  const container = useRef(null)

  return (
    <section ref={container} className="relative w-full z-10 bg-white">
      
      {servicesData.map((service, index) => (
        <div 
          key={service.id} 
          className={`sticky top-0 h-screen flex flex-col justify-center bg-white text-arti-black overflow-hidden border-t border-black/5
            ${index > 0 ? 'shadow-[0_-10px_30px_rgba(0,0,0,0.08)]' : 'shadow-none'} 
          `} 
          style={{ zIndex: index + 1 }}
        >
          
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-[40px] py-12 md:py-24 flex flex-col justify-center h-full">
            
            {/* GRID : 8 Colonnes */}
            <div className="grid grid-cols-1 md:grid-cols-8 gap-8 md:gap-[20px] w-full h-full items-stretch">
              
              {/* --- COLONNE 1 : Numéro --- */}
              <div className="hidden md:block col-span-1 pt-3">
                 <span className="text-sm font-medium opacity-100 block">
                  {service.id}
                </span>
              </div>

              {/* --- COLONNES 2 à 4 : Titre + Liste + Bouton --- */}
              <div className="col-span-1 md:col-span-3 flex flex-col relative z-20">
                <span className="md:hidden text-sm font-medium opacity-60 mb-4 block">
                  {service.id}
                </span>

                <div className="flex flex-col">
                  
                  {/* TITRE */}
                  <div className="mb-12">
                    <h2 className="text-[42px] md:text-[52px] lg:text-[72px] leading-[1] font-normal tracking-tight whitespace-nowrap">
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
                        <span className="text-lg md:text-[22px] font-light text-arti-black leading-normal">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* BOUTON "Let's Begin" */}
                  <div className="mt-12">
                    <Link 
                      href="/contact"
                      className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium border border-black/10 hover:border-black transition-all duration-300 group/btn"
                    >
                      <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                      <span>Let's Begin</span>
                    </Link>
                  </div>

                </div>
              </div>

              {/* --- COLONNES 5 à 8 : Description (Haut) + Image (Bas) --- */}
              <div className="col-span-1 md:col-span-4 flex flex-col justify-between h-full pl-0 md:pl-12 lg:pl-16 z-10">
                
                {/* 1. DESCRIPTION (Haut) */}
                <div className="pt-2 md:pt-3">
                  <p className="text-base md:text-lg text-arti-black/80 font-normal leading-relaxed max-w-md">
                    {service.description}
                  </p>
                </div>

                {/* 2. IMAGE (Bas) */}
                {/* MODIFICATION ICI : Changement de w-full à md:w-1/2 */}
                <div className={`
                  relative overflow-hidden bg-black/5 rounded-sm
                  w-full md:w-3/4 aspect-[16/10] 
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
      ))}
    </section>
  )
}