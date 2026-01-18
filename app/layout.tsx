import './globals.css'
import styles from './layout.module.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import ThemeProvider from '../components/ThemeProvider'
import ThemeToggle from '../components/ThemeToggle'

export const metadata: Metadata = {
  title: 'Sebastian Kovacs | Portfolio',
  description: 'Selected architecture and design projects by Sebastian Kovacs.',
}

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="site-body">
        <ThemeProvider>
          <header className={styles.header}>
            <div className={`${styles.headerInner} page-shell`}>
              <Link href="/" className={styles.brand}>
                Sebastian Kovacs
              </Link>
              <nav className={styles.nav} aria-label="Primary navigation">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                ))}
                <ThemeToggle />
              </nav>
            </div>
          </header>
          <main className="site-main">{children}</main>
          <footer className={styles.footer}>
            <div className={`${styles.footerInner} page-shell`}>
              <span>&copy; {new Date().getFullYear()} Sebastian Kovacs</span>
              <Link href="/contact" className={styles.navLink}>
                Work with me
              </Link>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
