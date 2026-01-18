import type { ChangeEvent } from 'react'
import Link from 'next/link'
import type { ActivityEntry, DraftState, HomeSectionKey, MessageState } from './types'

type ProjectDetailsSectionProps = {
  draft: DraftState
  errors: Record<string, string>
  onFieldChange: (field: keyof DraftState) => (event: ChangeEvent<HTMLInputElement>) => void
}

export function ProjectDetailsSection({ draft, errors, onFieldChange }: ProjectDetailsSectionProps) {
  return (
    <div className="form-section">
      <h2 className="form-section__title">Project details</h2>
      <div className="form-grid form-grid--two">
        <label className="form-field">
          <span className="form-label">Title</span>
          <input
            name="title"
            required
            className={`form-input${errors.title ? ' form-input--invalid' : ''}`}
            value={draft.title}
            onChange={onFieldChange('title')}
            aria-invalid={Boolean(errors.title)}
          />
          {errors.title && <span className="form-field__error">{errors.title}</span>}
        </label>
        <label className="form-field">
          <span className="form-label">Short title (folder)</span>
          <input
            name="shortTitle"
            required
            className={`form-input${errors.shortTitle ? ' form-input--invalid' : ''}`}
            value={draft.shortTitle}
            onChange={onFieldChange('shortTitle')}
            aria-invalid={Boolean(errors.shortTitle)}
          />
          <span className="form-hint">Used for markdown assets. Lowercase and hyphenated.</span>
          {errors.shortTitle && <span className="form-field__error">{errors.shortTitle}</span>}
        </label>
        <label className="form-field">
          <span className="form-label">Date (YYYY-MM-DD)</span>
          <input
            name="date"
            required
            className={`form-input${errors.date ? ' form-input--invalid' : ''}`}
            value={draft.date}
            onChange={onFieldChange('date')}
            placeholder="2025-03-01"
            aria-invalid={Boolean(errors.date)}
          />
          {errors.date && <span className="form-field__error">{errors.date}</span>}
        </label>
        <label className="form-field">
          <span className="form-label">Type</span>
          <input name="type" className="form-input" />
        </label>
        <label className="form-field">
          <span className="form-label">Status</span>
          <input name="status" className="form-input" />
        </label>
        <label className="form-field">
          <span className="form-label">Company</span>
          <input name="company" className="form-input" />
        </label>
        <label className="form-field">
          <span className="form-label">Location</span>
          <input name="location" className="form-input" />
        </label>
        <label className="form-field">
          <span className="form-label">Software</span>
          <input name="software" className="form-input" />
        </label>
        <label className="form-field">
          <span className="form-label">Rendering</span>
          <input name="rendering" className="form-input" />
        </label>
        <label className="form-field">
          <span className="form-label">North (deg)</span>
          <input name="north" type="number" className="form-input" />
        </label>
      </div>
    </div>
  )
}

type NarrativeSectionProps = {
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export function NarrativeSection({ onChange }: NarrativeSectionProps) {
  return (
    <div className="form-section">
      <h2 className="form-section__title">Narrative</h2>
      <label className="form-field">
        <span className="form-label">Summary</span>
        <textarea
          name="summary"
          rows={4}
          className="form-input"
          placeholder="Concise overview for the project detail page."
          onChange={onChange}
        />
      </label>
    </div>
  )
}

type AssetsSectionProps = {
  errors: Record<string, string>
  picAltsInput: string
  planAltsInput: string
  onThumbSelect: (file: File | null) => void
  onThumbAltChange: (event: ChangeEvent<HTMLInputElement>) => void
  onPicsSelect: (files: File[]) => void
  onPlansSelect: (files: File[]) => void
  onPicAltsChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  onPlanAltsChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export function AssetsSection({
  errors,
  picAltsInput,
  planAltsInput,
  onThumbSelect,
  onThumbAltChange,
  onPicsSelect,
  onPlansSelect,
  onPicAltsChange,
  onPlanAltsChange,
}: AssetsSectionProps) {
  return (
    <div className="form-section">
      <h2 className="form-section__title">Assets</h2>
      <div className="form-grid form-grid--two">
        <label className="form-field">
          <span className="form-label">Thumb</span>
          <input
            name="thumb"
            type="file"
            accept="image/*"
            required
            className="form-input form-input--file"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0] ?? null
              onThumbSelect(file)
            }}
          />
        </label>
        <label className="form-field">
          <span className="form-label">Thumb alt text</span>
          <input
            name="thumbAlt"
            required
            className={`form-input${errors.thumbAlt ? ' form-input--invalid' : ''}`}
            aria-invalid={Boolean(errors.thumbAlt)}
            onChange={onThumbAltChange}
          />
          {errors.thumbAlt && <span className="form-field__error">{errors.thumbAlt}</span>}
        </label>
        <label className="form-field">
          <span className="form-label">Image gallery</span>
          <input
            name="pics"
            type="file"
            accept="image/*"
            multiple
            className="form-input form-input--file"
            onChange={(event) => onPicsSelect(Array.from(event.currentTarget.files || []))}
          />
          <span className="form-hint">Upload multiple renders or photos.</span>
        </label>
        <label className="form-field">
          <span className="form-label">Plans</span>
          <input
            name="plans"
            type="file"
            accept="image/*"
            multiple
            className="form-input form-input--file"
            onChange={(event) => onPlansSelect(Array.from(event.currentTarget.files || []))}
          />
        </label>
        <label className="form-field">
          <span className="form-label">Gallery alt text</span>
          <textarea
            name="picAltOverrides"
            rows={3}
            className="form-input"
            placeholder="One alt description per line, matching the upload order."
            value={picAltsInput}
            onChange={onPicAltsChange}
          />
        </label>
        <label className="form-field">
          <span className="form-label">Plan alt text</span>
          <textarea
            name="planAltOverrides"
            rows={3}
            className="form-input"
            placeholder="Optional alt text per plan in upload order."
            value={planAltsInput}
            onChange={onPlanAltsChange}
          />
        </label>
      </div>
    </div>
  )
}

