import cx from 'clsx'
import { forwardRef, useState } from 'react'
import SimpleBarReact from 'simplebar-react'

import type { Tab } from '@newsdash/common/schema'

import { SCROLLER_PADDING_Y } from '#constants'
import type { FeedItem } from '#types/feed'

import Grid from './Grid'
import List from './List'
import { parseHeight } from './utils'
import type { InnerElementProps, ScrollState } from './types'

import classes from './Scroller.module.css'

const InnerElement = forwardRef<HTMLDivElement, InnerElementProps>(({ style, ...rest }, ref) => (
  <div
    ref={ref}
    style={{ ...style, height: `${parseHeight(style.height) + 2 * SCROLLER_PADDING_Y}px` }}
    {...rest}
  />
))

function Scroller({ height, width, rowHeight, items, overscanCount = 1, tab }: ScrollerProps) {
  const [scrollState, setScrollState] = useState<ScrollState>('top')

  const WindowComponent = tab.gridView ? Grid : List

  return (
    <SimpleBarReact clickOnTrack={false} style={{ height: `${height}px` }}>
      {({ contentNodeRef, scrollableNodeRef }) => (
        <WindowComponent
          className={cx(classes.fadeMask, {
            [classes.top]: scrollState === 'top',
            [classes.bottom]: scrollState === 'bottom',
          })}
          height={height}
          width={width}
          items={items}
          overscanCount={overscanCount}
          rowHeight={rowHeight}
          setScrollState={setScrollState}
          tab={tab}
          innerElementType={InnerElement}
          innerRef={contentNodeRef}
          outerRef={scrollableNodeRef}
        />
      )}
    </SimpleBarReact>
  )
}

interface ScrollerProps {
  height: number
  width: number
  rowHeight: number
  items: FeedItem[]
  overscanCount?: number
  tab: Tab
}

export default Scroller
