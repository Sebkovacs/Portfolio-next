import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProject } from '../../../lib/projects.server'

const IMAGE_SIZES = '(min-width: 1024px) 45vw, (min-width: 640px) 70vw, 100vw'
const PLAN_SIZES = '(min-width: 1024px) 35vw, (min-width: 640px) 45vw, 90vw'

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const project = getProject(slug)
  if (!project) return notFound()

  const metaParts = [project.type, project.status, project.location].filter(Boolean)
  const galleryImages = Array.isArray(project.pics) ? project.pics : []
  const planImages = Array.isArray(project.plans) ? project.plans : []

  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-wide">{project.title}</h1>
        {metaParts.length > 0 && <p className="text-sm opacity-80">{metaParts.join(' / ')}</p>}
        {project.summary && <p className="prose max-w-none opacity-90">{project.summary}</p>}
        <div className="flex flex-wrap gap-3 text-sm">
          {project.pano && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={project.pano}
              className="rounded-md border border-[var(--border1)] px-3 py-1 hover:bg-[var(--bg2)]"
            >
              3D Tour
            </a>
          )}
          {Array.isArray(project.panos) &&
            project.panos.map((p) => (
              <a
                key={p.link}
                target="_blank"
                rel="noopener noreferrer"
                href={p.link}
                className="rounded-md border border-[var(--border1)] px-3 py-1 hover:bg-[var(--bg2)]"
              >
                {p.name}
              </a>
            ))}
        </div>
      </header>

      {galleryImages.length > 0 && (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {galleryImages.map((pic, index) => (
            <figure
              key={`${pic.id}`}
              className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-[var(--border1)] bg-[var(--bg2)]"
            >
              <Image
                src={`/projects/${project.shortTitle}${pic.image}`}
                alt={pic.alt || pic.caption || `${project.title} image ${index + 1}`}
                fill
                sizes={IMAGE_SIZES}
                priority={index === 0}
                className="object-cover"
              />
              {(pic.caption || pic.alt) && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-[rgba(0,0,0,0.55)] px-3 py-2 text-xs leading-snug text-white backdrop-blur-sm">
                  {pic.caption || pic.alt}
                </figcaption>
              )}
            </figure>
          ))}
        </section>
      )}

      {planImages.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-wide">Plans</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {planImages.map((pl, index) => (
              <figure
                key={`${pl.id}`}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-[var(--border1)] bg-[var(--bg2)]"
              >
                <Image
                  src={`/projects/${project.shortTitle}${pl.plan}`}
                  alt={pl.alt || `${project.title} plan ${index + 1}`}
                  fill
                  sizes={PLAN_SIZES}
                  className="object-contain p-4"
                />
                {pl.alt && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-[rgba(0,0,0,0.55)] px-3 py-2 text-xs leading-snug text-white backdrop-blur-sm">
                    {pl.alt}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      <div className="pt-4">
        <Link href="/" className="rounded-md border border-[var(--border1)] px-3 py-1 hover:bg-[var(--bg2)]">
          Back to Projects
        </Link>
      </div>
    </article>
  )
}
