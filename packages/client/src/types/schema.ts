import isLocale from 'validator/lib/isLocale'
import { z } from 'zod'

import { layout } from '@newsdash/common/schema'

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

const normalizedEntitiesSchema = z.object({
  boxes: z.array(layout.boxSchema),
  panels: z.array(layout.panelSchema),
  tabs: z.array(layout.tabSchema),
})

export { localeSchema, normalizedEntitiesSchema, settingsSchema }
