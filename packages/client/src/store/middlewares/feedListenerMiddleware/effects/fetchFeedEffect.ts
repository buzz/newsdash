import RssParser from 'rss-parser'

import { MAX_CONTENT_LENGTH } from '#constants'
import feed from '#store/slices/api/feed'
import { addFeedItems } from '#store/slices/feedItems/actions'
import { editTab } from '#store/slices/layout/entities/tabs/actions'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import type { AppStartListening } from '#store/middlewares/types'
import type { FeedItem } from '#types/feed'
import type { CustomTab } from '#types/layout'

const rssParser = new RssParser()

function truncate(text: string) {
  return text.length > MAX_CONTENT_LENGTH ? text.slice(0, Math.max(0, MAX_CONTENT_LENGTH)) : text
}

/** Fetch feed. */
function fetchFeedEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: editTab,
    effect: async ({ payload: { id: tabId, changes } }, listenerApi) => {
      // Refetch only if URL changed
      if (!Object.keys(changes).includes('url')) {
        return
      }

      // TODO: check if url is different from before: then always fetch
      // if not: fetch only if lastFetched > fetch interval

      // Fetch feed via CORS proxy
      const tab = tabsSelectors.selectById(listenerApi.getState(), tabId)
      const fetchAction = feed.endpoints.fetchFeed.initiate({ url: tab.url })
      const { data, error } = await listenerApi.dispatch(fetchAction)
      if (!data) {
        console.log(error)
        return
      }

      // Parse feed
      const { items, ...feedData } = await rssParser.parseString(data)

      // console.log('feedData:')
      // console.log(feedData)
      // console.log('items:')
      // console.log(items)

      // Update feed
      const tabUpdate: Partial<CustomTab> = {
        error: undefined,
        lastFetched: Date.now(),
        link: feedData.link,
        status: 'loaded',
        feedTitle: feedData.title,
      }
      listenerApi.dispatch(editTab({ id: tabId, changes: tabUpdate }))

      // Add feed items
      const feedItems: FeedItem[] = []
      for (const item of items) {
        const content = item.summary ?? item.contentSnippet ?? item.content
        const contentTruncated = content ? truncate(content) : undefined
        const feedItem: FeedItem = {
          id: `${tabId}${item.id || item.guid || item.link}`,
          content: contentTruncated,
          date: item.isoDate ? Date.parse(item.isoDate) : Date.now(),
          link: item.link,
          tabId,
          title: item.title ?? 'NO TITLE',
        }
        feedItems.push(feedItem)
      }

      listenerApi.dispatch(addFeedItems(feedItems))
    },
  })
}

export default fetchFeedEffect
