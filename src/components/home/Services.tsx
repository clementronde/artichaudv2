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
    id: "01",
    title: "Brand Strategy",
    description: "Your brand's compass. It defines purpose, sharpens positioning, and ensures every decision you make resonates with your audience while driving business growth.",
    items: ["Research & Insight", "Go-to-Market Strategy", "Brand Architecture", "Purpose, Mission, Vision", "Communication Strategy"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Visual Identity",
    description: "More than just a logo. We craft a visual language that speaks to your audience before you even say a word. Colors, typography, and art direction that stand out.",
    items: ["Logo Design", "Graphic Charter", "Art Direction", "Motion Design", "Illustration & Iconography"],
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2727&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Webdesign",
    description: "Digital experiences that convert. We design immersive websites that blend aesthetics with performance, ensuring a seamless user journey across all devices.",
    items: ["UX/UI Design", "Prototyping", "Interaction Design", "Design Systems", "Mobile First Approach"],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2864&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Webmarketing",
    description: "Amplifying your voice. We build data-driven strategies to acquire, convert, and retain your customers through precise targeting and compelling content.",
    items: ["SEO & SEA", "Social Media Strategy", "Content Marketing", "Emailing Automation", "Analytics & Reporting"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
  },
  {
    id: "05",
    title: "Shooting Produit",
    description: "Visuals that sell. High-end photography and videography to showcase your products in their best light, creating desire and elevating perceived value.",
    items: ["Artistic Direction", "Studio Photography", "Lifestyle Shooting", "Post-production", "Video Reels"],
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2940&auto=format&fit=crop",
  }
]

export default function Services() {
  const container = useRef(null)

  return (
    <section ref={container} className="relative w-full">
      
      {servicesData.map((service, index) => (
        <div 
          key={service.id} 
          className={`sticky top-0 h-screen flex flex-col justify-center bg-white text-arti-black overflow-hidden border-t border-black/5
            ${index > 0 ? 'shadow-[0_-10px_30px_rgba(0,0,0,0.08)]' : 'shadow-none'} 
          `} 
          style={{ zIndex: index + 1 }}
        >
          
          <div className="w-full h-full px-6 md:px-12 py-12 md:py-8 flex flex-col justify-center">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-8 h-full md:h-auto items-start md:items-center">
              
              {/* COL 1: Numéro */}
              <div className="col-span-12 md:col-span-1">
                <span className="text-sm font-medium opacity-40">
                  {service.id}
                </span>
              </div>

              {/* COL 2-5: Titre + Liste Focus */}
              <div className="col-span-12 md:col-span-5 flex flex-col gap-8 md:pr-12">
                <h2 className="text-[40px] md:text-[60px] leading-[1] font-normal tracking-tight">
                  {service.title}
                </h2>

                {/* LISTE */}
                <ul className="group flex flex-col gap-3">
                  {service.items.map((item, i) => (
                    <li 
                      key={i} 
                      className="group/item flex items-center cursor-pointer -ml-4 pl-4 transition-all duration-300
                      group-hover:opacity-30 hover:!opacity-100"
                    >
                      
                      {/* LE POINT */}
                      <span className="w-1.5 h-1.5 rounded-full bg-arti-black mr-3 opacity-0 -translate-x-2 transition-all duration-300 ease-out 
                        group-hover/item:opacity-100 group-hover/item:translate-x-0">
                      </span>
                      
                      {/* LE TEXTE */}
                      <span className="text-lg md:text-xl font-light">
                        {item}
                      </span>

                    </li>
                  ))}
                </ul>

                {/* Bouton CTA */}
                <div className="pt-4">
                  <Link 
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold border border-black/10 hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <span>→</span>
                    Let's Begin
                  </Link>
                </div>
              </div>

              {/* COL 6-12: Description + Image */}
              <div className="col-span-12 md:col-span-6 flex flex-col gap-8 h-full justify-between md:justify-center">
                
                <p className="text-lg md:text-xl font-light leading-relaxed opacity-60 max-w-lg md:ml-auto">
                  {service.description}
                </p>

                {/* CONTAINER IMAGE : J'ai retiré "grayscale hover:grayscale-0" */}
                <div className="relative w-full aspect-[16/9] md:aspect-[4/3] overflow-hidden rounded-lg mt-auto md:mt-8 transition-all duration-700 ease-out">
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