'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// --- TYPES ---
interface Project {
  id: number;
  title: string;
  img: string;
}

// --- DONNÉES ---
const projects: Project[] = [
  { id: 1, title: "Fashion", img: "/projects/Disobey.avif" },
  { id: 2, title: "Keleti", img: "/projects/Keleti.avif" },
  { id: 3, title: "Architecture", img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=600&q=80" },
  { id: 4, title: "Lumyn", img: "/projects/Com'on.avif" },
  { id: 5, title: "Chair", img: "/projects/Lumyn.avif" },
  { id: 6, title: "Interior", img: "/projects/Jobmi.avif" },
  { id: 7, title: "Design", img: "/projects/Charit.avif" },
  { id: 8, title: "Nature", img: "/projects/Multiface.avif" },
];

const infiniteProjects = [...projects, ...projects, ...projects];

// --- COMPOSANTS INTERNES ---
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <motion.span 
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.8 },
        visible: { opacity: 1, y: 0, scale: 1 }
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="inline-flex items-center justify-center px-3 py-1 md:px-4 md:py-1.5 border border-gray-200 rounded-full text-xs md:text-base font-medium text-gray-600 bg-white mx-1 whitespace-nowrap align-middle transform -translate-y-0.5 md:-translate-y-1 shadow-sm hover:scale-110 transition-transform cursor-default"
    >
      {children}
    </motion.span>
  );
}

function ProjectCard({ project, width, height }: { project: Project, width: number, height: number }) {
  return (
    <div className="group cursor-pointer transition-transform duration-500 hover:-translate-y-3 md:hover:-translate-y-6 hover:rotate-2">
      <div 
        className="relative z-10 bg-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)] md:shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
        style={{ width: width, height: height }}
      >
        <img 
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="eager"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
          <span className="text-white font-bold text-xl md:text-4xl drop-shadow-xl translate-y-4 md:translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-[0.34,1.56,0.64,1]">
            {project.title}
          </span>
        </div>
      </div>
    </div>
  );
}

// --- COMPOSANT PRINCIPAL ---
export default function HeroSection({ isLoaded = true }: { isLoaded?: boolean }) {
  const [rotation, setRotation] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); 
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // CONFIGURATION DYNAMIQUE
  const config = isMobile ? {
    angleStep: 9, 
    radius: 1200,
    // MOBILE : Votre réglage validé
    arcApexPosition: 470,   
    cardWidth: 160,
    cardHeight: 125 
  } : {
    angleStep: 12,
    radius: 2000,
    arcApexPosition: 550,
    cardWidth: 310,
    cardHeight: 242
  };

  const pivotY = config.arcApexPosition + config.radius;
  
  const singleSetAngle = projects.length * config.angleStep; 
  const totalCards = infiniteProjects.length;
  const totalAngle = totalCards * config.angleStep;
  const centerIndex = Math.floor(totalCards / 2);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let animationId: number;
    let lastTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      const speed = 0.5; 
      
      setRotation(prev => {
        const newRotation = prev - speed * delta;
        if (newRotation <= -singleSetAngle) return newRotation + singleSetAngle;
        if (newRotation >= singleSetAngle) return newRotation - singleSetAngle;
        return newRotation;
      });
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isVisible, singleSetAngle]);

  return (
    <div 
      ref={heroRef} 
      // MODIFICATION IMPORTANTE ICI :
      // On retire 'z-20' pour laisser les enfants (cartes) interagir avec les autres sections (Intro).
      // 'relative' reste pour le positionnement, mais sans z-index forcé, l'ordre naturel s'applique.
      className="relative w-full h-screen bg-transparent font-sans selection:bg-black selection:text-white"
    >

      {/* ROUE D'IMAGES - z-[60] (DEVANT l'Intro z-30) */}
      <div className="absolute top-0 left-0 w-full h-[140vh] overflow-hidden pointer-events-none z-[60]">
        
        <motion.div 
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, scale: 0.5, y: 200, rotate: -15 },
            visible: { 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              rotate: 0,
              transition: { 
                type: "spring", stiffness: 200, damping: 20, mass: 1.2,
                delay: 0.2
              } 
            }
          }}
          className="relative w-full h-full pointer-events-auto"
        >
            <div 
              className="absolute left-1/2 -translate-x-1/2 z-0 opacity-60" 
              style={{ 
                top: pivotY, 
                width: config.radius * 2, 
                height: config.radius * 2, 
                marginTop: -config.radius 
              }}
            >
              <div className="w-full h-full border border-dashed border-gray-300 rounded-full" />
            </div>

            <div 
              className="absolute left-1/2 z-[60]"
              style={{ top: pivotY, transform: `rotate(${rotation}deg)` }}
            >
              {infiniteProjects.map((project, index) => {
                const angle = (index * config.angleStep) - (totalAngle / 2);
                const isCenterCard = index === centerIndex;

                return (
                  <div
                    key={`${project.id}-${index}`}
                    className="absolute"
                    style={{ left: 0, top: 0, transform: `rotate(${angle}deg)`, transformOrigin: '0 0' }}
                  >
                    <div 
                      className="relative"
                      style={{ 
                        transform: `translateX(-${config.cardWidth / 2}px) translateY(-${config.radius}px) translateY(-${config.cardHeight / 2}px)` 
                      }}
                    >
                      {isCenterCard && (
                        <div 
                          className="absolute left-1/2 -translate-x-1/2 z-0" 
                          style={{ 
                            top: isMobile ? '-80px' : '-120px', 
                            width: isMobile ? 70 : 110,         
                            height: isMobile ? 70 : 110 
                          }}
                        >
                          <motion.img 
                            initial={{ scale: 0, rotate: -180 }}
                            animate={isLoaded ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                            transition={{ delay: 0.8, type: "spring" }}
                            src="/hero/logonoirhero.png" 
                            alt="Mascotte Artichaud"
                            className="w-full h-auto object-contain drop-shadow-2xl"
                          />
                        </div>
                      )}
                      
                      <ProjectCard project={project} width={config.cardWidth} height={config.cardHeight} />
                    </div>
                  </div>
                );
              })}
            </div>
        </motion.div>
      </div>

    {/* TEXTE HERO - z-0 (DERRIÈRE l'Intro z-30) */}
    <motion.div 
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
    >
      <div className="text-center max-w-5xl mx-auto px-4 pointer-events-auto translate-y-[-10vh]">
        
        <div className="overflow-hidden mb-4 md:mb-6 py-2">
          <motion.h1 
            variants={{
              hidden: { y: "100%", skewY: 7, opacity: 0 },
              visible: { 
                y: 0, skewY: 0, opacity: 1,
                transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } 
              }
            }}
            className="text-[11vw] md:text-[6rem] font-bold text-gray-900 tracking-tighter leading-[1] drop-shadow-sm"
          >
            Mettez le feu à vos projets
          </motion.h1>
        </div>

        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, y: 0, 
              transition: { delay: 0.4, duration: 0.6, staggerChildren: 0.1 } 
            }
          }}
          className="text-base md:text-[1.35rem] text-gray-500 leading-relaxed max-w-3xl mx-auto font-normal px-6 md:px-0"
        >
          Plateforme packed with <Tag>Webflow</Tag> &amp; <Tag>HTML</Tag> ressources,
          <br className="hidden md:block" />
          <Tag>icons</Tag>, &amp; <Tag>easings</Tag> and a page transition <Tag>course</Tag>
        </motion.div>

      </div>
    </motion.div>

    </div>
  );
}