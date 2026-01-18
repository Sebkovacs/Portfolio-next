import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export const runtime = 'nodejs'

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/(^-|-$)/g, '')
}

function normaliseFilename(name: string) {
  return name
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9_.-]/g, '')
    .toLowerCase()
}

function splitLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
}

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const title = String(form.get('title') || '').trim()
    const shortTitleRaw = String(form.get('shortTitle') || '').trim()
    const date = String(form.get('date') || '').trim()
    const type = String(form.get('type') || '').trim()
    const status = String(form.get('status') || '').trim()
    const company = String(form.get('company') || '').trim()
    const location = String(form.get('location') || '').trim()
    const software = String(form.get('software') || '').trim()
    const rendering = String(form.get('rendering') || '').trim()
    const summary = String(form.get('summary') || '').trim()
    const northStr = String(form.get('north') || '').trim()
    const pano = String(form.get('pano') || '').trim()
    const thumbAlt = String(form.get('thumbAlt') || '').trim()
    const picAltOverrides = splitLines(String(form.get('picAltOverrides') || ''))
    const planAltOverrides = splitLines(String(form.get('planAltOverrides') || ''))
    const extraFrontmatterLines = splitLines(String(form.get('extraFrontmatter') || ''))
    const homeSections = form.getAll('homeSections').map((item) => String(item)).filter(Boolean)
    const featured = String(form.get('featured') || '').toLowerCase() === 'true'

    if (!title || !shortTitleRaw || !date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: 'Date must use YYYY-MM-DD format' }, { status: 400 })
    }

    if (!thumbAlt) {
      return NextResponse.json({ error: 'Thumb alt text is required' }, { status: 400 })
    }

    const shortTitle = shortTitleRaw.toLowerCase()
    if (!/^[a-z0-9-]+$/.test(shortTitle)) {
      return NextResponse.json({ error: 'Short title can contain only lowercase letters, numbers and hyphens' }, { status: 400 })
    }

    const north = northStr ? Number(northStr) : undefined
    if (northStr && Number.isNaN(north)) {
      return NextResponse.json({ error: 'North must be a number' }, { status: 400 })
    }

    const root = process.cwd()
    const projectsDir = path.join(root, 'projects')
    const assetsDir = path.join(root, 'public', 'projects', shortTitle)

    const slug = slugify(title)
    if (!slug) {
      return NextResponse.json({ error: 'Unable to derive slug from title' }, { status: 400 })
    }

    if (fs.existsSync(path.join(projectsDir, `${slug}.md`))) {
      return NextResponse.json({ error: 'A project with this title already exists' }, { status: 409 })
    }

    if (fs.existsSync(assetsDir)) {
      return NextResponse.json({ error: 'Assets folder already exists for this short title' }, { status: 409 })
    }

    if (!fs.existsSync(projectsDir)) fs.mkdirSync(projectsDir, { recursive: true })
    if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true })

    const thumbFile = form.get('thumb') as File | null
    if (!thumbFile) {
      return NextResponse.json({ error: 'Thumb required' }, { status: 400 })
    }

    const thumbName = normaliseFilename(thumbFile.name)
    const thumbPath = path.join(assetsDir, thumbName)
    const thumbArray = Buffer.from(await thumbFile.arrayBuffer())
    fs.writeFileSync(thumbPath, thumbArray)

    const picsFiles = form.getAll('pics') as File[]
    const pics: { id: number; image: string; alt: string }[] = []
    let picId = 1
    for (const file of picsFiles) {
      if (!file || !file.name) continue
      const fname = normaliseFilename(file.name)
      const dest = path.join(assetsDir, fname)
      const arr = Buffer.from(await file.arrayBuffer())
      fs.writeFileSync(dest, arr)
      const alt = picAltOverrides[picId - 1] || `${title} image ${picId}`
      pics.push({ id: picId, image: `/${fname}`, alt })
      picId += 1
    }

    const plansFiles = form.getAll('plans') as File[]
    const plans: { id: number; plan: string; alt: string }[] = []
    let planId = 1
    for (const file of plansFiles) {
      if (!file || !file.name) continue
      const fname = normaliseFilename(file.name)
      const dest = path.join(assetsDir, fname)
      const arr = Buffer.from(await file.arrayBuffer())
      fs.writeFileSync(dest, arr)
      const alt = planAltOverrides[planId - 1] || `${title} plan ${planId}`
      plans.push({ id: planId, plan: `/${fname}`, alt })
      planId += 1
    }

    const metadataLines = [
      `title: ${JSON.stringify(title)}`,
      `shortTitle: ${JSON.stringify(shortTitle)}`,
      `date: ${JSON.stringify(date)}`,
      type && `type: ${JSON.stringify(type)}`,
      status && `status: ${JSON.stringify(status)}`,
      company && `company: ${JSON.stringify(company)}`,
      location && `location: ${JSON.stringify(location)}`,
      software && `software: ${JSON.stringify(software)}`,
      rendering && `rendering: ${JSON.stringify(rendering)}`,
      summary && `summary: ${JSON.stringify(summary)}`,
      `thumb: ${JSON.stringify('/' + thumbName)}`,
      `thumbAlt: ${JSON.stringify(thumbAlt)}`,
      north !== undefined && `north: ${north}`,
      pano && `pano: ${JSON.stringify(pano)}`,
      `pics: ${JSON.stringify(pics)}`,
      `plans: ${JSON.stringify(plans)}`,
      ...extraFrontmatterLines,
    ].filter(Boolean) as string[]

    const frontmatterLines = ['---', ...metadataLines, '---']
    if (summary) {
      frontmatterLines.push('', summary)
    }

    const mdPath = path.join(projectsDir, `${slug}.md`)
    fs.writeFileSync(mdPath, frontmatterLines.join('\n'), 'utf8')

    const logDir = path.join(root, 'data')
    const logPath = path.join(logDir, 'upload-log.json')
    const logEntry = {
      slug,
      shortTitle,
      title,
      timestamp: new Date().toISOString(),
      assetsFolder: `/public/projects/${shortTitle}`,
    }
    let log: any[] = []
    try {
      if (fs.existsSync(logPath)) {
        const parsed = JSON.parse(fs.readFileSync(logPath, 'utf8'))
        if (Array.isArray(parsed)) {
          log = parsed
        }
      }
    } catch (error) {
      console.warn('Failed to parse upload log, resetting file', error)
      log = []
    }
    log.unshift(logEntry)
    if (log.length > 50) {
      log = log.slice(0, 50)
    }
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true })
    fs.writeFileSync(logPath, JSON.stringify(log, null, 2), 'utf8')

    return NextResponse.json({ ok: true, id: slug, shortTitle, assetsFolder: `/public/projects/${shortTitle}` })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


