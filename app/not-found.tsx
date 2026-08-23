import Link from 'next/link'

export const metadata = {
  title: '404 — Page Not Found | SALT & STONE Architecture',
}

export default function NotFound() {
  return (
    <div
      className="page-shell"
      style={{
        paddingTop: '6rem',
        paddingBottom: '8rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1.75rem',
        maxWidth: '650px',
      }}
    >
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <span className="badge-arch badge-accent">404</span>
        <span className="badge-arch">Tide Out</span>
      </div>

      <h1
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 800,
          letterSpacing: '-0.035em',
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        The page you’re looking for has drifted offshore.
      </h1>

      <p
        style={{
          fontSize: '1.1rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        The link may have moved or the project archive has been updated. Explore our selected coastal works or return to the studio overview.
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/projects" className="btn-primary">
          <span>Explore Works</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
        <Link href="/" className="btn-secondary">
          <span>Studio Home</span>
        </Link>
      </div>
    </div>
  )
}
