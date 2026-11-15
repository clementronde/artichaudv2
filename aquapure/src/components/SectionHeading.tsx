import { clsx } from "@/lib/clsx";

type Props = {
  tag: string;
  title: string;
  /** Titre clair sur fond foncé */
  light?: boolean;
  className?: string;
  /** Largeur max du bloc (791px par défaut, comme la maquette) */
  width?: string;
  as?: "h2" | "h3";
};

/** Étiquette cyan + titre H2, motif répété dans toutes les sections. */
export default function SectionHeading({ tag, title, light, className, width = "max-w-[791px]", as: Tag = "h2" }: Props) {
  return (
    <div className={clsx("flex w-full flex-col items-start gap-[22px]", width, className)}>
      <span data-tag className="inline-flex bg-bleu-fluo p-2.5 text-txt text-bleu-fonce">
        <span>{tag}</span>
      </span>
      <Tag
        data-split
        className={clsx(
          "text-[clamp(1.875rem,1.2rem+1.6vw,2.5rem)] leading-none tracking-[-0.06em]",
          light ? "text-white" : "text-bleu-fonce",
        )}
      >
        {title}
      </Tag>
    </div>
  );
}
