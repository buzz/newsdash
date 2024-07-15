import type { Settings } from '#types/types'

interface SettingsProps {
  settings: Settings
  throttledUpdateSettings: (settings: Partial<Settings>) => void
}

export type { SettingsProps }
