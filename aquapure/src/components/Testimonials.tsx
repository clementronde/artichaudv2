import SectionHeading from "@/components/SectionHeading";

const TESTIMONIALS = [
  {
    name: "Clément Rondepierre",
    role: "Lorem impsum",
    quote: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercice ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    ],
  },
  {
    name: "Charlotte Keleti",
    role: "Lorem impsum",
    quote: [
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventer veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit",
    ],
  },
  {
    name: "Valérie Dreux",
    role: "Lorem impsum",
    quote: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercice ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
  },
];

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
              <blockquote className="flex flex-col gap-[1.14em] text-card">
                {t.quote.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </blockquote>
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
