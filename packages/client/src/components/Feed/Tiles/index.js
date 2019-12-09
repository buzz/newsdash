import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Masonry from 'react-masonry-css'
import tinycolor from 'tinycolor2'

import { feedItemType } from 'newsdash/components/propTypes'
import useWidthObserver from 'newsdash/hooks/useWidthObserver'
import Tile from './Tile'
import css from './Tiles.sss'

const MIN_COL_WIDTH = 200

const getTileColors = (items, prevTileColors) => {
  const tileColors = [...prevTileColors]
  for (let i = 0; i < items.length; i += 1) {
    if (!tileColors[i]) {
      tileColors[i] = tinycolor({
        h: Math.round(Math.random() * 360),
        s: 0.2,
        l: 0.85,
      }).toHexString()
    }
  }
  return tileColors
}

const Tiles = ({ items }) => {
  const [ref, width] = useWidthObserver()
  const colNum = Math.max(1, Math.floor(width / MIN_COL_WIDTH))

  // keep tile colors permanent across grid re-layouts
  const [tileColors, setTileColors] = useState(getTileColors(items, []))
  useEffect(() => {
    setTileColors((prevTileColors) => getTileColors(items, prevTileColors))
  }, [items])

  // somehow Masonry is not recalculating after initial render
  const masonryRef = useRef()
  useEffect(() => {
    if (masonryRef.current) {
      masonryRef.current.reCalculateColumnCount()
    }
  }, [colNum])

  return (
    <div className={css.tiles} ref={ref}>
      <Masonry
        breakpointCols={{ default: colNum }}
        className={css.masonryGrid}
        columnClassName={css.gridColumn}
        ref={masonryRef}
      >
        {items.map((item, i) => (
          <Tile color={tileColors[i]} item={item} key={item.id} />
        ))}
      </Masonry>
    </div>
  )
}

Tiles.propTypes = {
  items: PropTypes.arrayOf(feedItemType).isRequired,
}

export default Tiles
