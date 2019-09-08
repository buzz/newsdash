import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { SortableElement, sortableHandle } from 'react-sortable-hoc'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faPen, faTimes } from '@fortawesome/free-solid-svg-icons'

import { deleteFeed, editFeed } from '../../../../../../../store/actions/feed'
import { feedType } from '../../../../../../../propTypes'
import FeedIcon from '../../../../../../FeedIcon'
import { FEED_STATUS } from '../../../../../../../constants'
import css from './SortableFeed.sass'

const getTitle = (feed) => {
  const title = feed.customTitle || feed.title
  switch (feed.status) {
    case FEED_STATUS.LOADING:
      return `${title} (loading…)`
    case FEED_STATUS.ERROR:
      return 'Error loading!'
    default:
      return title
  }
}

const DragHandle = sortableHandle(() => (
  <span className={css.dragHandle}>
    <FontAwesomeIcon icon={faBars} />
  </span>
))

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
    <li className={css.listItem}>
      <DragHandle />
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

export default SortableElement(Feed)
