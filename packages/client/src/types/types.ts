import type { NotificationData } from '@mantine/notifications'

type ModalName = 'about' | 'settings'

/** Arbitrary object */
type ArbitraryObject = Record<string, unknown>

interface AppState {
  /** Header visibility state */
  headerVisible: boolean

  /** Name of currently opened modal */
  modal: ModalName | null
}

interface Notification {
  id: string
  command: 'show' | 'hide'
  data?: NotificationData
}

export type { AppState, ArbitraryObject, ModalName, Notification }
