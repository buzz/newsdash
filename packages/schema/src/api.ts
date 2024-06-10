import { z } from 'zod'

import { boxSchema, panelSchema, tabSchema } from './layout.js'

const feedInfoSchema = z.object({
  title: z.string(),
  description: z.optional(z.string()),
  link: z.optional(z.string().url()),
})

const feedItemSchema = z.object({
  id: z.string(),
  content: z.optional(z.string()),
  date: z.string().datetime(),
  link: z.optional(z.string().url()),
  title: z.string(),
})

const feedSchema = feedInfoSchema.extend({
  items: z.array(feedItemSchema),
})

const persistPanelSchema = panelSchema.omit({ activeId: true })

const persistLayoutSchema = z.object({
  boxes: z.array(boxSchema),
  panels: z.array(persistPanelSchema),
  tabs: z.array(tabSchema.omit({ error: true, group: true, status: true })),
})

const resultSchema = z.object({ result: z.string() })

const colorParamSchema = z.number().int().min(0).max(100)

const settingsSchema = z.object({
  lightness: colorParamSchema,
  saturation: colorParamSchema,
  fetchInterval: z.number().int().min(5).max(60),
  itemsToKeep: z.number().int().min(20).max(200),
})

const versionInfoSchema = z.object({
  name: z.string(),
  version: z.string(),
})

type FeedInfo = z.infer<typeof feedInfoSchema>
type FeedItem = z.infer<typeof feedItemSchema>
type Feed = z.infer<typeof feedSchema>
type PersistLayout = z.infer<typeof persistLayoutSchema>
type Result = z.infer<typeof resultSchema>
type Settings = z.infer<typeof settingsSchema>
type VersionInfo = z.infer<typeof versionInfoSchema>

export type { Feed, FeedInfo, FeedItem, PersistLayout, Result, Settings, VersionInfo }
export {
  feedInfoSchema,
  feedItemSchema,
  feedSchema,
  persistLayoutSchema,
  resultSchema,
  settingsSchema,
  versionInfoSchema,
}
