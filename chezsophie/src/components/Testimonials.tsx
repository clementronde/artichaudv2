import Image from "next/image";

const TESTIMONIALS = [
  {
    name: "Julie Blanchet",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercice ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    name: "Julie Blanchet",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercice ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    name: "Julie Blanchet",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercice ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function Testimonials() {
  return (
    <section id="avis" className="relative w-full">
      <div className="relative mx-auto max-w-site">
        {/* Fleur jaune derrière les cartes, qui monte doucement au scroll */}
        <div className="pointer-events-none absolute left-[71.03%] top-[-54px] hidden h-[553px] w-[386px] md:block" aria-hidden>
          <div data-parallax="0.18" className="h-full w-full">
            <div data-sway="2.5" className="h-full w-full" style={{ transformOrigin: "50% 100%" }}>
              <Image src="/images/fleur-avis.svg" alt="" width={386} height={553} className="h-full w-full" />
            </div>
          </div>
        </div>

        <h2
          data-split
          className="relative px-5 font-serif text-[clamp(2.125rem,1.729rem+1.69vw,3.25rem)] font-extralight leading-[1.1154] text-framboise md:px-10 xl:px-[60px]"
        >
          Ce que nos <em className="italic">voyageurs</em>
          <br />
          en pensent
        </h2>
      </div>

      {/* Bande de cartes centrée qui déborde des deux côtés, comme sur la maquette ; elle glisse légèrement au scroll */}
      <div className="relative mt-12 overflow-x-auto overscroll-x-contain [scrollbar-width:none] md:mt-[74px] md:overflow-visible [&::-webkit-scrollbar]:hidden">
        <div data-drift="-90" className="flex w-max gap-[11px] px-5 md:mx-auto md:w-full md:justify-center md:px-0">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              data-card
              className="group relative w-[85vw] max-w-[613px] shrink-0 bg-sable px-6 pb-10 pt-[33px] transition-colors duration-700 ease-expo hover:bg-[#fcefc9] md:h-[395px] md:w-[613px] md:p-0"
            >
              <span data-pop className="mx-auto block size-[43px] md:absolute md:left-1/2 md:top-[33px] md:-translate-x-1/2">
                <Image src="/images/icon-quote.svg" alt="" width={43} height={43} />
              </span>
              <Image
                src="/images/stars.svg"
                alt="Note : 5 sur 5"
                width={63}
                height={10}
                className="mt-6 md:absolute md:left-12 md:top-[101px] md:mt-0"
              />
              <div className="mt-3 flex flex-col text-framboise md:absolute md:left-12 md:top-[124px] md:mt-0 md:w-[518px]">
                <blockquote className="text-[18px] font-light leading-[30px]">
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption className="font-serif text-[22px] font-extralight leading-[58px] transition-transform duration-700 ease-expo group-hover:translate-x-2">
                  {t.name}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
