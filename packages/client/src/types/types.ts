import type { ColorScheme } from '@mantine/styles'

import type { notificationTypes } from '#ui/components/App/notifications/getNotificationProps'

export type ColorSchemeMode = ColorScheme | 'system'

export type ModalName = 'about' | 'settings'

/** Arbitrary object */
export type ArbitraryObject = Record<string, unknown>

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

export interface Notification {
  id: string
  type?: keyof typeof notificationTypes
  instruction: 'hide' | 'show'
}
