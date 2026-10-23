'use client'

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useHighlightReveal } from "@/hooks/useHighlightReveal";
import { useStatsStack } from "@/hooks/useStatsStack";
import { useStepsProgress } from "@/hooks/useStepsProgress";
import { useLocale } from "@/context/LocaleContext";
import OfferForm from "@/components/offer/OfferForm";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappHref } from "@/data/offerPages";

const ASSETS = "/LP/restaurant";
// Ancre du formulaire : tous les CTA « commander mon site » y descendent
const FORM_ANCHOR = "commander";
const WHATSAPP_HREF = whatsappHref("offre site internet pour restaurant");

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

// Vignettes du hero, sur deux lignes : la pastille colorée porte l'icône
const BADGES: { label: string; dot: string }[][] = [
  [
    { label: "2 000 €", dot: "bg-[#f70046]" },
    { label: "Visible sur les IA", dot: "bg-[#30041b]" },
    { label: "7 jours", dot: "bg-[#b50f66]" },
  ],
  [{ label: "Réservation en ligne", dot: "bg-[#f70046]" }],
];

// Chiffres clés empilés au scroll (useStatsStack) : la valeur défile de 0 à `value`
const STATS = [
  { value: 90, text: "des consommateurs font des recherches en ligne avant de choisir où manger." },
  { value: 77, text: "des clients consultent le site d'un restaurant avant de s'y rendre ou de commander." },
  { value: 69, text: "des clients font leur choix final après avoir lu le menu en ligne." },
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

// Grille des spécialités : deux cartes à gauche, une haute au centre, deux à droite
type Specialite = { title: string; text: string; icon?: { src: string; size: number }; area: string };

const SPECIALITES: Specialite[] = [
  {
    title: "Pensé pour le mobile",
    text: "Vos clients vous cherchent sur leur téléphone, souvent à deux rues de chez vous. Carte, horaires et adresse s'affichent en un coup d'œil.",
    icon: { src: "icon-desktop.svg", size: 24 },
    area: "md:col-start-1 md:row-start-1",
  },
  {
    title: "Menu & réservation",
    text: "Une carte toujours à jour et un bouton « Réserver » sur chaque page. Moins d'appels pendant le coup de feu, plus de couverts.",
    icon: { src: "icon-map.svg", size: 35 },
    area: "md:col-start-1 md:row-start-2",
  },
  {
    title: "Un design qui donne faim",
    text: "Photos qui mettent l'eau à la bouche, ambiance fidèle à votre salle, identité qui vous ressemble : on donne envie de pousser la porte avant la première bouchée.",
    area: "md:col-start-2 md:row-span-2",
  },
  {
    title: "Modifiable sans coder",
    text: "Plat du jour, nouvelle carte, fermeture exceptionnelle : vous mettez votre site à jour vous-même, en quelques clics, entre deux services.",
    icon: { src: "icon-puzzle.svg", size: 30 },
    area: "md:col-start-3 md:row-start-1",
  },
  {
    title: "Visible sur Google & les IA",
    text: "Référencement local, fiche Google soignée, site rapide : vous sortez quand on tape « restaurant près de moi », sur Google comme sur ChatGPT.",
    icon: { src: "icon-rocket.svg", size: 28 },
    area: "md:col-start-3 md:row-start-2",
  },
];

// Formules : la carte du milieu est mise en avant
type Formule = { name: string; price: string; text: string; items: string[]; featured?: boolean };

const FORMULES: Formule[] = [
  {
    name: "Identité graphique",
    price: "1 000 €",
    text: "Une charte graphique qui a du goût, déclinée sur tout ce qui fait vivre votre restaurant.",
    items: ["Logo et charte graphique", "Menu et carte des vins", "Devanture et ardoises", "Cartes de visite et de fidélité", "Visuels réseaux sociaux"],
  },
  {
    name: "Pack complet",
    price: "2 000 €",
    text: "L'identité et le site servis ensemble : votre restaurant en ligne en 7 jours ouvrés.",
    items: ["Logo et mini-charte", "Site vitrine sur mesure", "Menu et réservation", "Optimisé mobile et Google", "En ligne en 7 jours"],
    featured: true,
  },
  {
    name: "Site web",
    price: "1 500 €",
    text: "Un site sur mesure pour une adresse qui a déjà son identité et veut aller plus loin.",
    items: ["Maquettes sur mesure", "Site rapide et responsive", "Contenus modifiables", "Référencement de base", "Prise en main incluse"],
  },
];

const ETAPES = [
  {
    title: "L'appel découverte",
    text: "30 minutes pour comprendre votre cuisine, votre clientèle et vos envies. On repart avec tout ce qu'il faut pour passer en cuisine.",
  },
  {
    title: "La dégustation",
    text: "On conçoit votre identité et votre site, puis on vous fait goûter la maquette. Vos retours sont intégrés avant le service.",
  },
  {
    title: "L'envoi",
    text: "Votre site est en ligne, référencé et prêt à recevoir ses premières réservations. On vous montre comment le faire vivre vous-même.",
  },
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

const BADGE_CLASS = "inline-flex items-center gap-[9px] rounded-[25px] border py-[6px] pl-[6px] pr-[23px] text-[18px] md:text-[22px] leading-[1.2] text-white whitespace-nowrap";
const BADGE_DOT_CLASS = "flex size-[39px] shrink-0 items-center justify-center rounded-full";

const Badge = ({ label, dot }: { label: string; dot: string }) => (
  <span className={`${BADGE_CLASS} border-white bg-white/20`}>
    <span className={`${BADGE_DOT_CLASS} ${dot}`}>
      <Image src={`${ASSETS}/icon-rocket-white.svg`} alt="" width={22} height={22} />
    </span>
    {label}
  </span>
);

// Coupe un avis à `max` caractères sans couper un mot (même règle que les avis de la home)
function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,.;:!?]+$/, "") + "…";
}

