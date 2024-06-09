import { z } from 'zod'

const dockModeSchema = z.union([
  z.literal('horizontal'),
  z.literal('vertical'),
  z.literal('float'),
  z.literal('window'),
  z.literal('maximize'),
])
const groupSchema = z.optional(z.string())
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
  group: groupSchema,
  order: orderSchema,
  parentId: parentIdSchema,
  size: sizeSchema,
})

const customTabFields = z.object({
  color: z.string(),
  customTitle: z.optional(z.string()),
  url: z.string().url(),
})

const tabSchema = customTabFields.extend({
  id: z.string(),
  group: groupSchema,
  order: orderSchema,
  parentId: parentIdSchema,
})

export type Box = z.infer<typeof boxSchema>
export type Panel = z.infer<typeof panelSchema>
export type CustomTabFields = z.infer<typeof customTabFields>
export type Tab = z.infer<typeof tabSchema>
export { boxSchema, panelSchema, tabSchema }
