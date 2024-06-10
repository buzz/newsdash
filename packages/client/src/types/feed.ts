import type { FeedItem as ApiFeedItem } from '@newsdash/schema'

interface FeedItem extends ApiFeedItem {
  tabId: string
}

export { FeedItem }
