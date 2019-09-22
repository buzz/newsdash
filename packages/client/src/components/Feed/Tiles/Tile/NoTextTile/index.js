import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { feedItemType } from 'newsdash/components/propTypes'
import Overlay from 'newsdash/components/Feed/Tiles/Tile/Overlay'
import tileCss from 'newsdash/components/Feed/Tiles/Tile/Tile.sass'
import overlayCss from 'newsdash/components/Feed/Tiles/Tile/Overlay/Overlay.sass'
import css from './NoTextTile.sass'

const NoTextTile = ({ color, image, item }) => {
  const style = color ? { backgroundColor: color } : null

  return (
    <a
      className={classNames('nondraggable', css.noTextTile, tileCss.tileInner)}
      href={item.link}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Overlay className={overlayCss.overlay} item={item} />
      <div className={tileCss.tileImageWrapper} style={style}>
        {image}
      </div>
    </a>
  )
}

NoTextTile.defaultProps = {
  color: null,
  image: null,
}

NoTextTile.propTypes = {
  color: PropTypes.string,
  image: PropTypes.node,
  item: feedItemType.isRequired,
}

export default NoTextTile
