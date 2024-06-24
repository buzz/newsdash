import type { FeedItemComponentProps } from '#ui/components/Feed/FeedItem/types'

import classes from './TileFeedItem.module.css'

function TileFeedItem({ feedItem, imageUrl }: FeedItemComponentProps) {
  return <img alt={feedItem.title} className={classes.image} src={imageUrl} />
}

export default TileFeedItem
