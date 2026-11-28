"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AnchorLink from "@/components/AnchorLink";
import { NAV_LINKS, RESERVE_HREF, SITE } from "@/lib/site";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { useLenis } from "@/components/motion/SmoothScroll";
import { clsx } from "@/lib/clsx";

/** Bouton « Réserver » : le fond crème monte et le texte défile verticalement au survol. */
function ReserveButton({ className }: { className?: string }) {
  return (
    <AnchorLink
      href={RESERVE_HREF}
      className={clsx(
        "group relative block overflow-hidden border border-cream px-4 py-3 text-[14px] font-light uppercase leading-[21px] text-cream xl:px-5 xl:text-[16px]",
        className,
      )}
    >
      <span className="absolute inset-0 origin-bottom scale-y-0 bg-cream transition-transform duration-500 ease-expo group-hover:scale-y-100 group-focus-visible:scale-y-100" aria-hidden />
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-expo group-hover:-translate-y-full group-focus-visible:-translate-y-full">
          Réserver
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full text-charbon transition-transform duration-500 ease-expo group-hover:translate-y-0 group-focus-visible:translate-y-0"
        >
          Réserver
        </span>
      </span>
    </AnchorLink>
  );
}

export default function Nav() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Entrée quand le rideau se lève (événement envoyé par le hero), au plus tard après 9 s.
        // Éléments passés directement : l'événement part d'une animation du hero, où un sélecteur texte serait cherché
        // dans la section du hero et ne trouverait rien.
        const logo = ref.current!.querySelectorAll("[data-nav-logo]");
        const links = ref.current!.querySelectorAll("[data-nav-link]");
        gsap.set([...logo, ...links], { autoAlpha: 0 });
        const enter = () => {
          gsap.fromTo(logo, { y: -24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, delay: 0.2 });
          gsap.fromTo(links, { y: -18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.06, delay: 0.3 });
        };
        const fallback = gsap.delayedCall(9, enter);
        const onReveal = () => {
          fallback.kill();
          enter();
        };
        window.addEventListener("fuego:revealed", onReveal, { once: true });
        return () => window.removeEventListener("fuego:revealed", onReveal);
      });

      // Après le hero : barre charbon compacte, masquée en descendant, réaffichée en remontant
      const header = ref.current!;
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          header.dataset.solid = String(y > window.innerHeight * 0.6);
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
        className="absolute inset-0 origin-top scale-y-0 bg-charbon/95 backdrop-blur-md transition-transform duration-700 ease-expo group-data-[solid=true]/nav:scale-y-100"
        aria-hidden
      />

      <nav
        aria-label="Navigation principale"
        className="relative mx-auto flex max-w-site items-start justify-between px-5 py-5 transition-[padding] duration-700 ease-expo group-data-[solid=true]/nav:py-[14px] md:px-10 xl:pb-5 xl:pl-[64px] xl:pr-[60px] xl:pt-[41px] group-data-[solid=true]/nav:xl:pb-[14px] group-data-[solid=true]/nav:xl:pt-[14px]"
      >
        <AnchorLink
          href="#"
          onClick={close}
          aria-label="Fuego — retour en haut"
          data-nav-logo
          data-intro
          className="relative z-10 block"
        >
          <Image src="/images/logo-nav.svg" alt="Fuego" width={148} height={85} priority className="h-[56px] w-auto transition-[height] duration-700 ease-expo md:h-[70px] xl:h-[85px] group-data-[solid=true]/nav:h-[44px] group-data-[solid=true]/nav:xl:h-[50px]" />
        </AnchorLink>

        <ul className="hidden items-center gap-5 lg:mt-[19px] lg:flex xl:gap-[34px] group-data-[solid=true]/nav:lg:mt-[2px]">
          {NAV_LINKS.map((l) => (
            <li key={l.href} data-nav-link data-intro>
              <AnchorLink href={l.href} className="link-underline text-[14px] font-light uppercase leading-[21px] text-cream xl:text-[16px]">
                {l.label}
              </AnchorLink>
            </li>
          ))}
          <li data-nav-link data-intro>
            <ReserveButton />
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
          className="relative z-10 flex size-12 flex-col items-center justify-center gap-[7px] border border-cream/80 lg:hidden"
        >
          <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
          <span className={clsx("h-px w-5 bg-cream transition-transform duration-500 ease-expo", open && "translate-y-1 rotate-45")} />
          <span className={clsx("h-px w-5 bg-cream transition-transform duration-500 ease-expo", open && "-translate-y-1 -rotate-45")} />
        </button>
      </nav>

      <div
        id="menu-mobile"
        className={clsx(
          "fixed inset-0 flex flex-col justify-end bg-burgundy px-5 pb-12 pt-28 transition-[clip-path] duration-[900ms] ease-expo md:px-10 lg:hidden",
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
        )}
      >
        <ul className="flex flex-col gap-3">
          {[...NAV_LINKS, { label: "Réserver", href: RESERVE_HREF }].map((l, i) => (
            <li key={l.href} className="overflow-hidden">
              <AnchorLink
                href={l.href}
                onClick={close}
                tabIndex={open ? 0 : -1}
                className={clsx(
                  "block font-serif text-[48px] uppercase leading-[1.1] text-cream transition-transform duration-[900ms] ease-expo",
                  open ? "translate-y-0" : "translate-y-full",
                )}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              >
                {l.label}
              </AnchorLink>
            </li>
          ))}
        </ul>
        <p className="mt-10 font-mono text-[14px] uppercase leading-[1.6] text-blue">
          {SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}
          <br />
          <a href={SITE.phoneHref} tabIndex={open ? 0 : -1}>
            {SITE.phoneDisplay}
          </a>
        </p>
      </div>
    </header>
  );
}
