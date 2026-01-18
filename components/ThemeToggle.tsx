"use client"
import type { ThemePreference } from './ThemeProvider'
import { useTheme } from './ThemeProvider'

const order: ThemePreference[] = ['light', 'dark', 'system']
const icons: Record<ThemePreference, string> = {
  light: 'light_mode',
  dark: 'dark_mode',
  system: 'settings_suggest',
}
const labels: Record<ThemePreference, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
}

export default function ThemeToggle() {
  const { preference, toggle } = useTheme()

  const icon = icons[preference]
  const label = labels[preference]

  return (
    <button
      aria-label={`Theme preference: ${label}`}
      onClick={toggle}
      className="site-nav__toggle"
      type="button"
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className="site-nav__toggle-label">{label}</span>
    </button>
  )
}
