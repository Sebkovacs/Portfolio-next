import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import { getAllProjects } from '../lib/projects.server'

type CompactProject = {
  id: string
  title: string
  shortTitle: string
  thumb: string
  thumbAlt: string
  type?: string
  status?: string
  location?: string
  summary?: string
  area?: string
}

function FlagshipCard({ project }: { project: CompactProject }) {
  return (
    <Link href={`/projects/${project.id}`} className={styles.flagshipCard}>
      <div className={styles.cardMedia}>
        <Image
          src={`/projects/${project.shortTitle}${project.thumb}`}
          alt={project.thumbAlt || project.title}
          fill
          sizes="(min-width: 1200px) 400px, (min-width: 768px) 50vw, 100vw"
          className={styles.cardImg}
        />
        <div className={styles.cardOverlay}>
          <span className="material-symbols-outlined">arrow_outward</span>
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardHeaderRow}>
          {project.type && <span className="badge-arch badge-accent">{project.type}</span>}
          {project.status && <span className={styles.cardStatus}>{project.status}</span>}
        </div>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        {project.location && <p className={styles.cardLocation}>{project.location}</p>}
        {project.area && (
          <div className={styles.cardAreaBadge}>
            <span className="material-symbols-outlined" style={{ fontSize: '0.85rem' }}>square_foot</span>
            <span>{project.area}</span>
          </div>
        )}
        {project.summary && <p className={styles.cardSummary}>{project.summary}</p>}
      </div>
    </Link>
  )
}

/* ── Placeholder testimonials — REPLACE WITH REAL CLIENT QUOTES ── */
const testimonials = [
  {
    quote: "Sebastian understood our coastal block from the very first site visit. He mapped the wind patterns, the sun angles, the swell direction — things we'd never thought about. The design he produced feels like it grew out of the headland.",
    name: 'James & Claire M.',
    project: 'Coastal Headland Residence',
    location: 'Merewether, NSW',
  },
  {
    quote: "We wanted a home that could go completely off-grid without feeling like a bush shack. Seb delivered a design that's beautiful, warm, and completely autonomous. The rammed earth and timber are extraordinary.",
    name: 'Tom & Priya S.',
    project: 'Off-Grid Eco Sanctuary',
    location: 'Seal Rocks, NSW',
  },
  {
    quote: "The DA process felt daunting on our coastal hazard block, but Sebastian navigated council flawlessly. He handled the Clause 4.6 variation and we got approval on the first submission. Worth every cent.",
    name: 'Rebecca L.',
    project: 'Dune Pavilion Residence',
    location: 'Fingal Bay, NSW',
  },
]

