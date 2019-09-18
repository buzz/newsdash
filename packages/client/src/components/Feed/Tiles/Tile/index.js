import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'

import { feedItemType } from 'newsdash/components/propTypes'
import Date from 'newsdash/components/Feed/Date'
import css from './Tile.sass'

const transitionClassNames = {
  enterActive: css.enterActive,
  enterDone: css.enterDone,
  exitActive: css.exitActive,
  exitDone: css.exitDone,
}

const Tile = ({ color, gridWidth, item }) => {
  const [hover, setHover] = useState(false)
  const [height, setHeight] = useState(250)
  const [needToMeasure, setNeedToMeasure] = useState(true)
  const [oldGridWidth, setOldGridWidth] = useState(gridWidth)

  const overlayRef = useRef()
  useEffect(() => {
    if (oldGridWidth !== gridWidth) {
      setOldGridWidth(gridWidth)
      setNeedToMeasure(true)
    } else if (needToMeasure) {
      setHeight(overlayRef.current.offsetHeight)
      setNeedToMeasure(false)
    }
  }, [gridWidth, oldGridWidth, needToMeasure, overlayRef])

  const tileImageStyle = item.imageUrl
    ? { backgroundImage: `url(${item.imageUrl})` }
    : { backgroundColor: color }

  const tileImageClassNames = classNames(
    css.tileImage,
    { [css.noImage]: color }
  )

  const date = item.date
    ? <Date className={css.date} date={item.date} />
    : null

  return (
    <div className={css.tile} style={{ height: `${height}px` }}>
      <div className={css.tileWrapper}>
        <a
          className={classNames('nondraggable', css.tileInner)}
          href={item.link}
          rel="noopener noreferrer"
          target="_blank"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className={tileImageClassNames} style={tileImageStyle} />
          <CSSTransition
            in={hover}
            timeout={parseInt(css.transitionSpeed.slice(0, -2), 10)}
            classNames={transitionClassNames}
          >
            <div
              className={classNames(css.overlay, { [css.measured]: !needToMeasure })}
              ref={overlayRef}
            >
              <div className={css.caption}>
                <h2 className={css.title}>{item.title}</h2>
                <span className={css.date}>{date}</span>
              </div>
              <p className={css.content}>
                {item.content}
              </p>
            </div>
          </CSSTransition>
        </a>
      </div>
    </div>
  )
}

Tile.defaultProps = {
  color: null,
}

Tile.propTypes = {
  color: PropTypes.string,
  gridWidth: PropTypes.number.isRequired,
  item: feedItemType.isRequired,
}

export default Tile
