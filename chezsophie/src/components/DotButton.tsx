import type { ReactNode } from "react";
import AnchorLink from "@/components/AnchorLink";
import { clsx } from "@/lib/clsx";

const VARIANTS = {
  // Bouton du hero : fond blanc, pastille et texte verts
  vert: { box: "border-blanc bg-blanc text-vert", dot: "bg-vert", hover: "group-hover:text-blanc" },
  // Bouton de l'accroche : fond framboise, pastille et texte rose
  framboise: { box: "border-framboise bg-framboise text-rose", dot: "bg-rose", hover: "group-hover:text-framboise" },
} as const;

type Props = {
  href: string;
  children: ReactNode;
  variant: keyof typeof VARIANTS;
  className?: string;
  [key: `data-${string}`]: string | boolean | undefined;
};

/** Bouton à pastille : au survol, la pastille s'agrandit jusqu'à remplir le bouton. */
export default function DotButton({ href, children, variant, className, ...rest }: Props) {
  const v = VARIANTS[variant];
  return (
    <AnchorLink
      href={href}
      className={clsx(
        "group relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-[3px] border px-5 py-4 text-[20px] font-normal leading-[normal]",
        v.box,
        className,
      )}
      {...rest}
    >
      <span className="relative size-2.5 shrink-0" aria-hidden>
        <span
          className={clsx(
            "absolute inset-0 -z-10 rounded-full transition-transform duration-[900ms] ease-expo group-hover:scale-[40] group-focus-visible:scale-[40]",
            v.dot,
          )}
        />
      </span>
      <span className={clsx("relative whitespace-nowrap transition-colors duration-500", v.hover)}>{children}</span>
    </AnchorLink>
  );
}
