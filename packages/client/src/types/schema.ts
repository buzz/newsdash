import isLocale from 'validator/lib/isLocale'
import { z } from 'zod'

import { layout } from '@newsdash/common/schema'

import {
  FETCH_INTERVAL_DEFAULT,
  FETCH_INTERVAL_MAX,
  FETCH_INTERVAL_MIN,
  ITEMS_TO_KEEP_DEFAULT,
  ITEMS_TO_KEEP_MAX,
  ITEMS_TO_KEEP_MIN,
  LIGHTNESS_DEFAULT,
  LIGHTNESS_MAX,
  LIGHTNESS_MIN,
  SATURATION_DEFAULT,
  SATURATION_MAX,
  SATURATION_MIN,
} from '#constants'

const localeSchema = z.string().refine(isLocale, { message: 'Not a valid locale' })

const settingsSchema = z.object({
  tabColors: z.boolean().default(true),
  lightness: z.number().int().min(LIGHTNESS_MIN).max(LIGHTNESS_MAX).default(LIGHTNESS_DEFAULT),
  saturation: z.number().int().min(SATURATION_MIN).max(SATURATION_MAX).default(SATURATION_DEFAULT),
  fetchInterval: z
    .number()
    .int()
    .min(FETCH_INTERVAL_MIN)
    .max(FETCH_INTERVAL_MAX)
    .default(FETCH_INTERVAL_DEFAULT),
  itemsToKeep: z
    .number()
    .int()
    .min(ITEMS_TO_KEEP_MIN)
    .max(ITEMS_TO_KEEP_MAX)
    .default(ITEMS_TO_KEEP_DEFAULT),
  dateLocale: z.optional(localeSchema),
  dateHour12: z.optional(z.boolean()),
  slideAnimation: z.boolean().default(true),
})

const normalizedEntitiesSchema = z.object({
  boxes: z.array(layout.boxSchema),
  panels: z.array(layout.panelSchema),
  tabs: z.array(layout.tabSchema),
})

export { localeSchema, normalizedEntitiesSchema, settingsSchema }
