/*
  Validate project markdown files for required fields and referenced assets.
  Usage: node scripts/validate-projects.js
*/

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const projectsDir = path.join(process.cwd(), 'projects')
const publicDir = path.join(process.cwd(), 'public', 'projects')

const requiredTop = [
  'title', 'shortTitle', 'date', 'type', 'status', 'thumb', 'thumbAlt'
]

function exists(p) {
  try { fs.accessSync(p); return true } catch { return false }
}

function main() {
  const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'))
  let ok = true
  for (const f of files) {
    const full = path.join(projectsDir, f)
    const raw = fs.readFileSync(full, 'utf8')
    const { data } = matter(raw)
    const id = f.replace(/\.md$/, '')
    const errs = []
    for (const k of requiredTop) {
      if (!(k in data)) errs.push(`missing field: ${k}`)
    }
    if (data.shortTitle) {
      const assetBase = path.join(publicDir, data.shortTitle)
      if (!exists(assetBase)) errs.push(`missing folder: public/projects/${data.shortTitle}`)
      if (data.thumb && typeof data.thumb === 'string') {
        const thumbPath = path.join(assetBase, data.thumb.replace(/^\//, ''))
        if (!exists(thumbPath)) errs.push(`missing thumb: ${thumbPath}`)
      }
      if (Array.isArray(data.pics)) {
        for (const p of data.pics) {
          if (!p.image) continue
          const img = path.join(assetBase, String(p.image).replace(/^\//, ''))
          if (!exists(img)) errs.push(`missing pic: ${img}`)
        }
      }
      if (Array.isArray(data.plans)) {
        for (const pl of data.plans) {
          if (!pl.plan) continue
          const planPath = path.join(assetBase, String(pl.plan).replace(/^\//, ''))
          if (!exists(planPath)) errs.push(`missing plan: ${planPath}`)
        }
      }
    }
    if (errs.length) {
      ok = false
      console.log(`\n[${id}]`)
      for (const e of errs) console.log(` - ${e}`)
    }
  }
  if (ok) console.log('All projects valid ✅')
}

main()

