import { projects } from '@/data/project';
import { getAllPosts } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProjectClient from '@/components/Project/ProjectClient';
import RelatedLinks from '@/components/seo/RelatedLinks';
import { relatedLinkGroups } from '@/components/seo/relatedLinksData';
import { SITE_NAME, SITE_URL, truncateSeoDescription } from '@/lib/seo';

const BASE_URL = SITE_URL;

// 1. GÉNÉRATION STATIQUE (SSG)
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// 2. MÉTA-DONNÉES SEO
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  try {
    const params = await props.params;
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) return {};

    const ogImage = project.cover.startsWith('http')
      ? project.cover
      : `${BASE_URL}${project.cover}`;
    const description = project.seoDescription ?? truncateSeoDescription(project.description.join(' '));
    const title = project.seoTitle
      ? `${project.seoTitle} | ${SITE_NAME}`
      : `${project.client} - ${project.category} | ${SITE_NAME}`;
    const socialTitle = project.seoTitle ?? `${project.client} - ${project.category}`;

    return {
      title,
      description,
      keywords: [...project.services, project.category, project.client, ...(project.seoKeywords ?? [])],
      alternates: {
        canonical: `${BASE_URL}/works/${project.slug}`,
      },
      openGraph: {
        title: socialTitle,
        description,
        type: 'website',
        url: `${BASE_URL}/works/${project.slug}`,
        siteName: SITE_NAME,
        locale: 'fr_FR',
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: project.client,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: socialTitle,
        description,
        images: [ogImage],
        creator: '@artichaudstudio',
      },
    };
  } catch (e) {
    console.error("Error generating metadata:", e);
    return {
      title: 'Artichaud Studio Works'
    };
  }
}

// 3. PAGE PROJET
export default async function ProjectPage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const description = project.seoDescription ?? truncateSeoDescription(project.description.join(' '));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${BASE_URL}/works/${project.slug}#creativework`,
    name: `${project.client} - ${project.category}`,
    headline: project.seoTitle ?? `${project.client} - ${project.category}`,
    description,
    url: `${BASE_URL}/works/${project.slug}`,
    image: project.cover.startsWith('http') ? project.cover : `${BASE_URL}${project.cover}`,
    dateCreated: project.year,
    inLanguage: 'fr-FR',
    creator: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: SITE_NAME,
      url: BASE_URL,
    },
    about: project.services,
    keywords: [...project.services, project.category, project.client, ...(project.seoKeywords ?? [])].join(', '),
  };

  // Récupération des articles de blog pour la section blog
  const rawPosts = getAllPosts();
  const posts = rawPosts.map((post) => ({
    id: post.slug,
    slug: post.slug,
    title: post.meta.title,
    excerpt: post.meta.excerpt,
    image: post.meta.image,
    readTime: post.meta.readingTime,
    tags: post.meta.tags || []
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectClient project={project} posts={posts} />
      <RelatedLinks
        title="Créer un projet du même niveau"
        links={[
          relatedLinkGroups.serviceBranding[0],
          relatedLinkGroups.serviceWeb[0],
          relatedLinkGroups.serviceSeo[0],
          relatedLinkGroups.editorial[3],
        ]}
      />
    </>
  );
}
