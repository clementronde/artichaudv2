'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Intro from '@/components/home/Intro';
import Services from '@/components/home/Services';
import Highlight from '@/components/home/Highlight';
import Testimonials from '@/components/home/Testimonials';
import BlogSection from '@/components/home/BlogSection';
import Herov2 from '@/components/home/herov2';
import Preloader from '@/components/Preloader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Fallback de sécurité
  useEffect(() => {
    // Si jamais le preloader ne finit pas (cas rare), on force l'affichage après 5s
    const timer = setTimeout(() => setLoading(false), 5500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="w-full bg-white min-h-screen">
      
      {/* Le Preloader est toujours rendu tant que loading est vrai, 
          mais AnimatePresence à l'intérieur gère sa disparition en douceur */}
      {loading && (
        <Preloader onComplete={() => setLoading(false)} />
      )}

      {/* Le Hero reçoit l'état de chargement pour lancer ses anims */}
      <Herov2 isLoaded={!loading} />
      
      {/* Le reste du contenu */}
      <div className="relative z-10">
        <div className="h-[30vh] bg-transparent" />
        <Intro />
        <Services />
        <Highlight />
        <Testimonials />
        <BlogSection />
        <div className="h-[20vh] bg-white"></div>
      </div>
      
    </main>
  );
}