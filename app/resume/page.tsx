import styles from './page.module.css'

const downloads = [
  {
    label: 'Resume (PDF)',
    href: '/files/Resume-Sebastian-Kovacs-2025.pdf',
    meta: 'Updated January 2025 | 2 pages',
  },
  {
    label: 'Portfolio (PDF)',
    href: '/files/Portfolio-Sebastian-Kovacs-2025.pdf',
    meta: 'Updated January 2025 | 12 projects',
  },
]

const experience = [
  {
    title: 'Project Architect - EJE Architecture',
    period: '2022 - Present',
    summary:
      'Directing hyperscale data-centre campuses from early site evaluation through Concept, DA and SSDA submissions while advising residential delivery teams.',
    highlights: [
      'Coordinated multi-disciplinary consultants to align planning, resilience and energy objectives across multi-stage campuses.',
      'Shaped approval narratives with NSW DPE, Ausgrid and local councils to de-risk critical programme milestones.',
      'Built digital workflows combining BIM 360, Unreal and live data visualisation to accelerate client decision cycles.',
    ],
  },
  {
    title: 'Project Architect - SDA',
    period: '2019 - 2022',
    summary:
      'Delivered bespoke coastal residences with narrative-led client engagement, planning approvals and construction documentation oversight.',
    highlights: [
      'Secured complex coastal approvals by translating client stories into evidence-based design statements for stakeholders.',
      'Coordinated consultants and builders across detailed design, tender and contract administration to protect budget and craft intent.',
      'Mentored graduate designers in storytelling, documentation standards and site coordination.',
    ],
  },
]

const competencies = [
  {
    title: 'Strategy & Delivery',
    items: ['Data-centre campus roadmaps', 'DA / SSDA approvals', 'Stakeholder alignment'],
  },
  {
    title: 'Technical',
    items: ['Revit + BIM 360 standards', 'Realtime visualisation (Unreal / WebGL)', 'Next.js + TypeScript tooling'],
  },
  {
    title: 'Leadership',
    items: ['Mentoring cross-functional teams', 'Client storytelling', 'Consultant and contractor coordination'],
  },
]

export default function ResumePage() {
  return (
    <section className="page-shell">
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Resume snapshot</h1>
        <p>
          Architect guiding hyperscale digital infrastructure and crafted coastal retreats. Navigates NSW approval
          pathways, aligns investors and communities, and brings emerging visualisation tech into design reviews.
        </p>
        <div className={styles.downloads}>
          {downloads.map((item) => (
            <a key={item.href} className={styles.button} href={item.href} download>
              <span>{item.label}</span>
              {item.meta && <span className={styles.downloadMeta}>{item.meta}</span>}
            </a>
          ))}
        </div>
      </div>

      <div className={styles.timeline}>
        {experience.map((role) => (
          <article key={role.title}>
            <h2 className={styles.blockTitle}>{role.title}</h2>
            <p className={styles.blockBody}>{role.summary}</p>
            {role.highlights?.length ? (
              <ul className={styles.blockList}>
                {role.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : null}
            <p className={styles.helper}>{role.period}</p>
          </article>
        ))}
      </div>

      <div className={styles.columns}>
        {competencies.map((group) => (
          <div key={group.title} className={styles.card}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
