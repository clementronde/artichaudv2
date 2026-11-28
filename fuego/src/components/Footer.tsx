import Image from "next/image";
import AnchorLink from "@/components/AnchorLink";
import { NAV_LINKS, RESERVE_HREF, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="w-full px-3 pb-3 md:px-[30px] md:pb-[30px]">
      <div data-rise-card className="relative mx-auto max-w-[1452px] overflow-hidden bg-charbon px-5 pb-8 pt-14 font-mono text-[16px] font-normal uppercase leading-[21px] text-blue md:px-10 lg:h-[684px] lg:px-0 lg:py-[70px] xl:h-[740px] lg:text-[18px] lg:leading-[23px]">
        {/* Ligne 1 : accroche, navigation, réseaux (colonnes de la maquette : 60 · 459 · 163 · 303 · 8 · 303 · 156) */}
        <div data-stagger className="grid gap-10 md:grid-cols-2 lg:grid-cols-[minmax(0,60fr)_minmax(0,459fr)_minmax(0,163fr)_minmax(0,303fr)_minmax(0,8fr)_minmax(0,303fr)_minmax(0,156fr)] lg:gap-0">
          <p className="md:col-span-2 lg:col-span-1 lg:col-start-2">
            L&apos;alliance du bois, de la flamme et des produits de saison. Une adresse conviviale pour savourer l&apos;instant autour
            d&apos;une cuisine authentique.
          </p>
          <nav aria-label="Navigation du pied de page" className="flex flex-col gap-6 lg:col-start-4 lg:gap-10">
            <p>Navigation</p>
            <ul className="flex flex-col gap-3 lg:gap-5">
              {[...NAV_LINKS, { label: "Réserver", href: RESERVE_HREF }].map((l) => (
                <li key={l.href}>
                  <AnchorLink href={l.href} className="link-underline">
                    {l.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-6 lg:col-start-6 lg:gap-10">
            <p>Réseaux</p>
            <ul className="flex flex-col gap-3 lg:gap-5">
              <li>
                <a href={SITE.instagram} className="link-underline" aria-label="Fuego sur Instagram">
                  Instagram
                </a>
              </li>
              <li>
                <a href={SITE.facebook} className="link-underline" aria-label="Fuego sur Facebook">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Ligne 2 : contact et réservation (371 · 303 · 311 · 156 · 311) */}
        <div data-stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-[92px] lg:grid-cols-[minmax(0,371fr)_minmax(0,303fr)_minmax(0,311fr)_minmax(0,156fr)_minmax(0,311fr)] lg:gap-0">
          <p className="lg:col-start-2">Contact</p>
          <address className="flex flex-col gap-3 not-italic lg:gap-5">
            <p>
              {SITE.address.street} {SITE.address.postalCode} {SITE.address.city}
            </p>
            <a href={SITE.url} className="link-underline self-start">
              {SITE.urlDisplay}
            </a>
            <a href={SITE.phoneHref} className="link-underline self-start">
              {SITE.phoneDisplay}
            </a>
            <a href={`mailto:${SITE.email}`} className="link-underline self-start">
              {SITE.email}
            </a>
          </address>
          <AnchorLink href={RESERVE_HREF} className="link-figma self-start text-[16px] leading-[21px] lg:col-start-5 lg:text-[18px] lg:leading-[23px]">
            Réserver
          </AnchorLink>
        </div>

        {/* Logo bleu pivoté, en entier (retour client : la maquette le coupait par le bas de la carte) */}
        <div className="relative mt-10 h-[193px] md:h-[234px] lg:absolute lg:left-0 lg:top-[418px] lg:mt-0 lg:h-[275.194px] lg:w-[453.301px]">
          <div data-write className="absolute left-0 top-0 flex h-[275.194px] w-[453.301px] origin-top-left scale-[0.7] items-center justify-center md:scale-[0.85] lg:scale-[0.8] xl:scale-100">
            <Image loading="eager" src="/images/logo-bleu.svg" alt="" width={443} height={257} className="block max-w-none rotate-[-2.38deg]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
