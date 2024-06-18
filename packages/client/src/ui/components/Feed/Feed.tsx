import { Overlay } from '@mantine/core'
import AutoSizer from 'react-virtualized-auto-sizer'

import type { Display } from '@newsdash/schema'

import { selectByTabId } from '#store/slices/feedItems/selectors'
import { useSelector } from '#ui/hooks/store'
import type { RootState } from '#store/types'
import type { FeedItem as FeedItem } from '#types/feed'
import type { CustomTabData } from '#types/layout'

import EditFeedForm from './EditFeedForm/EditFeedForm'
import EmptyList from './EmptyList/EmptyList'
import WindowedScroller from './WindowedScroller'

import classes from './Feed.module.css'

const DEFAULT_MIN_WIDTH = 800

const DISPLAY_VALUES: Record<Display, DisplayValues> = {
  condensedList: {
    height: 24,
    overscanCount: 8,
  },
  list: {
    height: 36,
    overscanCount: 5,
  },
  detailed: {
    height: 92,
    minWidth: 500,
  },
  tiles: {
    height: 201,
    minWidth: 200,
  },
}

function Feed({ tab }: FeedProps) {
  const selector = (state: RootState) => selectByTabId(state, tab.id ?? '')
  const feedItems = useSelector(selector)

  const overlay = tab.editMode ? (
    <Overlay blur={2}>
      <EditFeedForm tab={tab} mode={tab.editMode} />
    </Overlay>
  ) : null

  if (feedItems.length === 0) {
    return (
      <>
        <EmptyList tab={tab} />
        {overlay}
      </>
    )
  }

  const { height: itemHeight, minWidth, overscanCount } = DISPLAY_VALUES[tab.display]

  return (
    <AutoSizer className={classes.wrapper}>
      {({ height, width }) => (
        <>
          <WindowedScroller
            display={tab.display}
            height={height}
            width={width}
            minWidth={minWidth ?? DEFAULT_MIN_WIDTH}
            rowHeight={itemHeight}
            items={feedItems}
            overscanCount={overscanCount ?? 1}
          />
          {overlay}
        </>
      )}
    </AutoSizer>
  )
}

interface DisplayValues {
  height: number
  minWidth?: number
  overscanCount?: number
}

interface FeedProps {
  tab: CustomTabData
}

interface GridData {
  items: FeedItem[]
  display: Display
  columnCount: number
}

export type { GridData }
export default Feed
