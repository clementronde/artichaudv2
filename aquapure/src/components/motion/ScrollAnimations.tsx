"use client";

import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK, unclipDescenders, SPLIT_OFFSET } from "@/lib/gsap";

/**
 * Animations au scroll pilotées par attributs, pour garder les sections lisibles :
 *  - data-split           titre révélé ligne par ligne (masque)
 *  - data-tag             étiquette cyan qui se déploie de gauche à droite
 *  - data-fade            apparition en fondu + montée (data-delay optionnel)
 *  - data-stagger         les enfants directs apparaissent en cascade
 *  - data-clip            image dévoilée par le bas (clip-path)
 *  - data-parallax="0.2"  décalage vertical proportionnel au scroll
 *  - data-drift="-12"     déplacement horizontal (xPercent) au scroll
 *  - data-rise            montée verticale « scrubbée » (wordmark du footer)
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
              duration: 1.3,
              stagger: 0.09,
              scrollTrigger: { trigger: el, start, once: true },
              // Une fois révélé, le titre redevient du texte normal : plus aucun masque ne peut le rogner.
              onComplete: () => self.revert(),
            });
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-tag]").forEach((el) => {
        const label = el.firstElementChild;
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start, once: true } });
        tl.fromTo(
          el,
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.inOut", clearProps: "clipPath" },
        );
        if (label) tl.from(label, { xPercent: -30, autoAlpha: 0, duration: 0.8 }, "-=0.45");
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
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
        const img = el.querySelector("img");
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        tl.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut", clearProps: "clipPath" },
        );
        if (img) tl.from(img, { scale: 1.3, duration: 1.8, ease: "expo.out" }, "<0.15");
      });

      // Réalisations : chaque photo monte depuis le bas de l'écran, l'une après l'autre,
      // en se redressant légèrement, pendant que l'image intérieure se dézoome.
      gsap.utils.toArray<HTMLElement>("[data-rise-seq]").forEach((list) => {
        const items = gsap.utils.toArray<HTMLElement>(list.querySelectorAll("[data-rise-item]"));
        const imgs = items.map((item) => item.querySelector("img")).filter(Boolean);
        const tl = gsap.timeline({ scrollTrigger: { trigger: list, start: "top 75%", once: true } });
        tl.fromTo(
          items,
          { y: () => window.innerHeight * 0.6, rotate: 4, autoAlpha: 0 },
          {
            y: 0,
            rotate: 0,
            autoAlpha: 1,
            duration: 1.6,
            ease: "expo.out",
            stagger: 0.28,
            clearProps: "transform,opacity,visibility",
          },
        ).fromTo(
          imgs,
          { scale: 1.25 },
          // clearProps rend la main au zoom CSS du survol
          { scale: 1, duration: 2, ease: "expo.out", stagger: 0.28, clearProps: "transform" },
          "<",
        );
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

      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) => {
        const amount = Number(el.dataset.drift ?? -10);
        gsap.fromTo(
          el,
          { xPercent: -amount / 2 },
          {
            xPercent: amount / 2,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((el) => {
        gsap.from(el, {
          yPercent: 45,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom bottom", scrub: true },
        });
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
