import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import feedApi from '#store/slices/api/feedApi'
import { addFetchedFeedItems } from '#store/slices/feedItems/actions'
import { editTab } from '#store/slices/layout/entities/tabs/actions'
import { isArbitraryObject } from '#types/typeGuards'
import type { AppListenerEffectAPI } from '#store/middlewares/types'
import type { CustomTab } from '#types/layout'

function extractQueryError(error: FetchBaseQueryError | SerializedError): string {
  if ('data' in error && isArbitraryObject(error.data) && typeof error.data.message === 'string') {
    return error.data.message
  }
  if ('error' in error && typeof error.error === 'string') {
    return error.error
  }
  if ('message' in error && typeof error.message === 'string') {
    return error.message
  }
  return 'Unknown error'
}

async function fetchFeed(listenerApi: AppListenerEffectAPI, tab: CustomTab) {
  listenerApi.dispatch(editTab({ id: tab.id, changes: { status: 'loading' } }))

  const fetchAction = feedApi.endpoints.fetchFeed.initiate(tab.url)
  const { data, error } = await listenerApi.dispatch(fetchAction)
  if (error) {
    // TODO: show notification
    console.log(error)
    listenerApi.dispatch(
      editTab({
        id: tab.id,
        changes: {
          error: extractQueryError(error),
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
  listenerApi.dispatch(
    addFetchedFeedItems({
      tabId: tab.id,
      items: items.map((item) => ({
        ...item,
        new: true,
        tabId: tab.id,
      })),
    })
  )
}

export default fetchFeed
