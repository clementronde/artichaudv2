interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbsJsonLdProps {
  items: BreadcrumbItem[]
}

export default function BreadcrumbsJsonLd({ items }: BreadcrumbsJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
