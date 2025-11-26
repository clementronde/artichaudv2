import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import Intro from '@/components/home/Intro';
import Services from '@/components/home/Services';
import Highlight from '@/components/home/Highlight'; // <--- Import
import Testimonials from '@/components/home/Testimonials';

export default function Home() {
  return (
    <main className="w-full bg-white min-h-screen">
      <Navbar />
      <Hero />
      <Intro />
      <Services />
      <Highlight />
      <Testimonials />

      <div className="h-[20vh] bg-white"></div>
    </main>
  );
}