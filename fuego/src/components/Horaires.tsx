import Image from "next/image";
import { HOURS, SITE } from "@/lib/site";

export default function Horaires() {
  return (
    <section id="reserver" className="relative w-full scroll-mt-10 lg:h-[789px]" aria-labelledby="horaires-titre">
      <div data-scale-in className="relative h-[68vw] max-h-[560px] min-h-[300px] w-full overflow-hidden lg:absolute lg:inset-0 lg:h-auto lg:max-h-none">
        <Image loading="eager"
          src="/images/cuisine-comptoir.jpg"
          alt="Le comptoir de la cuisine ouverte de Fuego, suspensions en cuivre et bocaux d'épices"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 100%" }}
        />
      </div>

      <div className="container-site relative -mt-16 lg:mt-0 lg:h-full">
        <div
          data-fade
          className="relative border-[0.5px] border-cream bg-burgundy px-6 py-12 text-cream sm:px-[53.5px] lg:absolute lg:right-[60px] lg:top-[59.3px] lg:h-[669px] lg:w-[459px] lg:py-0"
        >
          <h2 id="horaires-titre" className="sr-only">
            Horaires, adresse et réservation
          </h2>
          <div className="mx-auto flex max-w-[351px] flex-col items-center gap-10 lg:absolute lg:left-[53.5px] lg:top-[76.5px] lg:h-[516px] lg:w-[351px] lg:justify-between lg:gap-0">
            <dl className="flex w-full flex-col gap-[18px] text-[16px] uppercase leading-[28px] sm:text-[18px]">
              {HOURS.map((h) => (
                <div key={h.label} className="flex items-center justify-between gap-4 whitespace-nowrap">
                  <dt className="font-bold">{h.label}</dt>
                  <dd className="font-normal">
                    {h.opens} - {h.closes}
                  </dd>
                </div>
              ))}
            </dl>
            <Image loading="eager" src="/images/filet.svg" alt="" width={351} height={0.5} className="block h-[0.5px] w-full" />
            <div className="flex w-[230px] flex-col items-center gap-[18px] text-center text-[16px] uppercase leading-[28px] sm:text-[18px]">
              <h3 className="w-full font-bold">Adresse</h3>
              <p className="w-full font-normal">
                {SITE.address.street} {SITE.address.postalCode} {SITE.address.city}
              </p>
            </div>
            <Image loading="eager" src="/images/filet.svg" alt="" width={351} height={0.5} className="block h-[0.5px] w-full" />
            <div className="flex w-[230px] flex-col items-center gap-[18px] text-center text-[16px] uppercase leading-[28px] sm:text-[18px]">
              <h3 className="w-full font-bold">Contact</h3>
              <div className="flex w-full flex-col gap-[10px] font-normal">
                <a href={`mailto:${SITE.email}`} className="link-underline mx-auto">
                  {SITE.email}
                </a>
                <a href={SITE.phoneHref} className="link-underline mx-auto">
                  {SITE.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
