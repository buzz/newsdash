import isLocale from 'validator/lib/isLocale'
import { z } from 'zod'

import {
  FETCH_INTERVAL_MAX,
  FETCH_INTERVAL_MIN,
  ITEMS_TO_KEEP_MAX,
  ITEMS_TO_KEEP_MIN,
  LIGHTNESS_MAX,
  LIGHTNESS_MIN,
  SATURATION_MAX,
  SATURATION_MIN,
} from '#constants'

type ModalName = 'about' | 'settings'

/** Arbitrary object */
type ArbitraryObject = Record<string, unknown>

interface AppState {
  /** Current Mantine computed color scheme */
  colorScheme: 'light' | 'dark'

  /** Header visibility state */
  headerVisible: boolean

  /** Name of currently opened modal */
  modal: ModalName | null
}

interface NotificationShow {
  id: string
  command: 'show'
  data: {
    message: string
    title: string
    type: 'error' | 'notice'
  }
}

interface NotificationHide {
  id: string
  command: 'hide'
}

type Notification = NotificationHide | NotificationShow

const localeSchema = z.string().refine(isLocale, { message: 'Not a valid locale' })

const settingsSchema = z.object({
  tabColors: z.boolean(),
  lightness: z.number().int().min(LIGHTNESS_MIN).max(LIGHTNESS_MAX),
  saturation: z.number().int().min(SATURATION_MIN).max(SATURATION_MAX),
  fetchInterval: z.number().int().min(FETCH_INTERVAL_MIN).max(FETCH_INTERVAL_MAX),
  itemsToKeep: z.number().int().min(ITEMS_TO_KEEP_MIN).max(ITEMS_TO_KEEP_MAX),
  dateLocale: z.optional(localeSchema),
  dateHour12: z.optional(z.boolean()),
})

type Settings = z.infer<typeof settingsSchema>

export type {
  AppState,
  ArbitraryObject,
  ModalName,
  Notification,
  NotificationHide,
  NotificationShow,
  Settings,
}
export { localeSchema, settingsSchema }
