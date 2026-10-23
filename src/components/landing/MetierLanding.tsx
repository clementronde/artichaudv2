'use client'

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useHighlightReveal } from "@/hooks/useHighlightReveal";
import { useStatsStack } from "@/hooks/useStatsStack";
import { useStepsProgress } from "@/hooks/useStepsProgress";
import { useHeroIntro } from "@/hooks/useHeroIntro";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useLocale } from "@/context/LocaleContext";
import OfferForm from "@/components/offer/OfferForm";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappHref } from "@/data/offerPages";
import { offers, type OfferId } from "@/data/offers";
import { trackEvent } from "@/lib/tracking";
import { trackAdsLead, trackAdsWhatsApp } from "@/lib/googleAds";
import type { Formule, MetierContent } from "./metiers";

// Landing métier (restaurant, artisan…) : la mise en page et les animations sont communes, le contenu vient de ./metiers

// Icônes et logos partagés par toutes les landings métier
const COMMON = "/LP/commun";
// Ancre du formulaire : tous les CTA « commander mon site » y descendent
const FORM_ANCHOR = "commander";

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
        src={`${COMMON}/${logo.src}`}
        alt={logo.name}
        width={600}
        height={600}
        className="absolute max-w-none"
        style={logo.crop}
      />
    ) : (
      <Image src={`${COMMON}/${logo.src}`} alt={logo.name} width={98} height={40} className="absolute inset-[0.12%_0.05%] block" />
    )}
  </div>
);

const BADGE_CLASS = "inline-flex items-center gap-[7px] rounded-[20px] border py-[4px] pl-[4px] pr-[16px] text-[15px] md:text-[17px] leading-[1.2] text-white whitespace-nowrap";
const BADGE_DOT_CLASS = "flex size-[30px] shrink-0 items-center justify-center rounded-full";

const Badge = ({ label, dot }: { label: string; dot: string }) => (
  <span data-hero-badge className={`${BADGE_CLASS} border-white bg-white/20`}>
    <span className={`${BADGE_DOT_CLASS} ${dot}`}>
      <Image src={`${COMMON}/icon-rocket-white.svg`} alt="" width={16} height={16} />
    </span>
    {label}
  </span>
);

// Menu réduit de la landing (le menu du site y est masqué) : le logo, sans lien, et le seul bouton qui compte.
// Logo et bouton centrés en haut de page ; le centrage passe par le flex car framer-motion occupe le transform
const LandingNav = () => (
  <motion.nav
    aria-label="Commander"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
    className="pointer-events-none fixed inset-x-0 top-6 z-[5000] flex items-center justify-center gap-2 px-6 [&>*]:pointer-events-auto"
  >
    <div className="relative size-[50px] shrink-0 overflow-hidden rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.2)] md:size-[52px]">
      <Image src="/logonavbar.png" alt="Artichaud Studio" fill sizes="52px" className="object-cover" />
    </div>
    <Link
      href={`#${FORM_ANCHOR}`}
      className="group inline-flex h-[50px] items-center gap-2 whitespace-nowrap rounded-full bg-[#f70046] px-5 text-[14px] font-medium text-white shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-colors duration-300 hover:bg-[#d4003c] md:h-[52px]"
    >
      <span className="transition-transform duration-300 group-hover:-translate-x-1">→</span>
      Commander mon site
    </Link>
  </motion.nav>
);

// Rappel de la formule à côté du formulaire : on peut encore en changer, ou n'en choisir aucune
const FormuleRecap = ({ formules, formule, onSelect }: { formules: Formule[]; formule: Formule | null; onSelect: (id: OfferId) => void }) => (
  <div className="flex flex-col gap-4">
    <p className="text-[16px] text-white/60">Votre formule</p>
    <div role="radiogroup" aria-label="Formule" className="flex flex-wrap gap-2">
      {formules.map((f) => {
        const active = f.offerId === formule?.offerId;
        return (
          <button
            key={f.offerId}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(f.offerId)}
            className={`rounded-full border px-4 py-2 text-[15px] transition-colors duration-300 ${active ? "border-white bg-white text-[#30041b]" : "border-white/40 text-white hover:border-white"}`}
          >
            {f.name}
          </button>
        );
      })}
    </div>
    <AnimatePresence mode="wait" initial={false}>
      {formule ? (
        <motion.div
          key={formule.offerId}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
          className="flex flex-col gap-5 rounded-[16px] border border-white/20 bg-white/[0.06] p-6"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="text-[26px] font-medium">{formule.name}</p>
            <p className="text-[32px] font-medium text-[#f70046]">{formule.price}</p>
          </div>
          <p className="text-[16px] leading-[1.4] text-white/60">{formule.text}</p>
          <ul className="flex flex-col gap-2 text-[16px]">
            {formule.items.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden className="h-px w-3 bg-[#f70046]" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ) : (
        <motion.p
          key="aucune"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="max-w-[400px] text-[16px] leading-[1.4] text-white/60"
        >
          Pas encore décidé ? Choisissez une formule, ou décrivez simplement votre projet.
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

// Coupe un avis à `max` caractères sans couper un mot (même règle que les avis de la home)
function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,.;:!?]+$/, "") + "…";
}

