'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

// --- TYPES ---
interface Project {
  id: number;
  title: string;
  img: string;
}

// --- DONNÉES ---
const projects: Project[] = [
  { id: 1, title: "Fashion", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80" },
  { id: 2, title: "Keleti", img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=600&q=80" },
  { id: 3, title: "Architecture", img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=600&q=80" },
  { id: 4, title: "Lumyn", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" },
  { id: 5, title: "Chair", img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=600&q=80" },
  { id: 6, title: "Interior", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&w=600&q=80" },
  { id: 7, title: "Design", img: "https://images.unsplash.com/photo-1534349762913-961123f16adc?auto=format&fit=crop&w=600&q=80" },
  { id: 8, title: "Nature", img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80" },
];

// Dupliquer pour boucle infinie fluide
const infiniteProjects = [...projects, ...projects, ...projects];

// --- COMPOSANTS ---
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center px-4 py-1.5 border border-gray-200 rounded-full text-base font-medium text-gray-600 bg-white mx-1 whitespace-nowrap align-middle transform -translate-y-1 shadow-sm">
      {children}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group cursor-pointer transition-transform duration-300 hover:-translate-y-4">
      <div 
        className="relative z-10 bg-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden"
        style={{ width: 310, height: 242 }}
      >
        {/* ✅ Utilise img natif pour éviter les problèmes de cache Next.js */}
        <img 
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white font-bold text-3xl drop-shadow-xl">
            {project.title}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [rotation, setRotation] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  // --- PARAMÈTRES GÉOMÉTRIQUES ---
  const angleStep = 12;
  const radius = 2000;
  const arcApexPosition = 600; 
  const pivotY = arcApexPosition + radius;
  const cardWidth = 310;
  const cardHeight = 242;
  
  // Angle total d'UN SET de projets (pour la boucle)
  const singleSetAngle = projects.length * angleStep; // 8 * 10 = 80°

  const totalCards = infiniteProjects.length;
  const totalAngle = totalCards * angleStep;
  const centerIndex = Math.floor(totalCards / 2);

  // Observer pour détecter si le hero est visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation de rotation avec boucle infinie
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
        
        // BOUCLE INFINIE : Reset quand on a parcouru un set complet
        if (newRotation <= -singleSetAngle) {
          return newRotation + singleSetAngle;
        }
        if (newRotation >= singleSetAngle) {
          return newRotation - singleSetAngle;
        }
        
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
      className="relative z-20 w-full h-screen bg-white font-sans selection:bg-black selection:text-white"
    >

      {/* --- MASQUE : Coupe horizontalement, laisse déborder verticalement --- */}
      <div className="absolute top-0 left-0 w-full h-[140vh] overflow-hidden pointer-events-none">
        
        <div className="relative w-full h-full pointer-events-auto">
            
            {/* LIGNE POINTILLÉE */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 z-0 opacity-60" 
              style={{ 
                top: pivotY,
                width: radius * 2,
                height: radius * 2,
                marginTop: -radius, 
              }}
            >
              <div className="w-full h-full border border-dashed border-gray-300 rounded-full" />
            </div>

            {/* ROUE DES CARTES */}
            <div 
              className="absolute left-1/2 z-[60]"
              style={{ 
                top: pivotY,
                transform: `rotate(${rotation}deg)`,
              }}
            >
              {infiniteProjects.map((project, index) => {
                const angle = (index * angleStep) - (totalAngle / 2);
                const isCenterCard = index === centerIndex;

                return (
                  <div
                    key={`${project.id}-${index}`}
                    className="absolute"
                    style={{
                      left: 0,
                      top: 0,
                      transform: `rotate(${angle}deg)`,
                      transformOrigin: '0 0',
                    }}
                  >
                    <div 
                      className="relative"
                      style={{ 
                        transform: `translateX(-${cardWidth / 2}px) translateY(-${radius}px) translateY(-${cardHeight / 2}px)`,
                      }}
                    >
                      {/* LOGO attaché à la carte centrale */}
                      {isCenterCard && (
                        <div 
                          className="absolute left-1/2 -translate-x-1/2 z-0"
                          style={{ top: '-110px', width: 96, height: 96 }}
                        >
                          {/* ✅ img natif pour éviter le warning Next.js */}
                          <img 
                            src="/hero/logonoirhero.png" 
                            alt="Mascotte Artichaud"
                            className="w-full h-auto object-contain drop-shadow-2xl"
                          />
                        </div>
                      )}

                      <ProjectCard project={project} />
                    </div>
                  </div>
                );
              })}
            </div>
        </div>
      </div>

     {/* --- TEXTE (AU PREMIER PLAN) --- */}
<div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
  <div className="text-center max-w-5xl mx-auto px-4 pointer-events-auto translate-y-[-10vh]">
    <h1 className="text-5xl md:text-[5.5rem] font-bold text-gray-900 tracking-tight mb-6 leading-[1.1]">
      Mettez le feu à vos projets
    </h1>
    <div className="text-lg md:text-[1.35rem] text-gray-500 leading-relaxed max-w-3xl mx-auto font-normal">
      Plateforme packed with <Tag>Webflow</Tag> &amp; <Tag>HTML</Tag> ressources,
      <br className="hidden md:block" />
      <Tag>icons</Tag>, &amp; <Tag>easings</Tag> and a page transition <Tag>course</Tag>
    </div>
  </div>
</div>


    </div>
  );
}