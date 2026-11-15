import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import AnchorLink from "@/components/AnchorLink";

const SERVICES = [
  { title: "Dépannage d’urgence", img: "/images/service-urgence.png", w: 294, h: 189, gap: "gap-[38px]", offset: "translate-y-[27px]" },
  { title: "Rénovation & Salle de bain", img: "/images/service-renovation.png", w: 264, h: 264, gap: "gap-[14px]", offset: "" },
  { title: "Chauffage & Entretien", img: "/images/service-chauffage.png", w: 290, h: 242, gap: "gap-[38px]", offset: "" },
];

export default function Services() {
  return (
    <section id="services" className="container-site flex flex-col gap-12 md:gap-[84px]">
      <SectionHeading
        tag="Nos services"
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />

      <ul data-stagger className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
        {SERVICES.map((s) => (
          <li key={s.title}>
            <AnchorLink
              href="#contact"
              className="group relative flex h-[380px] items-center justify-center overflow-hidden bg-gris transition-colors duration-700 ease-expo hover:bg-[#e8eded] md:h-[min(484px,32vw)] md:min-h-[400px]"
            >
              {/* Voile cyan qui monte depuis le bas */}
              <span className="absolute inset-x-0 bottom-0 h-0 bg-bleu-fluo/10 transition-[height] duration-700 ease-expo group-hover:h-full" aria-hidden />

              <span className="absolute right-[28px] top-[28px] size-[38px] transition-transform duration-700 ease-expo group-hover:rotate-90">
                <Image src="/images/service-plus.svg" alt="" width={38} height={38} />
              </span>

              <span className={`relative flex w-[312px] max-w-[80%] flex-col items-center ${s.gap} ${s.offset}`}>
                <span
                  className="relative block max-w-full transition-transform duration-[900ms] ease-expo group-hover:-translate-y-2 group-hover:scale-[1.06]"
                  style={{ width: s.w, aspectRatio: `${s.w} / ${s.h}` }}
                >
                  <Image src={s.img} alt="" fill sizes="300px" className="object-cover" />
                </span>
                <span className="text-center text-card text-black">{s.title}</span>
              </span>
            </AnchorLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
