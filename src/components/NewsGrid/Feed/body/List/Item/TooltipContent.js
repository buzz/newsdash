import React from 'react'
import PropTypes from 'prop-types'

import css from './Item.sass'

const TooltipContent = ({ imageUrl, text, title }) => {
  const image = imageUrl
    ? <img className={css.tooltipImage} src={imageUrl} alt={title} />
    : null
  return (
    <>
      {image}
      {text}
    </>
  )
}

TooltipContent.defaultProps = {
  imageUrl: null,
}

TooltipContent.propTypes = {
  imageUrl: PropTypes.string,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default TooltipContent
