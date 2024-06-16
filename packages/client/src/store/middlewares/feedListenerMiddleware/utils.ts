import { extractQueryError } from '#store/middlewares/utils'
import feedApi from '#store/slices/api/feedApi'
import { addFetchedFeedItems } from '#store/slices/feedItems/actions'
import { selectByTabId } from '#store/slices/feedItems/selectors'
import { editTab } from '#store/slices/layout/entities/tabs/actions'
import { showNotification } from '#store/slices/notifications/actions'
import type { AppListenerEffectAPI } from '#store/middlewares/types'
import type { CustomTab } from '#types/layout'

async function fetchFeed(listenerApi: AppListenerEffectAPI, tab: CustomTab) {
  listenerApi.dispatch(editTab({ id: tab.id, changes: { status: 'loading' } }))

  const fetchAction = feedApi.endpoints.fetchFeed.initiate(tab.url, { forceRefetch: true })
  const { data, error, isError } = await listenerApi.dispatch(fetchAction)
  if (isError) {
    const errorMessage = extractQueryError(error)
    listenerApi.dispatch(
      showNotification({
        title: `Failed to fetch feed: ${tab.url}`,
        message: errorMessage,
        type: 'error',
      })
    )
    listenerApi.dispatch(
      editTab({
        id: tab.id,
        changes: {
          error: errorMessage,
          lastFetched: Date.now(),
          status: 'error',
        },
      })
    )
    return
  }

  if (!data) {
    throw new Error('Expected data')
  }

  const { items, ...feedInfo } = data

  // Update feed
  const tabUpdate: Partial<CustomTab> = {
    ...feedInfo,
    error: undefined,
    lastFetched: Date.now(),
    status: 'loaded',
  }
  listenerApi.dispatch(editTab({ id: tab.id, changes: tabUpdate }))

  // Add feed items
  const oldItemIds = selectByTabId(listenerApi.getState(), tab.id).map((item) => item.id)
  listenerApi.dispatch(
    addFetchedFeedItems({
      items,
      oldItemIds,
      tabId: tab.id,
    })
  )
}

export default fetchFeed
