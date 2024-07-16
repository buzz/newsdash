import { Switch } from '@mantine/core'

import InputWrapper from '#ui/components/common/InputWrapper/InputWrapper'

import type { SettingsProps } from './types'

function SlideAnimationSettings({ settings, throttledUpdateSettings }: SettingsProps) {
  return (
    <InputWrapper
      help="Show animation effect when switch tabs."
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
  )
}

export default SlideAnimationSettings
