import React from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import settingsCss from 'newsdash/components/Settings/Settings.sass'
import getApp from 'newsdash/store/selectors/app'
import css from './ApiCheck.sass'

const ApiCheck = () => {
  const { apiPresent } = useSelector(getApp)

  const text = apiPresent
    ? 'Feeds and hi-res image URLs will be fetched using API.'
    : 'Feeds will be fetched using external service (CORS proxy). '
      + 'Feed images will be in low-res if available at all.'

  return (
    <>
      <h1>API</h1>
      <div className={classNames(settingsCss.row, css.row)}>
        <div className={apiPresent ? css.present : css.notPresent}>
          <span className={css.apiPresentIcon}>
            <FontAwesomeIcon icon={apiPresent ? faCheck : faTimes} />
          </span>
          API is
          {apiPresent ? ' ' : ' not '}
          available.
        </div>
        <div>
          {text}
        </div>
      </div>
    </>
  )
}

export default ApiCheck
