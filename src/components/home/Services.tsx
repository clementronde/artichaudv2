'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

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
          
          <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 py-12 flex flex-col justify-center">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
              
              {/* --- COLONNE 1 : Numéro --- */}
              <div className="hidden md:block col-span-1 pt-2">
                 <span className="text-sm font-medium opacity-100 block">
                  {service.id}
                </span>
              </div>

              {/* --- COLONNE 2 : Titre + Liste --- */}
              <div className="col-span-12 md:col-span-5 flex flex-col h-full relative">
                <span className="md:hidden text-sm font-medium opacity-60 mb-4 block">
                  {service.id}
                </span>

                <div className="flex flex-col gap-10">
                  <h2 className="text-[48px] md:text-[60px] lg:text-[72px] leading-[1] font-normal tracking-tight">
                    {service.title}
                  </h2>

                  <ul className="group flex flex-col gap-3">
                    {service.items.map((item, i) => (
                      <li 
                        key={i} 
                        className="group/item flex items-center cursor-pointer -ml-4 pl-4 transition-all duration-300 hover:!opacity-100 group-hover:opacity-30"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-arti-black mr-3 opacity-0 -translate-x-2 transition-all duration-300 ease-out 
                          group-hover/item:opacity-100 group-hover/item:translate-x-0">
                        </span>
                        <span className="text-lg md:text-xl font-light text-arti-black/90">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-12">
                  <Link 
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-medium border border-black/20 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                  >
                    <span>→</span>
                    Let's Begin
                  </Link>
                </div>
              </div>

              {/* --- COLONNE 3 : Description + Image --- */}
              <div className="col-span-12 md:col-span-6 flex flex-col justify-between h-full pl-0 md:pl-12 lg:pl-16">
                
                {/* Texte description */}
                <p className="text-lg font-light leading-relaxed max-w-md md:pt-2">
                  {service.description}
                </p>

                {/* --- IMAGE MODIFIÉE --- */}
                <div className={`
                  relative overflow-hidden shadow-2xl shadow-black/5 bg-black
                  
                  /* Mobile: Pleine largeur, ratio 16/9 standard, marge top pour séparer du texte */
                  w-full aspect-[16/9] mt-12
                  
                  /* Desktop: Hauteur fixée à 320px, Largeur ~430px (ratio ~4/3), Collé à gauche (mr-auto) */
                  md:aspect-auto md:h-[320px] md:w-[430px] md:mr-auto md:mt-auto
                `}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105 opacity-90"
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