'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Intro from '@/components/home/Intro';
import Services from '@/components/home/Services';
import Highlight from '@/components/home/Highlight';
import Testimonials from '@/components/home/Testimonials';
import BlogSection from '@/components/home/BlogSection';
import Herov2 from '@/components/home/herov2';

export default function Home() {
  return (
    <main className="w-full bg-white min-h-screen">
      
      <Herov2 />
      
      {/* MOBILE : -mt-[30vh] pour remonter l'intro et coller aux images qui sont plus hautes.
         DESKTOP : md:-mt-4 (quasi zéro) pour descendre l'intro et ne plus couper les cartes.
      */}
      <div className="relative z-50 -mt-[30vh] md:-mt-4">
        
        <div className="bg-white pt-10 rounded-t-[2rem] md:rounded-t-[3rem]">
          <Intro />
        </div>

        <Services />
        <Highlight />
        <Testimonials />
        
       

        <BlogSection />
        <div className="h-[20vh] bg-white"></div>
      </div>
      
    </main>
  );
}