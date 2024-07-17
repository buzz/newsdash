import { z } from 'zod'

import { LOCALSTORAGE_FEEDITEMS_KEY } from '#constants'
import { init } from '#store/slices/app/actions'
import { addFeedItems } from '#store/slices/feedItems/actions'
import { feedItemSchema } from '#types/feed'
import type { AppStartListening } from '#store/middlewares/types'
import type { FeedItem } from '#types/feed'

/** Restore feed items from localStorage */
function restoreFeedItemsEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: init,
    effect: (action, listenerApi) => {
      listenerApi.unsubscribe()

      let feedItems: FeedItem[] = []

      const serializedFeedItems = localStorage.getItem(LOCALSTORAGE_FEEDITEMS_KEY)
      if (serializedFeedItems) {
        const parsedFeedItems: unknown = JSON.parse(serializedFeedItems)
        const result = z.array(feedItemSchema).safeParse(parsedFeedItems)
        if (result.success) {
          feedItems = result.data
        }
      }

      listenerApi.dispatch(addFeedItems(feedItems))
    },
  })
}

export default restoreFeedItemsEffect
