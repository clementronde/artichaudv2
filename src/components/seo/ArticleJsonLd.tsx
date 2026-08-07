import { SITE_URL } from '@/lib/seo';

interface ArticleJsonLdProps {
  title: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  author: string
  url: string
}

export default function ArticleJsonLd(props: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": props.title,
    "description": props.description,
    "image": props.image,
    "datePublished": props.datePublished,
    "dateModified": props.dateModified || props.datePublished,
    "author": {
      "@type": "Organization",
      "name": props.author,
      "url": SITE_URL
    },
    "publisher": {
      "@type": "Organization",
      "name": "Artichaud Studio",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/icon.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": props.url
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
