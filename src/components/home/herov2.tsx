'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// --- TYPES ---
interface Project {
  id: number;
  title: string;
  img: string;
}

interface TagProps {
  children: React.ReactNode;
}

interface ProjectCardProps {
  project: Project;
  rotation: number;
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
];

// --- COMPOSANTS ---

function Navbar() {
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full pointer-events-none">
      <div className="bg-[#111] text-white px-2 py-2 rounded-full flex items-center shadow-2xl pointer-events-auto">
        <div className="flex gap-8 px-6 text-[15px] font-medium tracking-wide">
          <a href="#works" className="hover:text-gray-300 transition-colors py-2">Works</a>
          <a href="#services" className="hover:text-gray-300 transition-colors py-2">Services</a>
          <a href="#about" className="hover:text-gray-300 transition-colors py-2">About</a>
        </div>
        <button className="bg-[#333] hover:bg-[#444] border border-gray-600 transition-colors rounded-full px-5 py-2.5 text-[15px] flex items-center gap-2 ml-2">
          <ArrowRight size={16} /> Let&apos;s talk
        </button>
      </div>
    </nav>
  );
}

function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center justify-center px-4 py-1.5 border border-gray-200 rounded-full text-base font-medium text-gray-600 bg-white mx-1 whitespace-nowrap align-middle transform -translate-y-1 shadow-sm">
      {children}
    </span>
  );
}

function ProjectCard({ project, rotation }: ProjectCardProps) {
  // Le pivot est placé très bas pour créer l'arc de cercle
  const pivotDistance = '150vh';
  
  return (
    <div 
      className="absolute left-1/2"
      style={{ 
        top: 0,
        transformOrigin: `50% ${pivotDistance}`,
        transform: `translateX(-50%) rotate(${rotation}deg)`,
        height: pivotDistance,
      }}
    >
      {/* Conteneur Image - positionné en haut du "rayon" */}
      <div className="relative group cursor-pointer transition-transform duration-300 hover:-translate-y-4">
        <div className="w-[260px] md:w-[340px] lg:w-[380px] aspect-[16/10] bg-gray-200 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.25)] border-[4px] border-white">
          <img 
            src={project.img} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          {/* Overlay titre au hover */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white font-bold text-2xl md:text-3xl tracking-tight drop-shadow-lg">
              {project.title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Rotation de la roue au scroll : 0 → -45deg
  const rotateValue = useTransform(scrollYProgress, [0, 1], [0, -45]);

  // Angles de l'éventail (7 cartes espacées de 15°)
  const angles = [-45, -30, -15, 0, 15, 30, 45];

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[300vh] bg-white font-sans selection:bg-black selection:text-white"
    >
      {/* SECTION STICKY */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center">
        
        <Navbar />

        {/* --- TEXTE PRINCIPAL --- */}
        <div className="text-center z-30 max-w-5xl px-4 pt-28 md:pt-32 mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-gray-900 tracking-tight mb-6 md:mb-8 leading-[1.1]">
            Mettez le feu à vos projets
          </h1>
          
          <p className="text-base md:text-lg lg:text-[1.35rem] text-gray-500 leading-relaxed max-w-3xl mx-auto font-normal">
            Plateforme packed with <Tag>Webflow</Tag> &amp; <Tag>HTML</Tag> ressources,
            <br className="hidden md:block" />
            <Tag>icons</Tag>, &amp; <Tag>easings</Tag> and a page transition <Tag>course</Tag>
          </p>
        </div>

        {/* --- ZONE LOGO + CARTES --- */}
        <div className="relative w-full flex-1 flex justify-center">
          
          {/* LOGO ARTICHAUD - Centré et DEVANT les cartes */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
            <img 
              src="/hero/logonoirhero.png" 
              alt="Mascotte Artichaud"
              className="w-20 md:w-24 h-auto drop-shadow-2xl"
            />
            {/* Bouton C à droite */}
            <div className="absolute -right-16 md:-right-20 top-4 bg-gray-500 text-white w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center shadow-lg font-semibold text-sm cursor-pointer hover:scale-110 transition-transform">
              C
            </div>
          </div>

          {/* LIGNE POINTILLÉE - Tourne avec le scroll */}
          <motion.div 
            style={{ rotate: rotateValue }}
            className="absolute top-[60px] left-1/2 -translate-x-1/2 w-[300vh] h-[300vh] rounded-full border border-dashed border-gray-200 pointer-events-none z-0"
          />

          {/* ROUE DES CARTES - Tourne avec le scroll */}
          <motion.div 
            style={{ rotate: rotateValue }}
            className="absolute top-[100px] left-1/2 -translate-x-1/2 w-full h-full z-10"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                rotation={angles[index]}
              />
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default HeroSection;