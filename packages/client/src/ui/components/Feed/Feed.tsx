import { createSelector } from '@reduxjs/toolkit'
import { useMemo } from 'react'

import { DISPLAY_PARAMS } from '#constants'
import { selectByTabId } from '#store/slices/feedItems/selectors'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import { useSelector } from '#ui/hooks/store'
import type { RootState } from '#store/types'
import type { CustomTabData } from '#types/layout'

import EditFeedFormOverlay from './EditFeedFormOverlay'
import EmptyList from './EmptyList/EmptyList'
import Window from './Window/Window'

import classes from './Feed.module.css'

function Feed({ tab: { id: tabId } }: FeedProps) {
  if (tabId === undefined) {
    throw new Error('Expected tabId')
  }

  const tabSelector = useMemo(
    () =>
      createSelector([(state: RootState) => state, () => tabId], (state, tabId) =>
        tabsSelectors.selectById(state, tabId)
      ),
    [tabId]
  )
  const tab = useSelector(tabSelector)

  const feedItemsSelector = useMemo(
    () =>
      createSelector([(state: RootState) => state, () => tabId], (state, tabId) =>
        selectByTabId(state, tabId)
      ),
    [tabId]
  )
  const feedItems = useSelector(feedItemsSelector)

  if (feedItems.length === 0) {
    return (
      <>
        <EmptyList tab={tab} />
        <EditFeedFormOverlay tab={tab} />
      </>
    )
  }

  const { height: rowHeight, overscanCount } = DISPLAY_PARAMS[tab.display]

  return (
    <div className={classes.feed}>
      <Window
        rowHeight={rowHeight}
        items={feedItems}
        overscanCount={overscanCount ?? 1}
        tab={tab}
      />
      <EditFeedFormOverlay tab={tab} />
    </div>
  )
}

interface FeedProps {
  tab: CustomTabData
}

export default Feed
