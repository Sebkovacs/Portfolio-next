"use client"
import { useMemo, useState } from 'react'
import ThemeSettingsPanel from '../projects/new/ThemeSettingsPanel'
import type { DraftState, HomeSectionKey, MessageState } from '../projects/new/types'
import { slugify, splitLines } from '../projects/new/utils'
import styles from './AdminDashboard.module.css'

const panels = [
  { id: 'projects', label: 'Projects' },
  { id: 'theme', label: 'Theme' },
  { id: 'resume', label: 'Resume' },
  { id: 'links', label: 'Links' },
  { id: 'contact', label: 'Contact' },
] as const

type PanelId = (typeof panels)[number]['id']

const homeSectionOptions: Array<{ value: HomeSectionKey; label: string }> = [
  { value: 'selected', label: 'Selected projects' },
  { value: 'themes', label: 'Themes' },
  { value: 'portfolios', label: 'Portfolio sets' },
]

type ErrorState = Record<string, string>

const initialDraft: DraftState = { title: '', shortTitle: '', date: '' }

export default function AdminDashboard() {
  const [activePanel, setActivePanel] = useState<PanelId>('projects')

  // Projects state
  const [draft, setDraft] = useState<DraftState>(initialDraft)
  const [errors, setErrors] = useState<ErrorState>({})
  const [message, setMessage] = useState<MessageState | null>(null)
  const [busy, setBusy] = useState(false)
  const [picAltLines, setPicAltLines] = useState('')
  const [planAltLines, setPlanAltLines] = useState('')
  const [extraFrontmatter, setExtraFrontmatter] = useState('')
  const [homeSections, setHomeSections] = useState<HomeSectionKey[]>([])
  const [featured, setFeatured] = useState<boolean>(false)

  const toggleHomeSection = (value: HomeSectionKey) => {
    setHomeSections((prev) => {
      const next = new Set(prev)
      if (next.has(value)) {
        next.delete(value)
      } else {
        next.add(value)
      }
      return Array.from(next)
    })
  }

  const validateDraft = () => {
    const nextErrors: ErrorState = {}
    const slug = slugify(draft.title)
    if (!slug) nextErrors.title = 'Title is required to generate a slug.'
    if (!draft.shortTitle || !/^[a-z0-9-]+$/.test(draft.shortTitle)) {
      nextErrors.shortTitle = 'Short title must be lowercase letters, numbers or hyphens.'
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.date)) {
      nextErrors.date = 'Use YYYY-MM-DD format.'
    }
    return nextErrors
  }

  const handleProjectSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrors({})
    setMessage(null)
    const nextErrors = validateDraft()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    const formData = new FormData(event.currentTarget)
    homeSections.forEach((section) => formData.append('homeSections', section))
    formData.set('featured', featured ? 'true' : 'false')
    formData.set('picAltOverrides', picAltLines)
    formData.set('planAltOverrides', planAltLines)
    formData.set('extraFrontmatter', extraFrontmatter)

    setBusy(true)
    try {
      const response = await fetch('/api/upload', { method: 'POST', body: formData })
      const json = await response.json()
      if (!response.ok) {
        throw new Error(json?.error || 'Upload failed')
      }
      setMessage({ text: `Created project ${json.id}.md`, tone: 'success' })
      event.currentTarget.reset()
      setDraft(initialDraft)
      setPicAltLines('')
      setPlanAltLines('')
      setExtraFrontmatter('')
      setHomeSections([])
      setFeatured(false)
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Upload failed'
      setMessage({ text, tone: 'error' })
    } finally {
      setBusy(false)
    }
  }

  const frontmatterPreview = useMemo(() => {
    const meta: string[] = []
    const slug = slugify(draft.title)
    if (draft.title) meta.push(`title: ${JSON.stringify(draft.title)}`)
    if (draft.shortTitle) meta.push(`shortTitle: ${JSON.stringify(draft.shortTitle)}`)
    if (draft.date) meta.push(`date: ${JSON.stringify(draft.date)}`)
    if (homeSections.length) meta.push(`homeSections: ${JSON.stringify(homeSections)}`)
    if (featured) meta.push('featured: true')
    const extras = splitLines(extraFrontmatter)
    const doc = ['---', ...meta, ...extras, '---']
    if (doc.length <= 3) {
      return 'Front matter preview will appear after filling the basics.'
    }
    return doc.join('\n')
  }, [draft, homeSections, featured, extraFrontmatter])

  // Resume state
  const [resumeSummary, setResumeSummary] = useState('')
  const [resumeEntries, setResumeEntries] = useState<string[]>([])
  const resumePreview = useMemo(() => {
    if (!resumeSummary && resumeEntries.length === 0) return 'Add resume content to see the preview.'
    return JSON.stringify({ summary: resumeSummary, entries: resumeEntries }, null, 2)
  }, [resumeSummary, resumeEntries])

  // Links state
  const [links, setLinks] = useState<Array<{ label: string; url: string }>>([
    { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
    { label: 'Instagram', url: 'https://www.instagram.com/' },
  ])

  // Contact state
  const [contact, setContact] = useState({
    email: 'studio@example.com',
    phone: '+61 400 000 000',
    location: 'Newcastle, NSW',
  })

  const renderProjectsPanel = () => (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>Project blueprint</h2>
        <p className={styles.panelDescription}>Generate new markdown + asset scaffolds with curated homepage placement.</p>
      </div>
      <form className={styles.content} onSubmit={handleProjectSubmit}>
        <div className={styles.fieldGrid}>
          <div className={styles.field}>
            <span className={styles.label}>Title</span>
            <input
              name="title"
              required
              className={styles.input}
              value={draft.title}
              onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
            />
            {errors.title && <span className={styles.helper}>{errors.title}</span>}
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Short title / folder</span>
            <input
              name="shortTitle"
              required
              className={styles.input}
              value={draft.shortTitle}
              onChange={(event) => setDraft((prev) => ({ ...prev, shortTitle: event.target.value }))}
            />
            {errors.shortTitle && <span className={styles.helper}>{errors.shortTitle}</span>}
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Date</span>
            <input
              name="date"
              placeholder="2025-03-01"
              className={styles.input}
              value={draft.date}
              onChange={(event) => setDraft((prev) => ({ ...prev, date: event.target.value }))}
            />
            {errors.date && <span className={styles.helper}>{errors.date}</span>}
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Status</span>
            <input name="status" className={styles.input} />
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Type</span>
            <input name="type" className={styles.input} />
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Location</span>
            <input name="location" className={styles.input} />
          </div>
        </div>

        <div className={styles.fieldGrid}>
          <label className={styles.field}>
            <span className={styles.label}>Summary</span>
            <textarea name="summary" className={styles.textarea} placeholder="Project synopsis" />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Software</span>
            <input name="software" className={styles.input} placeholder="Revit, Twinmotion" />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Rendering</span>
            <input name="rendering" className={styles.input} placeholder="V-Ray" />
          </label>
        </div>

        <div className={styles.fieldGrid}>
          <label className={styles.field}>
            <span className={styles.label}>Hero thumb</span>
            <input name="thumb" type="file" accept="image/*" className={styles.input} required />
            <span className={styles.helper}>Upload the listing preview image.</span>
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Thumb alt text</span>
            <input name="thumbAlt" className={styles.input} placeholder="Exterior perspective" required />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Gallery images</span>
            <input name="pics" type="file" multiple accept="image/*" className={styles.input} />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Plans</span>
            <input name="plans" type="file" multiple accept="image/*" className={styles.input} />
          </label>
        </div>

        <div className={styles.fieldGrid}>
          <label className={styles.field}>
            <span className={styles.label}>Gallery alt text (per line)</span>
            <textarea
              className={styles.textarea}
              value={picAltLines}
              onChange={(event) => setPicAltLines(event.target.value)}
              placeholder="Hero lounge perspective\nLobby interior"
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Plan alt text (per line)</span>
            <textarea
              className={styles.textarea}
              value={planAltLines}
              onChange={(event) => setPlanAltLines(event.target.value)}
              placeholder="Ground floor plan\nSection AA"
            />
          </label>
        </div>

        <div className={styles.fieldGrid}>
          <label className={styles.field}>
            <span className={styles.label}>Homepage placement</span>
            <div className={styles.tagGroup}>
              {homeSectionOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={styles.secondaryButton}
                  data-active={homeSections.includes(option.value)}
                  onClick={() => toggleHomeSection(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <label style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginTop: '0.6rem' }}>
              <input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} />
              <span className={styles.helper}>Mark as featured highlight</span>
            </label>
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Additional front matter</span>
            <textarea
              className={styles.textarea}
              value={extraFrontmatter}
              onChange={(event) => setExtraFrontmatter(event.target.value)}
              placeholder="draft: true"
            />
          </label>
        </div>

        <div className={styles.buttonRow}>
          <button type="submit" className={styles.primaryButton} disabled={busy}>
            {busy ? 'Uploading…' : 'Create project'}
          </button>
          {message && <span className={styles.helper}>{message.text}</span>}
        </div>

        <pre className={styles.preview}>{frontmatterPreview}</pre>
      </form>
    </div>
  )

  const renderThemePanel = () => (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>Theme controls</h2>
        <p className={styles.panelDescription}>Switch the portfolio palette and preview lighting quickly.</p>
      </div>
      <ThemeSettingsPanel />
    </div>
  )

  const renderResumePanel = () => {
    const handleEntryChange = (index: number, value: string) => {
      setResumeEntries((prev) => {
        const next = [...prev]
        next[index] = value
        return next
      })
    }

    const addEntry = () => setResumeEntries((prev) => [...prev, ''])

    return (
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Resume content</h2>
          <p className={styles.panelDescription}>Craft narrative bullet points for the resume page.</p>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Summary intro</span>
          <textarea
            className={styles.textarea}
            value={resumeSummary}
            onChange={(event) => setResumeSummary(event.target.value)}
            placeholder="Sebastian Kovacs is a project architect focused on data centres and coastal residences…"
          />
        </div>
        <div className={styles.list}>
          {resumeEntries.map((entry, index) => (
            <textarea
              key={index}
              className={styles.textarea}
              value={entry}
              onChange={(event) => handleEntryChange(index, event.target.value)}
              placeholder={`Resume line ${index + 1}`}
            />
          ))}
          <button type="button" className={styles.secondaryButton} onClick={addEntry}>
            Add experience line
          </button>
        </div>
        <pre className={styles.preview}>{resumePreview}</pre>
      </div>
    )
  }

  const renderLinksPanel = () => (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>Links library</h2>
        <p className={styles.panelDescription}>Curate external touch points for the portfolio footer and contact modal.</p>
      </div>
      <div className={styles.list}>
        {links.map((link, index) => (
          <div key={link.label} className={styles.listItem}>
            <div>
              <div>{link.label}</div>
              <div className={styles.helper}>{link.url}</div>
            </div>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => {
                const next = [...links]
                next.splice(index, 1)
                setLinks(next)
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => setLinks((prev) => [...prev, { label: 'New Link', url: 'https://example.com' }])}
        >
          Add link
        </button>
      </div>
    </div>
  )

  const renderContactPanel = () => (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>Contact details</h2>
        <p className={styles.panelDescription}>Update the contact landing page and email signature information.</p>
      </div>
      <div className={styles.fieldGrid}>
        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input
            className={styles.input}
            value={contact.email}
            onChange={(event) => setContact((prev) => ({ ...prev, email: event.target.value }))}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Phone</span>
          <input
            className={styles.input}
            value={contact.phone}
            onChange={(event) => setContact((prev) => ({ ...prev, phone: event.target.value }))}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Location</span>
          <input
            className={styles.input}
            value={contact.location}
            onChange={(event) => setContact((prev) => ({ ...prev, location: event.target.value }))}
          />
        </label>
      </div>
      <pre className={styles.preview}>{JSON.stringify(contact, null, 2)}</pre>
    </div>
  )

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'theme':
        return renderThemePanel()
      case 'resume':
        return renderResumePanel()
      case 'links':
        return renderLinksPanel()
      case 'contact':
        return renderContactPanel()
      case 'projects':
      default:
        return renderProjectsPanel()
    }
  }

  return (
    <div className={`${styles.wrapper} page-shell`}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Admin</h2>
        {panels.map((panel) => (
          <button
            key={panel.id}
            type="button"
            className={styles.navButton}
            data-active={panel.id === activePanel}
            onClick={() => setActivePanel(panel.id)}
          >
            {panel.label}
            <span className="material-symbols-outlined" aria-hidden>
              {panel.id === activePanel ? 'chevron_right' : 'north_east'}
            </span>
          </button>
        ))}
      </aside>
      <div className={styles.content}>{renderActivePanel()}</div>
    </div>
  )
}


