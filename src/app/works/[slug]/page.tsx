import { projects } from '@/data/project';
import { getAllPosts } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProjectClient from '@/components/Project/ProjectClient';

const BASE_URL = 'https://artichaud-studio.com';

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

    return {
      title: `${project.client} - ${project.category} | Artichaud Studio`,
      description: project.description[0],
      keywords: [...project.services, project.category, project.client],
      alternates: {
        canonical: `${BASE_URL}/works/${project.slug}`,
      },
      openGraph: {
        title: `${project.client} - ${project.category}`,
        description: project.description[0],
        type: 'website',
        url: `${BASE_URL}/works/${project.slug}`,
        siteName: 'Artichaud Studio',
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
        title: `${project.client} - ${project.category}`,
        description: project.description[0],
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

  return <ProjectClient project={project} posts={posts} />;
}
