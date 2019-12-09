import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Scrollbar from 'react-custom-scrollbars'

import { addFeed } from 'newsdash/store/actions/feed'
import { editFeedBox } from 'newsdash/store/actions/feedBox'
import { feedBoxType } from 'newsdash/components/propTypes'
import List from './List'
import HueSlider from './HueSlider'
import Buttons from './Buttons'
import css from './Edit.sss'

const Edit = ({ feedBox, onBackClick, onDeleteClick }) => {
  const [addUrl, setAddUrl] = useState('')
  const [feedBoxTitle, setFeedBoxTitle] = useState(feedBox.title || '')
  const dispatch = useDispatch()
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const feedList = feedBox.feeds.length ? <List feeds={feedBox.feeds} /> : null

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

  const dispatchTitle = () =>
    dispatch(editFeedBox(feedBox.id, { title: feedBoxTitle.trim() }))

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
            <div className={classNames('nondraggable', css.row)}>
              <HueSlider
                feedBox={feedBox}
                onChange={(hue) => dispatch(editFeedBox(feedBox.id, { hue }))}
              />
            </div>
          </form>
          <h2>Feeds</h2>
          <form onSubmit={(ev) => ev.preventDefault()}>
            <div className={classNames('nondraggable', css.row, css.addFeed)}>
              <input
                onChange={(ev) => setAddUrl(ev.target.value.trim())}
                onKeyUp={(ev) => ev.keyCode === 13 && onAddFeedClick()}
                placeholder="Add feed URL…"
                ref={inputRef}
                type="text"
                value={addUrl}
              />
              <button onClick={onAddFeedClick} title="Add feed" type="button">
                <FontAwesomeIcon fixedWidth icon={faPlus} />
              </button>
            </div>
          </form>
          {feedList}
        </Scrollbar>
      </div>
      <Buttons onBackClick={onBackClick} onDeleteClick={onDeleteClick} />
    </div>
  )
}

Edit.propTypes = {
  feedBox: feedBoxType.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default Edit
