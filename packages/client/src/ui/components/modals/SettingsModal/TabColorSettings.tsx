import { Collapse, Slider, Switch } from '@mantine/core'
import { useEffect, useState } from 'react'

import { LIGHTNESS_MAX, LIGHTNESS_MIN, SATURATION_MAX, SATURATION_MIN } from '#constants'
import InputWrapper from '#ui/components/common/InputWrapper/InputWrapper'

import type { SettingsProps } from './types'

const formatPercent = (value: number) => `${value} %`

function TabColorSettings({ settings, throttledUpdateSettings }: SettingsProps) {
  const [saturation, setSaturation] = useState(settings.saturation)
  const [lightness, setLightness] = useState(settings.lightness)

  // Update lightness (color scheme switch changes lightness from outside)
  useEffect(() => {
    setLightness(settings.lightness)
  }, [settings.lightness])

  return (
    <>
      <InputWrapper
        help="Specify a custom color for each tab."
        label="Enable Tab Colors"
        rightSection={
          <Switch
            checked={settings.tabColors}
            onLabel="ON"
            offLabel="OFF"
            onChange={(event) => {
              throttledUpdateSettings({ tabColors: event.currentTarget.checked })
            }}
            size="lg"
          />
        }
      />
      <Collapse in={settings.tabColors} pl="sm">
        <InputWrapper
          help="Set the global saturation for all tab colors."
          label="Saturation"
          rightSection={formatPercent(saturation)}
        >
          <Slider
            disabled={!settings.tabColors}
            marks={[
              { value: SATURATION_MIN, label: `${SATURATION_MIN} %` },
              { value: 50, label: '50 %' },
              { value: SATURATION_MAX, label: `${SATURATION_MAX} %` },
            ]}
            mb="xl"
            min={SATURATION_MIN}
            max={SATURATION_MAX}
            label={null}
            onChange={(value) => {
              setSaturation(value)
              throttledUpdateSettings({ saturation: value })
            }}
            px={18}
            value={saturation}
          />
        </InputWrapper>
        <InputWrapper
          help="Set the global lightness for all tab colors."
          label="Lightness"
          rightSection={formatPercent(lightness)}
        >
          <Slider
            disabled={!settings.tabColors}
            marks={[
              { value: LIGHTNESS_MIN, label: `${LIGHTNESS_MIN} %` },
              { value: 0, label: '0 %' },
              { value: LIGHTNESS_MAX, label: `${LIGHTNESS_MAX} %` },
            ]}
            mb="lg"
            min={LIGHTNESS_MIN}
            max={LIGHTNESS_MAX}
            label={null}
            onChange={(value) => {
              setLightness(value)
              throttledUpdateSettings({ lightness: value })
            }}
            px={18}
            value={lightness}
          />
        </InputWrapper>
      </Collapse>
    </>
  )
}

export default TabColorSettings
