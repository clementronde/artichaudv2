'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useSpring } from 'framer-motion'

// --- 1. CURSEUR DRAG ---
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

    window.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [containerRef, x, y])

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center w-[90px] h-[90px]"
      style={{ x, y, opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
    >
      <div className="absolute inset-0 bg-[#D0FF00] rounded-full blur-md opacity-90" />
      <span className="relative z-10 text-white font-bold text-xs uppercase tracking-widest drop-shadow-md">
        Drag
      </span>
    </motion.div>
  )
}

// --- 2. CARTE BLOG ---
interface BlogCardProps {
  post: any // On met 'any' ici pour accepter les données brutes ou formatées
  index: number
  isDragging: boolean
  pixelWidth?: number
}

const BlogCard = ({ post, index, isDragging, pixelWidth }: BlogCardProps) => {
  const heights = ['h-[448px]', 'h-[329px]', 'h-[398px]']
  const currentHeight = heights[index % 3]

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <motion.article 
      className="relative flex-shrink-0 group select-none flex flex-col justify-between !cursor-none"
      style={{ width: pixelWidth ? `${pixelWidth}px` : '85vw' }} 
    >
      <Link 
        href={`/blog/${post.slug}`} 
        onClick={handleClick}
        className="block w-full h-full !cursor-none" 
        suppressHydrationWarning
        draggable={false}
      >
        <div className={`w-full ${currentHeight} mb-6 overflow-hidden bg-gray-100 relative
                        rounded-none transition-all duration-500 ease-out 
                        group-hover:rounded-[250px]`}> 
          
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title || "Article"}
              fill
              draggable={false} 
              className="object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
               <span className="text-sm">No Image</span>
            </div>
          )}

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
        </div>

        <div className="flex flex-col gap-4 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 border border-black/10 px-3 py-1 rounded-full whitespace-nowrap">
                {post.readTime}
              </span>
              <div className="flex flex-wrap gap-1">
                {post.tags?.slice(0, 2).map((tag: string) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-gray-100 text-[10px] font-medium text-gray-500 uppercase whitespace-nowrap">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <h3 className="text-2xl font-normal leading-tight text-[#1a1a1a] group-hover:text-amber-600 transition-colors duration-300">
              {post.title}
            </h3>
        </div>
      </Link>
    </motion.article>
  )
}

// --- 3. COMPOSANT PRINCIPAL ---
export default function BlogSection({ posts }: { posts: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  
  const [sliderWidth, setSliderWidth] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)

  // --- CORRECTION CRUCIALE ICI ---
  // On crée un adaptateur qui transforme les données pour qu'elles soient lisibles
  // Que les données arrivent directement ou encapsulées dans 'meta', ça marchera.
  const formattedPosts = (posts || []).map((post) => ({
    id: post.id || post.slug,
    slug: post.slug,
    // On cherche d'abord 'title', sinon on va chercher dans 'meta.title'
    title: post.title || post.meta?.title || "Sans titre",
    excerpt: post.excerpt || post.meta?.excerpt || "",
    image: post.image || post.meta?.image || "",
    // Attention: mdx.ts renvoie 'readingTime' mais le composant attend 'readTime'
    readTime: post.readTime || post.meta?.readingTime || post.readingTime || "5 min read",
    tags: post.tags || post.meta?.tags || []
  }));

  const visiblePosts = formattedPosts.slice(0, 3)

  useEffect(() => {
    const calculateMetrics = () => {
      if (sliderRef.current && containerRef.current) {
        const visibleW = containerRef.current.offsetWidth
        setContainerWidth(visibleW)
        const totalW = sliderRef.current.scrollWidth
        setSliderWidth(totalW - visibleW + 50)
      }
    }

    calculateMetrics()
    const timer = setTimeout(calculateMetrics, 500)
    window.addEventListener('resize', calculateMetrics)
    return () => {
      window.removeEventListener('resize', calculateMetrics)
      clearTimeout(timer)
    }
  }, [posts]) 

  const onDragStart = () => setIsDragging(true)
  const onDragEnd = () => setTimeout(() => setIsDragging(false), 150)

  return (
    <section className="relative w-full bg-white py-24 md:py-32 overflow-hidden mt-12">
      
      {/* HEADER */}
      <div className="container mx-auto px-0 md:px-0 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5">
          <div className="hidden md:block col-span-1 pt-2">
            <span className="text-sm font-medium uppercase tracking-wide text-gray-500 block">
              Blog
            </span>
          </div>
          <div className="col-span-1 md:col-span-7 flex flex-col items-start gap-8">
            <h2 className="text-[40px] md:text-[60px] leading-[1.1] font-normal text-[#1a1a1a] tracking-tight">
              Soyez au courant  <br />
              De nos dernières actus
            </h2>
            <Link 
              href="/blog"
              className="group flex items-center gap-2 px-6 py-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
              suppressHydrationWarning
            >
              <span className="text-sm font-medium">Discover all articles</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ZONE SLIDER */}
      <div className="container mx-auto px-6 md:px-12">
        <div ref={containerRef} className="relative w-full !cursor-none">
          <DragCursor containerRef={containerRef} />

          <motion.div 
            ref={sliderRef}
            className="flex w-max items-start gap-5 !cursor-none active:!cursor-none pb-12 touch-pan-y"
            drag="x"
            dragConstraints={{ right: 0, left: -sliderWidth }} 
            whileTap={{ cursor: "none" }}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            
            {visiblePosts.map((post, index) => {
              let cardPixelWidth = 0;
              if (containerWidth > 768) { 
                if (index === 0) {
                  cardPixelWidth = (containerWidth / 2) - 10
                } else if (index === 1) {
                  cardPixelWidth = (containerWidth * 0.375) - 12
                } else {
                  cardPixelWidth = 450
                }
              }

              return (
                <BlogCard 
                    key={post.slug} 
                    post={post} 
                    index={index} 
                    isDragging={isDragging}
                    pixelWidth={containerWidth > 768 ? cardPixelWidth : undefined}
                />
              )
            })}

            {/* BOUTON "VIEW ALL" */}
            <div className="flex-shrink-0 w-[200px] h-[320px] flex items-center justify-center !cursor-none">
               <Link 
                  href="/blog" 
                  onClick={(e) => { if(isDragging) { e.preventDefault(); e.stopPropagation(); } }}
                  className="group flex flex-col items-center gap-4 opacity-50 hover:opacity-100 transition-opacity !cursor-none"
                  suppressHydrationWarning
                  onDragStart={(e) => e.preventDefault()}
               >
                  <div className="w-20 h-20 rounded-full border border-black/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all duration-300">
                     <span className="text-2xl">→</span>
                  </div>
                  <span className="font-medium text-lg">View all</span>
               </Link>
            </div>

          </motion.div>
        </div>
      </div>

    </section>
  )
}