import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { SortableElement, sortableHandle } from 'react-sortable-hoc'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faLink,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

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
      return `${title} (loading error)`
    default:
      return title
  }
}

const DragHandle = sortableHandle(() => (
  <span className={css.dragHandle}>
    <FontAwesomeIcon icon={faBars} />
  </span>
))

const FEED_ITEM_DISPLAY = {
  REGULAR: 0,
  EDIT_TITLE: 1,
  EDIT_URL: 2,
}

const Feed = ({ feed }) => {
  const dispatch = useDispatch()
  const title = getTitle(feed)
  const [feedItemDisplay, setFeedItemDisplay] = useState(FEED_ITEM_DISPLAY.REGULAR)
  const [newCustomTitle, setNewCustomTitle] = useState(feed.customTitle)
  const [newUrl, setNewUrl] = useState(feed.url)

  const dispatchTitle = () => {
    dispatch(editFeed(feed.id, { customTitle: newCustomTitle }))
  }

  const dispatchUrl = () => {
    dispatch(editFeed(feed.id, { url: newUrl }))
  }

  const makeInputOnKeyUp = (dispatchValue) => (
    (ev) => {
      if (ev.keyCode === 13) {
        dispatchValue()
        setFeedItemDisplay(FEED_ITEM_DISPLAY.REGULAR)
      }
    }
  )

  const makeEditOnClick = (dispatchValue, editFeedItemDisplay) => (
    () => {
      if (feedItemDisplay === editFeedItemDisplay) {
        dispatchValue()
        setFeedItemDisplay(FEED_ITEM_DISPLAY.REGULAR)
      } else {
        setFeedItemDisplay(editFeedItemDisplay)
      }
    }
  )

  const inputRef = useRef()
  useEffect(() => {
    if ([FEED_ITEM_DISPLAY.EDIT_TITLE, FEED_ITEM_DISPLAY.EDIT_URL].includes(feedItemDisplay)) {
      inputRef.current.focus()
    }
  }, [feedItemDisplay])

  let feedDisplay

  if (feedItemDisplay === FEED_ITEM_DISPLAY.EDIT_TITLE) {
    feedDisplay = (
      <div className={css.form}>
        <form onSubmit={(ev) => ev.preventDefault()}>
          <input
            className="nondraggable"
            onChange={(ev) => setNewCustomTitle(ev.target.value)}
            onKeyUp={makeInputOnKeyUp(dispatchTitle)}
            placeholder={feed.title}
            ref={inputRef}
            value={newCustomTitle}
          />
        </form>
      </div>
    )
  } else if (feedItemDisplay === FEED_ITEM_DISPLAY.EDIT_URL) {
    feedDisplay = (
      <div className={css.form}>
        <form onSubmit={(ev) => ev.preventDefault()}>
          <input
            className="nondraggable"
            onChange={(ev) => setNewUrl(ev.target.value)}
            onKeyUp={makeInputOnKeyUp(dispatchUrl)}
            placeholder={feed.url}
            ref={inputRef}
            value={newUrl}
          />
        </form>
      </div>
    )
  } else {
    feedDisplay = (
      <span className={css.title} title={feed.url}>
        {title}
      </span>
    )
  }

  return (
    <li className={css.listItem}>
      <DragHandle />
      <FeedIcon className={css.icon} feed={feed} noLink />
      {feedDisplay}
      <div className={classNames('nondraggable', css.buttons)}>
        <button
          onClick={makeEditOnClick(dispatchTitle, FEED_ITEM_DISPLAY.EDIT_TITLE)}
          title="Edit title"
          type="button"
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button
          onClick={makeEditOnClick(dispatchUrl, FEED_ITEM_DISPLAY.EDIT_URL)}
          title="Edit URL"
          type="button"
        >
          <FontAwesomeIcon icon={faLink} />
        </button>
        <button
          onClick={() => dispatch(deleteFeed(feed.id))}
          title="Remove feed"
          type="button"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </li>
  )
}

Feed.propTypes = {
  feed: feedType.isRequired,
}

export default SortableElement(Feed)
