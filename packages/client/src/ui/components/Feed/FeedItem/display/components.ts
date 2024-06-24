import type { ComponentType } from 'react'

import type { Display } from '@newsdash/schema'

import type { FeedItemComponentProps } from '#ui/components/Feed/FeedItem/types'

import DetailFeedItem from './DetailFeedItem/DetailFeedItem'
import ListFeedItem from './ListFeedItem/ListFeedItem'
import TileFeedItem from './TileFeedItem/TileFeedItem'

const DISPLAY_COMPONENTS: Record<
  Display,
  { component: ComponentType<FeedItemComponentProps>; className: string }
> = {
  condensedList: {
    component: ListFeedItem,
    className: 'condensedList',
  },
  list: {
    component: ListFeedItem,
    className: 'list',
  },
  detailed: {
    component: DetailFeedItem,
    className: 'detail',
  },
  tiles: {
    component: TileFeedItem,
    className: 'tile',
  },
}

export default DISPLAY_COMPONENTS
