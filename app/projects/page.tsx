import ProjectsCatalogue from '../../components/ProjectsCatalogue'
import styles from './page.module.css'
import { getAllProjects } from '../../lib/projects.server'

function extractSoftwareValues(value?: string | null) {
  if (!value) return [] as string[]
  return value
    .split(/[,/]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

export default function ProjectsPage() {
  const projects = getAllProjects()
  const typeValues = new Set<string>()
  const statusValues = new Set<string>()
  const softwareValues = new Set<string>()

  projects.forEach((project) => {
    if (project.type) typeValues.add(project.type)
    if (project.status) statusValues.add(project.status)
    extractSoftwareValues(project.software).forEach((value) => softwareValues.add(value))
  })

  const filterOptions = [
    ...Array.from(typeValues)
      .sort((a, b) => a.localeCompare(b))
      .map((value) => ({ id: `type:${value}`, label: value, key: 'type' as const, group: 'Project type' })),
    ...Array.from(statusValues)
      .sort((a, b) => a.localeCompare(b))
      .map((value) => ({ id: `status:${value}`, label: value, key: 'status' as const, group: 'Status' })),
    ...Array.from(softwareValues)
      .sort((a, b) => a.localeCompare(b))
      .map((value) => ({ id: `software:${value}`, label: value, key: 'software' as const, group: 'Software' })),
  ]

  const catalogueProjects = projects.map((project) => ({
    id: project.id,
    title: project.title,
    shortTitle: project.shortTitle,
    thumb: project.thumb,
    thumbAlt: project.thumbAlt,
    type: project.type,
    status: project.status,
    location: project.location,
    software: project.software,
  }))

  return (
    <section className="page-shell">
      <div className={styles.gridWrapper}>
        <div className={styles.filtersPanel}>
          <h1 className={styles.heading}>Projects archive</h1>
          <p className={styles.subtext}>Filter by typology, status or tooling to explore the complete portfolio.</p>
        </div>
        <ProjectsCatalogue projects={catalogueProjects} filters={filterOptions} />
      </div>
    </section>
  )
}

