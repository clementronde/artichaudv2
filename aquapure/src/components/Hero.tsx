"use client";

import { useRef } from "react";
import Image from "next/image";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        // 1. L'image se dévoile en « rideau » et se dézoome
        tl.fromTo(
          "[data-hero-media]",
          { clipPath: "inset(12% 8% 12% 8% round 12px)", autoAlpha: 1 },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1.6, ease: "expo.inOut" },
        ).fromTo("[data-hero-img]", { scale: 1.35 }, { scale: 1, duration: 2.4 }, "<");

        // 2. Titre ligne par ligne
        const title = SplitText.create("[data-hero-title]", { type: "lines", mask: "lines" });
        tl.set("[data-hero-title]", { autoAlpha: 1 }, 0.9).from(
          title.lines,
          { yPercent: 110, duration: 1.4, stagger: 0.12 },
          0.9,
        );

        // 3. Bouton téléphone + labels
        tl.fromTo("[data-hero-cta]", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2 }, 1.3)
          .from("[data-hero-cta-icon]", { scale: 0, rotate: -90, duration: 1, ease: "back.out(2)" }, 1.45)
          .fromTo(
            "[data-hero-badge]",
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.12 },
            1.5,
          )
          .from("[data-hero-divider]", { scaleY: 0, duration: 1 }, 1.6);

        // Au scroll : parallaxe de l'image et le contenu s'efface
        gsap.to("[data-hero-img]", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-content]", {
          yPercent: -35,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom 20%", scrub: true },
        });

        return () => title.revert();
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-bleu-fonce md:min-h-[720px]">
      <div data-hero-media data-intro className="absolute inset-0 overflow-hidden">
        <div data-hero-img className="absolute inset-0 will-change-transform">
          <Image
            src="/images/hero.jpg"
            alt="Plombier AquaPure réparant un lavabo dans une salle de bain"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[60%_center]"
          />
        </div>
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(1,41,44,0.55)_2.1%,rgba(3,136,146,0)_100%)] md:w-[67%] md:bg-[linear-gradient(90deg,rgba(1,41,44,0.35)_2.1%,rgba(3,136,146,0)_100%)]" />
      </div>

      <div data-hero-content className="container-site relative flex h-full flex-col justify-center">
        <div className="flex w-full max-w-[791px] flex-col items-start gap-[31px] md:-ml-0.5">
          <h1
            data-hero-title
            data-intro
            className="text-[clamp(2.4rem,1.2rem+3.2vw,3.75rem)] leading-none tracking-[-0.06em] text-blanc"
          >
            Votre plombier de confiance dans les Yvelines, disponible 7j/7.
          </h1>

          <a
            data-hero-cta
            data-intro
            href={PHONE_HREF}
            className="group relative flex h-[67px] items-center gap-[18px] overflow-hidden rounded-[5px] bg-bleu-fonce pl-[5px] pr-[30px] text-button text-blanc"
          >
            {/* Le carré cyan s'étire pour remplir le bouton au survol */}
            <span className="absolute inset-y-[5.5px] left-[5px] w-14 rounded-[3px] bg-bleu-fluo transition-[width] duration-700 ease-expo group-hover:w-[calc(100%-10px)]" />
            <span data-hero-cta-icon className="relative flex size-14 items-center justify-center">
              <Image
                src="/images/icon-call.svg"
                alt=""
                width={18}
                height={18}
                className="transition-transform duration-700 ease-expo group-hover:rotate-[15deg] group-hover:scale-110"
              />
            </span>
            <span className="relative whitespace-nowrap transition-colors duration-500 group-hover:text-bleu-fonce">
              <span className="sr-only">Appeler le </span>
              {PHONE_DISPLAY}
            </span>
          </a>
        </div>

        <div className="absolute bottom-8 right-5 flex items-center gap-4 md:bottom-[57px] md:right-[76px] md:gap-6">
          <div data-hero-badge data-intro className="relative h-[34px] w-[134px] md:h-12 md:w-[189px]">
            <Image src="/images/badge-rge.png" alt="Certifié RGE — Reconnu Garant de l'Environnement" fill sizes="189px" className="object-contain" />
          </div>
          <span data-hero-divider className="h-[34px] w-px origin-center bg-blanc md:h-[46px]" aria-hidden />
          <div data-hero-badge data-intro className="relative h-[66px] w-[113px] md:h-[93px] md:w-[159px]">
            <Image src="/images/badge-google.png" alt="Avis Google 5,0 sur 5" fill sizes="159px" className="object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}
