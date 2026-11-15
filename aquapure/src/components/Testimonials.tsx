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

      <ul data-stagger className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <li key={t.name}>
            <figure className="group relative flex h-full min-h-[420px] flex-col justify-between gap-16 overflow-hidden bg-bleu-fonce px-8 py-[49px] text-gris lg:min-h-[529px] lg:px-[calc((100%-379px)/2)]">
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
