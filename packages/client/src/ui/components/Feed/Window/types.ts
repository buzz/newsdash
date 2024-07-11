import type { ComponentType, CSSProperties, Ref } from 'react'

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

interface GridListProps {
  className: string
  height: number
  width: number

  items: FeedItem[]
  overscanCount: number
  rowHeight: number
  tab: Tab

  innerElementType: ComponentType<InnerElementProps>
  innerRef: Ref<HTMLElement | undefined>
  outerRef: Ref<HTMLElement | undefined>
}

interface InnerElementProps {
  style: CSSProperties
}

export type { GridData, GridListProps, InnerElementProps, ListData }
