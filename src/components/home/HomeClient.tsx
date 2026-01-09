'use client';

import Intro from '@/components/home/Intro';
import Services from '@/components/home/Services';
import Highlight from '@/components/home/Highlight';
import BlogSection from '@/components/home/BlogSection';
import HeroV3 from '@/components/home/herov3';
import Testimonials2 from '@/components/home/Testimonials2';

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
  return (
    <main className="w-full bg-white min-h-screen">
      <HeroV3 />
      <div className="relative z-10">
        <div className="h-[20vh] bg-transparent" />
        <Intro />
        <Services />
        <Highlight />
        <Testimonials2 />
        <BlogSection posts={posts} />
        <div className="h-[20vh] bg-white"></div>
      </div>
    </main>
  );
}