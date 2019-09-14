import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { SortableContainer } from 'react-sortable-hoc'

import { feedType } from 'newsdash/components/propTypes'
import { editFeed } from 'newsdash/store/actions/feed'
import SortableFeed from './SortableFeed'
import css from './List.sass'

const SortableFeedList = SortableContainer(({ feeds }) => (
  <ul className={classNames('nondraggable', css.feeds)}>
    {
      feeds.map(
        (feed) => (
          <SortableFeed
            feed={feed}
            index={feed.index}
            key={feed.id.toString()}
          />
        )
      )
    }
  </ul>
))

const findByIndex = (feeds, idx) => feeds.find((feed) => feed.index === idx)

const List = ({ feeds }) => {
  const dispatch = useDispatch()

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const feedA = findByIndex(feeds, oldIndex)
    const feedB = findByIndex(feeds, newIndex)
    dispatch(editFeed(feedA.id, { index: newIndex }))
    dispatch(editFeed(feedB.id, { index: oldIndex }))
  }

  return (
    <SortableFeedList
      feeds={feeds}
      lockAxis="y"
      lockToContainerEdges
      onSortEnd={onSortEnd}
      useDragHandle
    />
  )
}

List.propTypes = {
  feeds: PropTypes.arrayOf(feedType).isRequired,
}

export default List
