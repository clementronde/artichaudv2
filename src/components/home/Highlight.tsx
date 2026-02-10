'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// --- 1. DONNÉES ---
const projects = [
  {
    id: "keleti",
    client: "Tautu",
    category: "Brand Identity",
    cover: "/projects/Tautu1.png",
    gallery: [
      "/projects/keleti/keletiprojet1.avif",
      "/projects/keleti/keletiprojet2.avif",
      "/projects/keleti/keletiprojet4.avif"
    ],
    fullWidth: false 
  },{
    id: "rockstar",
    client: "Rockstar",
    category: "Brand Identity",
    cover: "/projects/rockstar/rockstarprojet1.avif",
    gallery: [
      "/projects/rockstar/rockstarprojet2.avif",
      "/projects/rockstar/rockstarprojet3.avif",
      "/projects/rockstar/rockstarprojet5.avif"
    ],
    fullWidth: false 
  },
  {
    id: "charitio",
    client: "Charit.io",
    category: "Web Design",
    cover: "/projects/charitio/charitioprojet1.avif",
    gallery: [
      "/projects/charitio/charitioprojet1.avif",
      "/projects/charitio/charitioprojet5.avif",
      "/projects/charitio/charitioprojet4.avif",

    ],
    fullWidth: false
  },
  {
    id: "lumyn",
    client: "Lumyn",
    category: "Art Direction",
    cover: "/projects/lumyn/Lumynprojet1.avif",
    gallery: [
      "/projects/lumyn/Lumynprojet2.avif",
      "/projects/lumyn/Lumynprojet5.avif",
      "/projects/lumyn/Lumynprojet4.avif"
    ],
    fullWidth: false
  }
]

// --- 2. LE SOUS-COMPOSANT ProjectCard ---
const ProjectCard = ({ project }: { project: any }) => {
  const containerRef = useRef<HTMLAnchorElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  
  const xTo = useRef<any>(null)
  const yTo = useRef<any>(null)
  
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Dimensions exactes de la carte flottante
  const CARD_WIDTH = 280;
  const CARD_HEIGHT = 360;
  const PADDING = 20; // Marge de sécurité

  useGSAP(() => {
    if (cursorRef.current) {
      xTo.current = gsap.quickTo(cursorRef.current, "left", { duration: 0.3, ease: "power3.out" })
      yTo.current = gsap.quickTo(cursorRef.current, "top", { duration: 0.3, ease: "power3.out" })
    }
  }, { scope: containerRef })

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isHovered) {
      interval = setInterval(() => {
        setGalleryIndex((prev) => (prev + 1) % project.gallery.length)
      }, 550)
    } else {
      setGalleryIndex(0)
    }
    return () => clearInterval(interval)
  }, [isHovered, project.gallery.length])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !xTo.current || !yTo.current) return

    const rect = containerRef.current.getBoundingClientRect()
    
    // Position relative de la souris
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // CALCULS DE LIMITES (CLAMP)
    const minX = (CARD_WIDTH / 2) + PADDING
    const maxX = rect.width - (CARD_WIDTH / 2) - PADDING
    
    const minY = (CARD_HEIGHT / 2) + PADDING
    const maxY = rect.height - (CARD_HEIGHT / 2) - PADDING

    const clampedX = Math.max(minX, Math.min(mouseX, maxX))
    const clampedY = Math.max(minY, Math.min(mouseY, maxY))

    xTo.current(clampedX)
    yTo.current(clampedY)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.2)" })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" })
  }

  return (
    <div className={`group flex flex-col gap-4 ${project.fullWidth ? 'col-span-1 md:col-span-2' : 'col-span-1'}`}>
      
      <Link 
        href={`/works/${project.id}`}
        ref={containerRef} 
        suppressHydrationWarning={true}
        className="relative w-full h-[500px] overflow-hidden bg-gray-100 cursor-none block"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* IMAGE DE FOND */}
        <Image 
          src={project.cover}
          alt={project.client}
          fill
          className="object-cover transition-transform duration-700"
        />

        {/* OVERLAY SOMBRE */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 ease-out z-10" />

        {/* CURSEUR INTERNE (Carte) */}
        <div 
          ref={cursorRef}
          className={`absolute pointer-events-none z-20 opacity-0 scale-0 origin-center`}
          style={{ 
              width: CARD_WIDTH, 
              height: CARD_HEIGHT,
              transform: 'translate(-50%, -50%)' 
          }}
        >
          <div className="relative w-full h-full bg-white shadow-2xl overflow-hidden">
            <div className="relative w-full h-full bg-gray-200 overflow-hidden">
               <Image
                 src={project.gallery[galleryIndex]}
                 alt="Gallery"
                 fill
                 className="object-cover"
               />
            </div>
            
            {/*<div className="absolute top-4 left-0 w-full text-center z-10">
               <span className="text-white text-[10px] uppercase tracking-widest font-bold drop-shadow-md">
                 Étude de cas {project.client}
               </span>
            </div> */}
          </div>
        </div>
      </Link>

      {/* INFO BAS */}
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
            <span className="text-lg font-medium text-arti-black">{project.category}</span>
            <span className="text-sm font-light italic text-arti-black/60">pour</span>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-black"></div>
                <span className="text-lg font-bold text-arti-black">{project.client}</span>
            </div>
        </div>
        <span className="text-sm text-arti-black/40">2024</span>
      </div>
    </div>
  )
}

// --- 3. LE COMPOSANT PRINCIPAL (Exporté) ---
export default function Highlight() {
  const container = useRef(null)

  return (
    // MODIFICATION MARGES : w-full + px-[40px]
    <section ref={container} className="relative w-full bg-white py-20 md:py-32 px-[40px]">
      
      <div className="flex justify-between items-end mb-8 ">
        <h2 className="text-[40px] md:text-[60px] font-normal tracking-tight text-arti-black">
          À la une
        </h2>
        <Link href="/works" suppressHydrationWarning={true} className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300">
          <span className="text-sm font-bold">Voir les projets</span>
          <span>→</span>
        </Link>
      </div>

      {/* GRID : Changement de gap-6 à gap-[20px] pour respecter la gouttière standard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

    </section>
  )
}