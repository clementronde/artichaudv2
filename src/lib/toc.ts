export interface TocHeading {
  id: string
  text: string
}

// Même calcul côté sommaire et côté titres H2, pour que les ancres correspondent
export function slugifyHeading(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Retire la mise en forme Markdown pour ne garder que le texte affiché
function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .trim()
}

// Liste les titres de niveau 2 de l'article, en ignorant les blocs de code
export function getHeadings(markdown: string): TocHeading[] {
  const headings: TocHeading[] = []
  let inCode = false

  for (const line of markdown.split(/\r?\n/)) {
    if (line.trim().startsWith('```')) inCode = !inCode
    if (inCode) continue

    const match = line.match(/^##\s+(.+?)\s*#*\s*$/)
    if (!match) continue

    const text = stripMarkdown(match[1])
    headings.push({ id: slugifyHeading(text), text })
  }

  return headings
}
