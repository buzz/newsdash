import type { FeedItem } from '#types/feed'

function makeFeedItemImageUrl(feedItem: FeedItem) {
  return feedItem.link
    ? `${import.meta.env.NEWSDASH_API_BASE}feed/image?url=${encodeURIComponent(feedItem.link)}`
    : undefined
}

export { makeFeedItemImageUrl }
