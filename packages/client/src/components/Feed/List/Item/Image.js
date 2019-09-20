import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import css from './Item.sass'

const Image = ({ alt, className, src }) => (
  src
    ? (
      <img
        alt={alt}
        className={classNames(className, css.feedImage)}
        src={src}
      />
    )
    : null
)

Image.defaultProps = {
  className: null,
  src: null,
}

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  src: PropTypes.string,
}

export default Image
