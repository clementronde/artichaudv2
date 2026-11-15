import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";

const ARTICLES = [
  { title: "Revenir à la source", img: "/images/news-1.jpg", alt: "Serrage d’un siphon à la clé", tags: ["10min", "Hand made"] },
  { title: "Revenir à la source", img: "/images/projet-3.jpg", alt: "Plombier réglant un mitigeur", tags: ["10min", "Hand made"] },
  { title: "Revenir à la source", img: "/images/news-3.jpg", alt: "Plombier dans une salle de bain rénovée", tags: ["10min", "Hand made"] },
];

export default function News() {
  return (
    <section id="actualites" className="container-site flex flex-col gap-[54px]">
      <SectionHeading tag="News" title="Les actualités" />

      <ul data-stagger className="grid grid-cols-1 gap-x-2.5 gap-y-12 md:grid-cols-3">
        {ARTICLES.map((a, i) => (
          <li key={i}>
            <article className="group flex flex-col gap-8">
              <div className="flex flex-col gap-5">
                <div className="relative aspect-[471/325] overflow-hidden">
                  <Image
                    src={a.img}
                    alt={a.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.07]"
                  />
                  <span className="absolute inset-0 bg-bleu-fonce/0 transition-colors duration-700 group-hover:bg-bleu-fonce/10" aria-hidden />
                </div>
                <ul className="flex gap-1">
                  {a.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-[5px] border-[0.5px] border-[rgba(60,0,123,0.2)] px-4 py-3 text-[20px] leading-[0.91] tracking-[-0.06em] text-violet transition-colors duration-500 group-hover:border-bleu-fonce/40"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <h3 className="text-[30px] leading-[0.91] tracking-[-0.06em] text-violet">
                <a href="#actualites" className="link-underline">
                  {a.title}
                </a>
              </h3>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
