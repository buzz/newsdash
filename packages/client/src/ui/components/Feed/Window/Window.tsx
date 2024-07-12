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
    ref={ref}
    style={{ ...style, height: `${parseHeight(style.height) + 2 * SCROLLER_PADDING_Y}px` }}
    {...rest}
  />
))

function Window({ rowHeight, items, overscanCount = 1, tab }: WindowProps) {
  const WindowComponent = tab.gridView ? Grid : List

  // Force scroller to rerender when component changes, otherwise refs don't update properly
  const key = `component-${tab.gridView ? 'Grid' : 'List'}`

  return (
    <Scroller key={key}>
      {({ className, width, height, contentNodeRef, scrollableNodeRef }) => (
        <WindowComponent
          width={width}
          height={height}
          className={className}
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
