import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Date from '../Date'
import { feedItemType } from '../../../../../../propTypes'
import css from './Tiles.sass'

const Tile = ({ color, item, height }) => {
  const tileImageStyle = color
    ? { backgroundColor: color }
    : { backgroundImage: `url(${item.imageUrl})` }

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
        >
          <div className={tileImageClassNames} style={tileImageStyle} />
          <div className={css.overlay}>
            <div className={css.caption}>
              <span className={css.title}>{item.title}</span>
              <span className={css.date}>{date}</span>
            </div>
            <p className={css.content}>
              {item.content}
            </p>
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
  height: PropTypes.number.isRequired,
}

export default Tile
