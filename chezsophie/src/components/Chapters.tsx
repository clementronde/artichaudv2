"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { clsx } from "@/lib/clsx";

type Chapter = {
  id: string;
  n: string;
  title: [string, string];
  bg: string;
  text: string;
  badge: string;
  img: string;
  alt: string;
  body: ReactNode;
  flower?: boolean;
};

/* Trois chapitres de la maquette : « La Maison » (page), « Les extérieurs » et « La ferme » (variantes). */
const CHAPTERS: Chapter[] = [
  {
    id: "la-maison",
    n: "01",
    title: ["La", "Maison"],
    bg: "bg-framboise",
    text: "text-rose",
    badge: "bg-rose text-framboise",
    img: "/images/maison.jpg",
    alt: "Portes-fenêtres en bois ouvertes sur la terrasse et les collines",
    flower: true,
    body: (
      <>
        <p>
          Spacieuse et baignée de lumière, notre maison vous offre tout le confort nécessaire pour des vacances sereines. Elle
          dispose de <strong className="font-semibold">4 chambres élégantes</strong>, chacune dotée de sa propre salle de bain
          pour préserver l&apos;intimité de chacun, dont une <strong className="font-medium">suite parentale avec terrasse</strong>{" "}
          privative.
        </p>
        <p>
          Côté vie, profitez d&apos;un vaste séjour chaleureux ouvert sur une cuisine entièrement équipée. À l&apos;extérieur, la
          vie s&apos;organise autour d&apos;un salon de jardin et d&apos;une{" "}
          <strong className="font-semibold">grande terrasse offrant une vue imprenable</strong> sur le jardin et les collines
          environnantes.
        </p>
      </>
    ),
  },
  {
    id: "les-exterieurs",
    n: "02",
    title: ["Les", "Extérieurs"],
    bg: "bg-marron",
    text: "text-bleu",
    badge: "bg-bleu text-marron",
    img: "/images/exterieurs.jpg",
    alt: "Le jardin du gîte, son coin détente et la terrasse",
    body: (
      <>
        <p>
          Parce que les vacances se vivent avant tout dehors, le jardin a été aménagé comme un véritable espace de détente et de
          partage.
        </p>
        <p>
          Profitez de la <strong className="font-bold">piscine</strong> et de ses <strong className="font-bold">transats</strong>{" "}
          pour vos après-midis farniente, avant de vous accorder une pause bien-être dans le{" "}
          <strong className="font-bold">jacuzzi</strong> face aux collines. Pour vos repas en plein air, la{" "}
          <strong className="font-bold">grande terrasse</strong> accueille un <strong className="font-bold">coin barbecue</strong>{" "}
          convivial où prolonger les soirées d&apos;été sous les étoiles.
        </p>
      </>
    ),
  },
  {
    id: "la-ferme",
    n: "03",
    title: ["La", "Ferme"],
    bg: "bg-sapin",
    text: "text-jaune",
    badge: "bg-jaune text-sapin",
    img: "/images/ferme.jpg",
    alt: "Le troupeau de moutons de la ferme voisine dans le pré",
    body: (
      <>
        <p>
          Pour une immersion totale au cœur de la vie rurale, profitez de votre séjour pour{" "}
          <strong className="font-bold">visiter la ferme de moutons</strong> située juste à côté du gîte.
        </p>
        <p>
          Petits et grands auront le plaisir d&apos;approcher le troupeau, d&apos;en apprendre davantage sur le métier
          d&apos;éleveur et de partager un moment simple et authentique au grand air. Une activité conviviale et dépaysante qui
          ravira toute la famille !
        </p>
      </>
    ),
  },
];

