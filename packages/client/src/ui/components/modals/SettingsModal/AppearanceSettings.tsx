import { Switch } from '@mantine/core'

import InputWrapper from '#ui/components/common/InputWrapper/InputWrapper'

import type { SettingsProps } from './types'

function AppearanceSettings({ settings, throttledUpdateSettings }: SettingsProps) {
  return (
    <>
      <InputWrapper
        help="Show animation effect when switching tabs."
        label="Tab Animations"
        rightSection={
          <Switch
            checked={settings.slideAnimation}
            onLabel="ON"
            offLabel="OFF"
            onChange={(event) => {
              throttledUpdateSettings({ slideAnimation: event.currentTarget.checked })
            }}
            size="lg"
          />
        }
      />
      <InputWrapper
        help="Show feed item count in tab header."
        label="Item count"
        rightSection={
          <Switch
            checked={settings.itemCount}
            onLabel="ON"
            offLabel="OFF"
            onChange={(event) => {
              throttledUpdateSettings({ itemCount: event.currentTarget.checked })
            }}
            size="lg"
          />
        }
      />
    </>
  )
}

export default AppearanceSettings
