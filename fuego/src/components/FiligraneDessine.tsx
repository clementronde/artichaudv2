import { FILIGRANE_BAS } from "@/lib/filigrane-bas";

/**
 * Grand logo « fuego » en filigrane (bordeaux à 4 %), en SVG dans la page pour pouvoir le dessiner au scroll :
 * le contour se trace trait par trait (data-draw, voir ScrollAnimations), puis le remplissage apparaît.
 * Sans animation (mouvement réduit, pas de JS), il est affiché tel que dans Figma.
 */
export default function FiligraneDessine({ className }: { className?: string }) {
  const { width, height, d } = FILIGRANE_BAS;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" aria-hidden className={className}>
      <path data-draw d={d} fill="#4C020C" fillOpacity={0.04} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
