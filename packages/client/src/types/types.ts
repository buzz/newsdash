import { z } from 'zod'
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

const colorParamSchema = z.number().int().min(0).max(100)

const settingsSchema = z.object({
  lightness: colorParamSchema,
  saturation: colorParamSchema,
  fetchInterval: z.number().int().min(5).max(60),
  itemsToKeep: z.number().int().min(10).max(200),
})

type Settings = z.infer<typeof settingsSchema>

export type { AppState, ArbitraryObject, ModalName, Notification, Settings }
export { settingsSchema }
