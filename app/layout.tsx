import './globals.css'
import styles from './layout.module.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import ThemeProvider from '../components/ThemeProvider'
import SiteHeader from '../components/SiteHeader'

export const metadata: Metadata = {
  title: 'SALT & STONE Architecture | Ultra-Coastal & Sustainable Residential Design',
  description: 'Bespoke coastal residences, off-grid eco retreats, and headland pavilions crafted by Sebastian Kovacs, Registered Architect NSW 13540.',
  keywords: ['Salt and Stone Architecture', 'Coastal Architect Newcastle', 'Sustainable Architect NSW', 'Surf Coast Architecture', 'Registered Architect NSW 13540', 'Off-Grid Architecture', 'Bespoke Coastal Homes'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="site-body">
        <ThemeProvider>
          {/* Main Studio Navigation */}
          <SiteHeader />

          <main className={styles.main}>{children}</main>

          {/* Minimal, Luxury Coastal Editorial Footer */}
          <footer className={styles.footer}>
            <div className="page-shell">
              <div className={styles.footerTopRow}>
                <div className={styles.brandBlock}>
                  <Link href="/" className={styles.footerBrand}>
                    SALT &amp; STONE
                  </Link>
                  <span className={styles.footerTagline}>
                    Ultra-Coastal · Sustainable Residential Architecture
                  </span>
                </div>

                <div className={styles.footerNavLinks}>
                  <Link href="/">Studio</Link>
                  <Link href="/projects">Works</Link>
                  <Link href="/philosophy">Philosophy</Link>
                  <Link href="/contact">Enquire</Link>
                </div>

                <div className={styles.footerSocials}>
                  <a href="https://instagram.com/saltandstone.arch" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Follow Salt & Stone on Instagram">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    <span>Instagram</span>
                  </a>
                </div>
              </div>

              <div className={styles.footerMidRow}>
                <div className={styles.footerContactInfo}>
                  <div>
                    <span className={styles.footerLabel}>Studio Base</span>
                    <span className={styles.footerValue}>Newcastle &amp; NSW Coastline</span>
                  </div>
                  <div>
                    <span className={styles.footerLabel}>Direct Enquiries</span>
                    <a href="mailto:studio@sebkovacs.com" className={styles.footerValueLink}>
                      studio@sebkovacs.com
                    </a>
                  </div>
                  <div>
                    <span className={styles.footerLabel}>Telephone</span>
                    <a href="tel:+61432365389" className={styles.footerValueLink}>
                      +61 432 365 389
                    </a>
                  </div>
                  <div>
                    <span className={styles.footerLabel}>Statutory Authority</span>
                    <span className={styles.footerValue}>NSW Registered Architect #13540</span>
                  </div>
                </div>
              </div>

              <div className={styles.footerBottomRow}>
                <p className={styles.copyright}>
                  &copy; {new Date().getFullYear()} Salt &amp; Stone Architecture · Regulated under the NSW Architects Act 2003.
                </p>
                <p className={styles.landAck}>
                  We acknowledge the Awabakal and Worimi peoples as Traditional Custodians of the land and ocean on which we live, surf, and practice.
                </p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
