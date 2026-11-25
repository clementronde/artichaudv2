"use client";

import { useRef } from "react";
import Image from "next/image";
import DotButton from "@/components/DotButton";
import { gsap, SplitText, useGSAP, MOTION_OK, unclipDescenders, SPLIT_OFFSET } from "@/lib/gsap";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        // 1. Rideau framboise : le logo apparaît, puis le rideau se lève sur la maison
        tl.fromTo("[data-curtain-logo]", { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.9 }, 0.1)
          .to("[data-curtain-logo]", { yPercent: -60, autoAlpha: 0, duration: 0.7, ease: "power3.in" }, 0.85)
          .to("[data-curtain]", { yPercent: -100, duration: 1.3, ease: "expo.inOut" }, 0.95)
          .set("[data-curtain]", { display: "none" })
          // 2. La photo se dézoome lentement, comme on entre dans le paysage
          .fromTo("[data-hero-img]", { scale: 1.28 }, { scale: 1, duration: 3.2, ease: "expo.out" }, 0.95)
          .fromTo("[data-hero-shade]", { autoAlpha: 0.6 }, { autoAlpha: 0, duration: 2.4, ease: "power2.out" }, 1.1);

        // 3. Titre ligne par ligne
        const title = SplitText.create("[data-hero-title]", { type: "lines", mask: "lines" });
        unclipDescenders(title.masks);
        tl.set("[data-hero-title]", { autoAlpha: 1 }, 1.45).from(
          title.lines,
          { yPercent: SPLIT_OFFSET, duration: 1.5, stagger: 0.12, onComplete: () => title.revert() },
          1.45,
        );

        // 4. Bouton et flèche
        tl.fromTo("[data-hero-cta]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2 }, 1.95).fromTo(
          "[data-hero-arrow]",
          { y: -16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.2 },
          2.15,
        );

        // La flèche invite à descendre, en boucle
        gsap.to("[data-hero-arrow-inner]", { y: 8, duration: 1.4, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 3.2 });

        // Au scroll : parallaxe de la photo, le texte s'efface en remontant
        gsap.to("[data-hero-media]", {
          yPercent: 22,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-content]", {
          yPercent: -40,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom 25%", scrub: true },
        });

        return () => title.revert();
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-framboise xl:min-h-[760px]">
      <div data-hero-media className="absolute inset-0 will-change-transform">
        <div data-hero-img className="absolute inset-0 will-change-transform">
          <Image
            src="/images/hero.jpg"
            alt="Le gîte Chez Sophie au coucher du soleil, entre les arbres"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50" aria-hidden />
        <div data-hero-shade className="absolute inset-0 bg-framboise opacity-0" aria-hidden />
      </div>

      <div data-hero-content className="relative mx-auto h-full max-w-site">
        <div className="absolute bottom-[110px] left-5 right-5 flex flex-col items-start gap-[35px] md:left-10 xl:bottom-[85px] xl:left-[61px] xl:right-auto xl:w-[771px]">
          <h1
            data-hero-title
            data-intro
            className="font-serif text-[clamp(2.1rem,1.475rem+2.667vw,3.875rem)] font-extralight leading-[0.9355] text-creme"
          >
            L&apos;art de vivre au grand air,
            <br />
            entre confort absolu
            <br />
            et nature sauvage.
          </h1>
          <DotButton href="#reserver" variant="vert" data-hero-cta data-intro>
            Je réserve
          </DotButton>
        </div>

        <span
          data-hero-arrow
          data-intro
          className="absolute bottom-[40px] left-1/2 flex h-[27px] w-[15px] -translate-x-1/2 items-center justify-center xl:bottom-[83px]"
          aria-hidden
        >
          <span data-hero-arrow-inner className="block">
            <Image src="/images/arrow-down.svg" alt="" width={28} height={14.7279} className="max-w-none rotate-90" />
          </span>
        </span>
      </div>

      {/* Rideau d'ouverture (affiché uniquement avec JS, voir globals.css) */}
      <div data-curtain className="fixed inset-0 z-[60] hidden items-center justify-center bg-framboise" aria-hidden>
        <Image data-curtain-logo src="/images/logo.svg" alt="" width={119} height={67} priority className="h-auto w-[180px] opacity-0" />
      </div>
    </section>
  );
}
