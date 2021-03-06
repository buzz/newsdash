import React from 'react'
import PropTypes from 'prop-types'

import Image from 'newsdash/components/Feed/Image'
import css from './Item.sss'

const TooltipContent = ({ imageUrl, text, title }) => (
  <>
    <Image alt={title} className={css.tooltipImage} src={imageUrl} />
    <h2>{title}</h2>
    <p>{text}</p>
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
