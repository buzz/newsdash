import type { notificationTypes } from '#ui/components/App/notifications/notificationTypes'

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
  // TODO:
  // colors
  //   - lightness
  //   - saturation
  // fetch interval
  // feed items to keep
}

export interface VersionInfo {
  name: string
  version: string
}

export interface HideNotification {
  id: string
  instruction: 'hide'
}

export interface ShowNotification {
  id: string
  type: keyof typeof notificationTypes
  instruction: 'show'
}

export type Notification = HideNotification | ShowNotification
