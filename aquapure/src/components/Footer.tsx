import Image from "next/image";
import AnchorLink from "@/components/AnchorLink";

const COLUMNS = [
  {
    title: "Réseaux",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/" },
      { label: "Facebook", href: "https://www.facebook.com/" },
      { label: "TikTok", href: "https://www.tiktok.com/" },
    ],
  },
  {
    title: "Navigation",
    links: [
      { label: "Services", href: "#services" },
      { label: "Projets", href: "#projets" },
      { label: "À propos", href: "#temoignages" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Légales",
    links: [
      { label: "Mentions", href: "#" },
      { label: "CGV", href: "#" },
      { label: "CGU", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-bleu-fonce">
      <div className="mx-auto max-w-site">
        <div
          data-stagger
          className="flex flex-col gap-12 px-5 pt-20 sm:flex-row sm:justify-end sm:gap-[clamp(32px,12.4vw,188px)] md:px-10 lg:pt-[114px]"
        >
          {COLUMNS.map((col) => (
            <div key={col.title} className="flex w-full justify-between gap-6 sm:w-[245px]">
              <div className="flex flex-col gap-2">
                <p className="whitespace-nowrap text-[22px] leading-none tracking-[-0.06em] text-white">{col.title}</p>
                <Image src="/images/arrow-down.svg" alt="" width={12} height={11.182} className="h-[11px] w-3" />
              </div>
              <ul className="flex w-[85px] flex-col gap-3 text-[22px] leading-none tracking-[-0.06em] text-white">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("http") ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-underline transition-colors duration-300 hover:text-bleu-fluo">
                        {l.label}
                      </a>
                    ) : (
                      <AnchorLink href={l.href} className="link-underline transition-colors duration-300 hover:text-bleu-fluo">
                        {l.label}
                      </AnchorLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Wordmark géant, rogné en bas comme sur la maquette, qui monte au scroll */}
        <div className="relative mb-[-5.7%] ml-[-2.3%] mt-[16%] w-[113.5%] sm:mt-[8.8%]" aria-hidden>
          <div data-rise>
            <Image src="/images/wordmark-footer.svg" alt="" width={1716} height={358.829} className="h-auto w-full" />
          </div>
        </div>
      </div>
      <p className="sr-only">© {new Date().getFullYear()} AquaPure — Plombier dans les Yvelines</p>
    </footer>
  );
}
