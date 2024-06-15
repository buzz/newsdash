import { Fieldset, Slider, Stack, Text } from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'
import { useState } from 'react'

import { updateSettings } from '#store/slices/settings/actions'
import selectSettings from '#store/slices/settings/selectors'
import ModalInner from '#ui/components/common/ModalInner'
import { useDispatch, useSelector } from '#ui/hooks/store'

import ColorSchemeModeChooser from './ColorSchemeModeChooser'

const marksPercent = [
  { value: 0, label: '0%' },
  { value: 50, label: '50%' },
  { value: 100, label: '100%' },
]

const formatPercent = (value: number) => `${value} %`

function SettingsModal() {
  const dispatch = useDispatch()
  const settings = useSelector(selectSettings)

  const [saturation, setSaturation] = useState(settings.saturation)
  const [lightness, setLightness] = useState(settings.lightness)
  const [fetchInterval, setFetchInterval] = useState(settings.fetchInterval)
  const [itemsToKeep, setItemsToKeep] = useState(settings.itemsToKeep)

  return (
    <ModalInner icon={<IconSettings />} title="Settings">
      <Fieldset mb="md" legend="Appearance" variant="filled">
        <Stack>
          <div>
            <Text fw={500}>Color scheme</Text>
            <ColorSchemeModeChooser />
          </div>
          <div>
            <Text fw={500}>Saturation</Text>
            <Slider
              marks={marksPercent}
              mb="lg"
              label={formatPercent}
              onChange={setSaturation}
              onChangeEnd={(value) => {
                setSaturation(value)
                dispatch(updateSettings({ saturation: value }))
              }}
              value={saturation}
            />
          </div>
          <div>
            <Text fw={500}>Lightness</Text>
            <Slider
              marks={marksPercent}
              mb="lg"
              label={formatPercent}
              onChange={setLightness}
              onChangeEnd={(value) => {
                setLightness(value)
                dispatch(updateSettings({ lightness: value }))
              }}
              value={lightness}
            />
          </div>
        </Stack>
      </Fieldset>
      <Fieldset legend="Feeds" variant="filled">
        <Stack>
          <div>
            <Text fw={500}>Fetch interval</Text>
            <Slider
              marks={[
                { value: 5, label: '5 min' },
                { value: 30, label: '30 min' },
                { value: 60, label: '1 h' },
              ]}
              mb="lg"
              min={5}
              max={60}
              step={5}
              onChange={setFetchInterval}
              onChangeEnd={(value) => {
                setFetchInterval(value)
                dispatch(updateSettings({ fetchInterval: value }))
              }}
              value={fetchInterval}
            />
          </div>
          <div>
            <Text fw={500}>Items to keep per feed</Text>
            <Slider
              marks={[
                { value: 10, label: '10' },
                { value: 100, label: '100' },
                { value: 200, label: '200' },
              ]}
              mb="lg"
              min={10}
              max={200}
              step={10}
              onChange={setItemsToKeep}
              onChangeEnd={(value) => {
                setItemsToKeep(value)
                dispatch(updateSettings({ itemsToKeep: value }))
              }}
              value={itemsToKeep}
            />
          </div>
        </Stack>
      </Fieldset>
    </ModalInner>
  )
}

export default SettingsModal
