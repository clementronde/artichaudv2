"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { clsx } from "@/lib/clsx";
import ArrowPair from "@/components/ArrowPair";

// Avis de la maquette (lorem ipsum) : à remplacer par de vrais avis clients (prénom, nom, date)
const REVIEWS = [
  {
    name: "Baptiste Olive",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercice.",
  },
  {
    name: "David Chirot",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercice ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercice ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    name: "Julie Blanchet",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercice ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

export default function Avis() {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLUListElement>(null);
  const section = useRef<HTMLElement>(null);
  const hovering = useRef(false);
  const [tick, setTick] = useState(0); // relance le minuteur après une action du visiteur

  const show = (next: number) => {
    setActive(next);
    const el = track.current?.children[next] as HTMLElement | undefined;
    if (el && track.current && track.current.scrollWidth > track.current.clientWidth) {
      track.current.scrollTo({ left: el.offsetLeft - track.current.offsetLeft, behavior: "smooth" });
    }
  };
  // Flèches : la carte active (foncée) passe à la suivante, et la bande défile jusqu'à elle en mobile
  const go = (dir: 1 | -1) => {
    show((active + dir + REVIEWS.length) % REVIEWS.length);
    setTick((t) => t + 1);
  };

  // Tant que la section est à l'écran, la carte active passe toute seule à la suivante (pause au survol)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !section.current) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.35 });
    io.observe(section.current);
    const id = window.setInterval(() => {
      if (visible && !hovering.current && document.visibilityState === "visible") setActive((a) => (a + 1) % REVIEWS.length);
    }, 4200);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, [tick]);

  return (
    <section ref={section} id="avis" className="w-full">
      <div className="container-site flex flex-col gap-10 lg:gap-[46px]">
        <div className="flex max-w-[614px] flex-col gap-4">
          <p data-fade className="label">
            Avis
          </p>
          <h2 data-split className="title-xl">
            Ce que nos convives disent de Fuego
          </h2>
        </div>

        <div className="flex flex-col items-end gap-4">
          <div data-fade data-delay="0.2">
            <ArrowPair onPrev={() => go(-1)} onNext={() => go(1)} label="avis" />
          </div>
          <ul
            ref={track}
            data-cards
            onPointerEnter={(e) => e.pointerType === "mouse" && (hovering.current = true)}
            onPointerLeave={() => (hovering.current = false)}
            className="scroll-strip -mx-5 flex w-[calc(100%+40px)] snap-x snap-mandatory scroll-px-5 items-start gap-[9px] overflow-x-auto px-5 md:-mx-10 md:w-[calc(100%+80px)] md:scroll-px-10 md:px-10 lg:mx-0 lg:grid lg:w-full lg:grid-cols-3 lg:overflow-visible lg:px-0"
          >
            {REVIEWS.map((r, i) => {
              const on = i === active;
              return (
                <li
                  key={r.name}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                  className={clsx(
                    "relative isolate flex w-[85%] shrink-0 snap-start flex-col items-center gap-[35px] overflow-hidden border border-charbon px-[44px] py-[51px] text-center transition-colors duration-700 ease-expo md:w-[60%] lg:w-auto",
                    on ? "text-blue" : "text-charbon",
                  )}
                >
                  {/* Fond de la carte active : un calque charbon qui monte de bas en haut et redescend quand elle cède la place */}
                  <span
                    aria-hidden
                    className={clsx(
                      "absolute inset-0 -z-10 bg-charbon transition-transform duration-700 ease-expo",
                      on ? "origin-bottom scale-y-100" : "origin-top scale-y-0",
                    )}
                  />
                  <span className="relative block h-[12.6985px] w-[80px]" data-pop>
                    <Image loading="eager" src="/images/etoiles-charbon.svg" alt="" width={80} height={12.6985} className={clsx("absolute inset-0 transition-opacity duration-500", on && "opacity-0")} />
                    <Image loading="eager" src="/images/etoiles-bleu.svg" alt="" width={80} height={12.6985} className={clsx("absolute inset-0 transition-opacity duration-500", !on && "opacity-0")} />
                    <span className="sr-only">Note : 5 sur 5</span>
                  </span>
                  <blockquote data-words-in data-delay={0.35 + i * 0.14} className="w-full font-mono text-[16px] font-light leading-[26px]">
                    {r.text}
                  </blockquote>
                  <p data-fade data-delay={0.6 + i * 0.14} className="font-serif text-[20px] font-normal uppercase leading-[26px]">
                    {r.name}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
