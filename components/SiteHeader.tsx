"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'
import styles from './SiteHeader.module.css'

const navItems = [
  { href: '/', label: 'Studio' },
  { href: '/projects', label: 'Works' },
  { href: '/philosophy', label: 'Philosophy' },
  { href: '/contact', label: 'Enquire' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Top Registration Ribbon */}
      <div className={styles.topRibbon}>
        <div className={`page-shell ${styles.ribbonInner}`}>
          <span className={styles.ribbonItem}>
            <span className={styles.ribbonDot}></span>
            <strong>SALT &amp; STONE ARCHITECTURE</strong>
          </span>
          <span className={styles.ribbonItem}>
            NSW Registered Architect #13540
          </span>
          <span className={styles.ribbonItem}>
            Ultra-Coastal · Sustainable Dwellings · Newcastle &amp; NSW
          </span>
        </div>
      </div>

      {/* Sticky Header with Solid Opaque Background */}
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
        <div className={`${styles.headerInner} page-shell`}>
          {/* Logo with Architectural Monogram */}
          <Link href="/" className={styles.brand} aria-label="Salt & Stone Architecture Homepage">
            <svg
              className={styles.brandLogoSvg}
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="28" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
              <path d="M7 21C11 16 15 22 19 17C22 13 25 14 25 14" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 15C11 10 15 16 19 11C22 7 25 8 25 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6"/>
              <circle cx="21" cy="9" r="1.5" fill="var(--color-accent)"/>
            </svg>
            <div className={styles.brandText}>
              <span className={styles.brandName}>SALT &amp; STONE</span>
              <span className={styles.brandSubtitle}>Architecture · NSW ARB #13540</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} aria-label="Primary navigation">
            <div className={styles.navLinks}>
              {navItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
                  >
                    <span>{item.label}</span>
                    {active && <span className={styles.activePill} />}
                  </Link>
                )
              })}
            </div>

            <div className={styles.navActions}>
              <ThemeToggle />
              <Link href="/contact" className={styles.ctaButton}>
                <span>Book Consultation</span>
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }} aria-hidden>
                  arrow_outward
                </span>
              </Link>
            </div>
          </nav>

          {/* Mobile Actions & Hamburger */}
          <div className={styles.mobileRight}>
            <ThemeToggle />
            <button
              type="button"
              className={styles.hamburgerBtn}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className={styles.mobileDrawer}>
            <div className={styles.mobileDrawerInner}>
              <div className={styles.mobileLinks}>
                {navItems.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`${styles.mobileNavLink} ${active ? styles.mobileNavLinkActive : ''}`}
                    >
                      <span>{item.label}</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '1.2rem', opacity: 0.5 }}>
                        arrow_forward
                      </span>
                    </Link>
                  )
                })}
              </div>

              <div className={styles.mobileFooterCta}>
                <div className={styles.mobileRego}>
                  <span className="badge-arch badge-accent">NSW ARB #13540</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Registered Architect</span>
                </div>
                <Link href="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>Book Site Consultation</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
