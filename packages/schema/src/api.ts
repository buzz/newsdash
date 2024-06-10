import { z } from 'zod'

import { boxSchema, panelSchema, tabSchema } from './layout.js'

const colorParamSchema = z.number().int().min(0).max(100)

const settingsSchema = z.object({
  lightness: colorParamSchema,
  saturation: colorParamSchema,
  fetchInterval: z.number().int().min(5).max(60),
  itemsToKeep: z.number().int().min(20).max(200),
})

const persistPanelSchema = panelSchema.omit({ activeId: true })

const persistLayoutSchema = z.object({
  boxes: z.array(boxSchema),
  panels: z.array(persistPanelSchema),
  tabs: z.array(tabSchema),
})

const persistStateSchema = persistLayoutSchema.extend({ settings: z.optional(settingsSchema) })

const resultSchema = z.object({ result: z.string() })

const versionInfoSchema = z.object({
  name: z.string(),
  version: z.string(),
})

const fetchFeedBodySchema = z.object({ url: z.string().url() })

type Settings = z.infer<typeof settingsSchema>
type PersistStateSchema = z.infer<typeof persistStateSchema>
type PersistLayout = z.infer<typeof persistLayoutSchema>
type Result = z.infer<typeof resultSchema>
type VersionInfo = z.infer<typeof versionInfoSchema>
type FetchFeedBody = z.infer<typeof fetchFeedBodySchema>

export type { FetchFeedBody, PersistLayout, PersistStateSchema, Result, Settings, VersionInfo }
export {
  fetchFeedBodySchema,
  persistLayoutSchema,
  persistStateSchema,
  resultSchema,
  settingsSchema,
  versionInfoSchema,
}
