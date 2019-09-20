import React from 'react'
import PropTypes from 'prop-types'

import { feedItemType } from 'newsdash/components/propTypes'
import Image from 'newsdash/components/Feed/Image'
import NoTextTile from './NoTextTile'
import TextTile from './TextTile'
import css from './Tile.sass'

const Tile = ({ color, item }) => {
  const image = item.imageUrl
    ? (
      <Image
        alt={item.title}
        className={css.tileImage}
        src={item.imageUrl}
      />
    )
    : null

  const tileInner = item.content
    ? <TextTile color={color} image={image} item={item} />
    : <NoTextTile color={color} image={image} item={item} />

  return (
    <div className={css.tile}>
      <div className={css.tileWrapper}>
        {tileInner}
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
