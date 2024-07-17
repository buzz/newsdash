import { restoreFeedItems } from '#store/middlewares/db'
import { init } from '#store/slices/app/actions'
import { addFeedItems } from '#store/slices/feedItems/actions'
import type { AppStartListening } from '#store/middlewares/types'

/** Restore feed items from IndexedDB */
function restoreFeedItemsEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: init,
    effect: async (action, listenerApi) => {
      listenerApi.unsubscribe()

      try {
        const feedItems = await restoreFeedItems()
        listenerApi.dispatch(addFeedItems(feedItems))
      } catch (error) {
        console.error(error)
      }
    },
  })
}

export default restoreFeedItemsEffect
