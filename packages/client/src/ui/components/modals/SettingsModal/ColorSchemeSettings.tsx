import { SegmentedControl, useMantineColorScheme } from '@mantine/core'
import { IconDeviceDesktop, IconMoonStars, IconSun } from '@tabler/icons-react'

import { isColorScheme } from '#types/typeGuards'
import InputWrapper from '#ui/components/common/InputWrapper/InputWrapper'

import Label from './Label'

const data = [
  {
    label: <Label icon={IconDeviceDesktop} text="Auto" />,
    value: 'auto',
  },
  {
    label: <Label icon={IconSun} text="Light" />,
    value: 'light',
  },
  {
    label: <Label icon={IconMoonStars} text="Dark" />,
    value: 'dark',
  },
]

function ColorSchemeSettings() {
  const { setColorScheme, colorScheme } = useMantineColorScheme()

  const onChange = (value: string) => {
    if (isColorScheme(value)) {
      setColorScheme(value)
    }
  }

  return (
    <InputWrapper label="Color Scheme">
      <SegmentedControl data={data} fullWidth onChange={onChange} value={colorScheme} />
    </InputWrapper>
  )
}

export default ColorSchemeSettings
