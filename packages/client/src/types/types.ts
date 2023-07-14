import type { ColorScheme } from '@mantine/styles'

export type ColorSchemeMode = ColorScheme | 'system'

export type ModalName = 'about' | 'settings'

export interface AppState {
  headerVisible: boolean
  modalOpened: ModalName | null
}

export interface Settings {
  colorSchemeMode?: ColorSchemeMode
}
