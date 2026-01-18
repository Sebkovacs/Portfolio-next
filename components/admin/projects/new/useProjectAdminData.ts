"use client"
import { useCallback, useEffect, useState } from 'react'
import type { ActivityEntry, ExistingMeta } from './types'

type RefreshMeta = () => Promise<ExistingMeta | null>
type RefreshActivity = () => Promise<ActivityEntry[]>

async function fetchMeta(): Promise<ExistingMeta | null> {
  const res = await fetch('/api/projects/meta')
  if (!res.ok) return null
  const data = await res.json()
  const ids = new Set<string>()
  const shortTitles = new Set<string>()
  for (const project of data.projects || []) {
    if (project?.id) ids.add(String(project.id).toLowerCase())
    if (project?.shortTitle) shortTitles.add(String(project.shortTitle).toLowerCase())
  }
  return { ids, shortTitles }
}

async function fetchActivity(): Promise<ActivityEntry[]> {
  const res = await fetch('/api/projects/log')
  if (!res.ok) return []
  const data = await res.json()
  return Array.isArray(data.entries) ? (data.entries as ActivityEntry[]) : []
}

export function useProjectAdminData() {
  const [existing, setExisting] = useState<ExistingMeta | null>(null)
  const [activity, setActivity] = useState<ActivityEntry[]>([])

  const refreshMeta: RefreshMeta = useCallback(async () => {
    try {
      const result = await fetchMeta()
      if (result) setExisting(result)
      return result
    } catch (error) {
      console.warn('Failed to load project metadata', error)
      return null
    }
  }, [])

  const refreshActivity: RefreshActivity = useCallback(async () => {
    try {
      const entries = await fetchActivity()
      setActivity(entries)
      return entries
    } catch (error) {
      console.warn('Failed to load activity log', error)
      return []
    }
  }, [])

  useEffect(() => {
    refreshMeta()
  }, [refreshMeta])

  useEffect(() => {
    refreshActivity()
  }, [refreshActivity])

  return {
    existing,
    activity,
    refreshMeta,
    refreshActivity,
  }
}
