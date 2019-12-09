import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import css from './Modal.sss'

ReactModal.setAppElement('#root')

const Modal = ({ children, contentLabel, isOpen, onRequestClose }) => (
  <ReactModal
    className={css.modal}
    contentLabel={contentLabel}
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    overlayClassName={css.overlay}
  >
    <button
      aria-label="Close settings"
      className={css.buttonClose}
      onClick={onRequestClose}
      title="Close settings"
      type="button"
    >
      <FontAwesomeIcon icon={faTimes} />
    </button>
    {children}
  </ReactModal>
)

Modal.defaultProps = {
  children: null,
}

Modal.propTypes = {
  children: PropTypes.node,
  contentLabel: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
}

export default Modal
