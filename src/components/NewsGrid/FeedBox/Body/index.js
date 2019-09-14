import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import Scrollbar from 'react-custom-scrollbars'

import Edit from './Edit'
import Feed from './Feed'
import Tabs from './Tabs'
import { deleteFeedBox } from '../../../../store/actions/feedBox'
import { feedBoxType } from '../../../../propTypes'
import css from './Body.sass'

const Body = ({
  activeFeedId,
  editMode,
  feedBox,
  setActiveFeedId,
  setEditMode,
}) => {
  const { feeds } = feedBox
  const dispatch = useDispatch()

  const deleteFeedBoxClick = () => {
    dispatch(deleteFeedBox(feedBox.id))
    setEditMode(false)
  }

  if (editMode) {
    return (
      <Edit
        onBackClick={() => setEditMode(false)}
        onDeleteClick={deleteFeedBoxClick}
        feedBox={feedBox}
      />
    )
  }

  if (!feeds.length) {
    return (
      <div className={css.feedMessage}>
        <button
          className="nondraggable"
          onClick={() => setEditMode(true)}
          type="button"
        >
          Add a feed
        </button>
      </div>
    )
  }

  if (feeds.length === 1) {
    return (
      <Scrollbar autoHide>
        <Feed feed={feeds[0]} />
      </Scrollbar>
    )
  }

  return (
    <Tabs
      activeFeedId={activeFeedId}
      feedBox={feedBox}
      feeds={feeds}
      setActiveFeedId={setActiveFeedId}
    />
  )
}

Body.defaultProps = {
  activeFeedId: null,
}

Body.propTypes = {
  activeFeedId: PropTypes.number,
  editMode: PropTypes.bool.isRequired,
  feedBox: feedBoxType.isRequired,
  setActiveFeedId: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
}

export default Body
