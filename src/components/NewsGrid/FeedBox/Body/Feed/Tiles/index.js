import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Masonry from 'react-masonry-css'
import tinycolor from 'tinycolor2'

import Tile from './Tile'
import { feedItemType } from '../../../../../../propTypes'
import useWidthObserver from '../../../../../../hooks/useWidthObserver'
import css from './Tiles.sass'

const MIN_COL_WIDTH = 200

const getTileColors = (items) => (
  items.map((item) => (
    item.imageUrl
      ? null
      : tinycolor({
        h: Math.round((Math.random() * 360)),
        s: 0.2,
        l: 0.85,
      }).toHexString()
  ))
)

const Tiles = ({ items }) => {
  const [ref, width] = useWidthObserver()
  const colNum = Math.max(1, Math.floor(width / MIN_COL_WIDTH))

  // keep tile colors permanent across grid re-layouts
  const tileColors = useRef(getTileColors(items))

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
        {
          items.map(
            (item, i) => (
              <Tile
                color={tileColors.current[i]}
                gridWidth={width}
                item={item}
                key={item.id.toString()}
              />
            )
          )
        }
      </Masonry>
    </div>
  )
}

Tiles.propTypes = {
  items: PropTypes.arrayOf(feedItemType).isRequired,
}

export default Tiles