export default function HomePage() {
  const allProjects = getAllProjects()
  
  const flagshipIds = new Set([
    'salt-point-residence',
    'tasman-peninsula-cabin',
    'crescent-head-surf-shack',
    'redhead-bluff-pavilion',
    'seal-rocks-sanctuary',
    'boardriders-duplex',
  ])
  const flagshipProjects = allProjects.filter((p) => flagshipIds.has(p.id))

  return (
    <div className={styles.pageWrapper}>
      {/* Trust Stats Bar — warm social proof replacing the old telemetry bar */}
      <div className={styles.trustBar}>
        <div className="page-shell">
          <div className={styles.trustBarInner}>
            <div className={styles.trustStat}>
              <span className={styles.trustStatValue}>{allProjects.length}</span>
              <span className={styles.trustStatLabel}>Projects Delivered</span>
            </div>
            <div className={styles.trustStatDivider} />
            <div className={styles.trustStat}>
              <span className={styles.trustStatValue}>8.5+</span>
              <span className={styles.trustStatLabel}>Star NatHERS Targets</span>
            </div>
            <div className={styles.trustStatDivider} />
            <div className={styles.trustStat}>
              <span className={styles.trustStatValue}>100%</span>
              <span className={styles.trustStatLabel}>Net-Zero Capable Designs</span>
            </div>
            <div className={styles.trustStatDivider} />
            <div className={styles.trustStat}>
              <span className={styles.trustStatValue}>NSW</span>
              <span className={styles.trustStatLabel}>Coastal Specialist #13540</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="page-shell">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.heroKicker}>
                <span className="badge-arch badge-accent">SALT &amp; STONE</span>
                <span className={styles.regoText}>NSW Registered Architect #13540</span>
              </div>
              
              <h1 className={styles.heroHeadline}>
                Homes built for the raw power of the ocean and the peace of family living.
              </h1>
              
              <p className={styles.heroSubtext}>
                We craft bespoke coastal residences, off-grid eco pavilions, and sandstone headland dwellings across Newcastle and the NSW coastline. Driven by lifelong ocean immersion, passive solar thermal mass, and marine-resilient craft.
              </p>
              
              <div className={styles.heroButtons}>
                <Link href="/projects" className="btn-primary">
                  <span>Explore Flagship Works</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <Link href="/contact" className="btn-secondary">
                  <span>Book Free Consultation</span>
                </Link>
              </div>

              <div className={styles.heroDirectLine}>
                <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--color-accent)' }}>phone</span>
                <span>Or call directly:</span>
                <a href="tel:+61432365389" className={styles.heroPhone}>+61 432 365 389</a>
              </div>
            </div>

            <div className={styles.heroHeroVisual}>
              <div className={styles.heroImageCard}>
                <Image
                  src="/projects/salt-point/1.jpg"
                  alt="Salt Point House overlooking Merewether ocean swell"
                  fill
                  priority
                  sizes="(min-width: 1200px) 600px, 100vw"
                  className={styles.heroImg}
                />
                <div className={styles.heroImageDetails}>
                  <div className={styles.heroCalloutBadge}>
                    <span className="badge-arch badge-accent">Featured Concept</span>
                    <strong>Salt Point Residence · Merewether</strong>
                  </div>
                  <div className={styles.materialTagGroup}>
                    <span className={styles.materialTag}>400mm Rammed Earth Mass</span>
                    <span className={styles.materialTag}>Weathered Silvertop Ash</span>
                    <span className={styles.materialTag}>100% Off-Grid Solar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Coastal Typologies */}
      <section className={styles.typologySection}>
        <div className="page-shell">
          <div className={styles.sectionHeader}>
            <span className="badge-arch badge-accent">Design Typologies</span>
            <h2 className={styles.sectionTitle}>Built for the Edge of the Ocean</h2>
            <p className={styles.sectionSubtitle}>
              Three distinct residential specialisms engineered for extreme salt air, wind dynamics, and ecological harmony.
            </p>
          </div>

          <div className={styles.typologyGrid}>
            <div className={styles.typologyCard}>
              <div className={styles.typologyIcon}>
                <span className="material-symbols-outlined">waves</span>
              </div>
              <span className={styles.typologyNumber}>01</span>
              <h3 className={styles.typologyTitle}>Headland &amp; Cliff Dwellings</h3>
              <p className={styles.typologyDesc}>
                Monolithic stabilised rammed earth and board-marked concrete structures engineered to deflect southerly gales while framing sweeping ocean horizons.
              </p>
              <span className={styles.typologyFeature}>Thermal Mass · Wind Deflection · Salt Shielding</span>
            </div>

            <div className={styles.typologyCard}>
              <div className={styles.typologyIcon}>
                <span className="material-symbols-outlined">forest</span>
              </div>
              <span className={styles.typologyNumber}>02</span>
              <h3 className={styles.typologyTitle}>Off-Grid Eco Sanctuaries</h3>
              <p className={styles.typologyDesc}>
                Twin timber pavilions connected by coastal forest breezeways, powered by 100% solar microgrids, sub-deck rainwater harvesting, and passive cooling.
              </p>
              <span className={styles.typologyFeature}>100% Net Zero · Light-Touch Footings · Native Timber</span>
            </div>

            <div className={styles.typologyCard}>
              <div className={styles.typologyIcon}>
                <span className="material-symbols-outlined">domain</span>
              </div>
              <span className={styles.typologyNumber}>03</span>
              <h3 className={styles.typologyTitle}>Coastal Dual Occupancies</h3>
              <p className={styles.typologyDesc}>
                Multi-generational twin residences crafted in Sydney sandstone and batten screens, delivering uncompromised privacy, light, and coastal site value.
              </p>
              <span className={styles.typologyFeature}>Acoustic Isolation · Solar Access · Capital Value</span>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Projects Showcase */}
      <section className={styles.showcaseSection}>
        <div className="page-shell">
          <div className={styles.showcaseHeaderRow}>
            <div>
              <span className="badge-arch badge-accent">Curated Portfolio</span>
              <h2 className={styles.sectionTitle}>Flagship Coastal Works &amp; Concepts</h2>
              <p className={styles.sectionSubtitle}>
                Six ocean-orientated residences developed for extreme marine environments and sustainable self-reliance.
              </p>
            </div>
            <Link href="/projects" className={styles.viewArchiveLink}>
              <span>Explore All Works ({allProjects.length})</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          <div className={styles.flagshipGrid}>
            {flagshipProjects.map((project) => (
              <FlagshipCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials — Social Proof Strip */}
      <section className={styles.testimonialSection}>
        <div className="page-shell">
          <div className={styles.sectionHeader}>
            <span className="badge-arch badge-accent">Client Voices</span>
            <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
            <p className={styles.sectionSubtitle}>
              Trusted by families and landholders building their forever coastal homes across NSW.
            </p>
          </div>

          <div className={styles.testimonialGrid}>
            {testimonials.map((t) => (
              <div key={t.name} className={styles.testimonialCard}>
                <div className={styles.testimonialQuoteMark}>"</div>
                <blockquote className={styles.testimonialQuote}>
                  {t.quote}
                </blockquote>
                <div className={styles.testimonialAuthor}>
                  <strong>{t.name}</strong>
                  <span>{t.project} · {t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Surfer-Architect Manifesto */}
      <section className={styles.manifestoSection}>
        <div className="page-shell">
          <div className={styles.manifestoCard}>
            <span className="badge-arch badge-accent">The Surfer-Architect Ethos</span>
            <blockquote className={styles.manifestoQuote}>
              "When you spend your dawn hours in the ocean watching swells wrap around headlands, you understand daylight, prevailing winds, and material resilience in your bones. Coastal architecture shouldn't fight the elements — it should harness them."
            </blockquote>
            <div className={styles.manifestoFooter}>
              <div className={styles.manifestoAuthor}>
                <strong>Sebastian Kovacs</strong>
                <span>Principal Architect · Master of Architecture (M.Arch) · NSW ARB #13540</span>
              </div>
              <Link href="/philosophy" className="btn-secondary">
                <span>Read Full Philosophy</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Architect — Personal Section */}
      <section className={styles.architectSection}>
        <div className="page-shell">
          <div className={styles.architectGrid}>
            <div className={styles.architectImageWrap}>
              {/* TODO: Replace with real photo of Sebastian */}
              <Image
                src="/sebastian-kovacs-portrait.jpg"
                alt="Sebastian Kovacs — Principal Architect, Salt & Stone Architecture"
                width={480}
                height={640}
                className={styles.architectImg}
              />
              <div className={styles.architectImageCaption}>
                <span className="badge-arch badge-accent">NSW ARB #13540</span>
                <span>Merewether Headland, Newcastle</span>
              </div>
            </div>

            <div className={styles.architectContent}>
              <span className="badge-arch badge-accent">Meet Your Architect</span>
              <h2 className={styles.architectHeading}>Sebastian Kovacs</h2>
              <p className={styles.architectRole}>
                Principal Architect · M.Arch · Lifelong Surfer · Father of Two
              </p>
              <div className={styles.architectBio}>
                <p>
                  I grew up on the NSW coast, surfing before school and watching the light change across headlands every morning. That daily immersion shaped how I think about homes — not as objects placed on land, but as extensions of the landscape they sit within.
                </p>
                <p>
                  My practice, Salt &amp; Stone, is built around one conviction: coastal homes should harness the elements, not fight them. Every project starts on site, reading the wind, the sun, and the salt air before a single line is drawn.
                </p>
                <p>
                  When I'm not at the drawing board, I'm in the water with my two kids, testing whether the morning offshores are as clean as the weather models predicted. That's the same attention to microclimate that goes into every home I design.
                </p>
              </div>
              <div className={styles.architectCreds}>
                <div className={styles.credItem}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: 'var(--color-accent)' }}>verified</span>
                  <span>NSW Registered Architect #13540</span>
                </div>
                <div className={styles.credItem}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: 'var(--color-accent)' }}>school</span>
                  <span>Master of Architecture (M.Arch)</span>
                </div>
                <div className={styles.credItem}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: 'var(--color-accent)' }}>shield</span>
                  <span>Professional Indemnity Insured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Stage Architectural Delivery Framework */}
      <section className={styles.processSection}>
        <div className="page-shell">
          <div className={styles.sectionHeader}>
            <span className="badge-arch">The Client Journey</span>
            <h2 className={styles.sectionTitle}>Four Stages to Coastal Delivery</h2>
            <p className={styles.sectionSubtitle}>
              A rigorous, transparent process de-risking coastal site conditions, planning hurdles, and construction costs.
            </p>
          </div>

          <div className={styles.processGrid}>
            <div className={styles.processCard}>
              <span className={styles.processNumber}>01</span>
              <h3 className={styles.processTitle}>Site &amp; Microclimate Due Diligence</h3>
              <p className={styles.processDesc}>
                Topography mapping, wind vector analysis, solar trajectory modeling, coastal hazard review, and council planning constraints.
              </p>
            </div>

            <div className={styles.processCard}>
              <span className={styles.processNumber}>02</span>
              <h3 className={styles.processTitle}>Concept Design &amp; 3D Massing</h3>
              <p className={styles.processDesc}>
                Spatial zoning, view alignment, wind deflection modeling, material selection (rammed earth, timber, copper), and living flow.
              </p>
            </div>

            <div className={styles.processCard}>
              <span className={styles.processNumber}>03</span>
              <h3 className={styles.processTitle}>DA &amp; CDC Approvals Mastery</h3>
              <p className={styles.processDesc}>
                Comprehensive drawing packages, Clause 4.6 variations, coastal council negotiations, and NSW planning approvals.
              </p>
            </div>

            <div className={styles.processCard}>
              <span className={styles.processNumber}>04</span>
              <h3 className={styles.processTitle}>Precision BIM &amp; Builder Tender</h3>
              <p className={styles.processDesc}>
                100% Revit documentation, marine-grade fixture specifications, competitive builder tender review, and on-site observation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Conversion CTA */}
      <section className={styles.ctaSection}>
        <div className="page-shell">
          <div className={styles.ctaCard}>
            <div className={styles.ctaContent}>
              <span className="badge-arch badge-accent">Free 30-Minute Consultation</span>
              <h2 className={styles.ctaHeading}>Planning a bespoke coastal residence or eco retreat?</h2>
              <p className={styles.ctaSub}>
                Book a free, no-obligation site consultation. We'll evaluate your site topography, wind vectors, solar access, and planning pathways across NSW.
              </p>
            </div>
            <div className={styles.ctaAction}>
              <Link href="/contact" className="btn-primary">
                <span>Book Free Consultation</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <a href="tel:+61432365389" className={styles.ctaPhoneLink}>
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>phone</span>
                <span>+61 432 365 389</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
