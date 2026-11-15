import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import News from "@/components/News";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/motion/ScrollAnimations";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col items-center gap-20 overflow-x-clip md:gap-[100px]">
        <Hero />
        <Services />
        <Contact />
        <Projects />
        <Testimonials />
        <News />
        <Footer />
      </main>
      <ScrollAnimations />
    </>
  );
}
