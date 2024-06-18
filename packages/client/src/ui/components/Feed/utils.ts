import type { Tab } from '@newsdash/schema'

import type { FeedItem } from '#types/feed'

function makeTabLogoUrl(tab: Tab) {
  return tab.link
    ? `${import.meta.env.NEWSDASH_API_BASE}feed/logo?url=${encodeURIComponent(tab.link)}`
    : undefined
}

function makeFeedItemImageUrl(feedItem: FeedItem) {
  return feedItem.link
    ? `${import.meta.env.NEWSDASH_API_BASE}feed/image?url=${encodeURIComponent(feedItem.link)}`
    : undefined
}

export { makeFeedItemImageUrl, makeTabLogoUrl }
