import type { FeedItemComponentProps } from '#ui/components/Feed/FeedItem/types'

import classes from './TileFeedItem.module.css'

function TileFeedItem({ feedItem, imageUrl }: FeedItemComponentProps) {
  return (
    <div className={classes.wrapper}>
      <img alt={feedItem.title} className={classes.image} src={imageUrl} />
    </div>
  )
}

export default TileFeedItem
