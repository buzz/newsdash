import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import List from './List'
import Regular from './Regular'
import Tiles from './Tiles'
import feedItemSelectors from '../../../../../store/selectors/feedItem'
import { feedType } from '../../../../../propTypes'
import { FEED_STATUS, FEED_DISPLAY } from '../../../../../constants'
import css from '../Body.sass'

const Feed = ({ feed }) => {
  const getFeedItems = useMemo(feedItemSelectors.makeGetFeedItems, [])
  const feedItems = useSelector((state) => getFeedItems(state, feed ? feed.id : null))

  if (feed.status === FEED_STATUS.ERROR && !feedItems.length) {
    return (
      <div className={css.feedMessage}>
        <p>
          <strong>Sorry, unable to retrieve the feed!</strong>
        </p>
        <p>
          URL:
          {' '}
          <a
            className="nondraggable"
            href={feed.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <code>{feed.url}</code>
          </a>
          <br />
          Error message:
          {' '}
          <code>{feed.error}</code>
        </p>
      </div>
    )
  }

  if (feed.status === FEED_STATUS.LOADING && !feedItems.length) {
    return (
      <div className={css.feedMessage}>
        <p>Loading feed…</p>
      </div>
    )
  }

  switch (feed.display) {
    case FEED_DISPLAY.CONDENSED_LIST:
      return <List condensed items={feedItems} />
    case FEED_DISPLAY.LIST:
      return <List items={feedItems} />
    case FEED_DISPLAY.REGULAR:
      return <Regular items={feedItems} />
    case FEED_DISPLAY.TILES:
      return <Tiles items={feedItems} />
    default:
      break
  }

  return null
}

Feed.propTypes = {
  feed: feedType.isRequired,
}

export default Feed
