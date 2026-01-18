"use client"
import type { ChangeEvent, FormEvent } from 'react'
import { useMemo, useRef, useState } from 'react'
import {
  ActivityPanel,
  AdminIntro,
  AssetsSection,
  ExtrasSection,
  FormMessage,
  FrontmatterPreview,
  HomePlacementSection,
  NarrativeSection,
  ProjectDetailsSection,
} from './FormSections'
import ThemeSettingsPanel from './ThemeSettingsPanel'
import { useProjectAdminData } from './useProjectAdminData'
import type { DraftState, HomeSectionKey, MessageState } from './types'
import { normaliseFilename, slugify, splitLines } from './utils'

type ErrorState = Record<string, string>

const initialDraft: DraftState = { title: '', shortTitle: '', date: '' }

export default function NewProjectForm() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [draft, setDraft] = useState<DraftState>(initialDraft)
  const [message, setMessage] = useState<MessageState | null>(null)
  const [errors, setErrors] = useState<ErrorState>({})
  const [busy, setBusy] = useState(false)
  const [thumbFile, setThumbFile] = useState<File | null>(null)
  const [picFiles, setPicFiles] = useState<File[]>([])
  const [planFiles, setPlanFiles] = useState<File[]>([])
  const [picAltsInput, setPicAltsInput] = useState('')
  const [planAltsInput, setPlanAltsInput] = useState('')
  const [extraFrontmatter, setExtraFrontmatter] = useState('')
  const [homeSections, setHomeSections] = useState<HomeSectionKey[]>([])
  const [featured, setFeatured] = useState(false)
  const [previewTick, setPreviewTick] = useState(0)

  const { existing, activity, refreshMeta, refreshActivity } = useProjectAdminData()

  const bumpPreview = () => setPreviewTick((tick) => tick + 1)

  const clearError = (field: string) => {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleDraftChange = (field: keyof DraftState) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setDraft((prev) => ({ ...prev, [field]: value }))

    if (field === 'title') {
      const slug = slugify(value)
      if (existing && slug && existing.ids.has(slug)) {
        setErrors((prev) => ({ ...prev, title: 'A project with this title already exists.' }))
      } else {
        clearError('title')
      }
    } else if (field === 'shortTitle') {
      if (value && !/^[a-z0-9-]+$/.test(value)) {
        setErrors((prev) => ({ ...prev, shortTitle: 'Use lowercase letters, numbers and hyphens only.' }))
      } else if (existing && value && existing.shortTitles.has(value.toLowerCase())) {
        setErrors((prev) => ({ ...prev, shortTitle: 'This short title is already in use.' }))
      } else {
        clearError('shortTitle')
      }
    } else if (field === 'date') {
      clearError('date')
    }

    bumpPreview()
  }

  const handleHomeSectionToggle = (value: HomeSectionKey, checked: boolean) => {
    setHomeSections((prev) => {
      const next = new Set(prev)
      if (checked) {
        next.add(value)
      } else {
        next.delete(value)
      }
      return Array.from(next)
    })
    bumpPreview()
  }

  const handleFeaturedChange = (checked: boolean) => {
    setFeatured(checked)
    bumpPreview()
  }

  const slugPreview = useMemo(() => slugify(draft.title), [draft.title])
  const assetsPreview = useMemo(() => (draft.shortTitle ? `/public/projects/${draft.shortTitle}` : ''), [draft.shortTitle])

  const validate = (form: HTMLFormElement) => {
    const formData = new FormData(form)
    const nextErrors: ErrorState = {}

    const title = String(formData.get('title') || '').trim()
    const shortTitle = String(formData.get('shortTitle') || '').trim()
    const date = String(formData.get('date') || '').trim()
    const thumbAlt = String(formData.get('thumbAlt') || '').trim()

    const slug = slugify(title)
    if (!slug) {
      nextErrors.title = 'Enter a descriptive title to generate the project slug.'
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      nextErrors.date = 'Use YYYY-MM-DD format.'
    }

    if (!shortTitle) {
      nextErrors.shortTitle = 'Short title is required.'
    } else if (!/^[a-z0-9-]+$/.test(shortTitle)) {
      nextErrors.shortTitle = 'Use lowercase letters, numbers and hyphens only.'
    }

    if (!thumbAlt) {
      nextErrors.thumbAlt = 'Alt text helps with accessibility.'
    }

    if (existing) {
      if (slug && existing.ids.has(slug)) {
        nextErrors.title = 'A project with this title already exists.'
      }
      if (shortTitle && existing.shortTitles.has(shortTitle.toLowerCase())) {
        nextErrors.shortTitle = 'This short title is already in use.'
      }
    }

    return nextErrors
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage(null)
    setErrors({})

    const form = event.currentTarget
    const nextErrors = validate(form)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setBusy(true)
    const fd = new FormData(form)
    fd.set('picAltOverrides', picAltsInput)
    fd.set('planAltOverrides', planAltsInput)
    fd.set('extraFrontmatter', extraFrontmatter)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Upload failed')

      setMessage({ text: `Project created. Markdown file: ${json.id}.md`, tone: 'success' })
      form.reset()
      setDraft(initialDraft)
      setThumbFile(null)
      setPicFiles([])
      setPlanFiles([])
      setPicAltsInput('')
      setPlanAltsInput('')
      setExtraFrontmatter('')
      setHomeSections([])
      setFeatured(false)
      bumpPreview()
      await refreshMeta()
      await refreshActivity()
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Upload failed'
      setMessage({ text, tone: 'error' })
    } finally {
      setBusy(false)
    }
  }

  const frontmatterPreview = useMemo(() => {
    const form = formRef.current
    const formData = form ? new FormData(form) : undefined
    const title = (formData?.get('title') || draft.title || '').toString().trim()
    const shortTitle = (formData?.get('shortTitle') || draft.shortTitle || '').toString().trim().toLowerCase()
    const date = (formData?.get('date') || draft.date || '').toString().trim()
    const type = (formData?.get('type') || '').toString().trim()
    const status = (formData?.get('status') || '').toString().trim()
    const company = (formData?.get('company') || '').toString().trim()
    const location = (formData?.get('location') || '').toString().trim()
    const software = (formData?.get('software') || '').toString().trim()
    const rendering = (formData?.get('rendering') || '').toString().trim()
    const summary = (formData?.get('summary') || '').toString().trim()
    const north = (formData?.get('north') || '').toString().trim()
    const pano = (formData?.get('pano') || '').toString().trim()
    const thumbAlt = (formData?.get('thumbAlt') || '').toString().trim()

    const picAltOverrides = splitLines(picAltsInput)
    const planAltOverrides = splitLines(planAltsInput)

    const pics = picFiles.map((file, index) => {
      const id = index + 1
      const fname = normaliseFilename(file.name)
      const alt = picAltOverrides[index] || `${title || shortTitle || 'Image'} ${id}`
      return { id, image: `/${fname}`, alt }
    })

    const plans = planFiles.map((file, index) => {
      const id = index + 1
      const fname = normaliseFilename(file.name)
      const alt = planAltOverrides[index] || `${title || 'Plan'} ${id}`
      return { id, plan: `/${fname}`, alt }
    })

    const metaLines: string[] = []
    if (title) metaLines.push(`title: ${JSON.stringify(title)}`)
    if (shortTitle) metaLines.push(`shortTitle: ${JSON.stringify(shortTitle)}`)
    if (date) metaLines.push(`date: ${JSON.stringify(date)}`)
    if (type) metaLines.push(`type: ${JSON.stringify(type)}`)
    if (status) metaLines.push(`status: ${JSON.stringify(status)}`)
    if (company) metaLines.push(`company: ${JSON.stringify(company)}`)
    if (location) metaLines.push(`location: ${JSON.stringify(location)}`)
    if (software) metaLines.push(`software: ${JSON.stringify(software)}`)
    if (rendering) metaLines.push(`rendering: ${JSON.stringify(rendering)}`)
    if (summary) metaLines.push(`summary: ${JSON.stringify(summary)}`)
    if (thumbFile) metaLines.push(`thumb: ${JSON.stringify('/' + normaliseFilename(thumbFile.name))}`)
    if (thumbAlt) metaLines.push(`thumbAlt: ${JSON.stringify(thumbAlt)}`)
    if (north) metaLines.push(`north: ${north}`)
    if (pano) metaLines.push(`pano: ${JSON.stringify(pano)}`)
    if (pics.length) metaLines.push(`pics: ${JSON.stringify(pics)}`)
    if (plans.length) metaLines.push(`plans: ${JSON.stringify(plans)}`)
    if (homeSections.length) metaLines.push(`homeSections: ${JSON.stringify(homeSections)}`)
    if (featured) metaLines.push('featured: true')

    const extraLines = splitLines(extraFrontmatter)
    const doc: string[] = ['---', ...metaLines, ...extraLines, '---']
    if (summary) {
      doc.push('', summary)
    }

    if (doc.length <= 3) {
      return 'Fill in project details to preview the generated front matter.'
    }

    return doc.join('\n')
  }, [draft, extraFrontmatter, picAltsInput, planAltsInput, picFiles, planFiles, thumbFile, previewTick, homeSections, featured])

  return (
    <section className="admin page-shell">
      <div className="admin-layout">
        <div className="admin-column">
          <ThemeSettingsPanel />
          <AdminIntro slugPreview={slugPreview} assetsPreview={assetsPreview} />

          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="form-card"
            encType="multipart/form-data"
            onChange={bumpPreview}
            onInput={bumpPreview}
          >
            <ProjectDetailsSection draft={draft} errors={errors} onFieldChange={handleDraftChange} />

            <NarrativeSection onChange={(event) => {
              void event.target.value
              bumpPreview()
            }} />

            <AssetsSection
              errors={errors}
              picAltsInput={picAltsInput}
              planAltsInput={planAltsInput}
              onThumbSelect={(file) => {
                setThumbFile(file)
                bumpPreview()
              }}
              onThumbAltChange={(event) => {
                void event.target.value
                clearError('thumbAlt')
                bumpPreview()
              }}
              onPicsSelect={(files) => {
                setPicFiles(files)
                bumpPreview()
              }}
              onPlansSelect={(files) => {
                setPlanFiles(files)
                bumpPreview()
              }}
              onPicAltsChange={(event) => {
                setPicAltsInput(event.target.value)
                bumpPreview()
              }}
              onPlanAltsChange={(event) => {
                setPlanAltsInput(event.target.value)
                bumpPreview()
              }}
            />

            <HomePlacementSection
              selected={homeSections}
              onToggle={handleHomeSectionToggle}
              featured={featured}
              onFeaturedChange={handleFeaturedChange}
            />

            <ExtrasSection
              extraFrontmatter={extraFrontmatter}
              onExtraFrontmatterChange={(event) => {
                setExtraFrontmatter(event.target.value)
                bumpPreview()
              }}
            />

            <div className="form-actions">
              <button type="submit" disabled={busy} className="btn btn--primary">
                {busy ? 'Uploading...' : 'Create project'}
              </button>
              <span className="form-hint">Markdown plus assets sync to the /projects directory.</span>
            </div>

            <FormMessage message={message} />
          </form>

          <FrontmatterPreview preview={frontmatterPreview} />
        </div>

        <ActivityPanel activity={activity} />
      </div>
    </section>
  )
}
