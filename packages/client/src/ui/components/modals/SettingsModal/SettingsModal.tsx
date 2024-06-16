import { Fieldset, Group, Slider, Stack, Switch, Text } from '@mantine/core'
import { IconHelpCircle, IconSettings } from '@tabler/icons-react'
import { throttle } from 'lodash-es'
import { useEffect, useState } from 'react'
import type { MantineSpacing, StyleProp } from '@mantine/core'
import type { ReactNode } from 'react'

import {
  FETCH_INTERVAL_MAX,
  FETCH_INTERVAL_MIN,
  ITEMS_TO_KEEP_MAX,
  ITEMS_TO_KEEP_MIN,
  LIGHTNESS_MAX,
  LIGHTNESS_MIN,
  SATURATION_MAX,
  SATURATION_MIN,
} from '#constants'
import { updateSettings as updateSettingsAction } from '#store/slices/settings/actions'
import selectSettings from '#store/slices/settings/selectors'
import ModalInner from '#ui/components/common/ModalInner'
import Tooltip from '#ui/components/common/Tooltip'
import { useDispatch, useSelector } from '#ui/hooks/store'
import type { Settings } from '#types/types'

import ColorSchemeModeChooser from './ColorSchemeModeChooser'

import classes from './SettingsModal.module.css'

const formatPercent = (value: number) => `${value} %`

function Label({ children, help, mb = 'xs', rightSection }: LabelProps) {
  const helpButton = help ? (
    <Tooltip label={help}>
      <IconHelpCircle className={classes.icon} />
    </Tooltip>
  ) : null

  const rightContent = rightSection ? (
    <>
      <span style={{ flexGrow: 1 }} />
      {rightSection}
    </>
  ) : null

  return (
    <Text className={classes.label} fw={500} mb={mb}>
      {children}
      {helpButton}
      {rightContent}
    </Text>
  )
}

interface LabelProps {
  children: string
  help?: string
  mb?: StyleProp<MantineSpacing>
  rightSection?: ReactNode
}

function Value({ children }: ValueProps) {
  return (
    <Text component="span" fw={500} size="sm">
      {children}
    </Text>
  )
}

interface ValueProps {
  children: string
}

function SettingsModal() {
  const dispatch = useDispatch()
  const settings = useSelector(selectSettings)

  const [saturation, setSaturation] = useState(settings.saturation)
  const [lightness, setLightness] = useState(settings.lightness)
  const [fetchInterval, setFetchInterval] = useState(settings.fetchInterval)
  const [itemsToKeep, setItemsToKeep] = useState(settings.itemsToKeep)

  const updateSettings = throttle(
    (update: Partial<Settings>) => dispatch(updateSettingsAction(update)),
    500
  )

  useEffect(() => {
    setLightness(settings.lightness)
  }, [settings.lightness])

  return (
    <ModalInner icon={<IconSettings />} title="Settings">
      <Fieldset mb="md" legend="Appearance" variant="filled">
        <Stack gap="lg">
          <div>
            <Label>Color scheme</Label>
            <ColorSchemeModeChooser />
          </div>
          <Group justify="space-between">
            <Label help="Specify a custom color for each tab." mb={0}>
              Enable Tab Colors
            </Label>
            <Switch
              checked={settings.tabColors}
              onLabel="ON"
              offLabel="OFF"
              onChange={(event) =>
                dispatch(updateSettings({ tabColors: event.currentTarget.checked }))
              }
              size="lg"
            />
          </Group>
          <div>
            <Label
              help="Set the global saturation for all tab colors."
              rightSection={<Value>{formatPercent(saturation)}</Value>}
            >
              Saturation
            </Label>
            <Slider
              disabled={!settings.tabColors}
              marks={[
                { value: SATURATION_MIN, label: `${SATURATION_MIN} %` },
                { value: 50, label: '50 %' },
                { value: SATURATION_MAX, label: `${SATURATION_MAX} %` },
              ]}
              mb="lg"
              min={SATURATION_MIN}
              max={SATURATION_MAX}
              label={null}
              onChange={(value) => {
                setSaturation(value)
                updateSettings({ saturation: value })
              }}
              value={saturation}
            />
          </div>
          <div>
            <Label
              help="Set the global lightness for all tab colors."
              rightSection={<Value>{formatPercent(lightness)}</Value>}
            >
              Lightness
            </Label>
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
                updateSettings({ lightness: value })
              }}
              value={lightness}
            />
          </div>
        </Stack>
      </Fieldset>
      <Fieldset legend="Feeds" variant="filled">
        <Stack gap="lg">
          <div>
            <Label
              help="Interval at which feeds are checked."
              rightSection={<Value>{`${fetchInterval} min`}</Value>}
            >
              Fetch Interval
            </Label>
            <Slider
              marks={[
                { value: 5, label: '5 min' },
                { value: 30, label: '30 min' },
                { value: 60, label: '1 h' },
              ]}
              mb="lg"
              min={FETCH_INTERVAL_MIN}
              max={FETCH_INTERVAL_MAX}
              step={5}
              label={null}
              onChange={(value) => {
                setFetchInterval(value)
                updateSettings({ fetchInterval: value })
              }}
              value={fetchInterval}
            />
          </div>
          <div>
            <Label
              help="Maximum number of items to keep per feed."
              rightSection={<Value>{String(itemsToKeep)}</Value>}
            >
              Items to Keep per Feed
            </Label>
            <Slider
              marks={[
                { value: 10, label: '10' },
                { value: 100, label: '100' },
                { value: 200, label: '200' },
              ]}
              mb="lg"
              min={ITEMS_TO_KEEP_MIN}
              max={ITEMS_TO_KEEP_MAX}
              step={10}
              label={null}
              onChange={(value) => {
                setItemsToKeep(value)
                updateSettings({ itemsToKeep: value })
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
