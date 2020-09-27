import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ReactCustomScrollbars from 'react-custom-scrollbars'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'

import css from './Scrollbar.sss'

const OPACITY_FULL = '1.0'
const OPACITY_NONE = '0.0'

const getButtonStyle = (top) => ({
  opacity: top === 0.0 ? OPACITY_NONE : OPACITY_FULL,
  pointerEvents: top === 0.0 ? 'none' : 'inherit',
})

const getFaderStyle = (type, bgColor, top) => ({
  background: `linear-gradient(to ${type}, transparent, ${bgColor} 90%)`,
  opacity:
    (type === 'top' && top === 0.0) || (type === 'bottom' && top === 1.0)
      ? OPACITY_NONE
      : OPACITY_FULL,
})

const VTrack = ({ style }) => <div className={css.vtrack} style={style} />

VTrack.propTypes = {
  style: PropTypes.shape({
    opacity: PropTypes.number.isRequired,
    position: PropTypes.string.isRequired,
    transition: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
}

const HTrack = () => <div className={css.htrack} />

const Scrollbar = ({ bgColor, children }) => {
  const scrollbar = useRef()
  const [top, setTop] = useState(0.0)

  return (
    <div className={css.scrollWrapper}>
      <ReactCustomScrollbars
        autoHide
        onScrollFrame={({ top: newTop }) => setTop(newTop)}
        ref={scrollbar}
        renderTrackHorizontal={HTrack}
        renderTrackVertical={VTrack}
      >
        {children}
      </ReactCustomScrollbars>
      <button
        aria-label="Scroll to top"
        className={classNames('nondraggable', css.scrollToTopButton)}
        onClick={() => scrollbar.current.scrollToTop()}
        style={getButtonStyle(top)}
        title="Scroll to top"
        type="button"
      >
        <FontAwesomeIcon fixedWidth icon={faAngleDoubleUp} />
      </button>
      <div
        className={css.faderTop}
        style={getFaderStyle('top', bgColor, top)}
      />
      <div
        className={css.faderBottom}
        style={getFaderStyle('bottom', bgColor, top)}
      />
    </div>
  )
}

Scrollbar.propTypes = {
  bgColor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Scrollbar
