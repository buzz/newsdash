import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { deleteFeedBox } from 'newsdash/store/actions/feedBox'
import { feedBoxType } from 'newsdash/components/propTypes'
import Feed from 'newsdash/components/Feed'
import Scrollbar from 'newsdash/components/Scrollbar'
import Edit from './Edit'
import Tabs from './Tabs'
import css from './Body.sss'

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
      <Scrollbar bgColor={feedBox.colors.bg}>
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
