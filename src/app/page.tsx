import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import Intro from '@/components/home/Intro';
import Services from '@/components/home/Services';
import Highlight from '@/components/home/Highlight'; // <--- Import
import Testimonials from '@/components/home/Testimonials';
import BlogSection from '@/components/home/BlogSection';
import Herov2 from '@/components/home/herov2';

export default function Home() {
  return (
    <main className="w-full bg-white min-h-screen ">
     
      <Herov2 />
      
      <Intro />
      <Services />
      <Highlight />
      <Testimonials />
      <BlogSection />
      <div className="h-[20vh] bg-white"></div>
    </main>
  );
}