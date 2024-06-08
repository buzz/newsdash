import { Button, Group } from '@mantine/core'
import { IconArrowBack, IconEdit, IconPlus } from '@tabler/icons-react'

import type { TabEditMode } from '#types/layout'

function ButtonGroup({ mode, onCancel }: ButtonGroupProps) {
  return (
    <Group mt="xl" justify="flex-end">
      <Button color="red" leftSection={<IconArrowBack />} onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" leftSection={mode === 'create' ? <IconPlus /> : <IconEdit />}>
        {mode === 'create' ? 'Create' : 'Save'}
      </Button>
    </Group>
  )
}

interface ButtonGroupProps {
  mode: TabEditMode
  onCancel: () => void
}

export default ButtonGroup
