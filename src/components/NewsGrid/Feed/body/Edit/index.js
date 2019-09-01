import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'

import css from './Edit.sass'
import { feedType } from '../../../../../propTypes'

const Edit = ({
  onCancelClick,
  onDeleteClick,
  onOkClick,
  feed,
}) => {
  const [url, setUrl] = useState(feed.url)
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const inputRef = useRef()
  useEffect(() => { inputRef.current.focus() })

  const rowClassNames = classNames('nondraggable', css.row)
  const urlId = `${feed.id}-url`

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
    <div className={css.edit}>
      <form>
        <div className={rowClassNames}>
          <label htmlFor={urlId}>URL</label>
          <input
            id={urlId}
            onChange={(event) => setUrl(event.currentTarget.value)}
            ref={inputRef}
            type="text"
            value={url}
          />
        </div>
      </form>
      <div className={classNames('nondraggable', css.buttons)}>
        {deleteButton}
        <button
          onClick={() => onOkClick({ url })}
          type="button"
        >
          <FontAwesomeIcon icon={faCheck} />
          OK
        </button>
        <button
          onClick={onCancelClick}
          type="button"
        >
          <FontAwesomeIcon icon={faTimes} />
          Cancel
        </button>
      </div>
    </div>
  )
}

Edit.propTypes = {
  onCancelClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onOkClick: PropTypes.func.isRequired,
  feed: feedType.isRequired,
}

export default Edit
