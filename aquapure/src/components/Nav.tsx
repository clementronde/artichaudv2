"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import AnchorLink from "@/components/AnchorLink";
import { NAV_LINKS } from "@/lib/site";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

export default function Nav() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Entrée : les deux blocs descendent après le dévoilement du hero
        gsap.from("[data-nav-item]", { yPercent: -160, autoAlpha: 0, duration: 1.3, stagger: 0.1, delay: 0.9 });
        gsap.from("[data-nav-link]", { y: 12, autoAlpha: 0, duration: 0.9, stagger: 0.06, delay: 1.25 });
      });

      // Se masque en descendant, réapparaît en remontant
      const hide = gsap.to(ref.current, { yPercent: -150, duration: 0.6, ease: "power3.inOut", paused: true });
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (self.scroll() < 200 || self.direction === -1) hide.reverse();
          else hide.play();
        },
      });
      return () => {
        st.kill();
        mm.revert();
      };
    },
    { scope: ref },
  );

  const close = () => setOpen(false);

  return (
    <header ref={ref} className="fixed inset-x-0 top-0 z-50 pt-5 md:pt-[45px]">
      <nav aria-label="Navigation principale" className="container-site flex items-end justify-between">
        <div
          data-nav-item data-intro
          className="flex items-center gap-[26px] rounded-[5px] bg-bleu-fonce px-5 py-[22px] backdrop-blur-[2px] md:w-[407px]"
        >
          <AnchorLink href="#" aria-label="AquaPure — retour en haut" onClick={close} className="shrink-0">
            <Image src="/images/logo.svg" alt="AquaPure" width={128} height={26.766} priority />
          </AnchorLink>
          <ul className="hidden items-center gap-[26px] md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href} data-nav-link data-intro>
                <AnchorLink href={l.href} className="link-underline text-txt text-blanc">
                  {l.label}
                </AnchorLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-end gap-2">
          <AnchorLink
            data-nav-item data-intro
            href="#contact"
            className="group hidden h-[70px] w-[129px] items-center gap-2.5 overflow-hidden rounded-[5px] bg-bleu-fonce px-[23px] text-txt text-blanc md:flex"
          >
            <span className="relative block h-[8px] w-[15.5px] overflow-hidden">
              <Image
                src="/images/arrow-right.svg"
                alt=""
                width={15.5}
                height={7.364}
                className="absolute inset-0 transition-transform duration-500 ease-expo group-hover:translate-x-full"
              />
              <Image
                src="/images/arrow-right.svg"
                alt=""
                width={15.5}
                height={7.364}
                className="absolute inset-0 -translate-x-full transition-transform duration-500 ease-expo group-hover:translate-x-0"
              />
            </span>
            <span className="transition-transform duration-500 ease-expo group-hover:translate-x-1">Contact</span>
          </AnchorLink>

          {/* Mobile */}
          <button
            data-nav-item data-intro
            type="button"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
            className="flex h-[70px] w-[70px] flex-col items-center justify-center gap-1.5 rounded-[5px] bg-bleu-fonce md:hidden"
          >
            <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
            <span className={`h-px w-6 bg-bleu-fluo transition-transform duration-500 ease-expo ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-bleu-fluo transition-transform duration-500 ease-expo ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      <div
        id="menu-mobile"
        className={`container-site transition-[opacity,transform] duration-500 ease-expo md:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <ul className="mt-2 flex flex-col gap-5 rounded-[5px] bg-bleu-fonce p-6 text-[28px] leading-none tracking-[-0.06em] text-blanc">
          {[...NAV_LINKS, { label: "Contact", href: "#contact" }].map((l) => (
            <li key={l.href}>
              <AnchorLink href={l.href} onClick={close}>
                {l.label}
              </AnchorLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
