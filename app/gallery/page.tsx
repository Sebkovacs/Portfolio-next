import Image from 'next/image'
import Link from 'next/link'
import { getAllProjects } from '../../lib/projects.server'

export default function GalleryPage() {
  const projects = getAllProjects()
  const gallery = projects.flatMap(p => p.pics?.map(pic => ({
    key: `${p.id}-${pic.id}`,
    src: `/projects/${p.shortTitle}${pic.image}`,
    alt: pic.caption || pic.alt,
    link: `/projects/${p.id}`
  })) || [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-wide">Gallery</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {gallery.map(g => (
          <Link key={g.key} href={g.link} className="group relative block aspect-square overflow-hidden rounded-md border border-[var(--border1)]">
            <Image src={g.src} alt={g.alt} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
          </Link>
        ))}
      </div>
    </div>
  )
}

