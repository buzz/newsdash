import TimeAgoBadge from '#ui/components/Feed/FeedItem/TimeAgoBadge/TimeAgoBadge'
import type { FeedItemComponentProps } from '#ui/components/Feed/FeedItem/types'

import classes from './ListFeedItem.module.css'

function ListFeedItem({ feedItem }: FeedItemComponentProps) {
  return (
    <>
      <div className={classes.title}>{feedItem.title}</div>
      <TimeAgoBadge feedItem={feedItem} />
    </>
  )
}

export default ListFeedItem
