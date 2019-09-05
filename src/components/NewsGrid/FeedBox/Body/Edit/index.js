import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faPlus,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import Scrollbar from 'react-custom-scrollbars'

import FeedIcon from '../../../../FeedIcon'
import { feedBoxType } from '../../../../../propTypes'
import { addFeed, deleteFeed } from '../../../../../store/actions/feed'
import { editFeedBox } from '../../../../../store/actions/feedBox'
import { FEED_STATUS } from '../../../../../constants'
import css from './Edit.sass'

const Edit = ({
  onBackClick,
  onDeleteClick,
  feedBox,
}) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [addUrl, setAddUrl] = useState('')
  const [feedBoxTitle, setFeedBoxTitle] = useState(feedBox.title || '')
  const dispatch = useDispatch()
  const inputRef = useRef()
  useEffect(() => { inputRef.current.focus() }, [])

  const deleteButton = deleteConfirm
    ? (
      <button
        className={css.deleteConfirm}
        onClick={onDeleteClick}
        type="button"
      >
        <FontAwesomeIcon icon={faTrash} />
        Really?
      </button>
    )
    : (
      <button
        onClick={() => setDeleteConfirm(true)}
        type="button"
      >
        <FontAwesomeIcon icon={faTrash} />
        Delete
      </button>
    )

  const feeds = feedBox.feeds.map(
    (feed) => {
      let title
      switch (feed.status) {
        case FEED_STATUS.LOADING:
        case FEED_STATUS.NEW:
          title = 'Loading…'
          break
        case FEED_STATUS.ERROR:
          title = 'Error loading!'
          break
        default:
          title = feed.title
          break
      }
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

  const feedList = feedBox.feeds.length
    ? (
      <ul className={css.feeds}>
        {feeds}
      </ul>
    )
    : null

  const onAddFeedClick = () => {
    const urlWithProtocol = addUrl.match(/https?:\/\//)
      ? addUrl
      : `https://${addUrl}`
    try {
      const url = new URL(urlWithProtocol)
      dispatch(addFeed(feedBox.id, url.href))
      setAddUrl('')
    } catch {
      // ignore invalid URL
    }
  }

  const dispatchTitle = () => dispatch(editFeedBox(feedBox.id, { title: feedBoxTitle.trim() }))

  return (
    <div className={css.edit}>
      <div className={css.forms}>
        <Scrollbar autoHide>
          <h2>Settings</h2>
          <form onSubmit={(ev) => ev.preventDefault()}>
            <div className={classNames('nondraggable', css.row)}>
              <input
                onBlur={dispatchTitle}
                onChange={(ev) => setFeedBoxTitle(ev.target.value)}
                onKeyUp={(ev) => ev.keyCode === 13 && dispatchTitle()}
                placeholder="Custom title…"
                type="text"
                value={feedBoxTitle}
              />
            </div>
          </form>
          <h2>Feeds</h2>
          <form>
            <div className={classNames('nondraggable', css.row, css.addFeed)}>
              <input
                onChange={(ev) => setAddUrl(ev.target.value.trim())}
                placeholder="Add feed URL…"
                ref={inputRef}
                type="text"
                value={addUrl}
              />
              <button
                onClick={onAddFeedClick}
                title="Add feed"
                type="button"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </form>
          {feedList}
        </Scrollbar>
      </div>
      <div className={classNames('nondraggable', css.buttons)}>
        <button
          onClick={onBackClick}
          type="button"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
        {deleteButton}
      </div>
    </div>
  )
}

Edit.propTypes = {
  onBackClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  feedBox: feedBoxType.isRequired,
}

export default Edit
