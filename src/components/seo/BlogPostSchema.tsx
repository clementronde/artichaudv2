import React from 'react';
import { SITE_URL } from '@/lib/seo';

interface BlogPostSchemaProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  slug: string;
}

export default function BlogPostSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author = "Clément Ronde",
  slug
}: BlogPostSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": {
      "@type": "ImageObject",
      "url": image.startsWith('http') ? image : `${SITE_URL}${image}`,
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Person",
      "name": author,
      "url": `${SITE_URL}/about`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Artichaud Studio",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/icon.png`,
        "width": 512,
        "height": 512
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`
    },
    "articleSection": "Branding & Web Design",
    "inLanguage": "fr-FR"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
