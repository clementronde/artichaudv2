'use client'
import Image from 'next/image'
import Link from 'next/link'
import { projects as allProjects, type Project } from '@/data/project'

// Les 4 projets mis en avant, dans l'ordre d'affichage
const FEATURED_SLUGS = ['charitio', 'keleti', 'disobey', 'lumyn']

const projects = FEATURED_SLUGS
  .map((slug) => allProjects.find((project) => project.slug === slug))
  .filter((project): project is Project => Boolean(project))

const ProjectCard = ({ project }: { project: Project }) => (
  <Link href={`/works/${project.slug}`} className="group flex flex-col gap-4">
    <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
      <Image
        src={project.cover}
        alt={`Projet ${project.client} par Artichaud Studio`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
      />
    </div>

    <div className="flex items-center gap-3 text-sm md:text-base">
      <span className="font-medium text-black">{project.category}</span>
      <span className="font-light italic text-gray-400">pour</span>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-black"></div>
        <span className="font-bold text-black">{project.client}</span>
      </div>
    </div>
  </Link>
)

export default function TrustedSection() {
  return (
    <section className="relative w-full bg-[#FFFFFF] py-20 md:py-32 px-5 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 md:mb-16 items-end">
        <div className="col-span-1 md:col-span-6 lg:col-span-5">
          <h2
            className="text-black leading-[1.1]"
            style={{
              fontSize: 'clamp(32px, 4vw, 55px)',
              fontFamily: 'Helvetica Now Display, Arial, sans-serif',
              fontWeight: '400'
            }}
          >
            Parce qu'ils nous ont déjà fait confiance
          </h2>
        </div>

        <div className="col-span-1 md:col-span-6 lg:col-span-7 flex md:justify-end">
          <Link href="/works" className="px-6 py-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-colors text-black">
            Voir les projets →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-12">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
