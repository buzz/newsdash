import React from 'react'
import { useSelector } from 'react-redux'

import { feedType } from 'newsdash/components/propTypes'
import feedItemSelectors from 'newsdash/store/selectors/feedItem'
import { FEED_STATUS, FEED_DISPLAY } from 'newsdash/constants'
import css from 'newsdash/components/FeedBox/Body/Body.sss'
import List from './List'
import Tiles from './Tiles'

const getFeedItems = feedItemSelectors.makeGetFeedItems()

const Feed = ({ feed }) => {
  const feedItems = useSelector((state) =>
    getFeedItems(state, feed ? feed.id : null)
  )

  if (feed.status === FEED_STATUS.ERROR && !feedItems.length) {
    return (
      <div className={css.feedMessage}>
        <p>
          <strong>Sorry, unable to retrieve the feed!</strong>
        </p>
        <p>
          URL:{' '}
          <a
            className="nondraggable"
            href={feed.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <code>{feed.url}</code>
          </a>
          <br />
          Error message: <code>{feed.error}</code>
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
      return <List type={FEED_DISPLAY.CONDENSED_LIST} items={feedItems} />
    case FEED_DISPLAY.LIST:
      return <List type={FEED_DISPLAY.LIST} items={feedItems} />
    case FEED_DISPLAY.DETAILED:
      return <List type={FEED_DISPLAY.DETAILED} items={feedItems} />
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
