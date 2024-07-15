import { Slider } from '@mantine/core'
import { useState } from 'react'

import {
  FETCH_INTERVAL_MAX,
  FETCH_INTERVAL_MIN,
  ITEMS_TO_KEEP_MAX,
  ITEMS_TO_KEEP_MIN,
} from '#constants'
import InputWrapper from '#ui/components/common/InputWrapper/InputWrapper'

import type { SettingsProps } from './types'

function FeedSettings({ settings, throttledUpdateSettings }: SettingsProps) {
  const [fetchInterval, setFetchInterval] = useState(settings.fetchInterval)
  const [itemsToKeep, setItemsToKeep] = useState(settings.itemsToKeep)

  return (
    <>
      <InputWrapper
        help="Interval at which feeds are checked."
        label="Fetch Interval"
        rightSection={`${fetchInterval} min`}
      >
        <Slider
          marks={[
            { value: 5, label: '5' },
            { value: 30, label: '30' },
            { value: 60, label: '60' },
          ]}
          mb="lg"
          min={FETCH_INTERVAL_MIN}
          max={FETCH_INTERVAL_MAX}
          step={5}
          label={null}
          onChange={(value) => {
            setFetchInterval(value)
            throttledUpdateSettings({ fetchInterval: value })
          }}
          value={fetchInterval}
        />
      </InputWrapper>
      <InputWrapper
        help="Maximum number of items to keep per feed."
        label="Number of feed items"
        rightSection={String(itemsToKeep)}
      >
        <Slider
          marks={[
            { value: 10, label: '10' },
            { value: 100, label: '100' },
            { value: 250, label: '250' },
            { value: 500, label: '500' },
            { value: 750, label: '750' },
            { value: 1000, label: '1k' },
          ]}
          mb="lg"
          min={ITEMS_TO_KEEP_MIN}
          max={ITEMS_TO_KEEP_MAX}
          step={10}
          label={null}
          onChange={(value) => {
            setItemsToKeep(value)
            throttledUpdateSettings({ itemsToKeep: value })
          }}
          value={itemsToKeep}
        />
      </InputWrapper>
    </>
  )
}

export default FeedSettings
