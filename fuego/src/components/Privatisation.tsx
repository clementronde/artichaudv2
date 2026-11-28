"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { gsap, Draggable, useGSAP, MOTION_OK } from "@/lib/gsap";

const PHOTOS = [
  { src: "/images/salle-bougies.jpg", alt: "La salle de Fuego entre deux rideaux, bougies allumées au premier plan" },
  { src: "/images/salle-table.jpg", alt: "Table dressée près de la fenêtre, verres et sets de table illustrés" },
  { src: "/images/salle-banquettes.jpg", alt: "Banquettes et tables en bois de la salle principale" },
];
const N = PHOTOS.length;

// Emplacements de la pile (Figma) : dessus, milieu, dessous. Les trois cartes partagent le même centre à 1 px près.
const SLOTS = [
  { x: 0, y: 0, rotation: 0, z: 3 },
  { x: 0.21, y: 0.47, rotation: -10.23, z: 2 },
  { x: 0.6, y: 0.26, rotation: 5.93, z: 1 },
];
const slotOf = (card: number, active: number) => (card - active + N) % N;
const pose = (s: (typeof SLOTS)[number]) => ({ x: s.x, y: s.y, rotation: s.rotation });
const pad = (n: number) => String(n).padStart(2, "0");
const isReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Privatisation() {
  const ref = useRef<HTMLElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const drags = useRef<Draggable[]>([]);
  const activeRef = useRef(0);
  const busy = useRef(false);
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const all = () => cards.current.filter(Boolean) as HTMLDivElement[];
  // Seule la photo du dessus se saisit ; aucune pendant un mélange
  const syncDrag = (top: number | null) => drags.current.forEach((d, i) => (i === top ? d.enable() : d.disable()));

  /**
   * Mélange de la pile. step = 1 : la photo du dessus est soulevée, lancée en arc sur le côté `side`, passe sous la pile
   * et se glisse derrière pendant que les deux autres avancent. step = -1 : la photo du dessous sort de derrière la pile,
   * passe au-dessus et se pose devant avec un léger rebond.
   */
  const shuffle = (step: 1 | -1, side: 1 | -1 = step) => {
    if (busy.current) return;
    const cur = activeRef.current;
    const next = (cur + step + N) % N;
    activeRef.current = next;
    setActive(next);
    setDir(step);
    const els = all();
    const slot = (i: number) => SLOTS[slotOf(i, next)];

    if (isReduced()) {
      els.forEach((el, i) => gsap.set(el, { ...pose(slot(i)), zIndex: slot(i).z, scale: 1, "--lift": 0 }));
      return;
    }

    busy.current = true;
    syncDrag(null);
    const mover = step === 1 ? cur : next;
    const card = els[mover];
    const w = card.offsetWidth;
    gsap.killTweensOf(card);
    const tl = gsap.timeline({
      onComplete: () => {
        busy.current = false;
        syncDrag(next);
      },
    });

    if (step === 1) {
      tl.set(card, { zIndex: 10 })
        // 1. on la soulève : elle grandit un peu, son ombre s'allonge
        .to(card, { scale: 1.045, "--lift": 1, rotation: `+=${side * -2}`, duration: 0.26, ease: "power2.out" })
        // 2. lancée en arc : elle sort vite sur le côté en remontant
        .to(card, { x: side * w * 0.98, rotation: side * 16, duration: 0.62, ease: "power3.out" }, ">-0.06")
        .to(card, { y: -w * 0.15, duration: 0.62, ease: "sine.out" }, "<")
        // 3. hors de la pile, elle passe dessous…
        .set(card, { zIndex: 0 })
        // 4. …et se glisse derrière en se reposant sur la table
        .to(card, { ...pose(slot(mover)), scale: 1, "--lift": 0, duration: 1, ease: "power3.inOut" });
      // Les deux autres avancent d'un cran, celle qui devient le dessus d'abord
      els.forEach((el, i) => {
        if (i === mover) return;
        const s = slot(i);
        tl.set(el, { zIndex: s.z }, 0).to(el, { ...pose(s), duration: 1.1, ease: "expo.out" }, 0.5 + 0.07 * slotOf(i, next));
      });
    } else {
      tl.set(card, { zIndex: 0 })
        // 1. elle sort de derrière la pile, déjà soulevée
        .to(card, { x: side * w * 0.98, y: -w * 0.15, rotation: side * 16, scale: 1.045, "--lift": 1, duration: 0.7, ease: "power3.out" })
        // 2. elle passe au-dessus…
        .set(card, { zIndex: 10 })
        // 3. …et se pose devant, avec un léger rebond
        .to(card, { ...pose(slot(mover)), duration: 0.95, ease: "back.out(1.25)" })
        .to(card, { scale: 1, "--lift": 0, duration: 0.55, ease: "power2.out" }, "-=0.4");
      els.forEach((el, i) => {
        if (i === mover) return;
        const s = slot(i);
        tl.set(el, { zIndex: s.z }, 0).to(el, { ...pose(s), duration: 1.1, ease: "expo.out" }, 0.3);
      });
    }
    tl.set(card, { zIndex: slot(mover).z });
  };
  // Les callbacks de Draggable sont créés une fois : ils passent par cette référence
  const shuffleRef = useRef(shuffle);
  shuffleRef.current = shuffle;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const els = all();
        els.forEach((el, i) => gsap.set(el, pose(SLOTS[i])));

        // Arrivée : les polaroïds tombent sur la table, celui du dessous d'abord
        gsap.from([...els].reverse(), {
          y: "-=180",
          rotation: (i) => (i % 2 ? -16 : 18),
          autoAlpha: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-polaroids]", start: "top bottom", once: true },
        });

        // La photo du dessus se saisit : on la jette d'un côté ou de l'autre pour l'envoyer derrière, ou on clique dessus
        drags.current = els.map((el) => {
          let samples: [number, number][] = [];
          return Draggable.create(el, {
            type: "x",
            zIndexBoost: false,
            minimumMovement: 4,
            cursor: "grab",
            activeCursor: "grabbing",
            onPress() {
              if (busy.current) return;
              samples = [];
              gsap.killTweensOf(el);
              gsap.to(el, { scale: 1.03, "--lift": 0.7, duration: 0.25, ease: "power2.out" });
            },
            onDrag() {
              gsap.set(el, { rotation: this.x / 22, y: -Math.abs(this.x) * 0.06 });
              samples.push([this.x, performance.now()]);
              if (samples.length > 6) samples.shift();
            },
            onRelease() {
              if (busy.current) return;
              const [a, b] = [samples[0], samples[samples.length - 1]];
              const v = a && b && b[1] > a[1] ? (b[0] - a[0]) / (b[1] - a[1]) : 0; // px / ms
              if (Math.abs(this.x) > el.offsetWidth * 0.22 || Math.abs(v) > 0.55) {
                shuffleRef.current(1, (Math.sign(this.x || v) || 1) as 1 | -1);
              } else {
                gsap.to(el, { ...pose(SLOTS[0]), scale: 1, "--lift": 0, duration: 0.9, ease: "elastic.out(1, 0.6)" });
              }
            },
            onClick() {
              shuffleRef.current(1, 1);
            },
          })[0];
        });
        syncDrag(activeRef.current);

        return () => {
          drags.current.forEach((d) => d.kill());
          drags.current = [];
        };
      });
    },
    { scope: ref },
  );

  // Au survol de la pile, la photo du dessus se soulève légèrement pour inviter à la prendre
  const hover = (on: boolean) => {
    if (busy.current || isReduced()) return;
    const top = cards.current[activeRef.current];
    if (!top || drags.current[activeRef.current]?.isPressed) return;
    gsap.to(top, {
      y: on ? -8 : SLOTS[0].y,
      rotation: on ? 1.4 : SLOTS[0].rotation,
      "--lift": on ? 0.45 : 0,
      duration: on ? 0.6 : 0.8,
      ease: on ? "power3.out" : "elastic.out(1, 0.7)",
    });
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") shuffle(1);
    else if (e.key === "ArrowLeft") shuffle(-1);
    else return;
    e.preventDefault();
  };

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
          tabIndex={0}
          onKeyDown={onKey}
          onPointerEnter={(e) => e.pointerType === "mouse" && hover(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && hover(false)}
          className="relative mx-auto mt-16 h-[calc(539px*var(--s))] w-[calc(459px*var(--s))] touch-pan-y select-none outline-offset-8 [--s:0.68] sm:[--s:0.85] lg:absolute lg:left-[calc(50%-229.5px)] lg:top-[467px] lg:mt-0 lg:[--s:1] xl:left-[calc(862.5/1512*100%-229.5px)]"
          role="group"
          aria-roledescription="carrousel"
          aria-label="Photos de la salle : glisser la photo du dessus, cliquer dessus ou utiliser les flèches du clavier"
        >
          {PHOTOS.map((p, i) => {
            const s = SLOTS[slotOf(i, 0)];
            return (
              <div
                key={p.src}
                ref={(el) => {
                  cards.current[i] = el;
                }}
                className="polaroid absolute inset-0 flex flex-col bg-cream will-change-transform pb-[calc(91px*var(--s))] pl-[calc(12px*var(--s))] pr-[calc(11px*var(--s))] pt-[calc(14px*var(--s))]"
                style={{ transform: `translate(${s.x}px, ${s.y}px) rotate(${s.rotation}deg)`, zIndex: s.z }}
                aria-hidden={slotOf(i, active) !== 0}
              >
                <div className="relative h-full w-full overflow-hidden">
                  <Image loading="eager"
                    src={p.src}
                    alt={p.alt}
                    fill
                    draggable={false}
                    sizes="(min-width: 1024px) 436px, 300px"
                    className="pointer-events-none object-cover"
                    style={i === 0 ? { objectPosition: "50% 62%" } : undefined}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex items-center justify-center gap-[10px] lg:absolute lg:right-[60px] lg:top-[1002px] lg:mt-0">
          <button type="button" onClick={() => shuffle(-1)} className="size-[41px] transition-transform duration-500 ease-expo hover:-translate-x-1" aria-label="Photo précédente">
            <Image loading="eager" src="/images/fleche-carre.svg" alt="" width={41} height={41} className="block" />
          </button>
          <p className="flex font-mono text-[14px] font-normal uppercase leading-[28px] tabular-nums" aria-live="polite">
            <span className="sr-only">Photo </span>
            {/* Le numéro défile verticalement, dans le sens du mélange */}
            <span className="relative block h-[28px] overflow-hidden">
              <span key={active} data-dir={dir} className="counter-roll block">
                {pad(active + 1)}
              </span>
            </span>
            /{pad(N)}
          </p>
          <button type="button" onClick={() => shuffle(1)} className="size-[41px] transition-transform duration-500 ease-expo hover:translate-x-1" aria-label="Photo suivante">
            <Image loading="eager" src="/images/fleche-carre.svg" alt="" width={41} height={41} className="block -scale-x-100" />
          </button>
        </div>
      </div>
    </section>
  );
}
