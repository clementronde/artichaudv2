import Image from "next/image";

const PHOTOS = [
  { src: "/images/cuisine-suspension.jpg", alt: "Suspension en cuivre au-dessus du passe, bocaux d'épices en cuisine" },
  { src: "/images/chef-dressage.jpg", alt: "Un cuisinier dresse les assiettes à la pince, gants noirs" },
  { src: "/images/salle-nuit.jpg", alt: "La salle de Fuego dans la pénombre, vue depuis l'entrée" },
];

export default function Esprit() {
  return (
    <section id="esprit" className="relative w-full scroll-mt-24">
      {/* Grand logo en filigrane, ancré au bord gauche de la page, au-dessus des sections (comme dans Figma) */}
      <Image loading="eager"
        src="/images/filigrane-haut.svg"
        alt=""
        aria-hidden
        width={685}
        height={1387}
        data-parallax="0.08"
        className="pointer-events-none absolute left-0 top-[-337.814px] z-10 h-auto w-[min(685px,90vw)] max-w-none select-none"
      />

      <div className="container-site grid gap-y-6 lg:gap-y-0 lg:grid-cols-[minmax(0,459fr)_minmax(0,925fr)] lg:gap-x-2">
        <h2 className="label whitespace-nowrap">L&apos;esprit Fuego</h2>
        <div className="flex flex-col items-start gap-6">
          <p data-words className="body-text">
            Chez Fuego, chaque détail a été pensé pour éveiller vos sens. Installez-vous confortablement sur nos banquettes dans
            un décor mêlant bois naturel, touches dorées et lumière tamisée. En cuisine, notre équipe travaille des produits frais
            et locaux autour d&apos;une cuisson maîtrisée à la flamme et à la braise, pour des assiettes généreuses, fumées et
            pleines de caractère.
          </p>
          <a href="#carte" className="link-figma">
            En savoir plus
          </a>
        </div>

        <ul
          className="scroll-strip -mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-2 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:col-start-2 lg:mt-[110px]"
        >
          {PHOTOS.map((p, i) => (
            <li key={p.src} className="w-[72vw] max-w-[303px] shrink-0 snap-start md:w-auto md:max-w-none">
              <div data-clip data-delay={i * 0.07} className="relative aspect-[303/413] overflow-hidden">
                <Image loading="eager" src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 303px, (min-width: 768px) 33vw, 72vw" className="object-cover" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
