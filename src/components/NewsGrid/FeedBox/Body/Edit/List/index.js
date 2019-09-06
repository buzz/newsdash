import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons'

import FeedIcon from '../../../../../FeedIcon'
import { deleteFeed, editFeed } from '../../../../../../store/actions/feed'
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
      return feed.customTitle || feed.title
  }
}

const Feed = ({ feed }) => {
  const dispatch = useDispatch()
  const title = getTitle(feed)
  const [showCustomTitleInput, setShowCustomTitleInput] = useState(false)
  const [newCustomTitle, setNewCustomTitle] = useState(feed.customTitle)

  const editTitle = () => {
    dispatch(editFeed(feed.id, { customTitle: newCustomTitle }))
    setShowCustomTitleInput(false)
  }

  const titleField = showCustomTitleInput
    ? (
      <div className={css.editForm}>
        <form onSubmit={(ev) => ev.preventDefault()}>
          <input
            className="nondraggable"
            onBlur={editTitle}
            onChange={(ev) => setNewCustomTitle(ev.target.value)}
            onKeyUp={(ev) => (ev.keyCode === 13 && editTitle())}
            placeholder={feed.title}
            value={newCustomTitle}
          />
        </form>
      </div>
    )
    : (
      <span className={css.title} title={feed.url}>
        {title}
      </span>
    )

  return (
    <li>
      <FeedIcon className={css.icon} feed={feed} noLink />
      {titleField}
      <div className={classNames('nondraggable', css.buttons)}>
        <button
          onClick={() => setShowCustomTitleInput(!showCustomTitleInput)}
          title="Change title"
          type="button"
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button
          onClick={() => dispatch(deleteFeed(feed.id))}
          title="Remove feed"
          type="button"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </li>
  )
}

Feed.propTypes = {
  feed: feedType.isRequired,
}

const List = ({ feeds }) => (
  <ul className={css.feeds}>
    {feeds.map((feed) => <Feed feed={feed} key={feed.id.toString()} />)}
  </ul>
)

List.propTypes = {
  feeds: PropTypes.arrayOf(feedType).isRequired,
}

export default List
