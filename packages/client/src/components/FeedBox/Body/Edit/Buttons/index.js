import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons'

import ConfirmButton from 'newsdash/components/ConfirmButton'
import css from './Buttons.sss'

const Buttons = ({ onBackClick, onDeleteClick }) => (
  <div className={classNames('nondraggable', css.buttons)}>
    <button onClick={onBackClick} type="button">
      <FontAwesomeIcon icon={faArrowLeft} />
      Back
    </button>
    <ConfirmButton icon={faTrash} onClick={onDeleteClick}>
      Delete
    </ConfirmButton>
  </div>
)

Buttons.propTypes = {
  onBackClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default Buttons
