"use client";

import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK, unclipDescenders, SPLIT_OFFSET } from "@/lib/gsap";

/**
 * Animations au scroll pilotées par attributs, pour garder les sections lisibles :
 *  - data-split            titre révélé ligne par ligne (masque)
 *  - data-words            texte qui se « colore » mot à mot au fil du scroll
 *  - data-fade             apparition en fondu + montée (data-delay optionnel)
 *  - data-stagger          les enfants directs apparaissent en cascade
 *  - data-clip             image dévoilée de bas en haut (clip-path), photo qui se dézoome
 *  - data-parallax="0.2"   décalage vertical proportionnel au scroll
 *  - data-drift="-90"      glissement horizontal (px) au scroll, à partir de 768 px
 *  - data-grow             illustration qui « pousse » de gauche à droite au scroll (data-grow-right : de droite à gauche)
 *  - data-sway="2"         balancement continu (amplitude en degrés), comme dans la brise
 *  - data-pop              petite icône qui surgit
 */
export default function ScrollAnimations() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const start = "top 85%";

      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            unclipDescenders(self.masks);
            return gsap.from(self.lines, {
              yPercent: SPLIT_OFFSET,
              duration: 1.4,
              stagger: 0.1,
              scrollTrigger: { trigger: el, start, once: true },
              // Une fois révélé, le titre redevient du texte normal : plus aucun masque ne peut le rogner.
              onComplete: () => self.revert(),
            });
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-words]").forEach((el) => {
        const split = SplitText.create(el, { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 48%", scrub: 0.6 },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          autoAlpha: 0,
          delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: { trigger: el, start, once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
        gsap.from(el.children, {
          y: 70,
          autoAlpha: 0,
          duration: 1.3,
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
        const img = el.querySelector("img");
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 90%", once: true } });
        tl.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut", clearProps: "clipPath" },
        );
        if (img && el.offsetHeight > 200) tl.from(img, { scale: 1.3, duration: 1.8, ease: "expo.out" }, "<0.15");
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax ?? 0.15);
        gsap.fromTo(
          el,
          { yPercent: -speed * 50 },
          {
            yPercent: speed * 50,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-grow], [data-grow-right]").forEach((el) => {
        const fromRight = el.hasAttribute("data-grow-right");
        gsap.fromTo(
          el,
          { clipPath: fromRight ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power1.out",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top 85%", end: "top 25%", scrub: 0.8 },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-sway]").forEach((el) => {
        const amp = Number(el.dataset.sway ?? 2);
        gsap.fromTo(
          el,
          { rotate: -amp },
          { rotate: amp, duration: 3.6 + amp * 0.4, ease: "sine.inOut", repeat: -1, yoyo: true },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-pop]").forEach((el) => {
        gsap.from(el, {
          scale: 0,
          rotate: -25,
          duration: 1.1,
          ease: "back.out(2.2)",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    });

    mm.add(`(min-width: 768px) and ${MOTION_OK}`, () => {
      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) => {
        const amount = Number(el.dataset.drift ?? -80);
        gsap.fromTo(
          el,
          { x: -amount / 2 },
          {
            x: amount / 2,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    // Recalcule les positions une fois images et polices chargées.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  });

  return null;
}
