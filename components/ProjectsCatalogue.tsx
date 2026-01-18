"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import styles from './ProjectsCatalogue.module.css'

type FilterKey = 'type' | 'status' | 'software'

type ProjectCard = {
  id: string
  title: string
  shortTitle: string
  thumb: string
  thumbAlt: string
  type?: string
  status?: string
  location?: string
  software?: string
}

type FilterOption = {
  id: string
  label: string
  key: FilterKey
  group: string
}

type Props = {
  projects: ProjectCard[]
  filters: FilterOption[]
}

function projectTokens(project: ProjectCard) {
  const tokens: string[] = []
  if (project.type) tokens.push(`type:${project.type}`)
  if (project.status) tokens.push(`status:${project.status}`)
  if (project.software) {
    const values = project.software
      .split(/[,/]/)
      .map((value) => value.trim())
      .filter(Boolean)
    values.forEach((value) => tokens.push(`software:${value}`))
  }
  return tokens
}

export default function ProjectsCatalogue({ projects, filters }: Props) {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())

  const groupedFilters = useMemo(() => {
    const map = new Map<string, FilterOption[]>()
    for (const option of filters) {
      const group = map.get(option.group) ?? []
      group.push(option)
      map.set(option.group, group)
    }
    return Array.from(map.entries())
  }, [filters])

  const filteredProjects = useMemo(() => {
    if (activeFilters.size === 0) return projects
    return projects.filter((project) => {
      const tokens = projectTokens(project)
      return tokens.some((token) => activeFilters.has(token))
    })
  }, [activeFilters, projects])

  const summaryText = activeFilters.size
    ? `Showing ${filteredProjects.length} of ${projects.length} projects`
    : `Showing ${projects.length} projects`

  const toggleFilter = (id: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const clearFilters = () => setActiveFilters(new Set())

  return (
    <div className={styles.catalogue}>
      <div className={styles.filters}>
        <div className={styles.filtersHeader}>
          <div className={styles.filtersSummary}>{summaryText}</div>
          {activeFilters.size > 0 && (
            <button type="button" className={styles.resetButton} onClick={clearFilters}>
              Reset filters
            </button>
          )}
        </div>
        <div className={styles.filtersGroups}>
          {groupedFilters.map(([groupTitle, options]) => (
            <div key={groupTitle} className={styles.filtersGroup}>
              <h3>{groupTitle}</h3>
              <div className={styles.chips}>
                {options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`${styles.chip} ${activeFilters.has(option.id) ? styles.chipActive : ''}`.trim()}
                    aria-pressed={activeFilters.has(option.id)}
                    onClick={() => toggleFilter(option.id)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className={styles.grid}>
          {filteredProjects.map((project) => {
            const metaParts = [project.status, project.location].filter(Boolean)
            return (
              <Link key={project.id} href={`/projects/${project.id}`} className={styles.card}>
                <div className={styles.cardMedia}>
                  <Image
                    src={`/projects/${project.shortTitle}${project.thumb}`}
                    alt={project.thumbAlt}
                    fill
                    sizes="(min-width: 1100px) 320px, (min-width: 768px) 45vw, 90vw"
                  />
                </div>
                <div className={styles.cardBody}>
                  {project.type && <span className={styles.cardTag}>{project.type}</span>}
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  {metaParts.length > 0 && <p className={styles.cardMeta}>{metaParts.join(' / ')}</p>}
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className={styles.empty}>No projects match the selected filters yet.</div>
      )}
    </div>
  )
}
