import Link from 'next/link'
import styles from './page.module.css'

export const metadata = {
  title: 'Practice Profile & Philosophy | SALT & STONE Architecture',
  description: 'The architectural manifesto, environmental principles, and statutory credentials behind Salt & Stone Architecture. Founded by Sebastian Kovacs, Registered Architect NSW 13540.',
}

const environmentalPillars = [
  {
    number: '01',
    title: 'Microclimate & Swell Responsiveness',
    desc: 'We map wind vectors, tidal movements, and solar trajectories from day one. Buildings are shaped to deflect abrasive southerly gales while capturing offshore morning breezes and winter sun.',
  },
  {
    number: '02',
    title: 'Thermal Inertia & Earth Mass',
    desc: 'By integrating stabilised rammed earth and local Sydney sandstone spine walls, our homes naturally absorb daily temperature fluctuations, keeping living spaces cool in summer and warm through winter.',
  },
  {
    number: '03',
    title: '100% Water & Energy Autonomy',
    desc: 'Off-grid and grid-hybrid energy resilience engineered for coastal self-reliance. Concealed high-output solar arrays, battery banks, and high-capacity rainwater harvesting integrated under decks.',
  },
  {
    number: '04',
    title: 'Marine-Grade Material Longevity',
    desc: 'Coastal environments are unforgiving to delicate finishes. We specify materials that age with dignity: Shou Sugi Ban charred cedar, raw silver ash, non-corrosive copper, and off-form board-marked concrete.',
  },
]

const servicesMatrix = [
  {
    title: 'Bespoke Coastal Residences',
    items: [
      'Headland, cliff-edge, and beachside custom dwellings',
      'Sand dune ecology & sensitive topographical placement',
      'Integrated surfboard storage bays & open-sky copper showers',
      'Seamless indoor-outdoor entertaining flow',
    ],
  },
  {
    title: 'Off-Grid Eco Sanctuaries',
    items: [
      'Autonomous solar microgrids & battery systems',
      'Sub-deck rainwater harvesting & filtration',
      'Low-impact timber post-and-pier footings',
      'Passive stack cooling & cross-ventilation louvres',
    ],
  },
  {
    title: 'Coastal Dual Occupancies',
    items: [
      'Multi-generational family living & private wings',
      'Independent acoustic & visual privacy zoning',
      'Solar access optimization for both residences',
      'Maximized site value & capital appreciation',
    ],
  },
  {
    title: 'Planning Approvals & Construction',
    items: [
      'Comprehensive DA & CDC approvals management',
      'Coastal Hazard & Clause 4.6 council variations',
      '100% Revit BIM tender-ready documentation',
      'Builder selection, tender negotiation & site quality review',
    ],
  },
]

export default function PhilosophyPage() {
  return (
    <div className={`page-shell ${styles.philosophyPage}`}>
      {/* Editorial Header */}
      <header className={styles.header}>
        <div className={styles.headerKicker}>
          <span className="badge-arch badge-accent">SALT &amp; STONE</span>
          <span className="badge-arch">NSW ARB #13540</span>
        </div>
        <h1 className={styles.heading}>Built for the Edge of the Ocean</h1>
        <p className={styles.lead}>
          Salt &amp; Stone Architecture was founded by Sebastian Kovacs — a Newcastle-based Registered Architect and lifelong surfer with a young family, dedicated to crafting homes deeply connected to ocean swells, passive solar thermal mass, and environmental permanence.
        </p>
      </header>

      {/* The Surfer-Architect Perspective */}
      <section className={styles.manifestoSection}>
        <div className={styles.manifestoQuoteBox}>
          <span className="badge-arch badge-accent">The Surfer-Architect Ethos</span>
          <blockquote className={styles.quoteText}>
            "When you spend your dawn hours in the ocean watching swells wrap around headlands, you understand daylight, prevailing winds, and material resilience in your bones. Coastal architecture shouldn’t fight the elements — it should harness them."
          </blockquote>
          <div className={styles.authorRow}>
            <strong>Sebastian Kovacs</strong>
            <span>Principal Architect · Master of Architecture (M.Arch) · NSW ARB #13540</span>
          </div>
        </div>

        <div className={styles.manifestoBody}>
          <h2 className={styles.subHeading}>Why Ocean Immersion Creates Better Homes</h2>
          <p>
            Designing on the Australian coastline demands a deep understanding of elemental forces. Salt air corrodes delicate metals within seasons, southerly squalls batter exposed facades, and blinding summer glare demands protective roof eaves.
          </p>
          <p>
            At Salt &amp; Stone, our design process begins not at the computer, but on site — analyzing morning offshore wind patterns, afternoon sea breezes, sun angles, and views. The result is architecture that breathes with the tides, stays naturally comfortable year-round, and creates a tranquil sanctuary for everyday family living.
          </p>
        </div>
      </section>

      {/* 4 Environmental Pillars */}
      <section className={styles.pillarsSection}>
        <div className={styles.sectionHeader}>
          <span className="badge-arch">Core Philosophy</span>
          <h2 className={styles.sectionTitle}>Four Pillars of Coastal Architecture</h2>
          <p className={styles.sectionSubtitle}>
            How every Salt &amp; Stone commission delivers superior thermal comfort, longevity, and sustainability.
          </p>
        </div>

        <div className={styles.pillarsGrid}>
          {environmentalPillars.map((pillar) => (
            <div key={pillar.number} className={styles.pillarCard}>
              <span className={styles.pillarNumber}>{pillar.number}</span>
              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <p className={styles.pillarDesc}>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services & Capabilities Matrix */}
      <section className={styles.servicesSection}>
        <div className={styles.sectionHeader}>
          <span className="badge-arch">Studio Capabilities</span>
          <h2 className={styles.sectionTitle}>Comprehensive Architectural Scope</h2>
          <p className={styles.sectionSubtitle}>
            End-to-end delivery from site due diligence through to council approvals and on-site builder administration.
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {servicesMatrix.map((service) => (
            <div key={service.title} className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <ul className={styles.serviceList}>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Regulatory Credentials & Trust Section */}
      <section className={styles.trustSection}>
        <div className={styles.trustCard}>
          <div className={styles.trustHeader}>
            <span className="badge-arch badge-accent">Statutory Credentials</span>
            <h2 className={styles.trustTitle}>Registered &amp; Regulated Architectural Practice</h2>
          </div>
          <div className={styles.trustDetailsGrid}>
            <div className={styles.trustItem}>
              <strong>NSW Registered Architect #13540</strong>
              <p>Registered and regulated by the NSW Architects Registration Board under the Architects Act 2003.</p>
            </div>
            <div className={styles.trustItem}>
              <strong>Professional Indemnity Insurance</strong>
              <p>Fully insured for high-end residential commissions, ensuring peace of mind for landholders and builders.</p>
            </div>
            <div className={styles.trustItem}>
              <strong>Coastal Council Track Record</strong>
              <p>Proven DA and CDC approvals across City of Newcastle, Lake Macquarie, Port Stephens, MidCoast, and Byron Shire.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Consultation Call to Action */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBanner}>
          <div>
            <span className="badge-arch badge-accent">Initial Consultation</span>
            <h2 className={styles.ctaHeading}>Planning a coastal build or site acquisition?</h2>
            <p className={styles.ctaText}>
              Let’s evaluate your site topography, wind vectors, solar access, and planning pathways across NSW.
            </p>
          </div>
          <Link href="/contact" className="btn-primary">
            <span>Arrange Site Consultation</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
