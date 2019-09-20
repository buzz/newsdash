import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'

import { feedItemType } from 'newsdash/components/propTypes'
import Overlay from 'newsdash/components/Feed/Tiles/Tile/Overlay'
import tileCss from 'newsdash/components/Feed/Tiles/Tile/Tile.sass'
import overlayCss from 'newsdash/components/Feed/Tiles/Tile/Overlay/Overlay.sass'

const transitionClassNames = {
  enterActive: overlayCss.enterActive,
  enterDone: overlayCss.enterDone,
  exitActive: overlayCss.exitActive,
  exitDone: overlayCss.exitDone,
}

const TextTile = ({ color, image, item }) => {
  const [hover, setHover] = useState(false)

  return (
    <a
      className={classNames('nondraggable', tileCss.tileInner)}
      href={item.link}
      rel="noopener noreferrer"
      target="_blank"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CSSTransition
        in={hover}
        timeout={parseInt(overlayCss.transitionSpeed.slice(0, -2), 10)}
        classNames={transitionClassNames}
      >
        <Overlay className={overlayCss.overlay} item={item} />
      </CSSTransition>
      <Overlay className={overlayCss.overlayShadow} item={item} />
      <div
        className={tileCss.tileImageWrapper}
        style={{ backgroundColor: color }}
      >
        {image}
      </div>
    </a>
  )
}

TextTile.propTypes = {
  color: PropTypes.string.isRequired,
  image: PropTypes.node.isRequired,
  item: feedItemType.isRequired,
}

export default TextTile
