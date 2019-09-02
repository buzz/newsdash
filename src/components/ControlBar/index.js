import React from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import css from './ControlBar.sass'
import { addFeed } from '../../store/actions/feed'

const ControlBar = () => {
  const dispatch = useDispatch()
  return (
    <div className={css.controlBar}>
      <button
        aria-label="Add new feed"
        onClick={() => dispatch(addFeed())}
        title="Add new feed"
        type="button"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  )
}

export default ControlBar
