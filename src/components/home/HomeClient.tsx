'use client'; // ✅ Indispensable tout en haut

import { useState, useEffect } from 'react';
import Intro from '@/components/home/Intro';
import Services from '@/components/home/Services';
import Highlight from '@/components/home/Highlight';
import Testimonials from '@/components/home/Testimonials';
import BlogSection from '@/components/home/BlogSection';
import Herov2 from '@/components/home/herov2';
import Preloader from '@/components/Preloader';

// Définition du type pour les articles qu'on va recevoir
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  tags: string[];
}

export default function HomeClient({ posts }: { posts: BlogPost[] }) {
  const [loading, setLoading] = useState(true);

  // Fallback de sécurité pour le loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      window.dispatchEvent(new Event('preloaderComplete'));
    }, 5500);
    return () => clearTimeout(timer);
  }, []);

  // Dispatcher l'événement quand le préloader est terminé
  const handlePreloaderComplete = () => {
    setLoading(false);
    // Signal pour la navbar
    window.dispatchEvent(new Event('preloaderComplete'));
  };

  return (
    <main className="w-full bg-white min-h-screen">
      
      {loading && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* Le Hero reçoit l'état de chargement */}
      <Herov2 isLoaded={!loading} />
      
      <div className="relative z-10">
        <div className="h-[20vh] bg-transparent" />
        <Intro />
        <Services />
        <Highlight />
        <Testimonials />
        {/* On passe les articles récupérés au composant Blog */}
        <BlogSection posts={posts} />
        <div className="h-[20vh] bg-white"></div>
      </div>
      
    </main>
  );
}