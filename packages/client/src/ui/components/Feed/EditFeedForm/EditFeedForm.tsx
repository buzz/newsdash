import { ActionIcon, Box, ColorInput, TextInput, Title, useMantineTheme } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconRefresh, IconRss } from '@tabler/icons-react'

import { editTab, removeTab } from '#store/slices/layout/entities/tabs/actions'
import Tooltip from '#ui/components/common/Tooltip'
import { useDispatch } from '#ui/hooks/store'
import { isValidUrl, randomColor } from '#utils'
import type { CustomTabData, TabEditMode } from '#types/layout'

import ButtonGroup from './ButtonGroup'

import classes from './EditFeedForm.module.css'

function EditFeedForm({ tab, mode }: EditFeedFormProps) {
  const dispatch = useDispatch()
  const theme = useMantineTheme()
  const swatchColors = Object.values(theme.colors).map((color) => color[6])

  const initialValues =
    mode === 'create'
      ? {
          url: '',
          customTitle: '',
          color: randomColor(),
        }
      : {
          url: tab.url,
          customTitle: tab.customTitle,
          color: tab.color,
        }

  const form = useForm({
    initialValues,

    validate: {
      url: isValidUrl,
    },
  })

  const handleCancel = () => {
    if (tab.id) {
      dispatch(
        mode === 'create'
          ? removeTab(tab.id)
          : editTab({ id: tab.id, changes: { editMode: undefined } })
      )
    }
  }

  const handleSubmit = form.onSubmit((values) => {
    if (tab.id) {
      console.log(values)
      dispatch(editTab({ id: tab.id, changes: { ...values, editMode: undefined } }))
    }
  })

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.content}>
        <Title className={classes.title} order={2}>
          <IconRss />
          {mode === 'create' ? 'New feed' : 'Edit feed'}
        </Title>
        <form onSubmit={handleSubmit}>
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
  tab: CustomTabData
  mode: TabEditMode
}

export default EditFeedForm
