import { Box, Center, SegmentedControl, useMantineColorScheme } from '@mantine/core'
import { type Icon, IconDeviceDesktop, IconMoonStars, IconSun } from '@tabler/icons-react'

import { isColorScheme } from '#types/typeGuards'

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

function Label({ icon: Icon, text }: LabelProps) {
  return (
    <Center>
      <Icon size="1rem" />
      <Box ml={10}>{text}</Box>
    </Center>
  )
}

interface LabelProps {
  icon: Icon
  text: string
}

function ColorSchemeModeChooser() {
  const { setColorScheme, colorScheme } = useMantineColorScheme()

  const handleChange = (value: string) => {
    if (isColorScheme(value)) {
      setColorScheme(value)
    }
  }

  return <SegmentedControl data={data} fullWidth onChange={handleChange} value={colorScheme} />
}

export default ColorSchemeModeChooser
