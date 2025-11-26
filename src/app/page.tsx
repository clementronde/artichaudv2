import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import Intro from '@/components/home/Intro';
import Services from '@/components/home/Services'; // <--- Import

export default function Home() {
  return (
    <main className="w-full bg-white min-h-screen">
      <Navbar />
      <Hero />
      <Intro />
      <Services /> {/* <--- Ajouté ici */}
      
      {/* Footer Temporaire */}
      <div className="h-[50vh] bg-black text-white flex items-center justify-center">
        <p>Next: Works & Footer</p>
      </div>
    </main>
  );
}