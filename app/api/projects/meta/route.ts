import { NextResponse } from 'next/server'
import { getAllProjects } from '../../../../lib/projects.server'

export const runtime = 'nodejs'

export async function GET() {
  const projects = getAllProjects().map((project) => ({
    id: project.id,
    shortTitle: project.shortTitle,
    title: project.title,
  }))
  return NextResponse.json({ projects })
}
