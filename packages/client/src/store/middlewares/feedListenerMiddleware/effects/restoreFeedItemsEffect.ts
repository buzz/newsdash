import { z } from 'zod'

import { LOCALSTORAGE_FEEDITEMS_KEY } from '#constants'
import { init } from '#store/slices/app/actions'
import { addFeedItems } from '#store/slices/feedItems/actions'
import { feedItemSchema } from '#types/feed'
import type { AppStartListening } from '#store/middlewares/types'

/** Restore settings from server */
function restoreFeedItemsEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: init,
    effect: (action, listenerApi) => {
      try {
        const serializedFeedItems = localStorage.getItem(LOCALSTORAGE_FEEDITEMS_KEY)
        if (serializedFeedItems) {
          const parsedFeedItems: unknown = JSON.parse(serializedFeedItems)
          const feedItems = z.array(feedItemSchema).parse(parsedFeedItems)
          listenerApi.dispatch(addFeedItems(feedItems))
        }
      } finally {
        listenerApi.unsubscribe()
      }
    },
  })
}

export default restoreFeedItemsEffect
