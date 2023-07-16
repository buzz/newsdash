import { Box, Center, SegmentedControl } from '@mantine/core'
import { type Icon, IconDeviceDesktop, IconMoonStars, IconSun } from '@tabler/icons-react'

import { changeColorSchemeMode } from '#store/slices/settings/actions'
import { selectColorSchemeMode } from '#store/slices/settings/selectors'
import { isColorSchemeMode } from '#types/typeGuards'
import { useDispatch, useSelector } from '#ui/hooks/store'

const data = [
  {
    label: <Label icon={IconDeviceDesktop} text="System" />,
    value: 'system',
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
  const dispatch = useDispatch()
  const colorSchemeMode = useSelector(selectColorSchemeMode)

  const handleChange = (value: string) => {
    if (isColorSchemeMode(value)) {
      dispatch(changeColorSchemeMode(value))
    }
  }

  return <SegmentedControl data={data} fullWidth onChange={handleChange} value={colorSchemeMode} />
}

export default ColorSchemeModeChooser
