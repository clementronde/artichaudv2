import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Gallery from "@/components/Gallery";
import Chapters from "@/components/Chapters";
import Activities from "@/components/Activities";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/motion/ScrollAnimations";

export default function Home() {
  return (
    <>
      <Nav />
      {/* Espacement vertical de la maquette : 152 px entre chaque section */}
      <main className="flex flex-col items-center gap-24 overflow-x-clip md:gap-[120px] xl:gap-[152px]">
        <Hero />
        <Intro />
        <Gallery />
        <Chapters />
        <Activities />
        <Testimonials />
        <Blog />
        <Footer />
      </main>
      <ScrollAnimations />
    </>
  );
}
