'use client'

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useHighlightReveal } from "@/hooks/useHighlightReveal";
import OfferForm from "@/components/offer/OfferForm";

const ASSETS = "/LP/restaurant";
// Ancre du formulaire : tous les CTA « commander mon site » y descendent
const FORM_ANCHOR = "commander";

// Formulaire de devis partagé avec les pages /offre, rattaché à l'offre site + identité en 7 jours
const FORM_PAGE = {
  slug: "restaurant",
  offerId: "site-pro",
  form: { secondField: { label: "Nom de votre restaurant", placeholder: "Le Petit Bistrot", key: "company" } },
} as const;

// --- DONNÉES ---

// Logos du bandeau : dimensions du cadre + recadrage de l'image, repris de la maquette
type Logo = { name: string; src: string; w: number; h: number; crop?: { width: string; height: string; left: string; top: string } };

const LOGOS: Logo[] = [
  { name: "Google", src: "logo-google.png", w: 122, h: 40, crop: { width: "130.61%", height: "397.93%", left: "-15.14%", top: "-148.7%" } },
  { name: "Claude", src: "logo-claude.png", w: 156, h: 34.667, crop: { width: "100%", height: "450%", left: "0", top: "-173%" } },
  { name: "Gemini", src: "logo-gemini.png", w: 154, h: 36, crop: { width: "100%", height: "433.73%", left: "0", top: "-165.06%" } },
  { name: "ChatGPT", src: "logo-chatgpt.png", w: 163, h: 40.713, crop: { width: "108.21%", height: "324.91%", left: "-3.47%", top: "-112.45%" } },
  { name: "Mistral", src: "logo-mistral.png", w: 160, h: 30.759, crop: { width: "174.47%", height: "571.43%", left: "-37.16%", top: "-236.13%" } },
  { name: "Bing", src: "logo-bing.svg", w: 98, h: 40 },
];

// Même grille que « À la une » sur la home : 2 tuiles / 1 pleine largeur
const REALISATIONS: { layout: "pair" | "full"; images: { src: string; alt: string }[] }[] = [
  {
    layout: "pair",
    images: [
      { src: "realisation-1.png", alt: "Site de restaurant affiché sur smartphone" },
      { src: "realisation-2.png", alt: "Site de restaurant affiché sur ordinateur portable" },
    ],
  },
  {
    layout: "full",
    images: [{ src: "realisation-3.png", alt: "Identité visuelle Yumdeal déclinée sur affiches et sacs" }],
  },
];

const APPROCHE = [
  {
    number: "01",
    title: "Design sur mesure pour la restauration",
    text: "Des articles qui répondent aux vraies questions de vos clients, avec chiffres, exemples et les mots-clés de votre quartier.",
    image: "approche-1.png",
  },
  {
    number: "01",
    title: "Design sur mesure pour la restauration",
    text: "Des articles qui répondent aux vraies questions de vos clients, avec chiffres, exemples et les mots-clés de votre quartier.",
    image: "approche-1.png",
  },
];

// Tickets des offres : décalage vertical et recadrage du papier, repris de la maquette
type Offre = { title?: string; items?: string[]; offset: number; h: number; crop: { height: string; top: string } };

const OFFRES: Offre[] = [
  {
    title: "Identité visuelle + Site",
    items: ["Lorem ipsum dolor", "Lorem ipsum dolor", "Lorem ipsum dolor", "Lorem ipsum dolor", "Lorem ipsum dolor", "Lorem ipsum dolor"],
    offset: 115,
    h: 481,
    crop: { height: "185.36%", top: "-30.68%" },
  },
  { offset: 6, h: 602, crop: { height: "148.1%", top: "-24.51%" } },
  { offset: 0, h: 602, crop: { height: "148.1%", top: "-24.51%" } },
];

// --- COMPOSANTS ---

const SectionHeading = ({ label, title, className = "" }: { label: string; title: string; className?: string }) => (
  <div className={`flex flex-col gap-[14px] max-w-[462px] ${className}`}>
    <p className="text-[16px]">{label}</p>
    <h2 className="text-[32px] md:text-[40px] leading-[1.2]">{title}</h2>
  </div>
);

const PillLink = ({ href, children, className }: { href: string; children: React.ReactNode; className: string }) => (
  <Link
    href={href}
    className={`inline-flex items-center rounded-full py-[18px] font-[family-name:var(--font-dm-sans)] text-[18px] leading-[1.44] whitespace-nowrap transition-opacity hover:opacity-80 ${className}`}
  >
    {children}
  </Link>
);

