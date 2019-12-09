import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import css from './FeedBox.sss'
import Body from './Body'
import Header from './Header'

const FeedBox = ({ feedBox }) => {
  const { feeds } = feedBox
  const [editMode, setEditMode] = useState(false)

  const [activeFeedId, setActiveFeedId] = useState(
    feeds.length ? feeds[0].id : null
  )
  useEffect(() => {
    // feed got deleted?
    if (!feeds.find((feed) => feed.id === activeFeedId)) {
      setActiveFeedId(feeds.length ? feeds[0].id : null)
    }
    // first feed added?
    if (feeds.length && !activeFeedId) {
      setActiveFeedId(feeds[0].id)
    }
  }, [activeFeedId, feeds])

  const style = {
    backgroundColor: feedBox.colors.bg,
    borderColor: feedBox.colors.border,
  }

  return (
    <div className={css.feedBox} style={style}>
      <Header
        editMode={editMode}
        feed={feeds.find((feed) => feed.id === activeFeedId)}
        feedBox={feedBox}
        onEditClick={() => setEditMode(true)}
      />
      <Body
        activeFeedId={activeFeedId}
        editMode={editMode}
        feedBox={feedBox}
        setActiveFeedId={setActiveFeedId}
        setEditMode={setEditMode}
      />
    </div>
  )
}

FeedBox.propTypes = {
  feedBox: PropTypes.object.isRequired,
}

export default FeedBox
