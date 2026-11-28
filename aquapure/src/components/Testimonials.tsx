import SectionHeading from "@/components/SectionHeading";

// AquaPure est un client fictif : avis d'exemple, à remplacer par de vrais avis Google le jour venu.
const TESTIMONIALS = [
  {
    name: "Marie D.",
    rating: 5,
    role: "Versailles · Fuite sous évier",
    quote: [
      "Fuite sous l'évier un dimanche matin : AquaPure était là en moins d'une heure. Diagnostic clair, devis annoncé avant de commencer, et une cuisine laissée plus propre qu'à l'arrivée.",
    ],
  },
  {
    name: "Thomas L.",
    rating: 5,
    role: "Saint-Germain-en-Laye · Salle de bain",
    quote: [
      "Rénovation complète de notre salle de bain en trois semaines, comme prévu. Douche à l'italienne, nouveaux réseaux, finitions impeccables. On recommande les yeux fermés.",
    ],
  },
  {
    name: "Sophie R.",
    rating: 5,
    role: "Rambouillet · Chaudière",
    quote: [
      "Notre chaudière a lâché en plein mois de janvier. Remplacement le lendemain, conseils pour les aides de l'État et un entretien annuel calé dans la foulée.",
      "Un artisan sérieux, joignable et ponctuel : exactement ce qu'on cherchait.",
    ],
  },
];

/** Note sur 5, en étoiles cyan (la couleur d'accent du site). */
function Stars({ value = 5 }: { value?: number }) {
  return (
    <div className="flex items-center gap-3" aria-label={`Note : ${value} sur 5`}>
      <div className="flex gap-1" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => (
          <svg key={i} width="20" height="20" viewBox="0 0 24 24" className={i < value ? "fill-bleu-fluo" : "fill-white/20"}>
            <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8L12 2.5z" />
          </svg>
        ))}
      </div>
      <span className="text-[16px] leading-none tracking-[-0.04em] text-bleu-fluo">{value}/5</span>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="temoignages" className="container-site flex flex-col gap-[54px]">
      <SectionHeading tag="Ce qu’on dit de nous" title="Témoignages" />

      {/* Desktop : 3 colonnes. Tablette / mobile : carrousel horizontal aimanté, pour éviter des colonnes trop étroites. */}
      <ul
        data-stagger
        aria-label="Avis clients"
        className="-mx-5 flex snap-x snap-mandatory gap-2.5 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] md:-mx-10 md:scroll-px-10 md:px-10 lg:mx-0 lg:grid lg:snap-none lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {TESTIMONIALS.map((t) => (
          <li key={t.name} className="w-[85%] max-w-[471px] shrink-0 snap-start sm:w-[60%] lg:w-auto lg:max-w-none">
            <figure className="group relative flex h-full min-h-[460px] flex-col justify-between gap-16 overflow-hidden bg-bleu-fonce px-7 py-10 text-gris sm:px-9 lg:min-h-[529px] lg:py-[49px] xl:px-[46px]">
              {/* Filet cyan qui se dessine au survol */}
              <span className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-bleu-fluo transition-transform duration-700 ease-expo group-hover:scale-x-100" aria-hidden />
              <div className="flex flex-col gap-7">
              <Stars value={t.rating} />
              <blockquote className="flex flex-col gap-[1.14em] text-card lg:text-[20px] lg:leading-[1.3]">
                {t.quote.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </blockquote>
              </div>
              <figcaption className="flex flex-col gap-[5px] transition-transform duration-700 ease-expo group-hover:translate-x-2">
                <span className="text-[22px] leading-[1.14] tracking-[-0.04em]">{t.name}</span>
                <span className="text-[16px] leading-[1.14] tracking-[-0.04em]">{t.role}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
