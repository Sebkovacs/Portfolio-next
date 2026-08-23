import { notFound } from 'next/navigation'
import Link from 'next/link'
import styles from './page.module.css'
import { getProject, getAllProjects } from '../../../lib/projects.server'
import ProjectImageGallery from '../../../components/ProjectImageGallery'
import ArchitecturalPlanViewer from '../../../components/ArchitecturalPlanViewer'

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return notFound()

  const allProjects = getAllProjects()
  const currentIndex = allProjects.findIndex((p) => p.id === slug)
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

  const galleryImages = Array.isArray(project.pics) ? project.pics : []
  const planImages = Array.isArray(project.plans) ? project.plans : []

  return (
    <article className={`page-shell ${styles.caseStudy}`}>
      {/* Back to archive link */}
      <div className={styles.topNav}>
        <Link href="/projects" className={styles.backLink}>
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Back to Works Archive</span>
        </Link>
      </div>

      {/* Editorial Header */}
      <header className={styles.header}>
        <div className={styles.headerKicker}>
          {project.type && <span className="badge-arch badge-accent">{project.type}</span>}
          {project.status && <span className="badge-arch">{project.status}</span>}
          {project.location && <span className={styles.locationMeta}>{project.location}</span>}
        </div>

        <h1 className={styles.title}>{project.title}</h1>
        
        {project.summary && <p className={styles.leadSummary}>{project.summary}</p>}
      </header>

      {/* Key Project Specifications Matrix */}
      <section className={styles.specSection} aria-label="Project Specifications">
        <div className={styles.specGrid}>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Typology</span>
            <strong className={styles.specValue}>{project.type || 'Coastal Residence'}</strong>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Location / Coastal Region</span>
            <strong className={styles.specValue}>{project.location || 'NSW, Australia'}</strong>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Project Status</span>
            <strong className={styles.specValue}>{project.status || 'Complete'}</strong>
          </div>
          {project.area && (
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Floor Area</span>
              <strong className={styles.specValue}>{project.area}</strong>
            </div>
          )}
          {project.software && (
            <div className={styles.specItem}>
              <span className={styles.specLabel}>BIM &amp; Environmental Modeling</span>
              <strong className={styles.specValue}>{project.software}</strong>
            </div>
          )}
          {project.work && (
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Scope of Architectural Service</span>
              <strong className={styles.specValue}>{project.work}</strong>
            </div>
          )}
        </div>
      </section>

      {/* Sustainability Performance Card */}
      {(project.nathers || project.energy) && (
        <section className={styles.sustainabilityCard}>
          <div className={styles.sustainabilityHeader}>
            <span className={styles.sustainabilityIcon}>
              <span className="material-symbols-outlined">eco</span>
            </span>
            <div>
              <h3 className={styles.sustainabilityTitle}>Environmental Performance</h3>
              <p className={styles.sustainabilitySubtitle}>Designed for long-term thermal comfort and energy resilience</p>
            </div>
          </div>
          <div className={styles.sustainabilityGrid}>
            {project.nathers && (
              <div className={styles.sustainabilityItem}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.2rem', color: 'var(--color-sage)' }}>stars</span>
                <div>
                  <strong>NatHERS Rating</strong>
                  <span>{project.nathers}</span>
                </div>
              </div>
            )}
            {project.energy && (
              <div className={styles.sustainabilityItem}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.2rem', color: 'var(--color-sage)' }}>solar_power</span>
                <div>
                  <strong>Energy System</strong>
                  <span>{project.energy}</span>
                </div>
              </div>
            )}
            <div className={styles.sustainabilityItem}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.2rem', color: 'var(--color-sage)' }}>water_drop</span>
              <div>
                <strong>Water Strategy</strong>
                <span>Rainwater Harvesting &amp; Filtration</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Interactive Editorial Image Gallery */}
      {galleryImages.length > 0 && (
        <section className={styles.gallerySection}>
          <ProjectImageGallery
            projectTitle={project.title}
            shortTitle={project.shortTitle}
            images={galleryImages}
          />
        </section>
      )}

      {/* In-Depth Architectural Narrative & Sustainable Case Study */}
      {project.contentHtml && (
        <section className={styles.narrativeSection} aria-label="Architectural Case Study">
          <div className={styles.narrativeHeader}>
            <span className="badge-arch badge-accent">Design Enquiry</span>
            <h2 className={styles.sectionHeading}>The Architectural Case Study</h2>
          </div>

          <div
            className={styles.narrativeContent}
            dangerouslySetInnerHTML={{ __html: project.contentHtml }}
          />

          {/* Contextual Site Assessment Callout */}
          <div className={styles.siteAssessmentCallout}>
            <div className={styles.calloutIcon}>
              <span className="material-symbols-outlined">explore</span>
            </div>
            <div className={styles.calloutText}>
              <strong>Evaluating a Coastal Site?</strong>
              <p>
                We conduct pre-purchase site diligence, assessing wind vectors, sun angles, environmental overlays, and council approval pathways for coastal landholders across NSW.
              </p>
            </div>
            <Link href="/contact" className="btn-secondary">
              <span>Book Site Discovery</span>
            </Link>
          </div>
        </section>
      )}

      {/* Dedicated Interactive Architectural Plan & Drawing Viewer */}
      {planImages.length > 0 && (
        <section className={styles.plansSectionWrapper}>
          <ArchitecturalPlanViewer
            projectTitle={project.title}
            shortTitle={project.shortTitle}
            plans={planImages}
            north={project.north}
          />
        </section>
      )}

      {/* Next / Previous Project Navigation */}
      <nav className={styles.projectNav} aria-label="Project navigation">
        <div className={styles.navPrev}>
          {prevProject ? (
            <Link href={`/projects/${prevProject.id}`} className={styles.navLinkCard}>
              <span className={styles.navDirection}>
                <span className="material-symbols-outlined">arrow_back</span>
                <span>Previous Project</span>
              </span>
              <strong className={styles.navProjectTitle}>{prevProject.title}</strong>
            </Link>
          ) : <div />}
        </div>

        <div className={styles.navNext}>
          {nextProject ? (
            <Link href={`/projects/${nextProject.id}`} className={styles.navLinkCard}>
              <span className={styles.navDirection}>
                <span>Next Project</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </span>
              <strong className={styles.navProjectTitle}>{nextProject.title}</strong>
            </Link>
          ) : <div />}
        </div>
      </nav>

      {/* Conversion Banner */}
      <section className={styles.projectCta}>
        <div className={styles.projectCtaInner}>
          <div>
            <span className="badge-arch badge-accent">Coastal Consultation</span>
            <h2 className={styles.projectCtaTitle}>Considering a similar coastal build or site acquisition?</h2>
            <p className={styles.projectCtaText}>
              We assess wind orientation, sun angles, environmental constraints, and council planning pathways across NSW.
            </p>
          </div>
          <Link href="/contact" className="btn-primary">
            <span>Arrange Consultation</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>
    </article>
  )
}
