import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import getApp from 'newsdash/store/selectors/app'
import { editApp } from 'newsdash/store/actions/app'
import css from 'newsdash/components/Settings/Settings.sass'

const makeSliderMarks = (min, max, step) => {
  let marks = {}
  for (let i = min; i <= max; i += step) {
    marks = { ...marks, [i]: i }
  }
  return marks
}

const gridColMin = 1
const gridColMax = 12
const gridColStep = 1
const gridColMarks = makeSliderMarks(gridColMin, gridColMax, gridColStep)

const fetchIntervalMin = 5
const fetchIntervalMax = 60
const fetchIntervalStep = 5
const fetchIntervalMarks = makeSliderMarks(fetchIntervalMin, fetchIntervalMax, fetchIntervalStep)

const feedItemsToKeepMin = 20
const feedItemsToKeepMax = 200
const feedItemsToKeepStep = 20
const feedItemsToKeepMarks = makeSliderMarks(
  feedItemsToKeepMin, feedItemsToKeepMax, feedItemsToKeepStep
)

const lightnessMin = 0
const lightnessMax = 100
const lightnessStep = 10
const lightnessMarks = makeSliderMarks(lightnessMin, lightnessMax, lightnessStep)

const saturationMin = 0
const saturationMax = 100
const saturationStep = 10
const saturationMarks = makeSliderMarks(saturationMin, saturationMax, saturationStep)

const AppSettings = () => {
  const {
    apiPresent,
    corsProxy: oldCorsProxy,
    feedItemsToKeep: oldFeedItemsToKeep,
    fetchInterval: oldFetchInterval,
    gridCols: oldGridCols,
    lightness: oldLightness,
    saturation: oldSaturation,
  } = useSelector(getApp)

  const dispatch = useDispatch()

  const [gridCols, setGridCols] = useState(oldGridCols)
  const [corsProxy, setCorsProxy] = useState(oldCorsProxy)
  const [fetchInterval, setFetchInterval] = useState(oldFetchInterval)
  const [feedItemsToKeep, setFeedItemsToKeep] = useState(oldFeedItemsToKeep)
  const [lightness, setLightness] = useState(oldLightness)
  const [saturation, setSaturation] = useState(oldSaturation)

  return (
    <>
      <form>
        <h1>Appearance</h1>

        <div className={css.row}>
          <span>Grid columns</span>
          <div className={css.sliderWrapper}>
            <Slider
              className={css.slider}
              defaultValue={gridCols}
              marks={gridColMarks}
              max={gridColMax}
              min={gridColMin}
              step={gridColStep}
              onChange={(val) => {
                setGridCols(val)
                dispatch(editApp({ gridCols: val }))
              }}
            />
          </div>
        </div>

        <div className={css.row}>
          <span>Feed box lightness</span>
          <div className={css.sliderWrapper}>
            <Slider
              className={css.slider}
              defaultValue={lightness}
              marks={lightnessMarks}
              max={lightnessMax}
              min={lightnessMin}
              step={lightnessStep}
              onChange={(val) => {
                setLightness(val)
                dispatch(editApp({ lightness: val }))
              }}
            />
          </div>
        </div>

        <div className={css.row}>
          <span>Feed box saturation</span>
          <div className={css.sliderWrapper}>
            <Slider
              className={css.slider}
              defaultValue={saturation}
              marks={saturationMarks}
              max={saturationMax}
              min={saturationMin}
              step={saturationStep}
              onChange={(val) => {
                setSaturation(val)
                dispatch(editApp({ saturation: val }))
              }}
            />
          </div>
        </div>

        <h1>Feed settings</h1>

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
                dispatch(editApp({ fetchInterval: valMilli }))
              }}
            />
          </div>
        </div>

        <div className={css.row}>
          <span>Keep feed items</span>
          <div className={css.sliderWrapper}>
            <Slider
              className={css.slider}
              defaultValue={feedItemsToKeep}
              marks={feedItemsToKeepMarks}
              max={feedItemsToKeepMax}
              min={feedItemsToKeepMin}
              step={feedItemsToKeepStep}
              onChange={(val) => {
                setFeedItemsToKeep(val)
                dispatch(editApp({ feedItemsToKeep: val }))
              }}
            />
          </div>
        </div>

        <div className={css.row}>
          <label htmlFor="corsProxyInput">CORS proxy</label>
          <input
            disabled={apiPresent}
            id="corsProxyInput"
            onChange={(ev) => {
              const val = ev.currentTarget.value.trim()
              setCorsProxy(val)
              dispatch(editApp({ corsProxy: val }))
            }}
            type="text"
            value={corsProxy}
          />
        </div>
      </form>
    </>
  )
}

export default AppSettings
