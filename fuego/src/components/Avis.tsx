"use client";

import { useRef, useState } from "react";
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

  // Flèches : la carte active (foncée) passe à la suivante, et la bande défile jusqu'à elle en mobile
  const go = (dir: 1 | -1) => {
    const next = (active + dir + REVIEWS.length) % REVIEWS.length;
    setActive(next);
    const el = track.current?.children[next] as HTMLElement | undefined;
    if (el && track.current && track.current.scrollWidth > track.current.clientWidth) {
      track.current.scrollTo({ left: el.offsetLeft - track.current.offsetLeft, behavior: "smooth" });
    }
  };

  return (
    <section id="avis" className="w-full">
      <div className="container-site flex flex-col gap-10 lg:gap-[46px]">
        <div className="flex max-w-[614px] flex-col gap-4">
          <p className="label">Avis</p>
          <h2 data-split className="title-xl">
            Ce que nos convives disent de Fuego
          </h2>
        </div>

        <div className="flex flex-col items-end gap-4">
          <ArrowPair onPrev={() => go(-1)} onNext={() => go(1)} label="avis" />
          <ul
            ref={track}
            data-stagger
            className="scroll-strip -mx-5 flex w-[calc(100%+40px)] snap-x snap-mandatory scroll-px-5 items-start gap-[9px] overflow-x-auto px-5 md:-mx-10 md:w-[calc(100%+80px)] md:scroll-px-10 md:px-10 lg:mx-0 lg:grid lg:w-full lg:grid-cols-3 lg:overflow-visible lg:px-0"
          >
            {REVIEWS.map((r, i) => {
              const on = i === active;
              return (
                <li
                  key={r.name}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                  className={clsx(
                    "flex w-[85%] shrink-0 snap-start flex-col items-center gap-[35px] border border-charbon px-[44px] py-[51px] text-center transition-colors duration-500 ease-out-quart md:w-[60%] lg:w-auto",
                    on ? "bg-charbon text-blue" : "bg-transparent text-charbon",
                  )}
                >
                  <span className="relative block h-[12.6985px] w-[80px]" data-pop>
                    <Image loading="eager" src="/images/etoiles-charbon.svg" alt="" width={80} height={12.6985} className={clsx("absolute inset-0 transition-opacity duration-500", on && "opacity-0")} />
                    <Image loading="eager" src="/images/etoiles-bleu.svg" alt="" width={80} height={12.6985} className={clsx("absolute inset-0 transition-opacity duration-500", !on && "opacity-0")} />
                    <span className="sr-only">Note : 5 sur 5</span>
                  </span>
                  <blockquote className="w-full font-mono text-[16px] font-light leading-[26px]">{r.text}</blockquote>
                  <p className="font-serif text-[20px] font-normal uppercase leading-[26px]">{r.name}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
