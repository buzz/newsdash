import 'overlayscrollbars/styles/overlayscrollbars.css'

import cx from 'clsx'
import { useOverlayScrollbars, type UseOverlayScrollbarsParams } from 'overlayscrollbars-react'
import { useEffect, useRef, useState } from 'react'
import { FixedSizeList } from 'react-window'

import type { Display } from '@newsdash/schema'

import type { FeedItem } from '#types/feed'

import FeedItemRow from './FeedItemRow/FeedItemRow'

import classes from './Feed.module.css'

const overlayScrollbarsParams: UseOverlayScrollbarsParams = {
  defer: true,
  options: {
    overflow: {
      x: 'hidden',
      y: 'scroll',
    },
    scrollbars: {
      autoHide: 'leave',
      autoHideDelay: 500,
      theme: classes.osTheme,
    },
    update: { elementEvents: null },
  },
}

function WindowedScroller({
  display,
  height,
  width,
  minWidth,
  rowHeight,
  items,
  overscanCount = 1,
}: WindowedScrollerProps) {
  const [isAt, setIsAt] = useState<'top' | 'bottom' | undefined>('top')
  const rootRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const [initialize, osInstance] = useOverlayScrollbars(overlayScrollbarsParams)

  useEffect(() => {
    if (rootRef.current && outerRef.current) {
      initialize({
        target: rootRef.current,
        elements: {
          viewport: outerRef.current,
        },
      })
    }
  }, [initialize, osInstance])

  const columnCount = Math.max(1, Math.floor(width / minWidth))
  const rowCount = Math.ceil(items.length / columnCount)

  return (
    <div ref={rootRef}>
      <FixedSizeList
        className={cx(classes.list, {
          [classes.atTop]: isAt === 'top',
          [classes.atBottom]: isAt === 'bottom',
        })}
        height={height}
        width={width}
        itemCount={rowCount}
        itemSize={rowHeight}
        itemData={{ items, display, columnCount }}
        outerRef={outerRef}
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
    </div>
  )
}

interface WindowedScrollerProps {
  display: Display
  height: number
  width: number
  minWidth: number
  rowHeight: number
  items: FeedItem[]
  overscanCount?: number
}

export default WindowedScroller