const homeSectionOptions: Array<{ value: HomeSectionKey; label: string; description: string }> = [
  { value: 'selected', label: 'Selected projects', description: 'Hero work highlighted on the public landing page.' },
  { value: 'themes', label: 'Themes', description: 'Group into thematic collections for storytelling.' },
  { value: 'portfolios', label: 'Portfolios', description: 'Show within rotating portfolio sets for browsing.' },
]

type HomePlacementSectionProps = {
  selected: HomeSectionKey[]
  onToggle: (value: HomeSectionKey, checked: boolean) => void
  featured: boolean
  onFeaturedChange: (checked: boolean) => void
}

export function HomePlacementSection({ selected, onToggle, featured, onFeaturedChange }: HomePlacementSectionProps) {
  return (
    <div className="form-section">
      <h2 className="form-section__title">Homepage placement</h2>
      <div className="form-grid form-grid--two">
        <label className="form-field" style={{ alignItems: 'flex-start' }}>
          <span className="form-label">Featured badge</span>
          <span>
            <input
              type="checkbox"
              name="featured"
              value="true"
              checked={featured}
              onChange={(event) => onFeaturedChange(event.target.checked)}
              style={{ marginRight: '0.6rem' }}
            />
            Highlight this project in featured slots
          </span>
        </label>
        <div className="form-field">
          <span className="form-label">Homepage sections</span>
          <span className="form-hint">Choose where the project appears on the landing page.</span>
          <div className="form-grid" style={{ gap: '0.6rem' }}>
            {homeSectionOptions.map((option) => (
              <label key={option.value} className="form-field" style={{ alignItems: 'flex-start' }}>
                <span>
                  <input
                    type="checkbox"
                    name="homeSections"
                    value={option.value}
                    checked={selected.includes(option.value)}
                    onChange={(event) => onToggle(option.value, event.target.checked)}
                    style={{ marginRight: '0.6rem' }}
                  />
                  {option.label}
                </span>
                <span className="form-hint">{option.description}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

type ExtrasSectionProps = {
  extraFrontmatter: string
  onExtraFrontmatterChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export function ExtrasSection({ extraFrontmatter, onExtraFrontmatterChange }: ExtrasSectionProps) {
  return (
    <div className="form-section">
      <h2 className="form-section__title">Extras</h2>
      <div className="form-grid form-grid--two">
        <label className="form-field">
          <span className="form-label">3D tour URL</span>
          <input name="pano" className="form-input" placeholder="https://" />
        </label>
        <label className="form-field">
          <span className="form-label">Additional front matter</span>
          <textarea
            name="extraFrontmatter"
            rows={3}
            className="form-input"
            placeholder="Optional YAML lines, e.g. draft: true"
            value={extraFrontmatter}
            onChange={onExtraFrontmatterChange}
          />
        </label>
      </div>
    </div>
  )
}

type FormMessageProps = {
  message: MessageState | null
}

export function FormMessage({ message }: FormMessageProps) {
  if (!message) return null
  return (
    <p className={`form-message form-message--${message.tone}`} role="status" aria-live="polite">
      {message.text}
    </p>
  )
}

type ActivityPanelProps = {
  activity: ActivityEntry[]
}

export function ActivityPanel({ activity }: ActivityPanelProps) {
  if (activity.length === 0) {
    return (
      <aside className="activity">
        <h2>Recent uploads</h2>
        <p className="form-hint">Uploads will appear here with quick links once created.</p>
      </aside>
    )
  }

  return (
    <aside className="activity">
      <h2>Recent uploads</h2>
      <div className="activity__list">
        {activity.map((entry) => (
          <div key={`${entry.timestamp}-${entry.slug}`} className="activity__item">
            <div className="activity__title">
              <Link href={`/projects/${entry.slug}`}>{entry.title}</Link>
            </div>
            <div className="activity__meta">Slug: {entry.slug}</div>
            <div className="activity__meta">Assets: {entry.assetsFolder}</div>
            <div className="activity__meta">Markdown: projects/{entry.slug}.md</div>
            <div className="activity__meta">Logged {new Date(entry.timestamp).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </aside>
  )
}

type FrontmatterPreviewProps = {
  preview: string
}

export function FrontmatterPreview({ preview }: FrontmatterPreviewProps) {
  return (
    <div className="form-preview-card">
      <h2>Front matter preview</h2>
      <p className="form-hint">Review or copy the generated YAML. Alt text and additional lines update live before upload.</p>
      <pre className="form-preview">{preview}</pre>
    </div>
  )
}

type AdminIntroProps = {
  slugPreview: string
  assetsPreview: string
}

export function AdminIntro({ slugPreview, assetsPreview }: AdminIntroProps) {
  return (
    <div className="admin__header">
      <span className="admin__eyebrow">Admin</span>
      <h1 className="admin__title">Create a project entry</h1>
      <p className="admin__lead">Upload hero imagery, plans and metadata to generate a new markdown record for the portfolio archive.</p>
      <div className="form-hint">
        Slug preview: <strong>{slugPreview || '(auto)'}</strong> | Assets folder <strong>{assetsPreview || '(pending)'}</strong>
      </div>
    </div>
  )
}
