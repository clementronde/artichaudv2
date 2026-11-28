"use client";

import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK, unclipDescenders, SPLIT_OFFSET } from "@/lib/gsap";

/**
 * Animations au scroll pilotées par attributs, pour garder les sections lisibles :
 *  - data-split            titre révélé ligne par ligne (masque)
 *  - data-words            texte qui se « colore » mot à mot au fil du scroll
 *  - data-fade             apparition en fondu + montée (data-delay optionnel)
 *  - data-stagger          les enfants directs apparaissent en cascade
 *  - data-clip             image dévoilée de bas en haut quand elle est entrée de 15 % dans l'écran (data-delay optionnel)
 *  - data-parallax="0.2"   décalage vertical proportionnel au scroll
 *  - data-parallax-lg="0.1" idem, seulement à partir de 1024 px (cartes en quinconce)
 *  - data-scale-in         photo pleine largeur qui se dézoome jusqu'à son cadrage Figma quand la section atteint le haut
 *  - data-drift="-90"      glissement horizontal (px) au scroll, à partir de 768 px
 *  - data-grow             illustration qui « pousse » de gauche à droite au scroll (data-grow-right : de droite à gauche)
 *  - data-write          logo qui « s'écrit » de gauche à droite à son arrivée, en une fois (pas lié au scroll :
 *                          en bas de page, une animation scrubbée ne peut pas aller jusqu'au bout)
 *  - data-rise             carte du menu qui monte petit à petit au scroll ; son data-layer apparaît de bas en haut comme
 *                          des calques : cadre blanc (data-layer-frame), aplat crème (data-layer-fill), photo (data-layer-img)
 *  - data-cards            cartes (enfants directs) qui montent en éventail
 *  - data-words-in         texte qui apparaît mot à mot, une fois
 *  - data-panel            panneau dévoilé de bas en haut, puis ses data-row, data-line (filets tracés) et data-item
 *  - data-draw             tracé SVG (filigrane) dessiné au scroll, puis rempli
 *  - data-rise-card        bloc qui monte à mesure qu'on arrive (footer)
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
      // Masques de dévoilement de bas en haut
      const hidden = "inset(100% 0% 0% 0%)";
      const shown = "inset(0% 0% 0% 0%)";

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
        // Démarre quand l'image est entrée de 15 % dans l'écran ; courbe rapide au début
        const img = el.querySelector("img");
        const tl = gsap.timeline({ delay: Number(el.dataset.delay ?? 0), scrollTrigger: { trigger: el, start: "top 85%", once: true } });
        tl.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.out", clearProps: "clipPath" },
        );
        if (img && el.offsetHeight > 200) tl.from(img, { scale: 1.15, duration: 1.3, ease: "expo.out" }, 0);
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

      // Cartes du menu (data-rise + data-layer) : au fil du scroll, la carte monte petit à petit ; son cadre blanc apparaît de
      // bas en haut, suivi d'un aplat crème puis de la photo, comme des calques. Lié au défilement (scrub), réversible.
      gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((card) => {
        const layer = card.querySelector<HTMLElement>("[data-layer]");
        const trigger = card.parentElement ?? card; // l'élément qui ne bouge pas
        const [frame, fill, img] = ["[data-layer-frame]", "[data-layer-fill]", "[data-layer-img]"].map((q) => layer?.querySelector(q));
        const tl = gsap.timeline({
          defaults: { ease: "power1.out" },
          scrollTrigger: { trigger, start: "top 92%", end: "top 38%", scrub: 0.8, invalidateOnRefresh: true },
        });
        tl.fromTo(
          card,
          { y: () => (window.innerWidth >= 1024 ? 180 : 80) },
          { y: 0, duration: 1, ease: "power2.out", modifiers: { y: (v: string) => `${Math.round(parseFloat(v))}px` } },
          0,
        );
        if (frame) tl.fromTo(frame, { clipPath: hidden }, { clipPath: shown, duration: 0.5 }, 0.02);
        if (fill) tl.fromTo(fill, { clipPath: hidden, autoAlpha: 1 }, { clipPath: shown, duration: 0.5 }, 0.14).set(fill, { autoAlpha: 0 }, 0.97);
        if (img) tl.fromTo(img, { clipPath: hidden }, { clipPath: shown, duration: 0.6 }, 0.3);
      });

      // Cartes d'avis : elles montent en éventail, l'une après l'autre
      gsap.utils.toArray<HTMLElement>("[data-cards]").forEach((list) => {
        gsap.from(list.children, {
          y: 110,
          rotation: (i: number) => (i - 1) * 3,
          autoAlpha: 0,
          duration: 1.3,
          stagger: 0.14,
          ease: "expo.out",
          scrollTrigger: { trigger: list, start: "top 85%", once: true },
        });
      });

      // Texte qui apparaît mot à mot, une fois (data-delay optionnel)
      gsap.utils.toArray<HTMLElement>("[data-words-in]").forEach((el) => {
        const split = SplitText.create(el, { type: "words" });
        gsap.from(split.words, {
          autoAlpha: 0,
          y: 10,
          duration: 0.7,
          stagger: 0.018,
          ease: "power2.out",
          delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onComplete: () => split.revert(),
        });
      });

      // Panneau des horaires : il se dévoile de bas en haut, puis ses lignes glissent, les filets se tracent, le reste monte
      gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel) => {
        gsap
          .timeline({ scrollTrigger: { trigger: panel, start: "top 78%", once: true } })
          .fromTo(panel, { clipPath: hidden }, { clipPath: shown, duration: 1.1, ease: "expo.inOut", clearProps: "clipPath" })
          .from(panel.querySelectorAll("[data-row]"), { x: -28, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: "expo.out" }, 0.55)
          .from(panel.querySelectorAll("[data-line]"), { scaleX: 0, duration: 0.9, stagger: 0.15, ease: "expo.inOut" }, 0.75)
          .from(panel.querySelectorAll("[data-item]"), { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.07, ease: "expo.out" }, 0.9);
      });

      // Filigrane dessiné : le contour du logo se trace au fil du scroll, puis le remplissage apparaît (réversible)
      gsap.utils.toArray<SVGPathElement>("[data-draw]").forEach((path) => {
        const len = Math.ceil(path.getTotalLength());
        const trigger = path.closest("section") ?? path;
        gsap.set(path, { attr: { stroke: "#4C020C", "stroke-width": 1.8 }, strokeOpacity: 0.42, strokeDasharray: len, strokeDashoffset: len, fillOpacity: 0 });
        gsap
          .timeline({ scrollTrigger: { trigger, start: "top 92%", end: "top 15%", scrub: 1 } })
          .to(path, { strokeDashoffset: 0, duration: 1, ease: "none" }, 0)
          .to(path, { fillOpacity: 0.04, duration: 0.25, ease: "power1.out" }, 0.82)
          .to(path, { strokeOpacity: 0, duration: 0.2, ease: "power1.in" }, 0.92);
      });

      // Carte du footer : elle monte à mesure qu'on arrive en bas de page
      gsap.utils.toArray<HTMLElement>("[data-rise-card]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 90 },
          { y: 0, ease: "power2.out", modifiers: { y: (v: string) => `${Math.round(parseFloat(v))}px` }, scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "top 55%", scrub: 0.6 } },
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
        // Décalage en pixels entiers : un déplacement fractionnaire floute les filets horizontaux des cadres
        gsap.fromTo(
          el,
          { y: () => (-speed * el.offsetHeight) / 2 },
          {
            y: () => (speed * el.offsetHeight) / 2,
            ease: "none",
            modifiers: { y: (v: string) => `${Math.round(parseFloat(v))}px` },
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
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
