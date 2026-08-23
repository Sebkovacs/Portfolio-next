"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import styles from './ProjectsCatalogue.module.css'

export type ProjectCardData = {
  id: string
  title: string
  shortTitle: string
  thumb: string
  thumbAlt: string
  type?: string
  status?: string
  location?: string
  software?: string
  date?: string
}

type Props = {
  projects: ProjectCardData[]
}

export default function ProjectsCatalogue({ projects }: Props) {
  const [searchQuery, setSearchQuery] = useState('')

  const futureIds = new Set([
    'salt-point-residence',
    'dune-house-fingal',
    'crescent-head-surf-shack',
    'redhead-bluff-pavilion',
    'seal-rocks-sanctuary',
    'bar-beach-dual-occ'
  ])

  // Filter based on search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchTitle = project.title.toLowerCase().includes(q)
        const matchType = project.type?.toLowerCase().includes(q)
        const matchLoc = project.location?.toLowerCase().includes(q)
        const matchStatus = project.status?.toLowerCase().includes(q)
        if (!matchTitle && !matchType && !matchLoc && !matchStatus) return false
      }
      return true
    })
  }, [projects, searchQuery])

  // Split into Flagship and Archive
  const flagshipProjects = filteredProjects.filter(p => futureIds.has(p.id))
  const archiveProjects = filteredProjects.filter(p => !futureIds.has(p.id))

  return (
    <div className={styles.catalogueWrapper}>
      {/* Search Bar */}
      <div className={styles.controlsBar}>
        <div className={styles.searchBox} style={{ width: '100%', maxWidth: '500px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>search</span>
          <input
            type="text"
            placeholder="Search portfolio by title, LGA, or typology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery('')} className={styles.clearSearch}>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>close</span>
            </button>
          )}
        </div>
      </div>

      {/* Section 1: Flagship Coastal Works (Grid) */}
      <section className={styles.catalogueSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Flagship Coastal Works</h2>
          <p className={styles.sectionSubtitle}>
            Our primary focus: highly bespoke, environmentally resilient coastal residences and off-grid sanctuaries.
          </p>
        </div>

        {flagshipProjects.length > 0 ? (
          <div className={styles.grid}>
            {flagshipProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} className={styles.card}>
                <div className={styles.cardMedia}>
                  <Image
                    src={`/projects/${project.shortTitle}${project.thumb}`}
                    alt={project.thumbAlt || project.title}
                    fill
                    sizes="(min-width: 1200px) 380px, (min-width: 768px) 45vw, 100vw"
                    className={styles.cardImg}
                  />
                  <div className={styles.mediaOverlay}>
                    <span className="material-symbols-outlined">arrow_outward</span>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardHeader}>
                    {project.type && <span className="badge-arch badge-accent">{project.type}</span>}
                    {project.status && <span className={styles.cardStatus}>{project.status}</span>}
                  </div>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  {project.location && <p className={styles.cardMeta}>{project.location}</p>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className={styles.emptyStateText}>No flagship projects found matching your search.</p>
        )}
      </section>

      {/* Section 2: Past Works Archive (Table) */}
      <section className={styles.catalogueSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Past Works Archive</h2>
          <p className={styles.sectionSubtitle}>
            A comprehensive index of previous residential commissions, alterations, and multi-residential projects.
          </p>
        </div>

        {archiveProjects.length > 0 ? (
          <div className={styles.tableWrapper}>
            <table className={styles.indexTable}>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Typology</th>
                  <th>Location / Region</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {archiveProjects.map((project) => (
                  <tr key={project.id} className={styles.tableRow}>
                    <td className={styles.projectNameCell}>
                      <Link href={`/projects/${project.id}`} className={styles.tableTitleLink}>
                        {project.title}
                      </Link>
                    </td>
                    <td>
                      {project.type ? (
                        <span className="badge-arch badge-accent">{project.type}</span>
                      ) : (
                        <span className={styles.tableMuted}>Residential</span>
                      )}
                    </td>
                    <td className={styles.tableMuted}>{project.location || 'NSW, Australia'}</td>
                    <td>
                      <span className={styles.statusPill}>{project.status || 'Complete'}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <Link href={`/projects/${project.id}`} className={styles.tableAction}>
                        <span>Explore</span>
                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className={styles.emptyStateText}>No past works found matching your search.</p>
        )}
      </section>
    </div>
  )
}
