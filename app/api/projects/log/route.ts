import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export const runtime = 'nodejs'

export async function GET() {
  const root = process.cwd()
  const logPath = path.join(root, 'data', 'upload-log.json')
  try {
    if (!fs.existsSync(logPath)) {
      return NextResponse.json({ entries: [] })
    }
    const raw = fs.readFileSync(logPath, 'utf8')
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return NextResponse.json({ entries: [] })
    }
    return NextResponse.json({ entries: parsed })
  } catch (error) {
    console.warn('Failed to read upload log', error)
    return NextResponse.json({ entries: [] })
  }
}
