import 'simplebar-react/dist/simplebar.min.css'
import './simplebar.css'

import cx from 'clsx'
import { useState } from 'react'
import SimpleBarReact from 'simplebar-react'

import type { Tab } from '@newsdash/schema'

import type { FeedItem } from '#types/feed'

import Grid from './Grid'
import List from './List'
import type { ScrollState } from './types'

import classes from './Scroller.module.css'

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
