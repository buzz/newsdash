import { Button, Group } from '@mantine/core'
import { IconArrowBack, IconDeviceFloppy, IconPlus, IconTrash } from '@tabler/icons-react'

import type { TabEditMode } from '#types/layout'

function ButtonGroup({ mode, onCancel, onDelete }: ButtonGroupProps) {
  const deleteButton = mode === 'edit' && (
    <Button color="red" flex="1" leftSection={<IconTrash />} onClick={onDelete}>
      Delete
    </Button>
  )

  const confirmButton = (
    <Button
      color="green"
      flex="1"
      fullWidth={mode === 'edit'}
      leftSection={mode === 'new' ? <IconPlus /> : <IconDeviceFloppy />}
      mt={mode === 'edit' ? 'md' : undefined}
      type="submit"
    >
      {mode === 'new' ? 'Create' : 'Save'}
    </Button>
  )

  return (
    <div>
      <Group justify="center" wrap="nowrap">
        <Button flex="1" leftSection={<IconArrowBack />} onClick={onCancel}>
          Cancel
        </Button>
        {deleteButton}
        {mode === 'new' && confirmButton}
      </Group>
      {mode === 'edit' && confirmButton}
    </div>
  )
}

interface ButtonGroupProps {
  mode: TabEditMode
  onCancel: () => void
  onDelete: () => void
}

export default ButtonGroup
