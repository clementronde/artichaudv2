"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { clsx } from "@/lib/clsx";

/* Les quatre premières photos reprennent la maquette (bande décalée de 250 px à gauche à 1512 px de large).
   Les suivantes ne servent qu'à prolonger la boucle du carrousel hors champ. */
const PHOTOS = [
  { src: "/images/galerie-1.jpg", alt: "Le gîte et ses pignons au coucher du soleil", w: 457 },
  { src: "/images/galerie-2.jpg", alt: "Portes-fenêtres ouvertes sur les collines et les vignes", w: 644, pos: "object-[50%_82%]" },
  { src: "/images/galerie-3.jpg", alt: "Chambre au lit cosy et tête de lit cannée", w: 457 },
  { src: "/images/ferme.jpg", alt: "Les moutons de la ferme voisine dans le pré", w: 457 },
  { src: "/images/exterieurs.jpg", alt: "Le jardin et les extérieurs du gîte", w: 644 },
  { src: "/images/blog-2.jpg", alt: "Forêt et collines aux couleurs d’automne", w: 457 },
  { src: "/images/blog-1.jpg", alt: "Literie haut de gamme et coussins en velours", w: 457, pos: "object-[50%_66%]" },
];

const GAP = 11;

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const track = ref.current!.querySelector<HTMLElement>("[data-track]")!;
        const set = track.querySelector<HTMLElement>("[data-set]")!;

        // Apparition : les photos se dévoilent de bas en haut, en cascade
        gsap.fromTo(
          "[data-photo]",
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "expo.inOut",
            stagger: 0.08,
            clearProps: "clipPath",
            scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
          },
        );
        gsap.from("[data-photo] img", {
          scale: 1.35,
          duration: 2,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        });

        // Boucle infinie : défile lentement, accélère avec la vitesse de scroll et suit son sens
        let x = 0;
        let dir = 1;
        let boost = 0;
        const wrap = () => -(set.offsetWidth + GAP);
        const st = ScrollTrigger.create({
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            dir = self.direction;
            boost = Math.min(Math.abs(self.getVelocity()) / 120, 14);
          },
        });
        const tick = (_t: number, dt: number) => {
          if (!st.isActive) return;
          const speed = 0.35 + boost;
          boost *= 0.92;
          x -= speed * dir * (dt / 16.67);
          const w = wrap();
          if (x <= w) x -= w;
          if (x > 0) x += w;
          gsap.set(track, { x });
        };
        gsap.ticker.add(tick);
        return () => gsap.ticker.remove(tick);
      });
    },
    { scope: ref },
  );

  const renderSet = (clone: boolean) => (
    <ul data-set={clone ? undefined : ""} className="flex shrink-0" style={{ gap: GAP }} aria-hidden={clone || undefined}>
      {PHOTOS.map((p) => (
        <li key={p.src} className="relative h-[300px] shrink-0 md:h-[448px]" style={{ aspectRatio: `${p.w} / 448` }}>
          <figure data-photo className="group relative h-full w-full overflow-hidden">
            <Image
              src={p.src}
              alt={clone ? "" : p.alt}
              fill
              sizes="(min-width: 768px) 644px, 70vw"
              className={clsx("object-cover transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.05]", p.pos)}
            />
          </figure>
        </li>
      ))}
    </ul>
  );

  return (
    <section id="galerie" ref={ref} aria-label="Galerie photos du gîte" className="relative w-full overflow-hidden">
      <div data-track className="relative left-[calc(50%-1006px)] flex w-max will-change-transform max-md:left-[-120px]" style={{ gap: GAP }}>
        {renderSet(false)}
        {renderSet(true)}
      </div>
    </section>
  );
}
