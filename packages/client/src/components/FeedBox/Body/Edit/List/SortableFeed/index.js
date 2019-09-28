import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { SortableElement, sortableHandle } from 'react-sortable-hoc'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faEye,
  faFilter,
  faLink,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

import { FEED_STATUS, FEED_DISPLAY, FEED_DISPLAY_LABELS } from 'newsdash/constants'
import { feedType } from 'newsdash/components/propTypes'
import { deleteFeed, editFeed } from 'newsdash/store/actions/feed'
import Icon from 'newsdash/components/Feed/Icon'
import css from './SortableFeed.sss'

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
    <FontAwesomeIcon fixedWidth icon={faBars} />
  </span>
))

const FEED_ITEM_DISPLAY = {
  REGULAR: 0,
  EDIT_TITLE: 1,
  EDIT_URL: 2,
  EDIT_DISPLAY: 3,
  EDIT_FILTER: 4,
}

const Feed = ({ feed }) => {
  const dispatch = useDispatch()
  const title = getTitle(feed)
  const [feedItemDisplay, setFeedItemDisplay] = useState(FEED_ITEM_DISPLAY.REGULAR)
  const [newCustomTitle, setNewCustomTitle] = useState(feed.customTitle)
  const [newUrl, setNewUrl] = useState(feed.url)
  const [newDisplay, setNewDisplay] = useState(feed.display)
  const [newFilter, setNewFilter] = useState(feed.filter)

  const dispatchTitle = () => {
    dispatch(editFeed(feed.id, { customTitle: newCustomTitle }))
  }

  const dispatchUrl = () => {
    dispatch(editFeed(feed.id, { url: newUrl }))
  }

  const dispatchDisplay = (val) => {
    dispatch(editFeed(feed.id, { display: val || newDisplay }))
  }

  const dispatchFilter = () => {
    dispatch(editFeed(feed.id, { filter: newFilter }))
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
    if (feedItemDisplay !== FEED_ITEM_DISPLAY.REGULAR) {
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
  } else if (feedItemDisplay === FEED_ITEM_DISPLAY.EDIT_DISPLAY) {
    const onChangeDisplay = (ev) => {
      const { value } = ev.target
      setNewDisplay(value)
      dispatchDisplay(value)
    }
    feedDisplay = (
      <div className={css.form}>
        <form onSubmit={(ev) => ev.preventDefault()}>
          <select
            className="nondraggable"
            onChange={onChangeDisplay}
            ref={inputRef}
            value={newDisplay}
          >
            {
              Object.values(FEED_DISPLAY).map((displayOption) => (
                <option key={displayOption} value={displayOption}>
                  {FEED_DISPLAY_LABELS[displayOption]}
                </option>
              ))
            }
          </select>
        </form>
      </div>
    )
  } else if (feedItemDisplay === FEED_ITEM_DISPLAY.EDIT_FILTER) {
    feedDisplay = (
      <div className={css.form}>
        <form onSubmit={(ev) => ev.preventDefault()}>
          <input
            className="nondraggable"
            onChange={(ev) => setNewFilter(ev.target.value)}
            onKeyUp={makeInputOnKeyUp(dispatchFilter)}
            placeholder={feed.filter}
            ref={inputRef}
            value={newFilter}
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
      <Icon
        className={css.icon}
        feed={feed}
        noLink
      />
      {feedDisplay}
      <div className={classNames('nondraggable', css.buttons)}>
        <button
          onClick={makeEditOnClick(dispatchTitle, FEED_ITEM_DISPLAY.EDIT_TITLE)}
          title="Edit title"
          type="button"
        >
          <FontAwesomeIcon fixedWidth icon={faPen} />
        </button>
        <button
          onClick={makeEditOnClick(dispatchUrl, FEED_ITEM_DISPLAY.EDIT_URL)}
          title="Edit URL"
          type="button"
        >
          <FontAwesomeIcon fixedWidth icon={faLink} />
        </button>
        <button
          onClick={makeEditOnClick(dispatchDisplay, FEED_ITEM_DISPLAY.EDIT_DISPLAY)}
          title="Change display"
          type="button"
        >
          <FontAwesomeIcon fixedWidth icon={faEye} />
        </button>
        <button
          onClick={makeEditOnClick(dispatchUrl, FEED_ITEM_DISPLAY.EDIT_FILTER)}
          title="Edit filter"
          type="button"
        >
          <FontAwesomeIcon fixedWidth icon={faFilter} />
        </button>
        <button
          onClick={() => dispatch(deleteFeed(feed.id))}
          title="Remove feed"
          type="button"
        >
          <FontAwesomeIcon fixedWidth icon={faTrash} />
        </button>
      </div>
    </li>
  )
}

Feed.propTypes = {
  feed: feedType.isRequired,
}

export default SortableElement(Feed)
