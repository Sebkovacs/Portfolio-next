"use client"
import type { ThemePreference } from '../../../ThemeProvider'
import { useTheme } from '../../../ThemeProvider'
import styles from './ThemeSettingsPanel.module.css'

const options: Array<{ value: ThemePreference; label: string; description: string }> = [
  { value: 'light', label: 'Light', description: 'Use a bright canvas optimised for daytime review.' },
  { value: 'dark', label: 'Dark', description: 'Dim the interface for night sessions without sacrificing contrast.' },
  { value: 'system', label: 'System', description: 'Mirror the system appearance automatically.' },
]

export default function ThemeSettingsPanel() {
  const { preference, setPreference } = useTheme()

  return (
    <div className={styles.group}>
      {options.map((option) => (
        <label key={option.value} className={styles.option}>
          <input
            type="radio"
            name="theme-preference"
            value={option.value}
            checked={preference === option.value}
            onChange={() => setPreference(option.value)}
          />
          <div>
            <div className={styles.optionTitle}>{option.label}</div>
            <p className={styles.optionDescription}>{option.description}</p>
          </div>
        </label>
      ))}
    </div>
  )
}
