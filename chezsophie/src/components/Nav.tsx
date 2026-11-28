"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AnchorLink from "@/components/AnchorLink";
import { NAV_LINKS } from "@/lib/site";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { useLenis } from "@/components/motion/SmoothScroll";
import { clsx } from "@/lib/clsx";

export default function Nav() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Entrée : logo puis liens, juste après le lever de rideau du hero
        gsap.fromTo("[data-nav-logo]", { y: -24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.3, delay: 1.55 });
        gsap.fromTo(
          "[data-nav-link]",
          { y: -18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.07, delay: 1.7 },
        );
      });

      // Après le hero : barre framboise compacte, masquée en descendant, réaffichée en remontant
      const header = ref.current!;
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          header.dataset.solid = String(y > window.innerHeight * 0.75);
          header.dataset.hidden = String(y > window.innerHeight && self.direction === 1);
        },
      });
      return () => {
        st.kill();
        mm.revert();
      };
    },
    { scope: ref },
  );

  // Menu mobile ouvert : on bloque le défilement de la page
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  const close = () => setOpen(false);

  return (
    <header
      ref={ref}
      data-solid="false"
      data-hidden="false"
      className="group/nav fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-expo data-[hidden=true]:-translate-y-full"
    >
      {/* Fond qui apparaît une fois le hero dépassé */}
      <div
        className="absolute inset-0 origin-top scale-y-0 bg-framboise/95 backdrop-blur-md transition-transform duration-700 ease-expo group-data-[solid=true]/nav:scale-y-100"
        aria-hidden
      />

      <nav
        aria-label="Navigation principale"
        className="relative mx-auto flex max-w-site items-start justify-between px-5 pb-5 pt-5 transition-[padding] duration-700 ease-expo md:px-10 xl:px-[60px] xl:pt-[61px] xl:pl-[61px] group-data-[solid=true]/nav:xl:pb-[18px] group-data-[solid=true]/nav:xl:pt-[18px]"
      >
        <AnchorLink
          href="#"
          onClick={close}
          aria-label="Chez Sophie — retour en haut"
          data-nav-logo
          data-intro
          className="relative z-10 block origin-top-left transition-transform duration-700 ease-expo group-data-[solid=true]/nav:scale-[0.72]"
        >
          <Image src="/images/logo.svg" alt="Chez Sophie" width={119} height={67} priority className="h-[50px] w-auto md:h-[67px]" />
        </AnchorLink>

        <ul className="hidden items-center gap-[34px] lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href} data-nav-link data-intro>
              <AnchorLink href={l.href} className="link-underline text-[20px] font-light leading-[normal] text-white">
                {l.label}
              </AnchorLink>
            </li>
          ))}
          <li data-nav-link data-intro>
            <AnchorLink
              href="#reserver"
              className="group relative block overflow-hidden rounded-[3px] border border-blanc px-5 py-3 text-[20px] font-light leading-[normal] text-white"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-blanc transition-transform duration-500 ease-expo group-hover:scale-y-100" aria-hidden />
              <span className="relative block overflow-hidden">
                <span className="block transition-transform duration-500 ease-expo group-hover:-translate-y-full">Réserver</span>
                <span aria-hidden className="absolute inset-0 block translate-y-full text-framboise transition-transform duration-500 ease-expo group-hover:translate-y-0">
                  Réserver
                </span>
              </span>
            </AnchorLink>
          </li>
        </ul>

        {/* Mobile */}
        <button
          type="button"
          data-nav-link
          data-intro
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 flex size-12 flex-col items-center justify-center gap-[7px] rounded-[3px] border border-blanc/70 lg:hidden"
        >
          <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
          <span className={clsx("h-px w-5 bg-blanc transition-transform duration-500 ease-expo", open && "translate-y-1 rotate-45")} />
          <span className={clsx("h-px w-5 bg-blanc transition-transform duration-500 ease-expo", open && "-translate-y-1 -rotate-45")} />
        </button>
      </nav>

      <div
        id="menu-mobile"
        className={clsx(
          "fixed inset-0 flex flex-col justify-end bg-framboise px-5 pb-12 pt-28 transition-[clip-path] duration-[900ms] ease-expo md:px-10 lg:hidden",
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
        )}
      >
        <ul className="flex flex-col gap-4">
          {[...NAV_LINKS, { label: "Réserver", href: "#reserver" }].map((l, i) => (
            <li key={l.href} className="overflow-hidden">
              <AnchorLink
                href={l.href}
                onClick={close}
                className={clsx(
                  "block font-serif text-[44px] font-extralight leading-[1.1] text-rose transition-transform duration-[900ms] ease-expo",
                  open ? "translate-y-0" : "translate-y-full",
                )}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              >
                {l.label}
              </AnchorLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
