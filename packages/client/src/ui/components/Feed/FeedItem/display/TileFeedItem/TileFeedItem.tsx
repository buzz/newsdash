import cx from 'clsx'

import type { FeedItemComponentProps } from '#ui/components/Feed/FeedItem/types'

import classes from './TileFeedItem.module.css'

function TileFeedItem({ feedItem, imageUrl, language }: FeedItemComponentProps) {
  return (
    <div className={cx(classes.wrapper, { [classes.slideUp]: Boolean(feedItem.content) })}>
      <img alt={feedItem.title} className={classes.image} src={imageUrl} />
      <div className={classes.textOverlay} lang={language}>
        <div className={classes.title}>{feedItem.title}</div>
        <div className={classes.content}>{feedItem.content}</div>
      </div>
    </div>
  )
}

export default TileFeedItem
