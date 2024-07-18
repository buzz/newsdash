import { createSelector } from '@reduxjs/toolkit'
import { useMemo } from 'react'

import { selectByTabId, selectTabFilters } from '#store/slices/feedItems/selectors'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import { useSelector } from '#ui/hooks/store'
import type { RootState } from '#store/types'

function useFeedData(tabId: string) {
  // Get tab
  const tabSelector = useMemo(
    () =>
      createSelector([(state: RootState) => state, () => tabId], (state, tabId) =>
        tabsSelectors.selectById(state, tabId)
      ),
    [tabId]
  )
  const tab = useSelector(tabSelector)

  // Get tab filters
  const tabFilterSelector = useMemo(
    () =>
      createSelector([(state: RootState) => state, () => tabId], (state, tabId) =>
        selectTabFilters(state, tabId)
      ),
    [tabId]
  )
  const filters = useSelector(tabFilterSelector)

  // Get tab feed items
  const feedItemsSelector = useMemo(
    () =>
      createSelector(
        [(state: RootState) => state, () => tab.id, () => filters],
        (state, tabId, filters) => selectByTabId(state, tabId, filters)
      ),
    [tab]
  )
  const feedItems = useSelector(feedItemsSelector)

  return { tab, feedItems }
}

export default useFeedData