const LogoItem = ({ logo }: { logo: Logo }) => (
  <div className="relative shrink-0 overflow-hidden" style={{ width: logo.w, height: logo.h }}>
    {logo.crop ? (
      <Image
        src={`${ASSETS}/${logo.src}`}
        alt={logo.name}
        width={600}
        height={600}
        className="absolute max-w-none"
        style={logo.crop}
      />
    ) : (
      <Image src={`${ASSETS}/${logo.src}`} alt={logo.name} width={98} height={40} className="absolute inset-[0.12%_0.05%] block" />
    )}
  </div>
);

// --- PAGE ---

export default function RestaurantClient() {
  const realisationsRef = useRef<HTMLElement>(null);
  useHighlightReveal(realisationsRef);

  return (
    <main className="overflow-x-clip bg-white">

      {/* HERO */}
      <section className="relative min-h-[700px] md:h-[927px] bg-gradient-to-b from-[#30041b] to-[#f70046]">
        <div className="flex h-full min-h-[700px] items-center px-6 md:px-10 pb-24 md:pb-0">
          <div className="flex max-w-[786px] flex-col gap-[31px]">
            <h1 className="text-[44px] md:text-[70px] leading-[1.2] text-white">
              Le site de votre restaurant prêt en 7 jours
            </h1>
            <div className="flex flex-wrap items-center gap-[10px]">
              <PillLink href={`#${FORM_ANCHOR}`} className="border border-[rgba(39,38,38,0.2)] bg-[#30041b] px-[30px] text-[#f2f2f2]">
                Je commande mon site
              </PillLink>
            </div>
          </div>
        </div>

        {/* BANDEAU LOGOS (penché, à cheval sur la section suivante) */}
        <div className="absolute inset-x-0 bottom-[-62px] z-20 -rotate-[1.23deg] drop-shadow-[0px_4px_4.3px_rgba(0,0,0,0.12)]">
          <p className="mb-[30px] px-6 md:px-10 text-[22px] leading-[1.4] text-white">Votre site visible sur</p>
          <div className="-mx-6 flex h-[102px] items-center overflow-hidden bg-white">
            <motion.div
              className="flex shrink-0 items-center gap-[50px] pr-[50px]"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            >
              {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
                <LogoItem key={i} logo={logo} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* OBJECTIFS */}
      <section className="mt-[22px] grid grid-cols-1 md:grid-cols-2 md:h-[800px]">
        <div className="flex items-center bg-[#30041b] px-6 md:px-10 pt-32 pb-16 md:py-0">
          <SectionHeading label="Objectifs" title="Pourquoi créer un site internet pour un restaurant ?" className="max-w-[490px] gap-[11px] text-white" />
        </div>
        <div className="relative h-[500px] md:h-full">
          <Image src={`${ASSETS}/hero-objectifs.png`} alt="Terrasse de restaurant" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          <div className="absolute left-1/2 top-1/2 size-[260px] md:size-[345px] -translate-x-1/2 -translate-y-1/2">
            <Image src={`${ASSETS}/objectifs-incrust.png`} alt="Site de restaurant consulté sur ordinateur" fill sizes="345px" className="object-cover" />
          </div>
        </div>
      </section>

      {/* RÉALISATIONS */}
      <section ref={realisationsRef} className="flex flex-col gap-[50px] px-6 md:px-10 pt-24 md:pt-[144px] text-[#30041b]">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <SectionHeading label="Nos réalisations" title="Des sites internets à toutes les sauces" />
          <PillLink href={`#${FORM_ANCHOR}`} className="border border-[#30041b] bg-white px-[35px] text-[#30041b]">
            Commander mon site
          </PillLink>
        </div>
        <div className="flex flex-col gap-[5px]">
          {REALISATIONS.map((row, i) => (
            <div key={i} data-hl-row={row.layout} className={`grid gap-[5px] ${row.layout === "pair" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
              {row.images.map((img) => (
                <div
                  key={img.src}
                  data-hl-tile
                  className={`relative w-full overflow-hidden bg-gray-100 ${row.layout === "full" ? "aspect-[1432/676]" : "aspect-[713/500]"}`}
                >
                  {/* Le calque parallaxe déborde de 10% en haut et en bas */}
                  <div data-hl-parallax className="absolute inset-x-0 -top-[10%] h-[120%]">
                    <div data-hl-zoom className="relative h-full w-full">
                      <Image
                        src={`${ASSETS}/${img.src}`}
                        alt={img.alt}
                        fill
                        sizes={row.layout === "full" ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                        className={`object-cover ${row.layout === "full" ? "object-bottom" : ""}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* APPROCHE */}
      <section className="flex flex-col gap-[64px] pt-24 md:pt-[182px] text-[#30041b]">
        <SectionHeading label="Notre approche" title="Des sites internets à toutes les sauces" className="px-6 md:px-10" />
        <div className="flex gap-[24px] overflow-x-auto px-6 md:px-10 pb-2 [scrollbar-width:none]">
          {APPROCHE.map((card, i) => (
            <article
              key={i}
              className="relative flex shrink-0 flex-col gap-6 bg-[#30041b] p-[21px] text-white w-[85vw] md:block md:h-[578px] md:w-[948px] md:p-0"
            >
              <p className="text-[34px] leading-[1.2] md:absolute md:left-[21px] md:top-[18px]">{card.number}</p>
              <h3 className="text-[28px] md:text-[34px] leading-[1.2] md:absolute md:left-[21px] md:top-[81px] md:w-[365px]">{card.title}</h3>
              <p className="font-[family-name:var(--font-dm-sans)] text-[16px] leading-[1.2] md:absolute md:left-[21px] md:top-[185px] md:w-[365px]">{card.text}</p>
              <div className="relative h-[360px] md:absolute md:left-[484px] md:top-[18px] md:h-[542px] md:w-[451px]">
                <Image src={`${ASSETS}/${card.image}`} alt="Table dressée dans un restaurant" fill sizes="451px" className="object-cover" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* OFFRES */}
      <section className="relative mt-24 md:mt-[305px] md:h-[1023px] py-16 md:py-0">
        <Image src={`${ASSETS}/offres-fond.png`} alt="" fill sizes="100vw" className="object-cover" />
        <div className="relative flex flex-col md:flex-row items-center md:items-start justify-center gap-[23px] md:pt-[211px]">
          {OFFRES.map((offre, i) => (
            <div
              key={i}
              className="relative w-[368px] max-w-full shrink-0 overflow-hidden md:mt-[var(--offset)]"
              style={{ height: offre.h, ["--offset" as string]: `${offre.offset}px` }}
            >
              <Image
                src={`${ASSETS}/ticket.png`}
                alt=""
                width={4096}
                height={2731}
                sizes="1340px"
                className="absolute max-w-none"
                style={{ width: "362.48%", height: offre.crop.height, left: "-177.43%", top: offre.crop.top }}
              />
              {offre.title && (
                <div className="absolute inset-0 text-[#30041b]">
                  <h3 className="absolute left-[154.5px] top-[74px] -translate-x-1/2 whitespace-nowrap text-center text-[24px] leading-[1.2]">
                    {offre.title}
                  </h3>
                  <Image src={`${ASSETS}/ticket-ligne.svg`} alt="" width={340} height={1} className="absolute left-[14px] top-[141px]" />
                  <ul className="absolute left-[44px] top-[182px] flex w-[127px] flex-col gap-[12px] font-[family-name:var(--font-dm-sans)] text-[16px] font-light leading-[1.2]">
                    {offre.items?.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                  <Image src={`${ASSETS}/ticket-ligne.svg`} alt="" width={340} height={1} className="absolute left-[14px] top-[395px]" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="relative mt-10 flex items-center justify-center gap-[35px] md:absolute md:left-1/3 md:top-[807px] md:mt-0">
          <Image src={`${ASSETS}/menu-dot.svg`} alt="" width={18} height={18} />
          <p className="font-[family-name:var(--font-dm-sans)] text-[24px] leading-[1.2] text-white">Menu</p>
        </div>
      </section>

      {/* FORMULAIRE : cible de tous les CTA de la page */}
      <section id={FORM_ANCHOR} className="scroll-mt-24 bg-[#30041b] px-6 md:px-10 py-24 md:py-[140px] text-white">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-5">
          <div className="flex flex-col gap-6 md:col-span-4">
            <SectionHeading label="Commander" title="Le site de votre restaurant prêt en 7 jours" />
            <p className="max-w-[400px] font-[family-name:var(--font-dm-sans)] text-[16px] leading-[1.4] text-white/70">
              Parlez-nous de votre restaurant : on vous rappelle pour cadrer le projet. Le devis est gratuit.
            </p>
          </div>
          <div className="rounded-[16px] bg-white p-6 md:col-span-7 md:col-start-6 md:p-10">
            <OfferForm page={FORM_PAGE} />
          </div>
        </div>
      </section>
    </main>
  );
}
