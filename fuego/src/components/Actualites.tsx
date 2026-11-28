"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import ArrowPair from "@/components/ArrowPair";
import FiligraneDessine from "@/components/FiligraneDessine";

// Articles de la maquette : trois fois le même titre et aucune page derrière (à fournir par le client)
const POSTS = [
  { title: "Pourquoi privilégier une cuisine locale ?", src: "/images/cuisine-suspension.jpg", alt: "La cuisine ouverte de Fuego sous une suspension en cuivre" },
  { title: "Pourquoi privilégier une cuisine locale ?", src: "/images/actu-cocktail.jpg", alt: "Cocktail à l'ananas servi sur une table en bois" },
  { title: "Pourquoi privilégier une cuisine locale ?", src: "/images/plat-beyti.jpg", alt: "Roulé Beyti à la braise servi sur une planche en bois" },
];

/**
 * Carrousel en boucle : les flèches font glisser la bande d'une carte (303 px + 8 px de gouttière),
 * puis la carte sortie passe en bout de file. La bande est doublée (copies masquées aux lecteurs d'écran)
 * pour qu'aucun vide n'apparaisse pendant le glissement.
 */
export default function Actualites() {
  const track = useRef<HTMLUListElement>(null);
  const [offset, setOffset] = useState(0);
  const busy = useRef(false);
  const pendingX = useRef<number | null>(null);
  const touch = useRef<number | null>(null);

  const order = POSTS.map((_, i) => (i + offset) % POSTS.length);
  const items = [...order, ...order];

  // Après la rotation de la liste, on replace la bande sans transition
  useLayoutEffect(() => {
    if (pendingX.current === null || !track.current) return;
    const from = pendingX.current;
    pendingX.current = null;
    gsap.set(track.current, { x: from });
    if (from !== 0) {
      gsap.to(track.current, { x: 0, duration: 0.9, ease: "expo.inOut", onComplete: () => void (busy.current = false) });
    } else {
      busy.current = false;
    }
  }, [offset]);

  const step = () => {
    const first = track.current?.children[0] as HTMLElement | undefined;
    const gap = track.current ? parseFloat(getComputedStyle(track.current).columnGap) || 0 : 0;
    return (first?.offsetWidth ?? 303) + gap;
  };

  const go = (dir: 1 | -1) => {
    if (busy.current || !track.current) return;
    busy.current = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (dir === 1) {
      const done = () => {
        pendingX.current = 0;
        setOffset((o) => (o + 1) % POSTS.length);
      };
      if (reduced) done();
      else gsap.to(track.current, { x: -step(), duration: 0.9, ease: "expo.inOut", onComplete: done });
    } else {
      pendingX.current = reduced ? 0 : -step();
      setOffset((o) => (o - 1 + POSTS.length) % POSTS.length);
    }
  };

  return (
    <section id="actualites" className="relative w-full">
      {/* Second filigrane : déborde sur les horaires et le footer, au-dessus des sections */}
      {/* … dessiné trait par trait au scroll (data-draw) */}
      <div data-parallax="0.08" className="pointer-events-none absolute left-0 top-[-471.186px] z-10 w-[min(568px,80vw)] select-none">
        <FiligraneDessine className="block h-auto w-full" />
      </div>

      <div className="container-site grid gap-y-8 lg:grid-cols-[minmax(0,303fr)_minmax(0,164fr)_minmax(0,925fr)] lg:gap-y-[45px]">
        <p data-fade className="label lg:max-w-[303px] lg:pt-[11px]">Découvrez les dernières actualités</p>
        <h2 data-split className="title-xl max-w-[614px] lg:col-start-3">
          Suivez toutes les actualités de Fuego
        </h2>

        <div className="flex min-w-0 flex-col items-start gap-4 lg:col-start-3">
          <div data-fade data-delay="0.2">
            <ArrowPair onPrev={() => go(-1)} onNext={() => go(1)} label="Article" />
          </div>
          <div
            className="w-full overflow-hidden"
            onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touch.current === null) return;
              const dx = e.changedTouches[0].clientX - touch.current;
              touch.current = null;
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            }}
          >
            <ul ref={track} className="flex w-max gap-2 will-change-transform">
              {items.map((p, k) => {
                const post = POSTS[p];
                const clone = k >= POSTS.length;
                return (
                  <li key={`${p}-${clone ? "b" : "a"}`} className="w-[78vw] max-w-[303px] shrink-0 md:w-[303px]" aria-hidden={clone || undefined}>
                    <article className="group flex flex-col gap-4">
                      <a href="#actualites" tabIndex={clone ? -1 : undefined} className="block" aria-label={clone ? undefined : `${post.title} — lire l'article`}>
                        <div data-clip data-delay={(k % POSTS.length) * 0.1} className="relative aspect-[303/413] overflow-hidden">
                          <Image loading="eager"
                            src={post.src}
                            alt={clone ? "" : post.alt}
                            fill
                            sizes="(min-width: 768px) 303px, 78vw"
                            className="object-cover transition-transform duration-[900ms] ease-expo group-hover:scale-[1.06]"
                          />
                        </div>
                      </a>
                      <div data-fade data-delay={0.25 + (k % POSTS.length) * 0.1} className="flex flex-col items-start gap-4 font-mono text-[16px] font-normal uppercase leading-[26px]">
                        {clone ? <p>{post.title}</p> : <h3>{post.title}</h3>}
                        <a href="#actualites" tabIndex={clone ? -1 : undefined} className="link-figma">
                          Lire plus
                        </a>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
