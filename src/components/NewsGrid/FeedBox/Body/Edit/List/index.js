import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import FeedIcon from '../../../../../FeedIcon'
import { deleteFeed } from '../../../../../../store/actions/feed'
import { FEED_STATUS } from '../../../../../../constants'
import { feedType } from '../../../../../../propTypes'
import css from './List.sass'

const getTitle = (feed) => {
  switch (feed.status) {
    case FEED_STATUS.LOADING:
    case FEED_STATUS.NEW:
      return 'Loading…'
    case FEED_STATUS.ERROR:
      return 'Error loading!'
    default:
      return feed.title
  }
}

const List = ({ feeds }) => {
  const dispatch = useDispatch()

  const feedItems = feeds.map(
    (feed) => {
      const title = getTitle(feed)
      return (
        <li key={feed.id.toString()}>
          <FeedIcon className={css.icon} feed={feed} noLink />
          <span className={css.title} title={feed.url}>
            {title}
          </span>
          <button
            className="nondraggable"
            onClick={() => dispatch(deleteFeed(feed.id))}
            title="Remove feed"
            type="button"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </li>
      )
    }
  )

  return (
    <ul className={css.feeds}>
      {feedItems}
    </ul>
  )
}

List.propTypes = {
  feeds: PropTypes.arrayOf(feedType).isRequired,
}

export default List
