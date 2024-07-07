import type { MutableRefObject } from 'react'

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

type ScrollState = 'top' | 'bottom' | undefined

interface WindowProps {
  className: string
  height: number
  width: number

  items: FeedItem[]
  overscanCount: number
  rowHeight: number
  setScrollState: (value: ScrollState) => void
  tab: Tab

  innerRef: MutableRefObject<HTMLElement | undefined>
  outerRef: MutableRefObject<HTMLElement | undefined>
}

export type { GridData, ListData, ScrollState, WindowProps }
