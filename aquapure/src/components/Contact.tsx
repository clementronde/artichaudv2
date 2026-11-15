import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="grid w-full grid-cols-1 lg:grid-cols-2">
      <div data-clip className="relative h-[480px] overflow-hidden sm:h-[640px] lg:h-auto lg:min-h-[981px]">
        <div data-parallax="0.2" className="absolute inset-[-10%_0] will-change-transform">
          <Image
            src="/images/contact.jpg"
            alt="Plombier AquaPure installant un équipement sanitaire"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex items-center justify-center bg-bleu-fonce px-5 py-20 sm:px-10 lg:px-[71px] lg:py-[111px]">
        <div className="flex w-full max-w-[613px] flex-col gap-14 lg:gap-[78px]">
          <SectionHeading
            light
            tag="Contact"
            title="Tu as besoin d’un plombier ? Obtenez votre estimation dès maintenant"
            width="max-w-[471px]"
          />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
