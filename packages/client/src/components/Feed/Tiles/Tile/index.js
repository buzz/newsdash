import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'

import { feedItemType } from 'newsdash/components/propTypes'
import Date from 'newsdash/components/Feed/Date'
import Image from 'newsdash/components/Feed/Image'
import css from './Tile.sass'

const transitionClassNames = {
  enterActive: css.enterActive,
  enterDone: css.enterDone,
  exitActive: css.exitActive,
  exitDone: css.exitDone,
}

const Overlay = ({
  className,
  content,
  date,
  title,
}) => (
  <div className={className}>
    <div className={css.caption}>
      <h2 className={css.title}>{title}</h2>
      <span className={css.date}>{date}</span>
    </div>
    <p className={css.content}>
      {content}
    </p>
  </div>
)

Overlay.defaultProps = {
  content: '',
}

Overlay.propTypes = {
  className: PropTypes.string.isRequired,
  content: PropTypes.string,
  date: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

const Tile = ({ color, item }) => {
  const [hover, setHover] = useState(false)

  const tileImage = item.imageUrl
    ? (
      <Image
        alt={item.title}
        className={css.tileImage}
        src={item.imageUrl}
      />
    )
    : null

  const date = item.date
    ? <Date className={css.date} date={item.date} />
    : null

  return (
    <div className={css.tile}>
      <div className={css.tileWrapper}>
        <a
          className={classNames('nondraggable', css.tileInner)}
          href={item.link}
          rel="noopener noreferrer"
          target="_blank"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <CSSTransition
            in={hover}
            timeout={parseInt(css.transitionSpeed.slice(0, -2), 10)}
            classNames={transitionClassNames}
          >
            <Overlay
              className={css.overlay}
              content={item.content}
              date={date}
              title={item.title}
            />
          </CSSTransition>
          <Overlay
            className={css.overlayShadow}
            content={item.content}
            date={date}
            title={item.title}
          />
          <div
            className={css.tileImageWrapper}
            style={{ backgroundColor: color }}
          >
            {tileImage}
          </div>
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
  item: feedItemType.isRequired,
}

export default Tile
