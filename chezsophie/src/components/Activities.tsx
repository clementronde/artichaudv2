import Image from "next/image";
import { clsx } from "@/lib/clsx";

const ACTIVITIES = [
  {
    title: "Randonnées & Nature",
    text: "Spacieuse et baignée de lumière, notre maison vous offre tout le confort nécessaire pour des vacances sereines. Elle dispose de 4 chambres élégantes",
    card: "bg-framboise",
    icon: "bg-rose",
    iconSrc: "/images/icon-alps-rose.svg",
    titleColor: "text-rose",
    textColor: "text-rose",
  },
  {
    title: "Marchés & Terroir",
    text: "Spacieuse et baignée de lumière, notre maison vous offre tout le confort nécessaire pour des vacances sereines. Elle dispose de 4 chambres élégantes",
    card: "bg-sapin",
    icon: "bg-jaune",
    iconSrc: "/images/icon-alps-jaune.svg",
    titleColor: "text-jaune",
    textColor: "text-jaune",
  },
  {
    title: "Patrimoine & Culture",
    text: "Spacieuse et baignée de lumière, notre maison vous offre tout le confort nécessaire pour des vacances sereines. Elle dispose de 4 chambres élégantes",
    card: "bg-bleu",
    icon: "bg-framboise",
    iconSrc: "/images/icon-alps-bleu.svg",
    titleColor: "text-black",
    textColor: "text-framboise",
  },
];

/** Les cartes se collent à 140 px du haut (alignées sur le titre fixe), chacune 24 px sous la précédente. */
const STACK_TOP = 140;
const STACK_STEP = 24;

export default function Activities() {
  return (
    <section id="activites" className="relative w-full [container-type:inline-size]">
      <div className="container-site relative flex flex-col gap-12 lg:flex-row lg:items-stretch lg:justify-between">
        {/* Colonne gauche : le titre reste fixe (sticky) pendant que les cartes s'empilent, la branche fleurie l'accompagne */}
        <div className="relative lg:w-[44.04%]">
          <div data-stack-title className="relative lg:sticky lg:top-[140px]">
            {/* Branche fleurie, calée sur le bord gauche de la page comme sur la maquette :
                elle « pousse » au scroll (data-grow) et se balance (data-sway) */}
            <div
              className="pointer-events-none absolute top-[-109px] hidden h-[718.555px] w-[847.309px] [--g:40px] lg:block xl:[--g:60px]"
              style={{ left: "calc(-57px - max(var(--g), (100cqw - 1512px) / 2 + var(--g)))" }}
              aria-hidden
            >
              <div data-grow data-sticky-fade className="h-full w-full">
                <div data-sway="2.2" className="flex h-full w-full items-center justify-center" style={{ transformOrigin: "0% 45%" }}>
                  <div className="flex-none -scale-y-100 rotate-[-62.9deg]">
                    <Image src="/images/fleur-activites.svg" alt="" width={433.671} height={729.884} className="block h-[729.884px] w-[433.671px] max-w-none" />
                  </div>
                </div>
              </div>
            </div>

            <h2
              data-split
              className="relative font-serif text-[clamp(2.125rem,1.729rem+1.69vw,3.25rem)] font-extralight leading-[1.1154] text-framboise"
            >
              Entre patrimoine, gastronomie
              <br />
              <em className="italic">&amp;</em> grand air
            </h2>
          </div>
        </div>

        {/* Pile de cartes : chaque carte se colle sous la précédente puis la suivante vient la recouvrir,
            les cartes du dessous reculent légèrement (data-stack, voir ScrollAnimations) */}
        <ul data-stack data-stagger className="flex w-full flex-col gap-[18px] lg:w-[44.04%]">
          {ACTIVITIES.map((a, i) => (
            <li
              key={a.title}
              className="lg:sticky"
              style={{
                top: STACK_TOP + i * STACK_STEP,
                // Marges qui s'annulent dans la mise en page mais font repartir toute la pile d'un bloc en fin de section
                marginBottom: (ACTIVITIES.length - 1 - i) * STACK_STEP,
                marginTop: i > 0 ? -(ACTIVITIES.length - i) * STACK_STEP : 0,
              }}
            >
              <div data-stack-card className="origin-top will-change-transform">
                <article
                  className={clsx(
                    "group flex flex-col items-start gap-[13px] rounded-[4px] p-[26px] transition-transform duration-700 ease-expo hover:-translate-y-1.5",
                    a.card,
                  )}
                >
                  <span className={clsx("relative block size-8 shrink-0 rounded-[3px] transition-transform duration-700 ease-expo group-hover:-rotate-6 group-hover:scale-110", a.icon)}>
                    <Image src={a.iconSrc} alt="" width={21} height={21} className="absolute left-[5px] top-[5px]" />
                  </span>
                  <h3 className={clsx("font-serif text-[28px] font-extralight leading-[1.5] lg:text-[32px] lg:leading-[58px]", a.titleColor)}>
                    {a.title}
                  </h3>
                  <p className={clsx("text-[18px] font-extralight leading-[30px]", a.textColor)}>{a.text}</p>
                </article>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
