import { z } from 'zod'

const dockModeSchema = z.union([
  z.literal('horizontal'),
  z.literal('vertical'),
  z.literal('float'),
  z.literal('window'),
  z.literal('maximize'),
])

const displaySchema = z
  .union([z.literal('condensedList'), z.literal('list'), z.literal('detailed'), z.literal('tiles')])
  .default('detailed')

const sizeSchema = z.optional(z.number().int().min(0))
const orderSchema = z.number().int().min(0)
const parentIdSchema = z.nullable(z.string())

const boxSchema = z.object({
  id: z.string(),
  mode: dockModeSchema,
  order: orderSchema,
  parentId: parentIdSchema,
  size: sizeSchema,
})

const panelSchema = z.object({
  id: z.string(),
  activeId: z.optional(z.string()),
  group: z.optional(z.string()),
  order: orderSchema,
  parentId: parentIdSchema,
  size: sizeSchema,
})

const customTabFields = z.object({
  customTitle: z.string(),
  display: displaySchema,
  error: z.optional(z.string()),
  hue: z.number().min(0).max(360),
  lastFetched: z.number().default(0),
  link: z.optional(z.string().url()),
  status: z
    .union([
      z.literal('edit'),
      z.literal('error'),
      z.literal('loaded'),
      z.literal('loading'),
      z.literal('new'),
    ])
    .default('loaded'),
  title: z.optional(z.string()),
  url: z.string().url(),
})

const storeTabSchema = customTabFields.extend({
  id: z.string(),
  description: z.optional(z.string()),
  group: z.optional(z.string()),
  order: orderSchema,
  parentId: parentIdSchema,
})

const newTabSchema = storeTabSchema.omit({ url: true, status: true }).extend({
  status: z.literal('new'),
  url: z.string(),
})

const tabSchema = z.union([storeTabSchema, newTabSchema])

export type Box = z.infer<typeof boxSchema>
export type CustomTabFields = z.infer<typeof customTabFields>
export type Display = z.infer<typeof displaySchema>
export type Panel = z.infer<typeof panelSchema>
export type Tab = z.infer<typeof tabSchema>
export { boxSchema, displaySchema, panelSchema, storeTabSchema, tabSchema }
