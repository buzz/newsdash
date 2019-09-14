import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

import css from './Modal.sass'

ReactModal.setAppElement('#root')

const Modal = ({
  children,
  contentLabel,
  isOpen,
  onRequestClose,
}) => (
  <ReactModal
    className={css.modal}
    contentLabel={contentLabel}
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    overlayClassName={css.overlay}
  >
    {children}
  </ReactModal>
)

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  contentLabel: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
}

export default Modal
