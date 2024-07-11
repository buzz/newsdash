import type { Tab } from '@newsdash/common/schema'

import { API_BASE } from '#constants'
import type { FeedItem } from '#types/feed'

function makeTabLogoUrl(tab: Tab) {
  return tab.link ? `${API_BASE}feed/logo?url=${encodeURIComponent(tab.link)}` : undefined
}

function makeFeedItemImageUrl(feedItem: FeedItem) {
  return feedItem.link
    ? `${API_BASE}feed/image?url=${encodeURIComponent(feedItem.link)}`
    : undefined
}

export { makeFeedItemImageUrl, makeTabLogoUrl }
