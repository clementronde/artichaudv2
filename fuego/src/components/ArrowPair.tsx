import Image from "next/image";

/**
 * Paire de flèches de la maquette (une seule image SVG de 63 × 7,36 px, centrée sur une ligne de hauteur nulle),
 * avec deux zones cliquables plus grandes que le dessin.
 */
export default function ArrowPair({ onPrev, onNext, label }: { onPrev: () => void; onNext: () => void; label: string }) {
  return (
    <div className="relative h-0 w-[62px] shrink-0">
      <Image loading="eager" src="/images/fleches.svg" alt="" width={63} height={7.36396} className="pointer-events-none absolute left-[-0.5px] top-[-3.68px] block max-w-none" />
      <button
        type="button"
        onClick={onPrev}
        className="absolute -left-3 -top-5 h-10 w-[calc(50%+12px)] transition-transform duration-500 ease-expo hover:-translate-x-1"
        aria-label={`${label} précédent`}
      />
      <button
        type="button"
        onClick={onNext}
        className="absolute -right-3 -top-5 h-10 w-[calc(50%+12px)] transition-transform duration-500 ease-expo hover:translate-x-1"
        aria-label={`${label} suivant`}
      />
    </div>
  );
}
