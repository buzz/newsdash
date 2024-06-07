import { ActionIcon, Box, ColorInput, TextInput, Title, useMantineTheme } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconRefresh, IconRss } from '@tabler/icons-react'

import { editTab, removeTab } from '#store/slices/layout/entities/tabs/actions'
import Tooltip from '#ui/components/common/Tooltip'
import { useDispatch } from '#ui/hooks/store'
import type { TabEditMode } from '#types/layout'

import ButtonGroup from './ButtonGroup'
import { isValidUrl, randomColor } from './utils'

import classes from './EditFeedForm.module.css'

function EditFeedForm({ id, mode }: EditFeedFormProps) {
  const dispatch = useDispatch()
  const theme = useMantineTheme()
  const swatchColors = Object.values(theme.colors).map((color) => color[6])

  const form = useForm({
    initialValues: {
      url: '',
      customTitle: '',
      color: randomColor(),
    },

    validate: {
      url: isValidUrl,
    },
  })

  const handleCancel = () => {
    dispatch(mode === 'create' ? removeTab(id) : editTab({ id, changes: { editMode: 'off' } }))
  }

  const handleSubmit = () => {
    dispatch(editTab({ id, changes: { editMode: 'off' } }))
  }

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.content}>
        <Title className={classes.title} order={2}>
          <IconRss />
          {mode === 'create' ? 'New feed' : 'Edit feed'}
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput label="URL" required {...form.getInputProps('url')} />
          <TextInput label="Custom title" mt="sm" {...form.getInputProps('customTitle')} />
          <ColorInput
            format="hex"
            label="Color"
            mt="sm"
            swatches={swatchColors}
            swatchesPerRow={7}
            rightSection={
              <Tooltip label="Random color">
                <ActionIcon
                  onClick={() => {
                    form.setFieldValue('color', randomColor())
                  }}
                >
                  <IconRefresh size="1rem" />
                </ActionIcon>
              </Tooltip>
            }
            {...form.getInputProps('color')}
          />
          <ButtonGroup mode={mode} onCancel={handleCancel} />
        </form>
      </Box>
    </Box>
  )
}

interface EditFeedFormProps {
  id: string
  mode: Exclude<TabEditMode, 'off'>
}

export default EditFeedForm
