import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import { getAllProjects } from '../lib/projects.server'

const aboutStatements = [
  "Hey — I'm Sebastian Kovacs, a Newcastle-based Project Architect specialising in early-phase data-centre campuses and high-end coastal homes.",
  "Across seven years in practice I've guided hyperscale data-centre projects from blank-site due diligence through Concept, DA and SSDA submissions while delivering bespoke residential retreats along the NSW coastline.",
  "I sit the APE in June 2025 and currently drive concept-to-approval strategy at EJE Architecture. The long game is location-independent design leadership backed by surf-chasing and a portfolio of tech and property ventures.",
  "When I'm not refining facade-to-rack clearances you'll find me wrangling Next.js side projects, shooting sunrise surf sessions, or tearing through books on strategy and neuro-performance.",
]

const homeSections = [
  { key: 'selected', title: 'Selected projects', description: 'Flagship work defining the practice right now.' },
  { key: 'themes', title: 'Themes', description: 'Curated narratives across typologies, clients and climate.' },
  { key: 'portfolios', title: 'Portfolio sets', description: 'Modular collections for proposals and workshops.' },
] as const

type HomeSectionKey = (typeof homeSections)[number]['key']

type CompactProject = {
  id: string
  title: string
  shortTitle: string
  thumb: string
  thumbAlt: string
  type?: string
  status?: string
  location?: string
  homeSections?: string[]
  featured?: boolean
}

function normaliseStatus(value?: string) {
  return value?.toLowerCase().trim() ?? ''
}

function isInSection(project: CompactProject, key: HomeSectionKey) {
  return project.homeSections?.includes(key)
}

function ProjectCard({ project }: { project: CompactProject }) {
  const meta = [project.type, project.status, project.location].filter(Boolean)
  return (
    <Link href={`/projects/${project.id}`} className={styles.projectCard}>
      <div className={styles.projectMedia}>
        <Image
          src={`/projects/${project.shortTitle}${project.thumb}`}
          alt={project.thumbAlt}
          fill
          sizes="(min-width: 1100px) 320px, (min-width: 768px) 45vw, 90vw"
        />
      </div>
      <div className={styles.projectBody}>
        {project.type && <span className={styles.projectTag}>{project.type}</span>}
        <h3 className={styles.projectTitle}>{project.title}</h3>
        {meta.length > 0 && <p className={styles.projectMeta}>{meta.join(' / ')}</p>}
      </div>
    </Link>
  )
}

export default function HomePage() {
  const projects = getAllProjects()

  const compactProjects: CompactProject[] = projects.map((project) => ({
    id: project.id,
    title: project.title,
    shortTitle: project.shortTitle,
    thumb: project.thumb,
    thumbAlt: project.thumbAlt,
    type: project.type,
    status: project.status,
    location: project.location,
    homeSections: project.homeSections,
    featured: project.featured,
  }))

  const completedStatuses = new Set(['constructed', 'built', 'complete'])
  const completed = compactProjects.filter((project) => completedStatuses.has(normaliseStatus(project.status))).length
  const active = Math.max(compactProjects.length - completed, 0)
  const typeCount = new Set(compactProjects.map((project) => project.type).filter(Boolean)).size

  const featuredProjects = compactProjects.filter((project) => project.featured).slice(0, 3)
  const sectionContent = homeSections
    .map((section) => ({
      ...section,
      projects: compactProjects.filter((project) => isInSection(project, section.key)).slice(0, 4),
    }))
    .filter((section) => section.projects.length > 0)

  return (
    <>
      <section className={styles.hero}>
        <div className={`${styles.heroInner} page-shell`}>
          <div className={styles.heroContent}>
            <span className={styles.heroKicker}>Project Architect — Newcastle, Australia</span>
            <h1 className={styles.heroTitle}>
              Sebastian Kovacs designs digital-first campuses and coastal retreats with equal calm.
            </h1>
            <p className={styles.heroLead}>
              Hey — I'm Sebastian Kovacs, a Newcastle-based Project Architect specialising in early-phase data-centre campuses and high-end coastal homes.
            </p>
            <div className={styles.heroActions}>
              <Link href="/projects" className={styles.primaryButton}>
              <span className="material-symbols-sharp" aria-hidden>north_east</span>
              <span>View projects</span>
            </Link>
              <Link href="/contact" className={styles.secondaryButton}>
              <span className="material-symbols-outlined" aria-hidden>handshake</span>
              <span>Start a conversation</span>
            </Link>
            </div>
          </div>
          <aside className={styles.heroPanel} aria-label="Practice snapshot">
            <h2>Snapshot</h2>
            <p>
              Currently shaping concept-to-approval strategy at <strong>EJE Architecture</strong> while preparing for the 2025 Architectural Practice Examination.
            </p>
            <ul className={styles.heroList}>
              <li>
                <strong>Hyperscale data-centre campuses</strong>
                <span>Guiding due diligence, Concept, DA and SSDA submissions for complex digital infrastructure.</span>
              </li>
              <li>
                <strong>Coastal residential retreats</strong>
                <span>Pairing bespoke storytelling with rigorous planning for high-end NSW clients.</span>
              </li>
              <li>
                <strong>Hybrid skill stack</strong>
                <span>Architecture, digital funnels and performance coaching in one toolkit.</span>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className={`${styles.metrics} page-shell`} aria-label="Practice metrics">
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <span>Projects documented</span>
            <strong>{compactProjects.length}</strong>
            <p>Architecture and visual strategy programs captured across this portfolio.</p>
          </div>
          <div className={styles.metricCard}>
            <span>Active programmes</span>
            <strong>{active}</strong>
            <p>Concept, DA and SSDA journeys currently progressing toward approval.</p>
          </div>
          <div className={styles.metricCard}>
            <span>Typologies</span>
            <strong>{typeCount}</strong>
            <p>Data-centre, residential and community works delivered with craft.</p>
          </div>
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section className="page-shell" aria-labelledby="featured-projects">
          <div className={styles.sectionHeading}>
            <h2 id="featured-projects">Featured projects</h2>
            <p>Recent highlights anchored in performance, storytelling and delivery.</p>
          </div>
          <div className={styles.projectGrid}>
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {sectionContent.map((section) => (
        <section key={section.key} className="page-shell" aria-labelledby={`home-section-${section.key}`}>
          <div className={styles.sectionHeading}>
            <h2 id={`home-section-${section.key}`}>{section.title}</h2>
            <p>{section.description}</p>
          </div>
          <div className={styles.projectGrid}>
            {section.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      ))}

      <section className={`${styles.aboutSection} page-shell`} aria-labelledby="about-heading">
        <h2 id="about-heading">Practice perspective</h2>
        {aboutStatements.map((statement) => (
          <p key={statement}>{statement}</p>
        ))}
      </section>
    </>
  )
}

