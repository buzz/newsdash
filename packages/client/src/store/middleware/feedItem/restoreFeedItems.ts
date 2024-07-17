import { isError } from 'lodash-es'

import { UNKNOWN_ERROR_MESSAGE } from '@newsdash/common/constants'

import { restoreFeedItems as dbRestoreFeedItems } from '#store/middleware/db'
import { addFeedItems } from '#store/slices/feedItems/actions'
import { showNotification } from '#store/slices/notifications/actions'
import type { AppListenerEffectAPI } from '#store/middleware/types'

/** Restore feed items from IndexedDB */
async function restoreFeedItems(listenerApi: AppListenerEffectAPI) {
  try {
    const feedItems = await dbRestoreFeedItems()
    if (feedItems.length > 0) {
      listenerApi.dispatch(addFeedItems(feedItems))
    }
  } catch (error) {
    listenerApi.dispatch(
      showNotification({
        title: 'Failed to load layout',
        message: isError(error) ? error.message : UNKNOWN_ERROR_MESSAGE,
        type: 'error',
      })
    )
  }
}

export default restoreFeedItems
