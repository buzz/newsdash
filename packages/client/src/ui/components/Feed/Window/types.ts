import type { CSSProperties } from 'react'
import type { CommonProps as ReactWindowProps } from 'react-window'

import type { Tab } from '@newsdash/common/schema'

import type { FeedItem } from '#types/feed'

interface ListData {
  items: FeedItem[]
  tab: Tab
}

interface GridData extends ListData {
  columnCount: number
  rowCount: number
}

interface ListProps extends Pick<ReactWindowProps, 'innerElementType' | 'innerRef' | 'outerRef'> {
  height: number

  items: FeedItem[]
  overscanCount: number
  rowHeight: number
  tab: Tab
}

interface InnerElementProps {
  style: CSSProperties
}

export type { GridData, InnerElementProps, ListData, ListProps }
