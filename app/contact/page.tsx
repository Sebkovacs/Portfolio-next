import styles from './page.module.css'

export const metadata = {
  title: 'Consultation & Site Enquiries | SALT & STONE Architecture',
  description: 'Book an architectural consultation for a bespoke coastal home, off-grid retreat, or sustainable dual occupancy across NSW.',
}

export default function ContactPage() {
  return (
    <div className={`page-shell ${styles.contactPage}`}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerKicker}>
          <span className="badge-arch badge-accent">SALT &amp; STONE</span>
          <span className="badge-arch">Site Enquiries</span>
        </div>
        <h1 className={styles.heading}>Discuss Your Coastal Project</h1>
        <p className={styles.lead}>
          Whether you are building on a raw coastal headland, nestled behind coastal dunes, or planning a sustainable family home in Newcastle and NSW, we invite you to share your project brief below.
        </p>
      </header>

      <div className={styles.contentGrid}>
        {/* Main Intake Form */}
        <section className={styles.formSection}>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>1. Project Typology</label>
              <div className={styles.radioGrid}>
                <label className={styles.radioCard}>
                  <input type="radio" name="typology" value="coastal-home" defaultChecked />
                  <div className={styles.radioContent}>
                    <strong>Bespoke Coastal Home</strong>
                    <span>Headland, beachside, or dune-front custom build</span>
                  </div>
                </label>

                <label className={styles.radioCard}>
                  <input type="radio" name="typology" value="offgrid-retreat" />
                  <div className={styles.radioContent}>
                    <strong>Off-Grid / Eco Sanctuary</strong>
                    <span>Autonomous solar &amp; rainwater coastal cabin</span>
                  </div>
                </label>

                <label className={styles.radioCard}>
                  <input type="radio" name="typology" value="dual-occ" />
                  <div className={styles.radioContent}>
                    <strong>Coastal Dual Occupancy</strong>
                    <span>Multi-generational or dual dwelling build</span>
                  </div>
                </label>

                <label className={styles.radioCard}>
                  <input type="radio" name="typology" value="renovation" />
                  <div className={styles.radioContent}>
                    <strong>Major Alteration / Addition</strong>
                    <span>Substantial coastal rebuild or extension</span>
                  </div>
                </label>
              </div>
            </div>

            <div className={styles.twoCol}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="siteAddress">Site Address / Coastal Suburb</label>
                <input
                  id="siteAddress"
                  className={styles.input}
                  name="siteAddress"
                  placeholder="e.g. 24 Ocean Dr, Merewether / Seal Rocks"
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="council">Local Council / LGA</label>
                <input
                  id="council"
                  className={styles.input}
                  name="council"
                  placeholder="e.g. Newcastle / Port Stephens / MidCoast"
                />
              </div>
            </div>

            <div className={styles.twoCol}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="budget">Estimated Build Budget</label>
                <select id="budget" className={styles.select} name="budget" defaultValue="$1M - $2M">
                  <option value="$750k - $1M">$750,000 — $1,000,000</option>
                  <option value="$1M - $2M">$1,000,000 — $2,000,000</option>
                  <option value="$2M - $4M">$2,000,000 — $4,000,000</option>
                  <option value="$4M+">$4,000,000+</option>
                  <option value="Exploring">Early Feasibility / Undetermined</option>
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="timeline">Target Timeline</label>
                <select id="timeline" className={styles.select} name="timeline" defaultValue="Within 3-6 months">
                  <option value="Ready">Ready to begin design immediately</option>
                  <option value="Within 3-6 months">Within 3 — 6 months</option>
                  <option value="6-12 months">6 — 12 months</option>
                  <option value="Land Settlement">Awaiting land settlement</option>
                </select>
              </div>
            </div>

            <div className={styles.twoCol}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">Your Name</label>
                <input
                  id="name"
                  className={styles.input}
                  name="name"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">Email Address</label>
                <input
                  id="email"
                  className={styles.input}
                  name="email"
                  type="email"
                  placeholder="you@domain.com"
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="phone">Contact Phone</label>
              <input
                id="phone"
                className={styles.input}
                name="phone"
                type="tel"
                placeholder="+61 400 000 000"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">Your Vision &amp; Site Details</label>
              <textarea
                id="message"
                className={styles.textarea}
                name="message"
                rows={4}
                placeholder="Describe your site orientation, ocean views, family lifestyle, interest in sustainable materials (rammed earth, timber, off-grid), and any specific design priorities."
              />
            </div>

            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
              <span>Send Project Enquiry</span>
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </section>

        {/* Sidebar Info */}
        <aside className={styles.sidebar}>
          <div className={styles.sideCard}>
            <span className={styles.sideBadge}>Direct Contact</span>
            <h2 className={styles.sideTitle}>Studio Connection</h2>
            <div className={styles.sideInfoList}>
              <div className={styles.sideInfoItem}>
                <span className="material-symbols-outlined">waves</span>
                <div>
                  <strong>Studio Location</strong>
                  <span>Newcastle &amp; NSW Coastline</span>
                </div>
              </div>

              <div className={styles.sideInfoItem}>
                <span className="material-symbols-outlined">mail</span>
                <div>
                  <strong>Email</strong>
                  <a href="mailto:studio@sebkovacs.com">studio@sebkovacs.com</a>
                </div>
              </div>

              <div className={styles.sideInfoItem}>
                <span className="material-symbols-outlined">phone</span>
                <div>
                  <strong>Direct Line</strong>
                  <a href="tel:+61432365389">+61 432 365 389</a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.sideCard}>
            <span className={styles.sideBadge}>What to Expect</span>
            <h2 className={styles.sideTitle}>Free 30-Minute Consultation</h2>
            <div className={styles.expectList}>
              <div className={styles.expectItem}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: 'var(--color-accent)' }}>check_circle</span>
                <span>Free, no-obligation phone or video call</span>
              </div>
              <div className={styles.expectItem}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: 'var(--color-accent)' }}>check_circle</span>
                <span>Preliminary review of your site &amp; brief</span>
              </div>
              <div className={styles.expectItem}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: 'var(--color-accent)' }}>check_circle</span>
                <span>Initial planning &amp; budget guidance</span>
              </div>
              <div className={styles.expectItem}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: 'var(--color-accent)' }}>check_circle</span>
                <span>Discussion of sustainability options</span>
              </div>
            </div>
          </div>

          <div className={styles.sideCard}>
            <span className={styles.sideBadge}>Statutory Registration</span>
            <h2 className={styles.sideTitle}>Registered Architect</h2>
            <p className={styles.sideText}>
              All commissions are led directly by Sebastian Kovacs, Registered Architect with the <strong>NSW Architects Registration Board (#13540)</strong>.
            </p>
            <div className={styles.sideBadgeGroup}>
              <span className="badge-arch badge-accent">NSW ARB #13540</span>
              <span className="badge-arch">PI Insured</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
