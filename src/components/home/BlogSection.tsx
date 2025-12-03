'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useSpring } from 'framer-motion'
import { blogPosts } from '@/data/posts';

// --- DONNÉES BLOG ---


// --- COMPOSANT CURSEUR PERSONNALISÉ ---
const DragCursor = ({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) => {
  const [isVisible, setIsVisible] = useState(false)
  const x = useSpring(0, { stiffness: 300, damping: 20 })
  const y = useSpring(0, { stiffness: 300, damping: 20 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX - 45)
      y.set(e.clientY - 45)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [containerRef, x, y])

  return (
    <motion.div
      className="fixed top-0 left-0 z-[60] pointer-events-none flex items-center justify-center w-[90px] h-[90px]"
      style={{ x, y, opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
    >
      <div className="absolute inset-0 bg-[#FF6F00] rounded-full blur-md opacity-90" />
      <span className="relative z-10 text-white font-bold text-xs uppercase tracking-widest drop-shadow-md">
        Drag
      </span>
    </motion.div>
  )
}

// --- COMPOSANT CARTE BLOG ---
interface BlogCardProps {
  post: typeof blogPosts[0]
  index: number
  isDragging: boolean // Prop pour savoir si on drag ou pas
}

const BlogCard = ({ post, index, isDragging }: BlogCardProps) => {
  
  const heights = ['h-[448px]', 'h-[329px]', 'h-[398px]']
  const currentHeight = heights[index % 3]

  // Fonction pour gérer le clic sur le lien
  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault() // ⛔️ Si on drag, on bloque le lien
      e.stopPropagation()
    }
  }

  return (
    <motion.article 
      className="relative flex-shrink-0 w-[350px] md:w-[450px] group select-none"
    >
      <Link 
        href={post.slug} 
        onClick={handleClick} // <-- Interception du clic
        className="block w-full h-full cursor-none" 
        suppressHydrationWarning
        onDragStart={(e) => e.preventDefault()}
      >
        
        {/* IMAGE CONTAINER */}
        {/* Correction 1 : rounded-none par défaut, rounded-[50px] au hover */}
        <div className={`w-full ${currentHeight} mb-6 overflow-hidden bg-gray-100 relative
                        rounded-none transition-all duration-500 ease-out 
                        group-hover:rounded-[120px]`}> 
          
          <Image
            src={post.image}
            alt={post.title}
            fill
            draggable={false} 
            className="object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
          />
          
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
        </div>

        {/* METADATA */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
           <span className="text-xs font-bold uppercase tracking-wider text-gray-400 border border-black/10 px-3 py-1 rounded-full">
             {post.readTime}
           </span>
           <div className="flex gap-1">
             {post.tags.map(tag => (
               <span key={tag} className="px-3 py-1 rounded-full bg-gray-100 text-[10px] font-medium text-gray-500 uppercase">
                 {tag}
               </span>
             ))}
           </div>
        </div>

        {/* TITRE & EXCERPT */}
        <div className="flex flex-col gap-2 pr-4">
            <h3 className="text-2xl font-normal leading-tight text-[#1a1a1a] group-hover:text-amber-600 transition-colors duration-300">
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm font-light line-clamp-2 leading-relaxed mt-2">
              {post.excerpt}
            </p>
        </div>
        
      </Link>
    </motion.article>
  )
}

// --- COMPOSANT PRINCIPAL ---
export default function BlogSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [sliderWidth, setSliderWidth] = useState(0)
  
  // Nouvel état pour suivre le drag
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (sliderRef.current && containerRef.current) {
      setSliderWidth(sliderRef.current.scrollWidth - containerRef.current.offsetWidth + 100)
    }
  }, [])

  // Handlers pour Framer Motion
  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    // Petit délai pour laisser le temps au clic de se faire intercepter
    setTimeout(() => {
      setIsDragging(false)
    }, 150)
  }

  return (
    <section className="relative w-full bg-white py-24 md:py-32 overflow-hidden mt-12">
      
      {/* HEADER */}
      <div className="container mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <span className="text-sm font-medium uppercase tracking-wide text-gray-500 mb-6 block">
            Blog
          </span>
          <h2 className="text-[40px] md:text-[60px] leading-[1.1] font-normal text-[#1a1a1a] tracking-tight">
            Get the lo-down with <br />
            the latest news and views
          </h2>
        </div>
        
        <Link 
          href="/blog"
          className="group flex items-center gap-2 px-6 py-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
          suppressHydrationWarning
        >
          <span className="text-sm font-medium">Discover all articles</span>
          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </Link>
      </div>

      {/* SLIDER ZONE */}
      <div ref={containerRef} className="relative w-full pl-6 md:pl-12 cursor-none">
        
        <DragCursor containerRef={containerRef} />

        <motion.div 
          ref={sliderRef}
          className="flex items-start gap-8 md:gap-12 cursor-none active:cursor-none pb-12"
          drag="x"
          dragConstraints={{ right: 0, left: -sliderWidth }} 
          whileTap={{ cursor: "none" }}
          
          // Events pour gérer le conflit Drag vs Click
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {blogPosts.map((post, index) => (
            <BlogCard 
                key={post.id} 
                post={post} 
                index={index} 
                isDragging={isDragging} // On passe l'état à l'enfant
            />
          ))}
          
          {/* Carte "Voir plus" à la fin */}
          <div className="flex-shrink-0 w-[200px] md:w-[300px] h-[329px] flex items-center justify-center">
             <Link 
                href="/blog" 
                // Même logique pour ce lien aussi
                onClick={(e) => { if(isDragging) { e.preventDefault(); e.stopPropagation(); } }}
                className="group flex flex-col items-center gap-4 opacity-50 hover:opacity-100 transition-opacity cursor-none"
                suppressHydrationWarning
                onDragStart={(e) => e.preventDefault()}
             >
                <div className="w-20 h-20 rounded-full border border-black/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all duration-300">
                   <span className="text-2xl">→</span>
                </div>
                <span className="font-medium text-lg">View all articles</span>
             </Link>
          </div>
        </motion.div>
      </div>

    </section>
  )
}