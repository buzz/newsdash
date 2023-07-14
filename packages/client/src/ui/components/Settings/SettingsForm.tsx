import { Button, Group, Input } from '@mantine/core'
import { IconX } from '@tabler/icons-react'

import { changeSettingsModalOpened } from '#store/slices/appSlice'
import { useDispatch } from '#ui/hooks/store'

import ColorSchemeModeChooser from './ColorSchemeModeChooser'

function SettingsForm() {
  const dispatch = useDispatch()

  return (
    <form>
      <Input.Label mt="md">Color scheme</Input.Label>
      <ColorSchemeModeChooser />

      <Group position="right" mt="md">
        <Button leftIcon={<IconX />} onClick={() => dispatch(changeSettingsModalOpened(false))}>
          Close
        </Button>
      </Group>
    </form>
  )
}

export default SettingsForm
