import 'simplebar-react/dist/simplebar.min.css'
import './simplebar.css'

import cx from 'clsx'
import { useState } from 'react'
import { FixedSizeList } from 'react-window'
import SimpleBarReact from 'simplebar-react'

import type { Display } from '@newsdash/schema'

import type { FeedItem } from '#types/feed'

import FeedItemRow from './FeedItemRow/FeedItemRow'

import classes from './Feed.module.css'

function WindowedScroller({
  display,
  language = 'en',
  height,
  width,
  minWidth,
  rowHeight,
  items,
  overscanCount = 1,
}: WindowedScrollerProps) {
  const [isAt, setIsAt] = useState<'top' | 'bottom' | undefined>('top')
  const columnCount = Math.max(1, Math.floor(width / minWidth))
  const rowCount = Math.ceil(items.length / columnCount)

  return (
    <SimpleBarReact clickOnTrack={false} style={{ height: `${height}px` }}>
      {({ scrollableNodeRef, contentNodeRef }) => (
        <FixedSizeList
          className={cx(classes.list, {
            [classes.atTop]: isAt === 'top',
            [classes.atBottom]: isAt === 'bottom',
          })}
          height={height}
          width={width}
          itemCount={rowCount}
          itemSize={rowHeight}
          itemData={{ items, display, language, columnCount }}
          outerRef={scrollableNodeRef}
          innerRef={contentNodeRef}
          onScroll={({ scrollOffset }) => {
            if (scrollOffset < 2) {
              setIsAt('top')
            } else if (scrollOffset + height > rowHeight * rowCount - 2) {
              setIsAt('bottom')
            } else {
              setIsAt(undefined)
            }
          }}
          overscanCount={overscanCount}
        >
          {FeedItemRow}
        </FixedSizeList>
      )}
    </SimpleBarReact>
  )
}

interface WindowedScrollerProps {
  display: Display
  language?: string
  height: number
  width: number
  minWidth: number
  rowHeight: number
  items: FeedItem[]
  overscanCount?: number
}

export default WindowedScroller
