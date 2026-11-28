"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

const PHOTOS = [
  { src: "/images/salle-bougies.jpg", alt: "La salle de Fuego entre deux rideaux, bougies allumées au premier plan" },
  { src: "/images/salle-table.jpg", alt: "Table dressée près de la fenêtre, verres et sets de table illustrés" },
  { src: "/images/salle-banquettes.jpg", alt: "Banquettes et tables en bois de la salle principale" },
];

// Emplacements de la pile (Figma) : dessus, milieu, dessous. Les trois cartes partagent le même centre à 1 px près.
const SLOTS = [
  { x: 0, y: 0, rotation: 0, z: 3 },
  { x: 0.21, y: 0.47, rotation: -10.23, z: 2 },
  { x: 0.6, y: 0.26, rotation: 5.93, z: 1 },
];
const slotOf = (card: number, active: number) => (card - active + PHOTOS.length) % PHOTOS.length;
const pose = (s: (typeof SLOTS)[number]) => ({ x: s.x, y: s.y, rotation: s.rotation });
const pad = (n: number) => String(n).padStart(2, "0");

export default function Privatisation() {
  const ref = useRef<HTMLElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const busy = useRef(false);

  // Arrivée : les polaroïds tombent sur la table, celui du dessous d'abord
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const els = cards.current.filter(Boolean) as HTMLDivElement[];
        els.forEach((el, i) => gsap.set(el, pose(SLOTS[i])));
        gsap.from([...els].reverse(), {
          y: "-=180",
          rotation: (i) => (i % 2 ? -16 : 18),
          autoAlpha: 0,
          duration: 1.4,
          stagger: 0.16,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-polaroids]", start: "top 80%", once: true },
        });
      });
    },
    { scope: ref },
  );

  const go = useCallback(
    (dir: 1 | -1) => {
      if (busy.current) return;
      const next = (active + dir + PHOTOS.length) % PHOTOS.length;
      const els = cards.current.filter(Boolean) as HTMLDivElement[];
      const slot = (i: number) => SLOTS[slotOf(i, next)];
      setActive(next);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        els.forEach((el, i) => gsap.set(el, { ...pose(slot(i)), zIndex: slot(i).z }));
        return;
      }

      // Suivant : la photo du dessus sort de la pile en restant au-dessus, passe dessous, puis revient se glisser derrière.
      // Précédent : la photo du dessous sort de derrière la pile, passe au-dessus, puis se pose devant.
      busy.current = true;
      const mover = dir === 1 ? active : next;
      const card = els[mover];
      const w = card.offsetWidth;
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" }, onComplete: () => void (busy.current = false) });

      tl.set(card, { zIndex: dir === 1 ? 10 : 0 }, 0)
        .to(card, { x: dir * w * 0.82, y: -w * 0.12, rotation: dir * 10, duration: 0.65 }, 0)
        .set(card, { zIndex: dir === 1 ? 0 : 10 }, 0.65)
        .to(card, { ...pose(slot(mover)), duration: 0.85 }, 0.65)
        .set(card, { zIndex: slot(mover).z });

      // Les deux autres avancent (ou reculent) d'un cran pendant que la photo est sortie
      els.forEach((el, i) => {
        if (i === mover) return;
        tl.set(el, { zIndex: slot(i).z }, 0).to(el, { ...pose(slot(i)), duration: 0.8, ease: "expo.out" }, 0.4);
      });
    },
    [active],
  );

  return (
    <section ref={ref} id="privatisation" className="relative w-full scroll-mt-10 overflow-hidden bg-blue lg:h-[1147px]">
      <div className="container-site relative h-full pb-20 pt-20 lg:pb-0 lg:pt-[106px]">
        <div className="flex max-w-[925px] flex-col gap-8">
          <h2 data-split className="title-xl max-w-[771px]">
            Un cadre élégant pour tous vos moments de partage
          </h2>
          <div className="flex flex-col items-start gap-6">
            <p className="body-text">
              Que ce soit pour un dîner en tête-à-tête, un déjeuner d&apos;affaires ou une grande tablée entre amis, notre salle allie
              intimité et convivialité. Vous organisez un anniversaire ou un événement privé ? <em className="italic">Fuego</em>{" "}
              propose également des formules sur mesure pour vos repas de groupe.
            </p>
            <a href="#reserver" className="link-figma">
              Organiser un événement
            </a>
          </div>
        </div>

        {/* Pile de polaroïds : 459 × 539 à 1512 px, réduite en mobile */}
        <div
          data-polaroids
          className="relative mx-auto mt-16 h-[calc(539px*var(--s))] w-[calc(459px*var(--s))] [--s:0.68] sm:[--s:0.85] lg:absolute lg:left-[calc(50%-229.5px)] lg:top-[467px] xl:left-[calc(862.5/1512*100%-229.5px)] lg:mt-0 lg:[--s:1]"
          role="group"
          aria-roledescription="carrousel"
          aria-label="Photos de la salle"
        >
          {PHOTOS.map((p, i) => {
            const s = SLOTS[slotOf(i, 0)];
            return (
              <div
                key={p.src}
                ref={(el) => {
                  cards.current[i] = el;
                }}
                className="absolute inset-0 flex flex-col bg-cream will-change-transform pb-[calc(91px*var(--s))] pl-[calc(12px*var(--s))] pr-[calc(11px*var(--s))] pt-[calc(14px*var(--s))] [filter:drop-shadow(0px_4px_7.4px_rgba(0,0,0,0.16))]"
                style={{ transform: `translate(${s.x}px, ${s.y}px) rotate(${s.rotation}deg)`, zIndex: s.z }}
                aria-hidden={slotOf(i, active) !== 0}
              >
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 436px, 300px"
                    className="object-cover"
                    style={i === 0 ? { objectPosition: "50% 62%" } : undefined}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex items-center justify-center gap-[10px] lg:absolute lg:right-[60px] lg:top-[1002px] lg:mt-0">
          <button type="button" onClick={() => go(-1)} className="group size-[41px] transition-transform duration-500 ease-expo hover:-translate-x-1" aria-label="Photo précédente">
            <Image src="/images/fleche-carre.svg" alt="" width={41} height={41} className="block" />
          </button>
          <p className="font-mono text-[14px] font-normal uppercase leading-[28px] tabular-nums" aria-live="polite">
            <span className="sr-only">Photo </span>
            {pad(active + 1)}/{pad(PHOTOS.length)}
          </p>
          <button type="button" onClick={() => go(1)} className="group size-[41px] transition-transform duration-500 ease-expo hover:translate-x-1" aria-label="Photo suivante">
            <Image src="/images/fleche-carre.svg" alt="" width={41} height={41} className="block -scale-x-100" />
          </button>
        </div>
      </div>
    </section>
  );
}
