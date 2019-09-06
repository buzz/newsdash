import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons'

import css from './Buttons.sass'

const Buttons = ({ onBackClick, onDeleteClick }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false)

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

  return (
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
  )
}

Buttons.propTypes = {
  onBackClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default Buttons
