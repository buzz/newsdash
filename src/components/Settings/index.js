import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import css from './Settings.sass'
import getApp from '../../store/selectors/app'

const Settings = ({ setShowSettings }) => {
  const {
    corsProxy: oldCorsProxy,
    faviconProxy: oldFaviconProxy,
    fetchInterval: oldFetchInterval,
  } = useSelector(getApp)

  const [corsProxy, setCorsProxy] = useState(oldCorsProxy)
  const [faviconProxy, setFaviconProxy] = useState(oldFaviconProxy)
  const [fetchInterval, setFetchInterval] = useState(oldFetchInterval)

  const fetchIntervalOnChange = (ev) => {
    const val = parseInt(ev.currentTarget.value.trim(), 10)
    setFetchInterval(Number.isInteger(val) ? val * 60 * 1000 : fetchInterval)
  }

  return (
    <div className={css.settings}>
      <button
        aria-label="Close settings"
        className={css.buttonClose}
        onClick={() => setShowSettings(false)}
        title="Close settings"
        type="button"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h1>Settings</h1>
      <form>
        <div className={css.row}>
          <label htmlFor="fetchIntervalInput">Feed fetch interval (min)</label>
          <input
            id="fetchIntervalInput"
            onChange={fetchIntervalOnChange}
            type="text"
            value={fetchInterval / 60 / 1000}
          />
        </div>
        <div className={css.row}>
          <label htmlFor="faviconProxyInput">Favicon proxy</label>
          <input
            id="faviconProxyInput"
            onChange={(ev) => setFaviconProxy(ev.currentTarget.value.trim())}
            type="text"
            value={faviconProxy}
          />
        </div>
        <div className={css.row}>
          <label htmlFor="corsProxyInput">CORS proxy</label>
          <input
            id="corsProxyInput"
            onChange={(ev) => setCorsProxy(ev.currentTarget.value.trim())}
            type="text"
            value={corsProxy}
          />
        </div>
      </form>
    </div>
  )
}

Settings.propTypes = {
  setShowSettings: PropTypes.func.isRequired,
}

export default Settings
