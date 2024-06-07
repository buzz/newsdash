import { Button, Group } from '@mantine/core'
import { IconArrowBack, IconEdit, IconPlus } from '@tabler/icons-react'

import type { TabEditMode } from '#types/layout'

function ButtonGroup({ mode, onCancel }: ButtonGroupProps) {
  return (
    <Group mt="xl" position="right">
      <Button color="red" leftIcon={<IconArrowBack />} onClick={onCancel}>
        Cancel
      </Button>
      <Button leftIcon={mode === 'create' ? <IconPlus /> : <IconEdit />}>
        {mode === 'create' ? 'Create' : 'Save'}
      </Button>
    </Group>
  )
}

interface ButtonGroupProps {
  mode: Exclude<TabEditMode, 'off'>
  onCancel: () => void
}

export default ButtonGroup
