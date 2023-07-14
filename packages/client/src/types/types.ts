import type { ColorScheme } from '@mantine/styles'

export type ColorSchemeMode = ColorScheme | 'system'

export type ModalName = 'about' | 'settings'

export interface AppState {
  /** Header visibility state */
  headerVisible: boolean

  /** Name of currently opened modal */
  modalOpened: ModalName | null

  /** Version string as reported by API */
  versionInfo: VersionInfo | null
}

export interface Settings {
  colorSchemeMode?: ColorSchemeMode
}

export interface VersionInfo {
  name: string
  version: string
}
