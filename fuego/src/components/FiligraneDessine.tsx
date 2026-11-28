import { FILIGRANE_BAS, FILIGRANE_BAS_PINCEAU } from "@/lib/filigrane-bas";

/**
 * Grand logo « fuego » en filigrane (bordeaux à 4 %), peint au pinceau au fil du scroll (data-paint, voir ScrollAnimations) :
 * un masque fait de traits épais qui suivent le geste du logo se dessine, avec un bord irrégulier de pinceau sec, et révèle
 * le logo plein. La peinture apparaît plus foncée (« humide ») puis sèche jusqu'aux 4 % de la maquette ; le masque est
 * ensuite retiré. Sans animation (mouvement réduit, pas de JS), le logo est affiché tel que dans Figma.
 */
export default function FiligraneDessine({ className }: { className?: string }) {
  const { width, height, d } = FILIGRANE_BAS;
  const id = "filigrane-pinceau";
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" aria-hidden className={className}>
      <defs>
        <filter id={`${id}-bord`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="22" />
        </filter>
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}>
          <g filter={`url(#${id}-bord)`}>
            {FILIGRANE_BAS_PINCEAU.map((s, i) => (
              <path
                key={i}
                data-paint-stroke
                data-at={s.at}
                data-duration={s.duration}
                data-ease={s.ease}
                d={s.d}
                stroke="#fff"
                strokeWidth={s.width}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </g>
        </mask>
      </defs>
      <path data-paint={id} d={d} fill="#4C020C" fillOpacity={0.04} />
    </svg>
  );
}
