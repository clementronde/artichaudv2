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
 *  - data-parallax-lg="0.1" idem, seulement à partir de 1024 px (cartes en quinconce)
 *  - data-scale-in         photo pleine largeur qui se dézoome jusqu'à son cadrage Figma quand la section atteint le haut
 *  - data-drift="-90"      glissement horizontal (px) au scroll, à partir de 768 px
 *  - data-grow             illustration qui « pousse » de gauche à droite au scroll (data-grow-right : de droite à gauche)
 *  - data-write          logo qui « s'écrit » de gauche à droite à son arrivée, en une fois (pas lié au scroll :
 *                          en bas de page, une animation scrubbée ne peut pas aller jusqu'au bout)
 *  - data-layer            image de carte qui apparaît de bas en haut comme un calque : le cadre blanc
 *                          (data-layer-frame) monte d'abord, un aplat crème (data-layer-fill) puis la photo (data-layer-img) le suivent
 *  - data-sway="2"         balancement continu (amplitude en degrés), comme dans la brise
 *  - data-pop              petite icône qui surgit
 *  - data-sticky-fade      décor d'un titre fixe qui s'efface en fin de section (grand écran)
 *  - data-stack            pile de cartes collantes : celles du dessous reculent quand la suivante arrive (grand écran)
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

      gsap.utils.toArray<HTMLElement>("[data-write]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(-10% 100% -10% 0%)" },
          {
            clipPath: "inset(-10% 0% -10% 0%)",
            duration: 1.8,
            ease: "power2.inOut",
            clearProps: "clipPath",
            scrollTrigger: { trigger: el, start: "top 95%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-layer]").forEach((el) => {
        const hidden = "inset(100% 0% 0% 0%)";
        const shown = "inset(0% 0% 0% 0%)";
        const layers = ["[data-layer-frame]", "[data-layer-fill]", "[data-layer-img]"].map((q) => el.querySelector(q));
        const tl = gsap.timeline({
          defaults: { ease: "expo.inOut", duration: 1.25 },
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
        layers.forEach((layer, i) => {
          if (layer) tl.fromTo(layer, { clipPath: hidden }, { clipPath: shown, clearProps: "clipPath" }, [0, 0.12, 0.34][i]);
        });
        // L'aplat crème ne sert qu'à l'animation : on le retire pour qu'aucun liseré ne subsiste autour de la photo
        if (layers[1]) tl.set(layers[1], { autoAlpha: 0 });
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

    // Pile de cartes (data-stack) : le titre fixe (data-stack-title) se libère en même temps que la pile.
    mm.add("(min-width: 1024px)", () => {
      const lists = gsap.utils.toArray<HTMLElement>("[data-stack]");
      const fit = () =>
        lists.forEach((list) => {
          const items = Array.from(list.children) as HTMLElement[];
          const title = list.closest("section")?.querySelector<HTMLElement>("[data-stack-title]");
          if (!title || items.length < 2) return;
          const first = parseFloat(getComputedStyle(items[0]).top);
          const last = items[items.length - 1];
          title.style.minHeight = `${parseFloat(getComputedStyle(last).top) - first + last.offsetHeight}px`;
        });
      fit();
      ScrollTrigger.addEventListener("refreshInit", fit);
      return () => {
        ScrollTrigger.removeEventListener("refreshInit", fit);
        lists.forEach((list) => list.closest("section")?.querySelector<HTMLElement>("[data-stack-title]")?.style.removeProperty("min-height"));
      };
    });

    // Les cartes du dessous reculent (réduites, assombries) à mesure que les suivantes viennent les recouvrir
    mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
      gsap.utils.toArray<HTMLElement>("[data-stack]").forEach((list) => {
        const items = Array.from(list.children) as HTMLElement[];
        const n = items.length;
        // Positions naturelles (hors collage) calculées à partir des hauteurs : les éléments collants faussent les mesures
        const offsets = () => {
          const gap = parseFloat(getComputedStyle(list).rowGap) || 0;
          let acc = 0;
          return items.map((it) => {
            const o = acc;
            acc += it.offsetHeight + gap;
            return o;
          });
        };
        const top = (el: HTMLElement) => parseFloat(getComputedStyle(el).top) || 0;
        items.slice(0, -1).forEach((item, i) => {
          const card = item.querySelector("[data-stack-card]");
          if (!card) return;
          gsap.fromTo(card, { scale: 1, filter: "brightness(1)" }, {
            scale: 1 - 0.04 * (n - 1 - i),
            filter: "brightness(0.8)",
            ease: "none",
            scrollTrigger: {
              trigger: list,
              // début : la carte suivante touche le bas de celle-ci ; fin : la dernière carte est posée
              start: () => `top ${top(item) + item.offsetHeight - offsets()[i + 1]}px`,
              end: () => `top ${top(items[n - 1]) - offsets()[n - 1]}px`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });
      });
    });

    // Branche qui accompagne un titre fixe (sticky) : elle s'efface avant de croiser la section suivante
    mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
      gsap.utils.toArray<HTMLElement>("[data-sticky-fade]").forEach((el) => {
        const section = el.closest("section");
        if (!section) return;
        gsap.to(el, {
          autoAlpha: 0,
          y: -30,
          ease: "power1.in",
          scrollTrigger: { trigger: section, start: "top -160px", end: "top -330px", scrub: true },
        });
      });
    });

    // Cartes en quinconce : vitesses différentes, cadrage exact quand la carte est au centre de l'écran
    mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
      gsap.utils.toArray<HTMLElement>("[data-parallax-lg]").forEach((el) => {
        const speed = Number(el.dataset.parallaxLg ?? 0.1);
        gsap.fromTo(
          el,
          { yPercent: -speed * 50 },
          {
            yPercent: speed * 50,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    mm.add(MOTION_OK, () => {
      gsap.utils.toArray<HTMLElement>("[data-scale-in]").forEach((el) => {
        const img = el.querySelector("img");
        if (!img) return;
        gsap.fromTo(
          img,
          { scale: 1.14 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top top", scrub: true } },
        );
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
