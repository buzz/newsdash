import { forwardRef } from 'react'

import type { Tab } from '@newsdash/common/schema'

import { SCROLLER_PADDING_Y } from '#constants'
import Scroller from '#ui/components/common/Scroller/Scroller'
import type { FeedItem } from '#types/feed'

import Grid from './Grid'
import List from './List'
import { parseHeight } from './utils'
import type { InnerElementProps } from './types'

const InnerElement = forwardRef<HTMLDivElement, InnerElementProps>(({ style, ...rest }, ref) => (
  <div
    className="simplebar-content"
    ref={ref}
    style={{ ...style, height: `${parseHeight(style.height) + 2 * SCROLLER_PADDING_Y}px` }}
    {...rest}
  />
))

function Window({ rowHeight, items, overscanCount = 1, tab }: WindowProps) {
  // Make sure Scroller is properly re-rendered, otherwise simplebar will not initialize correctly
  // when switching display.

  if (tab.gridView || tab.display === 'tiles') {
    return (
      <Scroller key="component-grid">
        {({ width, height, contentNodeRef, scrollableNodeRef }) => (
          <Grid
            width={width}
            height={height}
            items={items}
            overscanCount={overscanCount}
            rowHeight={rowHeight}
            tab={tab}
            innerElementType={InnerElement}
            innerRef={contentNodeRef}
            outerRef={scrollableNodeRef}
          />
        )}
      </Scroller>
    )
  }

  return (
    <Scroller key="component-list">
      {({ height, contentNodeRef, scrollableNodeRef }) => (
        <List
          height={height}
          items={items}
          overscanCount={overscanCount}
          rowHeight={rowHeight}
          tab={tab}
          innerElementType={InnerElement}
          innerRef={contentNodeRef}
          outerRef={scrollableNodeRef}
        />
      )}
    </Scroller>
  )
}

interface WindowProps {
  rowHeight: number
  items: FeedItem[]
  overscanCount?: number
  tab: Tab
}

export default Window
