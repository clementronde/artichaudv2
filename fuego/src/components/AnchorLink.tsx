"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { useLenis } from "@/components/motion/SmoothScroll";

/** Lien d'ancre interne qui passe par Lenis pour un défilement fluide. */
export default function AnchorLink({ href = "#", onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const lenis = useLenis();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (!lenis || !href.startsWith("#") || e.defaultPrevented) return;
    e.preventDefault();
    lenis.scrollTo(href === "#" ? 0 : href, { duration: 1.6, offset: href === "#contact" ? 0 : -40 });
    history.replaceState(null, "", href);
  };

  return <a href={href} onClick={handleClick} {...rest} />;
}