export default function Chapters() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // La fleur se balance doucement, comme dans la brise
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-chapter-flower]",
          { rotate: -3 },
          { rotate: 4, duration: 3.6, ease: "sine.inOut", repeat: -1, yoyo: true, transformOrigin: "50% 100%" },
        );
      });

      // Grand écran : la section reste épinglée et les chapitres s'empilent comme des cartes au fil du scroll
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const section = ref.current!;
        const chapters = gsap.utils.toArray<HTMLElement>("[data-chapter]");
        const texts = (ch: HTMLElement) => ch.querySelectorAll("[data-chapter-text] > *");

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${(chapters.length - 1) * window.innerHeight * 1.6}`,
            pin: true,
            // Le parent (<main>) est en flex : ScrollTrigger désactiverait l'espace réservé par défaut.
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Entrée du premier chapitre (avant l'épinglage, une seule fois)
        gsap.from(texts(chapters[0]), {
          y: 60,
          autoAlpha: 0,
          duration: 1.3,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 60%", once: true },
        });

        // Le premier chapitre reste lisible un moment une fois la section épinglée
        tl.to({}, { duration: 0.45 });
        chapters.slice(1).forEach((ch, i) => {
          const prev = chapters[i];
          const at = tl.duration();

          // Pile de cartes : le chapitre suivant glisse depuis le bas et vient se poser sur le précédent,
          // qui recule (se réduit, s'arrondit, s'assombrit) sous la nouvelle carte.
          tl.fromTo(
            ch,
            // y: 0 neutralise le translateY(100%) posé en CSS avant hydratation (GSAP le lirait en pixels)
            { y: 0, yPercent: 100, borderTopLeftRadius: 28, borderTopRightRadius: 28 },
            { y: 0, yPercent: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, duration: 1, ease: "power1.inOut" },
            at,
          )
            .to(prev, { scale: 0.88, borderRadius: 24, duration: 1, ease: "power1.inOut" }, at)
            .to(prev.querySelector("[data-chapter-shade]"), { opacity: 0.5, duration: 1 }, at)
            .fromTo(ch.querySelector("[data-chapter-img]"), { scale: 1.25, yPercent: -8 }, { scale: 1, yPercent: 0, duration: 1 }, at)
            .fromTo(
              texts(ch),
              { y: 80, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, stagger: 0.07, duration: 0.5, ease: "power3.out" },
              at + 0.55,
            )
            .to({}, { duration: 0.45 });
        });
      });

      // Mobile et tablette : les chapitres s'enchaînent verticalement, révélés à l'entrée
      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((ch) => {
          gsap.from(ch.querySelectorAll("[data-chapter-text] > *"), {
            y: 40,
            autoAlpha: 0,
            stagger: 0.08,
            scrollTrigger: { trigger: ch, start: "top 80%", once: true },
          });
          const media = ch.querySelector("[data-chapter-media]");
          gsap.fromTo(
            media,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.4,
              ease: "expo.inOut",
              clearProps: "clipPath",
              scrollTrigger: { trigger: media, start: "top 88%", once: true },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    // Enveloppe en bloc : l'espace réservé par l'épinglage (pin-spacer) s'y insère proprement
    <div className="w-full">
    <section id="maison" ref={ref} data-chapters aria-label="La maison, les extérieurs et la ferme" className="relative w-full overflow-hidden bg-creme">
      {CHAPTERS.map((c) => (
        <article
          key={c.id}
          id={c.id}
          data-chapter
          className="relative isolate grid w-full grid-cols-1 overflow-hidden lg:h-full lg:min-h-[720px] lg:origin-[50%_35%] lg:grid-cols-2 lg:shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.45)] lg:will-change-transform"
        >
          <div data-chapter-half className={clsx("relative flex items-center", c.bg)}>
            <div
              data-chapter-text
              className={clsx(
                "flex w-full flex-col items-start gap-[14px] px-5 py-20 md:px-10 lg:ml-[max(61px,calc(50vw-695px))] lg:w-[611px] lg:max-w-[calc(100%-95px)] lg:px-0 lg:py-16",
                c.text,
              )}
            >
              <span className={clsx("flex w-[35px] items-center justify-center rounded-[2px] text-[14px] font-medium leading-[30px]", c.badge)}>
                {c.n}
              </span>
              <h2 className="font-serif text-[clamp(2.375rem,2.111rem+1.127vw,3.125rem)] font-extralight leading-[1.16]">
                {c.title[0]} <em className="italic">{c.title[1]}</em>
              </h2>
              <div className="flex flex-col gap-[30px] text-[18px] font-extralight leading-[1.5] lg:text-[20px] lg:leading-[30px]">{c.body}</div>
            </div>
          </div>

          <div data-chapter-half className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-full">
            <div data-chapter-media className="absolute inset-0 overflow-hidden">
              <div data-chapter-img className="absolute inset-0 will-change-transform">
                <Image src={c.img} alt={c.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
            </div>
            {c.flower && (
              <div
                className="pointer-events-none absolute bottom-[-58px] left-[-103px] z-10 hidden h-[281px] w-[225px] lg:block"
                aria-hidden
              >
                <Image data-chapter-flower src="/images/fleur-rose.svg" alt="" width={225} height={281} className="h-full w-full" />
              </div>
            )}
          </div>

          {/* Voile qui assombrit la carte quand la suivante vient se poser dessus */}
          <div data-chapter-shade className="pointer-events-none absolute inset-0 z-30 hidden bg-black opacity-0 lg:block" aria-hidden />
        </article>
      ))}
    </section>
    </div>
  );
}
