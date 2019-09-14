import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import PropTypes from 'prop-types'

import { feedBoxType } from 'newsdash/components/propTypes'
import css from './HueSlider.sass'

const KEY_STEP = 0.05

const pointerH = parseInt(css.pointerH.slice(0, -2), 10)

const isFirstBtn = (btns) => btns % 2 === 1

const HueSlider = ({ feedBox, onChange }) => {
  const [pointerLeft, setPointerLeft] = useState(0)
  const [active, setActive] = useState(false)
  const [pos, setPos] = useState(feedBox.hue / 360)
  const div = useRef()

  const updatePointerPos = useCallback(
    () => setPointerLeft(pos * div.current.getBoundingClientRect().width - pointerH),
    [pos]
  )

  useEffect(() => {
    updatePointerPos()
  }, [pos, feedBox, updatePointerPos])

  useEffect(() => {
    window.addEventListener('resize', updatePointerPos)
    return () => {
      window.removeEventListener('resize', updatePointerPos)
    }
  }, [pos, updatePointerPos])

  const setNewPos = (p) => {
    setPos(p)
    onChange(Math.floor(p * 360))
  }

  const updateFromMouseEvent = (ev) => {
    const targetRect = div.current.getBoundingClientRect()
    const newPos = (ev.pageX - targetRect.x) / targetRect.width
    setNewPos(newPos)
  }

  const onKeyUp = (ev) => {
    if (ev.key === 'ArrowRight') {
      setNewPos(Math.min(1, pos + KEY_STEP))
    }
    if (ev.key === 'ArrowLeft') {
      setNewPos(Math.max(0, pos - KEY_STEP))
    }
  }

  const onMouseDown = (ev) => {
    if (isFirstBtn(ev.buttons)) {
      setActive(true)
      updateFromMouseEvent(ev)
    }
  }

  const onMouseEnter = (ev) => {
    if (!isFirstBtn(ev.buttons)) {
      setActive(false)
    }
  }

  const onMouseMove = (ev) => {
    if (active) {
      updateFromMouseEvent(ev)
    }
  }

  const onMouseUp = (ev) => {
    if (ev.buttons % 2 === 0) {
      setActive(false)
    }
  }

  return (
    <div
      aria-valuemax="1"
      aria-valuemin="0"
      aria-valuenow={pos}
      className={css.hueSlider}
      onBlur={() => setActive(false)}
      onKeyUp={onKeyUp}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      ref={div}
      role="slider"
      tabIndex="0"
    >
      <div className={css.huePointer} style={{ left: `${pointerLeft}px` }} />
    </div>
  )
}

HueSlider.propTypes = {
  feedBox: feedBoxType.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default HueSlider
