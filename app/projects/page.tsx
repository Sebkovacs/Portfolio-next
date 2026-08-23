import ProjectsCatalogue, { ProjectCardData } from '../../components/ProjectsCatalogue'
import styles from './page.module.css'
import { getAllProjects } from '../../lib/projects.server'

export const metadata = {
  title: 'Selected Works & Coastal Concepts | SALT & STONE Architecture',
  description: 'Archive of bespoke Class 1 coastal residences, off-grid eco pavilions, and residential studies across NSW by Salt & Stone Architecture.',
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  const catalogueProjects: ProjectCardData[] = projects.map((project) => ({
    id: project.id,
    title: project.title,
    shortTitle: project.shortTitle,
    thumb: project.thumb,
    thumbAlt: project.thumbAlt,
    type: project.type,
    status: project.status,
    location: project.location,
    software: project.software,
    date: project.date,
  }))

  return (
    <div className={`page-shell ${styles.archivePage}`}>
      {/* Header Banner */}
      <header className={styles.header}>
        <div className={styles.headerKicker}>
          <span className="badge-arch badge-accent">SALT &amp; STONE</span>
          <span className="badge-arch">Class 1 Coastal Portfolio</span>
        </div>
        <h1 className={styles.heading}>Selected Works &amp; Coastal Concepts</h1>
        <p className={styles.subtext}>
          An archive of ocean-orientated dwellings, headland pavilions, and off-grid sanctuaries crafted across Newcastle, Port Stephens, Lake Macquarie, and the NSW coastline.
        </p>
      </header>

      {/* Catalogue with Dual Views and Presets */}
      <ProjectsCatalogue projects={catalogueProjects} />
    </div>
  )
}
