import Image from "next/image";
import AnchorLink from "@/components/AnchorLink";
import { BOOKING_MAILTO, SITE } from "@/lib/site";

const COLUMNS = [
  {
    title: "Navigation",
    links: [
      { label: "La Maison", href: "#maison" },
      { label: "Les Activités", href: "#activites" },
      { label: "Galerie", href: "#galerie" },
      { label: "Blog", href: "#blog" },
      { label: "Réservation", href: "#reserver" },
    ],
  },
  {
    title: "Réseaux",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/" },
      { label: "Youtube", href: "https://www.youtube.com/" },
      { label: "Facebook", href: "https://www.facebook.com/" },
    ],
  },
  {
    title: "Légales",
    links: [
      { label: "Mentions légales", href: "#" },
      { label: "CGV", href: "#" },
      { label: "CGU", href: "#" },
    ],
  },
];

function Flower({ src }: { src: string }) {
  return (
    <div data-sway="1.6" className="flex h-full w-full items-center justify-center" style={{ transformOrigin: "100% 40%" }}>
      <div className="flex-none rotate-[-117.1deg]">
        <Image src={src} alt="" width={350.104} height={589.237} className="block h-[589.237px] w-[350.104px] max-w-none" />
      </div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: string }) {
  const cls = "link-underline transition-colors duration-300 hover:text-vert";
  return href.startsWith("http") ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  ) : (
    <AnchorLink href={href} className={cls}>
      {children}
    </AnchorLink>
  );
}

export default function Footer() {
  return (
    <footer id="reserver" className="relative w-full overflow-hidden xl:h-[1563px]">
      {/* Paysage en fond, calé en bas comme sur la maquette, avec une parallaxe douce */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div data-parallax="0.12" className="absolute inset-x-0 -top-[6%] bottom-0 will-change-transform">
          <Image src="/images/footer-bg.jpg" alt="" fill sizes="100vw" className="object-cover object-bottom" />
        </div>
        {/* Sur mobile, le ciel clair occupe le haut : léger voile pour garder le titre lisible */}
        <div className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-black/45 via-black/15 to-transparent xl:hidden" />
      </div>

      {/* Fleur jaune derrière le bloc vert : seule sa tige dépasse à droite */}
      <div className="pointer-events-none absolute right-[-73px] top-[906px] hidden h-[580.091px] w-[684.035px] xl:block" aria-hidden>
        <Flower src="/images/fleur-footer-ext.svg" />
      </div>

      {/* Appel à réserver */}
      <div className="relative flex flex-col items-center gap-[29px] px-5 pb-24 pt-40 text-center md:pt-56 xl:absolute xl:left-1/2 xl:top-[372px] xl:w-[627px] xl:-translate-x-1/2 xl:p-0">
        <h2 data-split className="font-serif text-[clamp(1.875rem,1.545rem+1.408vw,2.8125rem)] font-normal leading-[1.289] text-creme xl:whitespace-nowrap">
          Prêt à <em className="italic">réserver</em> votre prochain séjour ?
        </h2>
        <a
          data-fade
          href={BOOKING_MAILTO}
          className="group relative overflow-hidden rounded-[3px] border border-framboise bg-sapin px-[22px] py-[18px] text-[22px] font-normal leading-[normal] text-vert"
        >
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-vert transition-transform duration-500 ease-expo group-hover:scale-y-100" aria-hidden />
          <span className="relative block overflow-hidden">
            <span className="block transition-transform duration-500 ease-expo group-hover:-translate-y-full">Je réserve</span>
            <span aria-hidden className="absolute inset-0 block translate-y-full text-sapin transition-transform duration-500 ease-expo group-hover:translate-y-0">
              Je réserve
            </span>
          </span>
        </a>
      </div>

      {/* Bloc vert sapin */}
      <div className="relative mx-2.5 mb-2.5 overflow-hidden bg-sapin text-creme md:mx-5 md:mb-5 xl:absolute xl:inset-x-5 xl:bottom-5 xl:m-0 xl:h-[739px]">
        <div className="pointer-events-none absolute right-[-93px] top-[102px] hidden h-[580.091px] w-[684.035px] xl:block" aria-hidden>
          <div data-grow-right className="h-full w-full">
            <Flower src="/images/fleur-footer.svg" />
          </div>
        </div>

        <div className="relative grid grid-cols-1 gap-14 px-6 pb-12 pt-10 md:px-10 xl:grid-cols-[minmax(0,1fr)_632px] xl:gap-0 xl:pb-0 xl:pl-[61px] xl:pr-[92px] xl:pt-[49px]">
          <div data-stagger className="flex flex-col items-start">
            <p className="font-serif text-[32px] font-extralight leading-[48px] text-vert">Contact</p>
            <ul className="mt-[17px] flex flex-col gap-[17px] text-[20px] font-extralight leading-[normal]">
              <li>
                <a href={`mailto:${SITE.email}`} className="link-underline transition-colors duration-300 hover:text-vert">
                  {SITE.email}
                </a>
              </li>
              <li>{SITE.address}</li>
              <li>
                <a href={SITE.phoneHref} className="link-underline transition-colors duration-300 hover:text-vert">
                  {SITE.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          <div data-stagger className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:flex xl:gap-[97px]">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title} className="flex flex-col gap-[21px] xl:w-[146px]">
                <p className="whitespace-nowrap font-serif text-[32px] font-extralight leading-[48px] text-vert">{col.title}</p>
                <ul className="flex flex-col gap-3 text-[20px] font-extralight leading-[normal]">
                  {col.links.map((l) => (
                    <li key={l.label} className="whitespace-nowrap">
                      <FooterLink href={l.href}>{l.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Logo : il se dévoile de bas en haut */}
        <div data-clip className="relative mx-6 mb-16 mt-14 w-[200px] md:mx-10 md:w-[311px] xl:absolute xl:left-[61px] xl:top-[459px] xl:m-0">
          <Image src="/images/logo-footer.svg" alt="Chez Sophie" width={311} height={175} className="h-auto w-full" />
        </div>

        <div className="relative flex h-[39px] items-center justify-center bg-vert px-4 xl:absolute xl:inset-x-0 xl:bottom-0 xl:justify-start xl:pl-[45.11%]">
          <a
            href="https://artichaud-studio.fr"
            target="_blank"
            rel="noopener"
            className="whitespace-nowrap text-[16px] font-light leading-[normal] text-sapin"
          >
            Site réalisé par Artichaud studio
          </a>
        </div>
      </div>
    </footer>
  );
}
