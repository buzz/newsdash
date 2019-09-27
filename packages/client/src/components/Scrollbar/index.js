import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactCustomScrollbars from 'react-custom-scrollbars'

import css from './Scrollbar.sss'

const getFaderStyle = (type, bgColor, top) => ({
  background: `linear-gradient(to ${type}, transparent, ${bgColor} 90%)`,
  opacity: (type === 'top' && top === 0.0)
        || (type === 'bottom' && top === 1.0)
    ? '0.0' : '1.0',
})

const Track = ({ style }) => <div className={css.track} style={style} />

Track.propTypes = {
  style: PropTypes.shape({
    opacity: PropTypes.number.isRequired,
    position: PropTypes.string.isRequired,
    transition: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
}

const Scrollbar = ({ bgColor, children }) => {
  const [top, setTop] = useState(0.0)

  return (
    <div className={css.scrollWrapper}>
      <ReactCustomScrollbars
        autoHide
        onScrollFrame={({ top: newTop }) => setTop(newTop)}
        renderTrackVertical={Track}
      >
        {children}
      </ReactCustomScrollbars>
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
