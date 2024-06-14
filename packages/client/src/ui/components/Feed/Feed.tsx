import cx from 'clsx'
import { useState } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'

import { selectByTabId } from '#store/slices/feedItems/selectors'
import { useSelector } from '#ui/hooks/store'
import type { RootState } from '#store/types'
import type { CustomTabData } from '#types/layout'

import DetailFeedItem from './DetailFeedItem/DetailFeedItem'

import classes from './Feed.module.css'

const ITEM_HEIGHT = 92

function Feed({ tab }: FeedProps) {
  const selector = (state: RootState) => selectByTabId(state, tab.id ?? '')
  const feedItems = useSelector(selector)
  const [isAt, setIsAt] = useState<'top' | 'bottom' | undefined>('top')

  return (
    <div
      className={cx(classes.wrapper, {
        [classes.atTop]: isAt === 'top',
        [classes.atBottom]: isAt === 'bottom',
      })}
    >
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            className={classes.scroller}
            height={height}
            width={width}
            itemCount={feedItems.length}
            itemData={feedItems}
            itemSize={ITEM_HEIGHT}
            onScroll={({ scrollOffset }) => {
              if (scrollOffset < 2) {
                setIsAt('top')
              } else if (scrollOffset + height > ITEM_HEIGHT * feedItems.length - 2) {
                setIsAt('bottom')
              } else {
                setIsAt(undefined)
              }
            }}
            overscanCount={1}
          >
            {DetailFeedItem}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  )
}

interface FeedProps {
  tab: CustomTabData
}

export default Feed
