import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";

/* Positions reprises de la maquette (cadre 1512 × 855), exprimées en % pour suivre la largeur. */
const PROJECTS = [
  { src: "/images/projet-1.jpg", alt: "Réparation d’un siphon de lavabo", pos: "lg:left-[2.65%] lg:top-[16.14%] lg:w-[31.15%] lg:h-[32.75%]", aspect: "aspect-[471/280]", speed: 0.12 },
  { src: "/images/projet-2.jpg", alt: "Intervention sous un évier", pos: "lg:left-[34.46%] lg:top-[63.74%] lg:w-[31.08%] lg:h-[36.26%]", aspect: "aspect-[470/310]", speed: 0.3 },
  { src: "/images/projet-3.jpg", alt: "Installation d’un robinet de lavabo", pos: "lg:left-[76.92%] lg:top-[14.04%] lg:w-[20.44%] lg:h-[47.72%]", aspect: "aspect-[309/408]", speed: 0.2 },
];

export default function Projects() {
  return (
    <section id="projets" className="relative mx-auto w-full max-w-site overflow-x-clip">
      <SectionHeading tag="Projets" title="Nos réalisations" className="relative z-10 px-5 md:px-10" />

      <div className="relative mt-12 px-5 md:px-10 lg:mt-0 lg:aspect-[1512/855] lg:px-0">
        {/* Grand wordmark en fond, qui glisse horizontalement au scroll */}
        <div className="pointer-events-none absolute left-[-7.94%] top-[18%] w-[125.8%] lg:top-[32.5%]" aria-hidden>
          <div data-drift="-14">
            <Image src="/images/wordmark-projets.svg" alt="" width={1902.2} height={397.766} className="h-auto w-full" />
          </div>
        </div>

        <ul className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:absolute lg:inset-0 lg:block">
          {PROJECTS.map((p) => (
            <li key={p.src} className={`relative lg:absolute ${p.pos}`}>
              <div className="h-full">
                <div data-parallax={p.speed} className="h-full will-change-transform">
                  <figure
                    data-clip
                    className={`group relative h-full overflow-hidden rounded-[7px] ${p.aspect} lg:aspect-auto`}
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.06]"
                    />
                  </figure>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
