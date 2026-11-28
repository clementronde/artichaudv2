"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP, MOTION_OK, unclipDescenders, SPLIT_OFFSET } from "@/lib/gsap";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        // Rideau seulement à la première visite de la session (classe posée dans le <head>, voir layout.tsx)
        const first = !document.documentElement.classList.contains("intro-vue");
        const c = first ? 0.75 : 0;

        // 1. Rideau bordeaux : le logo s'écrit de gauche à droite, puis le rideau se lève
        if (first) {
          tl.fromTo("[data-curtain-logo]", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power2.inOut" }, 0.1)
            .to("[data-curtain-logo]", { yPercent: -40, autoAlpha: 0, duration: 0.4, ease: "power3.in" }, 0.6)
            .to("[data-curtain]", { yPercent: -100, duration: 0.85, ease: "expo.inOut" }, 0.7)
            .set("[data-curtain]", { display: "none" });
          try {
            sessionStorage.setItem("fuego-intro", "1");
          } catch {}
        } else {
          tl.set("[data-curtain]", { display: "none" });
        }

        // 2. La photo du chef se dézoome lentement
        tl.fromTo("[data-hero-img]", { scale: 1.2 }, { scale: 1, duration: 2.4, ease: "expo.out" }, c)
          // 3. La salle se dévoile de bas en haut, puis le logo s'écrit par-dessus
          .set("[data-hero-room], [data-hero-logo]", { autoAlpha: 1 }, c + 0.15)
          .fromTo("[data-hero-room]", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, clearProps: "clipPath" }, c + 0.15)
          .fromTo("[data-hero-room] img", { scale: 1.2 }, { scale: 1, duration: 1.4 }, c + 0.15)
          .fromTo(
            "[data-hero-logo]",
            { clipPath: "inset(-10% 100% -10% 0%)" },
            { clipPath: "inset(-10% 0% -10% 0%)", duration: 1, ease: "power2.inOut", clearProps: "clipPath" },
            c + 0.4,
          );

        // 4. Accroche ligne par ligne
        const tagline = SplitText.create("[data-hero-tagline]", { type: "lines", mask: "lines" });
        unclipDescenders(tagline.masks);
        tl.set("[data-hero-tagline]", { autoAlpha: 1 }, c + 0.75).from(
          tagline.lines,
          { yPercent: SPLIT_OFFSET, duration: 1.1, stagger: 0.08, onComplete: () => tagline.revert() },
          c + 0.75,
        );

        // Au scroll : la photo du chef glisse plus lentement que la page
        gsap.to("[data-hero-media]", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });

        return () => tagline.revert();
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative flex w-full flex-col lg:h-[945px] lg:flex-row" aria-label="Accueil">
      {/* Moitié gauche : le chef en cuisine */}
      <div className="relative h-[62svh] min-h-[420px] w-full overflow-hidden bg-charbon lg:h-full lg:min-h-0 lg:w-1/2">
        <div data-hero-media className="absolute inset-0 will-change-transform">
          <div data-hero-img className="absolute inset-0 will-change-transform">
            <Image
              src="/images/hero-chef.jpg"
              alt="Le chef de Fuego dresse un homard grillé à la flamme"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/10" aria-hidden />
        </div>
      </div>

      {/* Moitié droite : la salle, le logo et l'accroche */}
      <div className="relative flex w-full flex-col items-center bg-burgundy px-5 pb-20 pt-16 [--k:0.72] sm:[--k:0.85] lg:block lg:h-full lg:w-1/2 lg:p-0 lg:[--k:1]">
        <div className="relative h-[calc(392px*var(--k))] w-[calc(303px*var(--k))] lg:absolute lg:left-[calc(50%+0.5px)] lg:top-[calc(50%+0.5px)] lg:-translate-x-1/2 lg:-translate-y-1/2">
          <div data-hero-room data-intro className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/salle-nuit.jpg"
              alt="La salle de Fuego le soir, lumières tamisées et bois sombre"
              fill
              priority
              sizes="(min-width: 1024px) 303px, 220px"
              className="object-cover"
            />
          </div>
          <h1 className="absolute left-[calc(50%-0.85px)] top-[calc(50%-0.4px)] flex h-[calc(275.194px*var(--k))] w-[calc(453.301px*var(--k))] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <span data-hero-logo data-intro className="block flex-none rotate-[-2.38deg]">
              <Image src="/images/logo.svg" alt="Fuego" width={443} height={257} priority className="h-[calc(257px*var(--k))] w-[calc(443px*var(--k))] max-w-none" />
            </span>
            <span className="sr-only"> — restaurant à la flamme et à la braise, Paris 11e</span>
          </h1>
        </div>

        <p
          data-hero-tagline
          data-intro
          className="mt-14 w-full max-w-[459px] text-center font-mono text-[15px] font-normal uppercase leading-[20px] text-cream md:text-[16px] md:leading-[21px] lg:absolute lg:left-[calc(50%+0.5px)] lg:top-[795px] lg:mt-0 lg:w-[459px] lg:-translate-x-1/2"
        >
          L&apos;alliance du bois, de la flamme et des produits de saison. Une adresse conviviale pour savourer l&apos;instant
          autour d&apos;une cuisine authentique.
        </p>
      </div>

      {/* Rideau d'ouverture (affiché uniquement avec JS, voir globals.css) */}
      <div data-curtain className="fixed inset-0 z-[60] hidden items-center justify-center bg-burgundy" aria-hidden>
        <Image data-curtain-logo src="/images/logo.svg" alt="" width={443} height={257} priority className="h-auto w-[260px] md:w-[340px]" />
      </div>
    </section>
  );
}
