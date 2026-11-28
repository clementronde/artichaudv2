import Image from "next/image";
import { clsx } from "@/lib/clsx";

type Dish = {
  name: string;
  price: string;
  src: string;
  alt: string;
  /** Position et largeur dans le cadre Figma de 1512 px (en px), converties en unités de conteneur */
  x: number;
  y: number;
  w: 458 | 614;
  position?: string;
};

// Ordre de lecture (haut → bas) ; positions de la maquette en quinconce
const DISHES: Dish[] = [
  {
    name: "Le Roulé Beyti à la braise et éclats de pistache",
    price: "22€",
    src: "/images/plat-beyti.jpg",
    alt: "Roulé Beyti à la braise, sauce tomate, pistaches, frites et salade servis sur une planche",
    x: 837,
    y: 96,
    w: 458,
    position: "50% 100%",
  },
  {
    name: "Tataki de bœuf saisi à la flamme",
    price: "26€",
    src: "/images/plat-tataki.jpg",
    alt: "Tranche de tataki de bœuf saisi, ciboulette, tenue entre deux baguettes",
    x: 60,
    y: 607,
    w: 458,
    position: "50% 100%",
  },
  {
    name: "Poulpe entier grillé à la flamme et herbes du sud",
    price: "28€",
    src: "/images/plat-poulpe.jpg",
    alt: "Poulpe entier grillé à la flamme, roquette et citron, sur une table en bois",
    x: 678,
    y: 1128,
    w: 614,
  },
  {
    name: "Dentelle dorée, meringue craquante & caramel ambré",
    price: "16€",
    src: "/images/plat-dentelle.jpg",
    alt: "Dessert en dentelle dorée, meringue craquante et fleurs comestibles dans une assiette en grès",
    x: 220,
    y: 1915,
    w: 458,
  },
];

// 1 px de la maquette = 100cqw / 1512 (le conteneur fait 1512 px au maximum)
const u = (px: number) => `calc(100cqw * ${px} / 1512)`;

export default function Menu() {
  return (
    <section id="carte" className="w-full scroll-mt-10 bg-charbon text-cream">
      <div className="mx-auto max-w-site [container-type:inline-size]">
        <div className="relative px-5 pb-24 pt-20 md:px-10 lg:h-[calc(100cqw*2660/1512+120px)] lg:p-0">
          {/* Titre : à partir de 1024 px, il reste bloqué à l'écran pendant toute la section (sticky) et les cartes montent
              par-dessus. Le cadre absolu court de sa position Figma (y 96) jusqu'au bas de la dernière carte. */}
          <div className="lg:absolute lg:bottom-[calc(100cqw*186/1512)] lg:left-[calc(100cqw*60/1512)] lg:top-[calc(100cqw*96/1512)] lg:w-[calc(100cqw*614/1512)]">
            <div className="flex flex-col gap-4 lg:sticky lg:top-[120px]">
              <p className="label">Menu</p>
              <h2 data-split className="title-xl">
                Nos incontournables de la saison
              </h2>
            </div>
          </div>

          <ul className="mt-14 grid gap-x-6 gap-y-16 md:grid-cols-2 lg:mt-0 lg:block">
            {DISHES.map((d) => (
              <li
                key={d.name}
                className={clsx(
                  "dish lg:absolute",
                  d.w === 614 && "md:col-span-2 md:max-lg:mx-auto md:max-lg:w-[min(100%,614px)]",
                )}
                style={{ "--x": u(d.x), "--y": u(d.y), "--w": u(d.w) } as React.CSSProperties}
              >
                {/* data-rise : la carte monte petit à petit au fil du scroll, son cadre puis sa photo apparaissent de bas en haut */}
                <article data-rise className="group flex flex-col gap-[26px] bg-charbon">
                  {/* Cadre blanc fin (le « rectangle » de la maquette), posé AU-DESSUS de la photo pour être identique sur les quatre
                      côtés de chaque carte. À l'apparition, le cadre monte de bas en haut, suivi d'un aplat crème puis de la photo. */}
                  <div data-layer className={clsx("relative", d.w === 614 ? "aspect-[614/559]" : "aspect-[458/559]")}>
                    <div className="absolute inset-0 overflow-hidden">
                      <span data-layer-fill className="absolute inset-0 bg-cream" aria-hidden />
                      <div data-layer-img className="absolute inset-0 overflow-hidden">
                        <Image loading="eager"
                          src={d.src}
                          alt={d.alt}
                          fill
                          sizes={d.w === 614 ? "(min-width: 1024px) 41vw, (min-width: 768px) 614px, 100vw" : "(min-width: 1024px) 31vw, (min-width: 768px) 50vw, 100vw"}
                          className="object-cover transition-transform duration-[900ms] ease-expo group-hover:scale-[1.06]"
                          style={d.position ? { objectPosition: d.position } : undefined}
                        />
                      </div>
                    </div>
                    <span data-layer-frame className="hairline pointer-events-none absolute inset-0 z-10" aria-hidden />
                  </div>
                  <div className="flex flex-col items-start gap-4">
                    <div className="flex w-full items-start justify-between gap-6 font-mono text-[16px] font-normal uppercase leading-[26px]">
                      <h3 className="max-w-[303px]">{d.name}</h3>
                      <p className="shrink-0 whitespace-nowrap">
                        <span className="sr-only">Prix : </span>[{d.price}]
                      </p>
                    </div>
                    <a href="#carte" className="link-figma">
                      Voir le menu
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
