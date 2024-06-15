import 'overlayscrollbars/styles/overlayscrollbars.css'

import AutoSizer from 'react-virtualized-auto-sizer'

import { selectByTabId } from '#store/slices/feedItems/selectors'
import { useSelector } from '#ui/hooks/store'
import type { RootState } from '#store/types'
import type { CustomTabData } from '#types/layout'

import DetailFeedItem from './DetailFeedItem/DetailFeedItem'
import WindowedScroller from './WindowedScroller'

import classes from './Feed.module.css'

const ITEM_HEIGHT = 92

function Feed({ tab }: FeedProps) {
  const selector = (state: RootState) => selectByTabId(state, tab.id ?? '')
  const feedItems = useSelector(selector)

  return (
    <div className={classes.wrapper}>
      <AutoSizer disableWidth>
        {({ height }) => (
          <WindowedScroller height={height} itemHeight={ITEM_HEIGHT} items={feedItems}>
            {DetailFeedItem}
          </WindowedScroller>
        )}
      </AutoSizer>
    </div>
  )
}

interface FeedProps {
  tab: CustomTabData
}

export default Feed
