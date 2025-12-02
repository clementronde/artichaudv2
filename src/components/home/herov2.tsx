'use client';

import React, { useEffect, useState, useRef } from 'react';

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
        className="bg-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden"
        style={{ width: 310, height: 242 }}
      >
        <img 
          src={project.img} 
          alt={project.title} 
          className="w-full h-full object-cover"
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
  const [isVisible, setIsVisible] = useState(true); // ← NOUVEAU : état de visibilité
  const heroRef = useRef<HTMLDivElement>(null); // ← NOUVEAU : ref pour le hero

  // NOUVEAU : Intersection Observer pour détecter si le hero est visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // On considère le hero "visible" s'il est à plus de 10% dans le viewport
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.1 // Déclenche quand 10% du hero est visible
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation loop - S'ARRÊTE quand le hero n'est plus visible
  useEffect(() => {
    if (!isVisible) return; // ← NOUVEAU : Stop si pas visible

    let animationId: number;
    let lastTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      const speed = 0.5; 
      setRotation(prev => prev - speed * delta);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isVisible]); // ← NOUVEAU : dépendance sur isVisible

  // --- PARAMÈTRES GÉOMÉTRIQUES ---
  const angleStep = 10;
  const radius = 2000;
  const arcApexPosition = 500; 
  const pivotY = arcApexPosition + radius;
  const cardWidth = 310;
  const cardHeight = 242;
  const totalCards = infiniteProjects.length;
  const totalAngle = totalCards * angleStep;

  return (
    <div 
      ref={heroRef} // ← NOUVEAU : ref attachée
      className="relative w-full h-screen bg-white font-sans selection:bg-black selection:text-white"
    >

      {/* --- ZONE D'ANIMATION (EN ARRIÈRE PLAN) --- */}
      <div className="absolute inset-0 z-0">
          
        

        {/* LIGNE POINTILLÉE */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 z-0 pointer-events-none opacity-60" 
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
          className="absolute left-1/2 z-[60]" // ← Z-INDEX AUGMENTÉ
          style={{ 
            top: pivotY,
            transform: `rotate(${rotation}deg)`,
          }}
        >
          {infiniteProjects.map((project, index) => {
            const angle = (index * angleStep) - (totalAngle / 2);

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
                  style={{ 
                    transform: `translateX(-${cardWidth / 2}px) translateY(-${radius}px) translateY(-${cardHeight / 2}px)`,
                  }}
                >
                  <ProjectCard project={project} />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* --- TEXTE (AU PREMIER PLAN) --- */}
      <div className="absolute top-0 left-0 right-0 z-40 flex flex-col items-center pt-20 md:pt-28 pointer-events-none">
        <div className="text-center max-w-5xl mx-auto px-4">
          <h1 className="text-5xl md:text-[5.5rem] font-bold text-gray-900 tracking-tight mb-6 leading-[1.1]">
            Mettez le feu à vos projets
          </h1>
          <div className="text-lg md:text-[1.35rem] text-gray-500 leading-relaxed max-w-3xl mx-auto font-normal pointer-events-auto">
            Plateforme packed with <Tag>Webflow</Tag> &amp; <Tag>HTML</Tag> ressources,
            <br className="hidden md:block" />
            <Tag>icons</Tag>, &amp; <Tag>easings</Tag> and a page transition <Tag>course</Tag>
          </div>
        </div>
      </div>

    </div>
  );
}