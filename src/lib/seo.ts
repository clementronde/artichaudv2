export const SITE_URL = "https://www.artichaud-studio.fr";
export const SITE_NAME = "Artichaud Studio";

export function cleanSeoText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\s+([,.!?;:])/g, "$1")
    .replace(/([,.!?;:])(?=\S)/g, "$1 ")
    .trim();
}

export function truncateSeoDescription(text: string, maxLength = 155): string {
  const cleanText = cleanSeoText(text);

  if (cleanText.length <= maxLength) return cleanText;

  const shortened = cleanText.slice(0, maxLength + 1);
  const lastSeparator = Math.max(
    shortened.lastIndexOf("."),
    shortened.lastIndexOf("!"),
    shortened.lastIndexOf("?"),
    shortened.lastIndexOf(";")
  );
  const lastSpace = shortened.lastIndexOf(" ");
  const cutAt = lastSeparator > 90 ? lastSeparator + 1 : lastSpace;

  return `${shortened.slice(0, cutAt).trim()}...`;
}
