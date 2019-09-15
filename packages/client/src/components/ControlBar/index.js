import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faCog, faPlus } from '@fortawesome/free-solid-svg-icons'

import { addFeedBox } from 'newsdash/store/actions/feedBox'
import css from './ControlBar.sass'

const ControlBar = ({ setShowSettings }) => {
  const [hidden, setHidden] = useState(true)
  const dispatch = useDispatch()

  const toggleButtonTitle = `${hidden ? 'Show' : 'Hide'} control bar`

  return (
    <div className={classNames(css.controlBar, { [css.hidden]: hidden })}>
      <button
        aria-label={toggleButtonTitle}
        onClick={() => setHidden(!hidden)}
        title={toggleButtonTitle}
        type="button"
      >
        <FontAwesomeIcon icon={faEllipsisV} />
      </button>
      <button
        aria-label="Settings"
        onClick={() => setShowSettings(true)}
        title="Settings"
        type="button"
      >
        <FontAwesomeIcon icon={faCog} />
      </button>
      <button
        aria-label="Add new feed"
        onClick={() => dispatch(addFeedBox())}
        title="Add new feed"
        type="button"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  )
}

ControlBar.propTypes = {
  setShowSettings: PropTypes.func.isRequired,
}

export default ControlBar