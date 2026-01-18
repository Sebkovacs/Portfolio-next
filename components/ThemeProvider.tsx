"use client"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

type ThemePreference = 'light' | 'dark' | 'system'
type ThemeMode = 'light' | 'dark'

type ThemeContextValue = {
  preference: ThemePreference
  theme: ThemeMode
  setPreference: (value: ThemePreference) => void
  toggle: () => void
}

const STORAGE_KEY = 'theme-preference'

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function resolveTheme(preference: ThemePreference, systemDark: boolean): ThemeMode {
  if (preference === 'system') {
    return systemDark ? 'dark' : 'light'
  }
  return preference
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>('system')
  const [systemDark, setSystemDark] = useState<boolean>(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      setPreference(stored)
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemDark(event.matches)
    }
    setSystemDark(media.matches)
    media.addEventListener('change', handleChange)
    setHydrated(true)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  const theme = resolveTheme(preference, systemDark)

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, preference)
    } catch {}
  }, [hydrated, preference])

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    root.style.colorScheme = theme
  }, [theme])

  const cyclePreference = useCallback(() => {
    setPreference((current) => {
      if (current === 'light') return 'dark'
      if (current === 'dark') return 'system'
      return 'light'
    })
  }, [])

  const contextValue = useMemo<ThemeContextValue>(
    () => ({ preference, theme, setPreference, toggle: cyclePreference }),
    [preference, theme, cyclePreference]
  )

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

export type { ThemePreference, ThemeMode }
