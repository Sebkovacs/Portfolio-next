import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type ProjectImage = { id: number | string, image: string, alt: string, caption?: string }
export type ProjectPlan = { id: number | string, plan: string, alt: string }
export type Project = {
  id: string
  title: string
  shortTitle: string
  date: string
  type?: string
  status?: string
  company?: string
  location?: string
  software?: string
  rendering?: string
  work?: string
  summary?: string
  thumb: string
  thumbAlt: string
  pics: ProjectImage[]
  plans: ProjectPlan[]
  north?: number
  pano?: string
  panos?: { name: string, link: string }[]
  homeSections?: string[]
  featured?: boolean
}

const projectsDir = path.join(process.cwd(), 'projects')

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'))
  const items = files.map(file => {
    const id = file.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(projectsDir, file), 'utf8')
    const { data } = matter(raw)
    return { id, ...(data as any) } as Project
  })
  return items.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getProject(slug: string): Project | null {
  const file = path.join(projectsDir, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf8')
  const { data } = matter(raw)
  return { id: slug, ...(data as any) } as Project
}



