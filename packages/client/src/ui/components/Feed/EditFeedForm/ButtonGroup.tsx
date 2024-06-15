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
      type="submit"
      leftSection={mode === 'create' ? <IconPlus /> : <IconDeviceFloppy />}
    >
      {mode === 'create' ? 'Create' : 'Save'}
    </Button>
  )

  return (
    <>
      <Group mt="xl" mb="md" justify="center" wrap="nowrap">
        <Button flex="1" leftSection={<IconArrowBack />} onClick={onCancel}>
          Cancel
        </Button>
        {deleteButton}
        {mode === 'create' ? confirmButton : null}
      </Group>
      {mode === 'edit' ? confirmButton : null}
    </>
  )
}

interface ButtonGroupProps {
  mode: TabEditMode
  onCancel: () => void
  onDelete: () => void
}

export default ButtonGroup
