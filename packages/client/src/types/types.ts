import type { ColorScheme } from '@mantine/styles'

export type ColorSchemeMode = ColorScheme | 'system'

export interface AppState {
  headerVisible: boolean
  settingsModalOpened: boolean
}

export interface Settings {
  colorSchemeMode?: ColorSchemeMode
}
