import {
  ActionIcon,
  Box,
  Button,
  ColorInput,
  Group,
  TextInput,
  useMantineTheme,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconPlus, IconRefresh } from '@tabler/icons-react'

import { addTab } from '#store/slices/layout/entities/tabs/actions'
import Tooltip from '#ui/components/common/Tooltip'
import { useDispatch } from '#ui/hooks/store'

function isValidUrl(urlString: string) {
  try {
    const url = new URL(urlString)
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return null
    }
  } catch {}
  return 'Invalid URL'
}

const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`

function AddFeedForm() {
  const dispatch = useDispatch()
  const theme = useMantineTheme()
  const swatchColors = Object.values(theme.colors).map((c) => c[6])

  const form = useForm({
    initialValues: {
      url: '',
      customTitle: '',
      color: '',
    },

    validate: {
      url: isValidUrl,
    },
  })

  return (
    <Box maw={640} mx="auto">
      <form onSubmit={form.onSubmit((values) => dispatch(addTab()))}>
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
              <ActionIcon onClick={() => form.setFieldValue('color', randomColor())}>
                <IconRefresh size="1rem" />
              </ActionIcon>
            </Tooltip>
          }
          {...form.getInputProps('color')}
        />
        {/* <ColorPicker mt="md" /> */}
        <Group mt="md" position="right">
          <Button leftIcon={<IconPlus />} type="submit">
            Add
          </Button>
        </Group>
      </form>
    </Box>
  )
}

export default AddFeedForm
