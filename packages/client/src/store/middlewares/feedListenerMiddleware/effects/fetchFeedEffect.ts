import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import feedApi from '#store/slices/api/feedApi'
import { addFeedItems } from '#store/slices/feedItems/actions'
import { editTab } from '#store/slices/layout/entities/tabs/actions'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import type { AppStartListening } from '#store/middlewares/types'
import type { CustomTab } from '#types/layout'

function extractQueryError(error: FetchBaseQueryError | SerializedError): string {
  if ('error' in error && typeof error.error === 'string') {
    return error.error
  }
  if ('message' in error && typeof error.message === 'string') {
    return error.message
  }
  return 'Unknown error'
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

      // Fetch feed
      const tab = tabsSelectors.selectById(listenerApi.getState(), tabId)
      const fetchAction = feedApi.endpoints.fetchFeed.initiate(tab.url)
      const { data, error } = await listenerApi.dispatch(fetchAction)
      if (error) {
        // TODO: show notification
        console.log(error)
        listenerApi.dispatch(
          editTab({
            id: tabId,
            changes: {
              error: extractQueryError(error),
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
      listenerApi.dispatch(editTab({ id: tabId, changes: tabUpdate }))

      // Add feed items
      listenerApi.dispatch(addFeedItems(items.map((item) => ({ ...item, tabId }))))
    },
  })
}

export default fetchFeedEffect
