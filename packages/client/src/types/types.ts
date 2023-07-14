import type { ColorScheme } from '@mantine/styles'

export type ColorSchemeMode = ColorScheme | 'system'

export interface AppState {
  settingsModalOpened: boolean
}

export interface Settings {
  colorSchemeMode?: ColorSchemeMode
}
