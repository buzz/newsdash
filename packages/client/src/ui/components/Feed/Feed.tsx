import type { Tab } from '@newsdash/common/schema'

import { DISPLAY_PARAMS } from '#constants'
import type { FeedItem } from '#types/feed'

import EditFeedFormOverlay from './EditFeedFormOverlay'
import EmptyList from './EmptyList/EmptyList'
import Window from './Window/Window'

import classes from './Feed.module.css'

function Feed({ feedItems, tab }: FeedProps) {
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
      <EditFeedFormOverlay feedItemCount={feedItems.length} tab={tab} />
    </div>
  )
}

interface FeedProps {
  feedItems: FeedItem[]
  tab: Tab
}

export default Feed
