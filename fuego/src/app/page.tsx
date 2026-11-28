import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Esprit from "@/components/Esprit";
import Menu from "@/components/Menu";
import Privatisation from "@/components/Privatisation";
import Avis from "@/components/Avis";
import Horaires from "@/components/Horaires";
import Actualites from "@/components/Actualites";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/motion/ScrollAnimations";

// Sections dans l'ordre de la maquette ; écart constant de 110 px à 1512 (la carte et la privatisation se touchent)
export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col items-stretch gap-[72px] overflow-x-clip md:gap-[96px] lg:gap-[110px]">
        <Hero />
        <Esprit />
        <div className="flex flex-col">
          <Menu />
          <Privatisation />
        </div>
        <Avis />
        <Horaires />
        <Actualites />
        <Footer />
      </main>
      <ScrollAnimations />
    </>
  );
}
