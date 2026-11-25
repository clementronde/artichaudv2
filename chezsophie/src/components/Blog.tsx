import Image from "next/image";
import { clsx } from "@/lib/clsx";

const ARTICLES = [
  { title: "La literie haut de gamme", img: "/images/blog-1.jpg", alt: "Lit douillet aux coussins de velours", pos: "object-[50%_66%]", leading: "leading-[0.91]" },
  { title: "Les bienfaits des vacances à la campagne en famille", img: "/images/blog-2.jpg", alt: "Vallée boisée aux couleurs d’automne", pos: "", leading: "leading-[1.1]" },
  { title: "Respirer le grand air", img: "/images/blog-3.jpg", alt: "Portes-fenêtres ouvertes sur la campagne", pos: "", leading: "leading-[0.91]" },
];

const TAGS = ["10min", "Santé"];

export default function Blog() {
  return (
    <section id="blog" className="container-site flex flex-col gap-10">
      <h2 data-split className="font-serif text-[clamp(2.125rem,1.773rem+1.502vw,3.125rem)] font-extralight leading-[1.16] text-framboise">
        Nos <em className="italic">Actualités</em>
      </h2>

      <ul data-stagger className="grid grid-cols-1 gap-x-[11px] gap-y-12 md:grid-cols-3">
        {ARTICLES.map((a) => (
          <li key={a.title}>
            <article className="group relative flex flex-col gap-8">
              <div className="flex flex-col gap-5">
                <div data-clip className="relative aspect-[457/325] overflow-hidden">
                  <Image
                    src={a.img}
                    alt={a.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className={clsx("object-cover transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.06]", a.pos)}
                  />
                  <span className="absolute inset-0 bg-framboise/0 transition-colors duration-700 group-hover:bg-framboise/10" aria-hidden />
                </div>
                <ul className="flex gap-1">
                  {TAGS.map((t) => (
                    <li
                      key={t}
                      className="rounded-[5px] border-[0.5px] border-[rgba(60,0,123,0.2)] px-4 py-3 text-[20px] font-light leading-[0.91] tracking-[-1.2px] text-violet transition-colors duration-500 group-hover:border-violet/40"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <h3 className={clsx("text-[26px] font-light tracking-[-0.06em] text-violet md:text-[30px]", a.leading)}>
                <a href="#blog" className="after:absolute after:inset-0">
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-700 ease-expo group-hover:bg-[length:100%_1px]">
                    {a.title}
                  </span>
                </a>
              </h3>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
