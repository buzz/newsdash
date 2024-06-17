import 'overlayscrollbars/styles/overlayscrollbars.css'

import AutoSizer from 'react-virtualized-auto-sizer'
import type { ComponentType, CSSProperties } from 'react'
import type { ListChildComponentProps } from 'react-window'

import type { Display } from '@newsdash/schema'

import { selectByTabId } from '#store/slices/feedItems/selectors'
import { useSelector } from '#ui/hooks/store'
import type { RootState } from '#store/types'
import type { FeedItem } from '#types/feed'
import type { CustomTabData } from '#types/layout'

import EmptyList from './EmptyList/EmptyList'
import DetailFeedItem from './FeedItem/DetailFeedItem/DetailFeedItem'
import CondensedListFeedItem from './FeedItem/ListFeedItem/CondensedListFeedItem'
import ListFeedItem from './FeedItem/ListFeedItem/ListFeedItem'
import WindowedScroller from './WindowedScroller'

import classes from './Feed.module.css'

const COMPONENT_MAP: Record<
  Display,
  { component: FeedItemComponentType; height: number; overscanCount?: number }
> = {
  condensedList: {
    component: CondensedListFeedItem,
    height: 24,
    overscanCount: 8,
  },
  list: {
    component: ListFeedItem,
    height: 36,
    overscanCount: 5,
  },
  detailed: {
    component: DetailFeedItem,
    height: 92,
  },
  tiles: {
    component: () => null,
    height: 92,
  },
}

function Feed({ tab }: FeedProps) {
  const selector = (state: RootState) => selectByTabId(state, tab.id ?? '')
  const feedItems = useSelector(selector)

  if (feedItems.length === 0) {
    return <EmptyList tab={tab} />
  }

  const {
    component: FeedItemComponent,
    height: itemHeight,
    overscanCount,
  } = COMPONENT_MAP[tab.display]

  return (
    <div className={classes.wrapper}>
      <AutoSizer disableWidth>
        {({ height }) => (
          <WindowedScroller
            height={height}
            itemHeight={itemHeight}
            items={feedItems}
            overscanCount={overscanCount ?? 1}
          >
            {FeedItemComponent}
          </WindowedScroller>
        )}
      </AutoSizer>
    </div>
  )
}

interface FeedProps {
  tab: CustomTabData
}

interface FeedItemProps {
  data: FeedItem[]
  index: number
  style: CSSProperties
}

type FeedItemComponentType = ComponentType<ListChildComponentProps<FeedItem[]>>

export type { FeedItemProps }
export default Feed
