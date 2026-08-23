"use client"
import { useTheme } from './ThemeProvider'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      onClick={toggle}
      className={styles.themeToggleBtn}
      type="button"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>
        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  )
}