const Avis = ({ title }: { title: [string, string] }) => {
  const { t } = useLocale();
  const items = t.testimonials.items;
  // Les avis plus longs que le premier sont repliés à sa longueur
  const maxLength = items[0].text.length;
  const [expanded, setExpanded] = useState<number[]>([]);
  const toggle = (id: number) => setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <section data-reveal-group className="flex flex-col gap-12 md:gap-20 px-6 md:px-10 text-[#30041b]">
      <div data-reveal="up" className="flex flex-col md:flex-row items-start gap-4 md:gap-[97px]">
        <p className="text-[16px] md:pt-[15px]">Témoignages</p>
        <h2 className="text-[36px] md:text-[45px] leading-[1.4]">
          {title[0]}
          <br />
          {title[1]}
        </h2>
      </div>
      {/* Un avis par moitié de page, séparés par un filet */}
      <div className="grid grid-cols-1 gap-12 leading-[1.4] md:grid-cols-2 md:gap-[20px]">
        {items.map((item) => {
          const isLong = item.text.length > maxLength;
          const isExpanded = expanded.includes(item.id);
          return (
            <figure key={item.id} data-reveal="up" className="flex flex-col justify-between gap-8 md:gap-12 border-[#30041b] md:pr-[20px] md:[&:not(:last-child)]:border-r-[0.5px]">
              <div className="flex flex-col gap-4">
                <div className="flex gap-0.5" role="img" aria-label="Note : 5 sur 5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} aria-hidden data-reveal="pop" className="size-[18px] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <div className="flex items-start justify-between gap-6">
                  <blockquote className="max-w-[593px] text-[18px] md:text-[22px] whitespace-pre-line">
                    {isLong && !isExpanded ? truncate(item.text, maxLength) : item.text}
                    {isLong && (
                      <button
                        type="button"
                        onClick={() => toggle(item.id)}
                        aria-expanded={isExpanded}
                        className="mt-4 block text-[16px] underline underline-offset-4 decoration-[#30041b]/30 transition-colors hover:decoration-[#30041b]"
                      >
                        {isExpanded ? t.testimonials.seeLess : t.testimonials.seeMore}
                      </button>
                    )}
                  </blockquote>
                  <span aria-hidden className="text-[60px] font-extrabold leading-[1]">”</span>
                </div>
              </div>
              <figcaption className="flex flex-col gap-[4px]">
                <span className="text-[22px]">{item.name}</span>
                <span className="text-[16px]">{item.role}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
};

// --- PAGE ---

export default function MetierLanding({ content }: { content: MetierContent }) {
  const { assets, hero, badges, stats, realisations, specialites, formules, etapes, commander } = content;
  const whatsappLink = whatsappHref(content.whatsappLabel);

  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const realisationsRef = useRef<HTMLElement>(null);
  const etapesRef = useRef<HTMLElement>(null);
  // Formule choisie dans la section Formules, rappelée à côté du formulaire et transmise avec la demande
  const [formuleId, setFormuleId] = useState<OfferId | null>(null);
  const formule = formules.items.find((f) => f.offerId === formuleId) ?? null;
  // Choix d'une formule (carte ou rappel du formulaire) : signal intermédiaire envoyé à GTM avec la valeur de l'offre
  const selectFormule = (id: OfferId, source: "carte" | "rappel") => {
    setFormuleId(id);
    trackEvent("select_formule", { offer: id, source, value: offers[id].value, currency: "EUR", page_path: window.location.pathname });
  };
  useHeroIntro(heroRef);
  useStatsStack(statsRef);
  useHighlightReveal(realisationsRef);
  useStepsProgress(etapesRef);
  useRevealOnScroll(mainRef);

  return (
    <main ref={mainRef} className="overflow-x-clip bg-white">
      <LandingNav />

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[760px] md:h-[927px] bg-[#30041b]">
        {/* Photo à droite (plein fond sur mobile), fondue dans le bordeaux ; plus haute que son cadre pour la parallaxe */}
        <div data-hero-photo className="absolute inset-0 overflow-hidden md:left-[46.1%]">
          <div data-hero-zoom className="absolute inset-x-0 -top-[12%] h-[124%]">
            <Image src={`${assets}/${hero.image}`} alt={hero.alt} fill priority sizes="(min-width: 768px) 54vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#30041b] via-[#30041b]/80 to-[#30041b]/40 md:bg-gradient-to-r md:from-[#30041b] md:via-transparent md:to-transparent" />
          {/* Rideau du dévoilement (desktop), déborde à droite de la largeur de son dégradé */}
          <div data-hero-cover aria-hidden className="absolute inset-y-0 left-0 hidden w-[calc(100%+200px)] opacity-0 md:flex">
            <div className="flex-1 bg-[#30041b]" />
            <div className="w-[200px] bg-gradient-to-r from-[#30041b] to-transparent" />
          </div>
        </div>

        <div data-hero-content className="relative flex h-full min-h-[760px] flex-col justify-center gap-12 px-6 pb-56 pt-32 md:min-h-0 md:px-10 md:py-0">
          <div className="flex max-w-[725px] flex-col gap-[31px]">
            {/* Chaque mot glisse hors de son masque à l'arrivée */}
            <h1 className="text-[44px] md:text-[65px] leading-[1.2] text-white" aria-label={hero.title}>
              {hero.title.split(" ").map((word, i) => (
                <span key={i} aria-hidden="true">
                  <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                    <span data-hero-word className="inline-block origin-bottom-left">{word}</span>
                  </span>{" "}
                </span>
              ))}
            </h1>
            <div data-hero-fade className="flex flex-wrap items-center gap-[10px]">
              <PillLink href={`#${FORM_ANCHOR}`} className="bg-white px-[30px] text-[#30041b]">
                Je commande mon site
              </PillLink>
            </div>
          </div>

          {/* VIGNETTES : celle du message ouvre une conversation WhatsApp */}
          <div className="flex flex-col items-start gap-[10px] md:absolute md:left-[51.3%] md:top-[628px]">
            <div className="flex flex-wrap gap-[8px]">
              {badges[0].map((badge) => <Badge key={badge.label} {...badge} />)}
            </div>
            <div className="flex flex-wrap gap-[8px]">
              <span data-hero-badge className="inline-flex">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackAdsWhatsApp}
                  className={`${BADGE_CLASS} border-[#0bd330] bg-[#0bd330] transition-[filter,transform] duration-300 hover:-translate-y-0.5 hover:brightness-110`}
                >
                  <span data-hero-ring className={`${BADGE_DOT_CLASS} relative bg-white text-[#0bd330]`}>
                    <span data-hero-ring-wave aria-hidden className="absolute inset-0 rounded-full border-2 border-white opacity-0" />
                    <WhatsAppIcon className="size-[16px]" />
                  </span>
                  Envoyez-nous un message
                </a>
              </span>
              {badges[1].map((badge) => <Badge key={badge.label} {...badge} />)}
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

      <div className="flex flex-col gap-24 pt-32 md:gap-[150px] md:pt-[183px]">

        {/* CHIFFRES CLÉS : les cartes s'empilent au scroll, liste simple sans animation */}
        <section ref={statsRef} className="group relative text-[#30041b] data-[stack=on]:h-[calc(100svh+1900px)]">
          <div className="flex flex-col gap-[75px] px-6 md:px-10 group-data-[stack=on]:sticky group-data-[stack=on]:top-0 group-data-[stack=on]:h-svh group-data-[stack=on]:justify-center group-data-[stack=on]:gap-[50px]">
            <div className="relative">
              <p className="mb-4 text-[16px] md:absolute md:left-0 md:top-[20px] md:mb-0">Le constat</p>
              <p className="max-w-[1423px] text-[28px] md:text-[45px] leading-[1.4] md:indent-[362px]">
                {content.constat.split(" ").map((word, i) => (
                  <span key={i} data-stack-word>{word} </span>
                ))}
              </p>
            </div>
            <div className="flex flex-col gap-[75px] group-data-[stack=on]:grid group-data-[stack=on]:gap-0 group-data-[stack=on]:pt-[40px]">
              {stats.map((stat) => (
                <div
                  key={stat.value}
                  data-stack-card
                  className="bg-[#f2f2f2] px-[22px] py-[32px] drop-shadow-[0px_4px_5.1px_rgba(0,0,0,0.09)] group-data-[stack=on]:[grid-area:1/1]"
                >
                  <div data-stack-content className="flex flex-col gap-4 leading-[1.4] md:flex-row md:items-center md:justify-between">
                    <p className="whitespace-nowrap text-[64px] md:text-[100px]">
                      <span data-stack-value data-value={stat.value} data-prefix="+" data-suffix={" %"}>
                        {`+${stat.value} %`}
                      </span>
                    </p>
                    <div className="flex flex-col gap-2 md:w-[464px]">
                      <p className="text-[18px] md:text-[22px]">{stat.text}</p>
                      <p className="text-[13px] text-[#30041b]/50">Source : {stat.source}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RÉALISATIONS */}
        <section ref={realisationsRef} className="flex flex-col gap-[50px] px-6 md:px-10 text-[#30041b]">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <SectionHeading label="Nos réalisations" title={realisations.title} />
            <PillLink href={`#${FORM_ANCHOR}`} className="border border-[#30041b] bg-white px-[35px] text-[#30041b]">
              Commander mon site
            </PillLink>
          </div>
          <div className="flex flex-col gap-[5px]">
            {realisations.rows.map((row, i) => (
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
                          src={`${assets}/${img.src}`}
                          alt={img.alt}
                          fill
                          sizes={row.layout === "full" ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                          className={`object-cover ${img.position ?? ""}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* SPÉCIALITÉS */}
        <section data-reveal-group className="flex flex-col gap-[50px] px-6 md:px-10 text-[#30041b]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <h2 data-reveal="up" className="text-[32px] md:text-[40px]">Nos spécialités</h2>
            <PillLink href={`#${FORM_ANCHOR}`} className="border border-[#30041b] bg-white px-[35px] text-[#30041b]">
              Commander mon site
            </PillLink>
          </div>
          <div className="grid grid-cols-1 gap-[5px] md:grid-cols-[464fr_494fr_464fr] md:grid-rows-[306px_306px]">
            {specialites.map((item) => (
              // Survol : un aplat bordeaux monte depuis le bas, le texte passe en blanc, l'icône se soulève
              <article
                key={item.title}
                data-reveal="card"
                className={`group/card relative isolate flex min-h-[260px] flex-col justify-between gap-12 overflow-hidden bg-[#f2f2f2] px-[36px] py-[32px] transition-colors duration-500 hover:text-white ${item.area}`}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-[#30041b] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/card:scale-y-100"
                />
                {item.icon ? (
                  <Image
                    src={`${COMMON}/${item.icon.src}`}
                    alt=""
                    width={item.icon.size}
                    height={item.icon.size}
                    className="transition duration-500 group-hover/card:-translate-y-1 group-hover/card:-rotate-[8deg] group-hover/card:brightness-0 group-hover/card:invert"
                  />
                ) : (
                  // Les quatre carrés s'écartent et pivotent
                  <div aria-hidden className="grid size-[22px] grid-cols-2 grid-rows-2 gap-[2px] transition-all duration-500 group-hover/card:rotate-45 group-hover/card:gap-[6px]">
                    {[0, 1, 2, 3].map((i) => <span key={i} className="bg-current" />)}
                  </div>
                )}
                <div className="flex max-w-[392px] flex-col gap-[5px] transition-transform duration-500 group-hover/card:-translate-y-1">
                  <h3 className="text-[22px] font-medium">{item.title}</h3>
                  <p className="text-[16px]">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* FORMULES */}
        <section data-reveal-group className="flex flex-col gap-[50px] px-6 md:px-10 text-[#30041b]">
          <h2 data-reveal="up" className="max-w-[640px] text-[32px] md:text-[40px] leading-[1.375]">
            {formules.title}
          </h2>
          <div className="grid grid-cols-1 gap-[5px] bg-[#f2f2f2] p-[5px] md:grid-cols-3">
            {formules.items.map((formule) => (
              // Survol : un filet rose se trace en bas, le contenu se soulève, le prix grossit,
              // les prestations glissent derrière un tiret rose et le bouton passe au rose avec une flèche
              // (le transform de la carte est réservé à son animation d'entrée)
              <article
                key={formule.name}
                data-reveal="card"
                className={`group/offer relative flex flex-col justify-center gap-[60px] overflow-hidden px-[38px] pb-[40px] pt-[70px] md:min-h-[564px] md:pb-[30px] ${formule.featured ? "bg-[#30041b] text-white" : "bg-white"}`}
              >
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-[5px] origin-left scale-x-0 bg-[#f70046] transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/offer:scale-x-100" />
                {formule.featured && (
                  <p className="absolute inset-x-0 top-0 bg-[#f70046] py-[5px] text-center text-[16px] text-white">
                    Formule la plus populaire
                  </p>
                )}
                <div className="flex flex-col gap-[36px] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/offer:-translate-y-2">
                  <h3 className="text-[26px] font-medium">{formule.name}</h3>
                  <div className="flex flex-col gap-[5px]">
                    <p className={`origin-left text-[32px] font-medium transition-[color,transform] duration-500 group-hover/offer:scale-110 ${formule.featured ? "" : "group-hover/offer:text-[#f70046]"}`}>{formule.price}</p>
                    <p className={`text-[16px] ${formule.featured ? "text-white/60" : "text-[#30041b]/50"}`}>{formule.text}</p>
                  </div>
                  <ul className="flex flex-col gap-[5px] text-[16px]">
                    {formule.items.map((item, i) => (
                      <li key={item} className="flex items-center">
                        <span
                          aria-hidden
                          className="mr-0 h-px w-0 bg-[#f70046] transition-all duration-300 group-hover/offer:mr-2 group-hover/offer:w-3"
                          style={{ transitionDelay: `${i * 50}ms` }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Le lien couvre toute la carte : un clic n'importe où choisit la formule et descend au formulaire */}
                <Link
                  href={`#${FORM_ANCHOR}`}
                  onClick={() => selectFormule(formule.offerId, "carte")}
                  aria-label={`Commencer avec la formule ${formule.name}`}
                  className={`flex items-center self-start after:absolute after:inset-0 after:content-[''] rounded-full border border-[#30041b] px-[25px] py-[16px] font-[family-name:var(--font-dm-sans)] text-[16px] leading-[1.44] transition-colors duration-300 group-hover/offer:border-[#f70046] group-hover/offer:bg-[#f70046] group-hover/offer:text-white ${formule.featured ? "bg-white text-[#30041b]" : "bg-[#30041b] text-white"}`}
                >
                  Commencer
                  <span aria-hidden className="inline-block w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover/offer:ml-2 group-hover/offer:w-4 group-hover/offer:opacity-100">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <Avis title={content.avisTitle} />

        {/* COLLABORATION */}
        {/* Le titre reste visible (sticky) pendant que les étapes s'allument une à une */}
        <section ref={etapesRef} className="bg-[#30041b] px-6 md:px-10 py-24 md:py-[81px] text-white">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12">
            <div className="flex flex-col gap-8 md:sticky md:top-32">
              <SectionHeading label="La collaboration" title={etapes.title} />
              <div className="flex max-w-[462px] items-center gap-4 text-[16px]">
                <span className="tabular-nums">
                  <span data-steps-count>01</span>
                  <span className="text-white/40"> / {String(etapes.items.length).padStart(2, "0")}</span>
                </span>
                <span className="relative h-px flex-1 bg-white/20">
                  <span data-steps-progress className="absolute inset-0 origin-left bg-[#f70046]" />
                </span>
              </div>
            </div>
            <ol data-steps className="flex w-full flex-col gap-[10px] md:w-[787px]">
              {etapes.items.map((etape, i) => (
                <li
                  key={etape.title}
                  data-step
                  className="group/step relative flex flex-col gap-[60px] border border-white/40 px-[34px] py-[32px] transition-colors duration-500 md:min-h-[257px] [&.is-active]:border-white [&.is-active]:bg-white/[0.06]"
                >
                  <span className="absolute right-[34px] top-[24px] text-[40px] leading-none text-white/20 transition-colors duration-500 group-[.is-active]/step:text-[#f70046]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Image src={`${COMMON}/icon-desktop-white.svg`} alt="" width={24} height={24} />
                  <div className="flex max-w-[392px] flex-col gap-[5px]">
                    <h3 className="text-[22px] font-medium">{etape.title}</h3>
                    <p className="text-[16px]">{etape.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      {/* FORMULAIRE : cible de tous les CTA de la page */}
      <section id={FORM_ANCHOR} className="scroll-mt-24 bg-[#30041b] px-6 md:px-10 pt-[150px] pb-24 md:pb-[140px] text-white">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-5">
          <div className="flex flex-col gap-10 self-start md:sticky md:top-32 md:col-span-4">
            <div className="flex flex-col gap-6">
              <SectionHeading label="Commander" title={commander.title} />
              <p className="max-w-[400px] font-[family-name:var(--font-dm-sans)] text-[16px] leading-[1.4] text-white/70">
                {commander.text}
              </p>
            </div>
            <FormuleRecap formules={formules.items} formule={formule} onSelect={(id) => selectFormule(id, "rappel")} />
          </div>
          <div className="rounded-[16px] bg-white p-6 md:col-span-7 md:col-start-6 md:p-10">
            <OfferForm
              messageOptional
              onLead={trackAdsLead}
              page={{
                slug: content.form.slug,
                offerId: formule?.offerId ?? content.form.offerId,
                form: { secondField: content.form.secondField },
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
