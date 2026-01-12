import React from 'react';

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
      "url": image.startsWith('http') ? image : `https://artichaud-studio.com${image}`,
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Person",
      "name": author,
      "url": "https://artichaud-studio.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Artichaud Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://artichaud-studio.com/icon.png",
        "width": 512,
        "height": 512
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://artichaud-studio.com/blog/${slug}`
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
