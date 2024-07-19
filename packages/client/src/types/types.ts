import type { z } from 'zod'

import type { normalizedEntitiesSchema, settingsSchema } from './schema'

type ModalName = 'about' | 'import-export' | 'settings'

/** Arbitrary object */
type ArbitraryObject = Record<string, unknown>

interface AppState {
  /** Current Mantine computed color scheme */
  colorScheme: 'light' | 'dark'

  /** Header visibility state */
  headerVisible: boolean

  /** App initialized */
  initDone: boolean

  /** Name of currently opened modal */
  modal: ModalName | null
}

interface NotificationShow {
  id: string
  command: 'show'
  data: {
    message: string
    title: string
    type: 'error' | 'notice' | 'success'
  }
}

interface NotificationHide {
  id: string
  command: 'hide'
}

type Notification = NotificationHide | NotificationShow

interface DisplayParams {
  height: number
  overscanCount?: number
}

type Settings = z.infer<typeof settingsSchema>

type NormalizedEntities = z.infer<typeof normalizedEntitiesSchema>

export type {
  AppState,
  ArbitraryObject,
  DisplayParams,
  ModalName,
  NormalizedEntities,
  Notification,
  NotificationHide,
  NotificationShow,
  Settings,
}
