import ScrollAnimations from "@/components/motion/ScrollAnimations";

// Une section = un composant dans src/components/ (Hero, Services…), dans l'ordre de la maquette.
// L'écart vertical entre sections reprend celui de Figma (ici 152 px à la largeur de référence).
export default function Home() {
  return (
    <>
      {/* <Nav /> */}
      <main className="flex flex-col items-center gap-24 overflow-x-clip md:gap-[120px] xl:gap-[152px]">
        <section className="container-site py-40">
          <h1 data-split className="text-5xl">
            __TITRE_H1__
          </h1>
        </section>
      </main>
      <ScrollAnimations />
    </>
  );
}
