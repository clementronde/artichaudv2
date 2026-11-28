import DotButton from "@/components/DotButton";

/** Accroche sous le hero : le texte se « colore » mot à mot au fil du scroll (data-words). */
export default function Intro() {
  return (
    <section id="intro" className="mx-auto flex w-full max-w-site flex-col items-start gap-9 px-5 md:px-10 lg:pl-[34.85%] lg:pr-[60px]">
      <p
        data-words
        className="whitespace-pre-wrap font-serif text-[clamp(1.5rem,1.192rem+1.315vw,2.375rem)] font-extralight leading-[1.5263] text-framboise"
      >
        Niché à l&apos;abri des regards, notre gîte entièrement rénové  a été pensé comme un
        <span className="text-[1.1842em] leading-[0]"> </span>
        <em className="font-normal italic">véritable cocon</em>.<span className="text-[1.1842em] leading-[0]"> </span>
        Que vous veniez pour un week-end romantique ou des vacances en famille, posez vos valises, respirez et profitez de la
        douceur de vivre.
      </p>
      <DotButton href="#maison" variant="framboise" data-fade>
        Voir la maison
      </DotButton>
    </section>
  );
}