const Avis = () => {
  const { t } = useLocale();
  const items = t.testimonials.items;
  // Les avis plus longs que le premier sont repliés à sa longueur
  const maxLength = items[0].text.length;
  const [expanded, setExpanded] = useState<number[]>([]);
  const toggle = (id: number) => setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <section className="flex flex-col gap-12 md:gap-20 px-6 md:px-10 text-[#30041b]">
      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-[97px]">
        <p className="text-[16px] md:pt-[15px]">Témoignages</p>
        <h2 className="text-[36px] md:text-[45px] leading-[1.4]">
          Les avis
          <br />
          de la maison
        </h2>
      </div>
      {/* Un avis par moitié de page, séparés par un filet */}
      <div className="grid grid-cols-1 gap-12 leading-[1.4] md:grid-cols-2 md:gap-[20px]">
        {items.map((item) => {
          const isLong = item.text.length > maxLength;
          const isExpanded = expanded.includes(item.id);
          return (
            <figure key={item.id} className="flex flex-col justify-between gap-8 md:gap-12 border-[#30041b] md:pr-[20px] md:[&:not(:last-child)]:border-r-[0.5px]">
              <div className="flex flex-col gap-4">
                <div className="flex gap-0.5" role="img" aria-label="Note : 5 sur 5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} aria-hidden className="size-[18px] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
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

export default function RestaurantClient() {
  const statsRef = useRef<HTMLElement>(null);
  const realisationsRef = useRef<HTMLElement>(null);
  const etapesRef = useRef<HTMLElement>(null);
  useStatsStack(statsRef);
  useHighlightReveal(realisationsRef);
  useStepsProgress(etapesRef);

  return (
    <main className="overflow-x-clip bg-white">

      {/* HERO */}
      <section className="relative min-h-[760px] md:h-[927px] bg-[#30041b]">
        {/* Photo à droite (plein fond sur mobile), fondue dans le bordeaux */}
        <div className="absolute inset-0 md:left-[46.1%]">
          <Image src={`${ASSETS}/hero.png`} alt="Table dressée dans un restaurant" fill priority sizes="(min-width: 768px) 54vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#30041b] via-[#30041b]/80 to-[#30041b]/40 md:bg-gradient-to-r md:from-[#30041b] md:via-transparent md:to-transparent" />
        </div>

        <div className="relative flex h-full min-h-[760px] flex-col justify-center gap-12 px-6 pb-56 pt-32 md:min-h-0 md:px-10 md:py-0">
          <div className="flex max-w-[725px] flex-col gap-[31px]">
            <h1 className="text-[44px] md:text-[65px] leading-[1.2] text-white">
              Le site de votre restaurant prêt en 7 jours
            </h1>
            <div className="flex flex-wrap items-center gap-[10px]">
              <PillLink href={`#${FORM_ANCHOR}`} className="bg-white px-[30px] text-[#30041b]">
                Je commande mon site
              </PillLink>
            </div>
          </div>

          {/* VIGNETTES : celle du message ouvre une conversation WhatsApp */}
          <div className="flex flex-col items-start gap-[17px] md:absolute md:left-[51.3%] md:top-[628px]">
            <div className="flex flex-wrap gap-[10px]">
              {BADGES[0].map((badge) => <Badge key={badge.label} {...badge} />)}
            </div>
            <div className="flex flex-wrap gap-[10px]">
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={`${BADGE_CLASS} border-[#0bd330] bg-[#0bd330] transition-[filter,transform] duration-300 hover:-translate-y-0.5 hover:brightness-110`}
              >
                <span className={`${BADGE_DOT_CLASS} bg-white text-[#0bd330]`}>
                  <WhatsAppIcon className="size-[22px]" />
                </span>
                Envoyez-nous un message
              </a>
              {BADGES[1].map((badge) => <Badge key={badge.label} {...badge} />)}
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

        {/* CHIFFRES CLÉS : pile animée au scroll, liste simple sans animation */}
        <section ref={statsRef} className="group relative text-[#30041b] data-[stack=on]:h-[calc(100svh+1600px)]">
          <div className="flex flex-col gap-[75px] px-6 md:px-10 group-data-[stack=on]:sticky group-data-[stack=on]:top-0 group-data-[stack=on]:h-svh group-data-[stack=on]:justify-center group-data-[stack=on]:gap-[50px]">
            <div className="relative">
              <p className="mb-4 text-[16px] md:absolute md:left-0 md:top-[20px] md:mb-0">Le constat</p>
              <p className="max-w-[1423px] text-[28px] md:text-[45px] leading-[1.4] md:indent-[362px]">
                Aujourd&apos;hui, on choisit son restaurant sur son téléphone avant de pousser la porte. Votre site est votre première impression : il doit donner faim, rassurer et faire réserver.
              </p>
            </div>
            <div className="flex flex-col gap-[75px] group-data-[stack=on]:grid group-data-[stack=on]:gap-0 group-data-[stack=on]:pb-[90px]">
              {STATS.map((stat) => (
                <div
                  key={stat.value}
                  data-stack-card
                  className="bg-[#f2f2f2] px-[22px] py-[32px] drop-shadow-[0px_4px_5.1px_rgba(0,0,0,0.09)] group-data-[stack=on]:[grid-area:1/1]"
                >
                  <div data-stack-content className="flex flex-col gap-4 leading-[1.4] md:flex-row md:items-center md:justify-between">
                    <p className="whitespace-nowrap text-[64px] md:text-[100px]">
                      <span data-stack-value data-value={stat.value} data-prefix="+" data-suffix={" %"}>
                        {`+${stat.value} %`}
                      </span>
                    </p>
                    <p className="text-[18px] md:w-[464px] md:text-[22px]">{stat.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RÉALISATIONS */}
        <section ref={realisationsRef} className="flex flex-col gap-[50px] px-6 md:px-10 text-[#30041b]">
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

        {/* SPÉCIALITÉS */}
        <section className="flex flex-col gap-[50px] px-6 md:px-10 text-[#30041b]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <h2 className="text-[32px] md:text-[40px]">Nos spécialités</h2>
            <PillLink href={`#${FORM_ANCHOR}`} className="border border-[#30041b] bg-white px-[35px] text-[#30041b]">
              Commander mon site
            </PillLink>
          </div>
          <div className="grid grid-cols-1 gap-[5px] md:grid-cols-[464fr_494fr_464fr] md:grid-rows-[306px_306px]">
            {SPECIALITES.map((item) => (
              // Survol : un aplat bordeaux monte depuis le bas, le texte passe en blanc, l'icône se soulève
              <article
                key={item.title}
                className={`group/card relative isolate flex min-h-[260px] flex-col justify-between gap-12 overflow-hidden bg-[#f2f2f2] px-[36px] py-[32px] transition-colors duration-500 hover:text-white ${item.area}`}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-[#30041b] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/card:scale-y-100"
                />
                {item.icon ? (
                  <Image
                    src={`${ASSETS}/${item.icon.src}`}
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
        <section className="flex flex-col gap-[50px] px-6 md:px-10 text-[#30041b]">
          <h2 className="max-w-[640px] text-[32px] md:text-[40px] leading-[1.375]">
            Choisissez votre formule, on s&apos;occupe du service
          </h2>
          <div className="grid grid-cols-1 gap-[5px] bg-[#f2f2f2] p-[5px] md:grid-cols-3">
            {FORMULES.map((formule) => (
              <article
                key={formule.name}
                className={`relative flex flex-col justify-center gap-[60px] px-[38px] pb-[40px] pt-[70px] md:min-h-[564px] md:pb-[30px] ${formule.featured ? "bg-[#30041b] text-white" : "bg-white"}`}
              >
                {formule.featured && (
                  <p className="absolute inset-x-0 top-0 bg-[#f70046] py-[5px] text-center text-[16px] text-white">
                    Formule la plus populaire
                  </p>
                )}
                <div className="flex flex-col gap-[36px]">
                  <h3 className="text-[26px] font-medium">{formule.name}</h3>
                  <div className="flex flex-col gap-[5px]">
                    <p className="text-[32px] font-medium">{formule.price}</p>
                    <p className={`text-[16px] ${formule.featured ? "text-white/60" : "text-[#30041b]/50"}`}>{formule.text}</p>
                  </div>
                  <ul className="flex flex-col gap-[5px] text-[16px]">
                    {formule.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <Link
                  href={`#${FORM_ANCHOR}`}
                  className={`self-start rounded-full border border-[#30041b] px-[25px] py-[16px] font-[family-name:var(--font-dm-sans)] text-[16px] leading-[1.44] transition-opacity hover:opacity-80 ${formule.featured ? "bg-white text-[#30041b]" : "bg-[#30041b] text-white"}`}
                >
                  Commencer
                </Link>
              </article>
            ))}
          </div>
        </section>

        <Avis />

        {/* COLLABORATION */}
        {/* Le titre reste visible (sticky) pendant que les étapes s'allument une à une */}
        <section ref={etapesRef} className="bg-[#30041b] px-6 md:px-10 py-24 md:py-[81px] text-white">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12">
            <div className="flex flex-col gap-8 md:sticky md:top-32">
              <SectionHeading label="La collaboration" title="De la commande au service en 7 jours" />
              <div className="flex max-w-[462px] items-center gap-4 text-[16px]">
                <span className="tabular-nums">
                  <span data-steps-count>01</span>
                  <span className="text-white/40"> / {String(ETAPES.length).padStart(2, "0")}</span>
                </span>
                <span className="relative h-px flex-1 bg-white/20">
                  <span data-steps-progress className="absolute inset-0 origin-left bg-[#f70046]" />
                </span>
              </div>
            </div>
            <ol data-steps className="flex w-full flex-col gap-[10px] md:w-[787px]">
              {ETAPES.map((etape, i) => (
                <li
                  key={etape.title}
                  data-step
                  className="group/step relative flex flex-col gap-[60px] border border-white/40 px-[34px] py-[32px] transition-colors duration-500 md:min-h-[257px] [&.is-active]:border-white [&.is-active]:bg-white/[0.06]"
                >
                  <span className="absolute right-[34px] top-[24px] text-[40px] leading-none text-white/20 transition-colors duration-500 group-[.is-active]/step:text-[#f70046]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Image src={`${ASSETS}/icon-desktop-white.svg`} alt="" width={24} height={24} />
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
