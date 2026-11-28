import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";

/* Positions reprises de la maquette (cadre 1512 × 855), exprimées en % pour suivre la largeur. */
const PROJECTS = [
  { src: "/images/projet-1.jpg", title: "Remplacement d’un siphon", place: "Versailles", alt: "Réparation d’un siphon de lavabo", pos: "lg:left-[2.65%] lg:top-[max(calc(16.14%+28px),166px)] lg:w-[31.15%] lg:h-[32.75%]", aspect: "aspect-[471/280]", speed: 0.12 },
  { src: "/images/projet-2.jpg", title: "Fuite sous évier réparée", place: "Saint-Germain-en-Laye", alt: "Intervention sous un évier", pos: "lg:left-[34.46%] lg:top-[63.74%] lg:w-[31.08%] lg:h-[36.26%]", aspect: "aspect-[470/310]", speed: 0.3 },
  { src: "/images/projet-3.jpg", title: "Pose d’un mitigeur", place: "Rambouillet", alt: "Installation d’un robinet de lavabo", pos: "lg:left-[76.92%] lg:top-[14.04%] lg:w-[20.44%] lg:h-[47.72%]", aspect: "aspect-[309/408]", speed: 0.2 },
];

export default function Projects() {
  // Pas de overflow-x-clip sur la section : le wordmark déborde jusqu'au bord de l'écran (<main> le rogne),
  // sinon il est coupé net à 1512 px sur grand écran.
  return (
    <section id="projets" data-projects className="relative mx-auto w-full max-w-site">
      {/* En desktop, le titre est posé dans le haut du cadre photos, comme sur la maquette (cadre 1512 × 855) */}
      <SectionHeading tag="Projets" title="Nos réalisations" className="relative z-10 px-5 md:px-10 lg:absolute lg:left-0 lg:top-0" />

      <div className="relative mt-12 px-5 md:px-10 lg:mt-0 lg:aspect-[1512/855] lg:px-0">
        {/* Grand wordmark en fond, qui traverse la section au scroll */}
        <div className="pointer-events-none absolute left-[-7.94%] top-[18%] w-[125.8%] lg:top-[32.5%]" aria-hidden>
          <div data-projects-wordmark>
            <Image src="/images/wordmark-projets.svg" alt="" width={1902.2} height={397.766} className="h-auto w-full" />
          </div>
        </div>

        {/* Les photos montent du bas de l'écran une par une, au rythme du scroll en desktop (voir ScrollAnimations) */}
        <ul data-rise-seq className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:absolute lg:inset-0 lg:block">
          {PROJECTS.map((p, i) => (
            <li key={p.src} className={`relative lg:absolute ${p.pos}`}>
              <div className="h-full">
                <div data-projects-float={p.speed} className="h-full will-change-transform">
                  <figure
                    data-rise-item
                    className={`group relative h-full overflow-hidden rounded-[7px] ${p.aspect} lg:aspect-auto`}
                  >
                    {/* Calque animé par GSAP (dézoom d'entrée), séparé du zoom CSS au survol porté par l'image */}
                    <span data-rise-zoom className="absolute inset-0 block">
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.06]"
                      />
                    </span>
                    {/* Légende du chantier : apparaît juste après la photo (voir ScrollAnimations) */}
                    <figcaption
                      data-project-caption
                      className="absolute bottom-3 left-3 flex max-w-[calc(100%-24px)] items-center gap-3 rounded-[5px] bg-bleu-fonce/90 px-3.5 py-2.5 text-blanc backdrop-blur-[2px]"
                    >
                      <span className="text-[13px] leading-none tracking-[-0.02em] text-bleu-fluo">{String(i + 1).padStart(2, "0")}</span>
                      <span className="flex flex-col gap-1">
                        <span className="text-[17px] leading-none tracking-[-0.04em]">{p.title}</span>
                        <span className="text-[14px] leading-none tracking-[-0.02em] text-blanc/70">{p.place}</span>
                      </span>
                    </figcaption>
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
