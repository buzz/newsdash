import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import css from './Settings.sass'
import getApp from '../../store/selectors/app'
import { updateSettings } from '../../store/actions/app'

const fetchIntervalMin = 5
const fetchIntervalMax = 60
const fetchIntervalStep = 5
let fetchIntervalMarks = {}
for (let i = fetchIntervalMin; i <= fetchIntervalMax; i += fetchIntervalStep) {
  fetchIntervalMarks = { ...fetchIntervalMarks, [i]: i }
}

const Settings = ({ setShowSettings }) => {
  const dispatch = useDispatch()

  const {
    corsProxy: oldCorsProxy,
    faviconProxy: oldFaviconProxy,
    fetchInterval: oldFetchInterval,
  } = useSelector(getApp)

  const [corsProxy, setCorsProxy] = useState(oldCorsProxy)
  const [faviconProxy, setFaviconProxy] = useState(oldFaviconProxy)
  const [fetchInterval, setFetchInterval] = useState(oldFetchInterval)

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
          <span>Feed fetch interval (min)</span>
          <div className={css.sliderWrapper}>
            <Slider
              className={css.slider}
              defaultValue={fetchInterval / 60 / 1000}
              marks={fetchIntervalMarks}
              max={fetchIntervalMax}
              min={fetchIntervalMin}
              step={fetchIntervalStep}
              onChange={(val) => {
                const valMilli = val * 60 * 1000
                setFetchInterval(valMilli)
                dispatch(updateSettings({ fetchInterval: valMilli }))
              }}
            />
          </div>
        </div>
        <div className={css.row}>
          <label htmlFor="faviconProxyInput">Favicon proxy</label>
          <input
            id="faviconProxyInput"
            onChange={(ev) => {
              const val = ev.currentTarget.value.trim()
              setFaviconProxy(val)
              dispatch(updateSettings({ faviconProxy: val }))
            }}
            type="text"
            value={faviconProxy}
          />
        </div>
        <div className={css.row}>
          <label htmlFor="corsProxyInput">CORS proxy</label>
          <input
            id="corsProxyInput"
            onChange={(ev) => {
              const val = ev.currentTarget.value.trim()
              setCorsProxy(val)
              dispatch(updateSettings({ corsProxy: val }))
            }}
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
