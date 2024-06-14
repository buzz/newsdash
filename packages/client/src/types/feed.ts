import { z } from 'zod'

import { feedItemSchema as apiFeedItemSchema } from '@newsdash/schema'

const feedItemSchema = apiFeedItemSchema.extend({
  tabId: z.string(),
  new: z.boolean(),
})

type FeedItem = z.infer<typeof feedItemSchema>

export type { FeedItem }
export { feedItemSchema }
