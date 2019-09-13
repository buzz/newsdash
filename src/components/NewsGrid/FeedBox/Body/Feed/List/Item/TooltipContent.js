import React from 'react'
import PropTypes from 'prop-types'

import Image from './Image'
import css from './Item.sass'

const TooltipContent = ({ imageUrl, text, title }) => (
  <>
    <Image alt={title} className={css.tooltipImage} src={imageUrl} />
    {text}
  </>
)

TooltipContent.defaultProps = {
  imageUrl: null,
}

TooltipContent.propTypes = {
  imageUrl: PropTypes.string,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default TooltipContent
