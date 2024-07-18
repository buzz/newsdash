import { DISPLAY_PARAMS } from '#constants'
import type { CustomTabData } from '#types/layout'

import EditFeedFormOverlay from './EditFeedFormOverlay'
import EmptyList from './EmptyList/EmptyList'
import useFeedData from './useFeedData'
import Window from './Window/Window'

import classes from './Feed.module.css'

function Feed({ tab: { id: tabId } }: FeedProps) {
  if (tabId === undefined) {
    throw new Error('Expected tabId')
  }

  const { tab, feedItems } = useFeedData(tabId)

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
