import { SegmentedControl, useMantineColorScheme } from '@mantine/core'
import { IconDeviceDesktop, IconMoonStars, IconSun } from '@tabler/icons-react'

import { isColorScheme } from '#types/typeGuards'

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

function ColorSchemeModeChooser() {
  const { setColorScheme, colorScheme } = useMantineColorScheme()

  const onChange = (value: string) => {
    if (isColorScheme(value)) {
      setColorScheme(value)
    }
  }

  return <SegmentedControl data={data} fullWidth onChange={onChange} value={colorScheme} />
}

export default ColorSchemeModeChooser
