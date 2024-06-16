import {
  ActionIcon,
  Box,
  Button,
  Group,
  HueSlider,
  InputLabel,
  Stack,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconPalette, IconX } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import tinycolor from 'tinycolor2'

import type { Tab } from '@newsdash/schema'

import { editTab, removeTab } from '#store/slices/layout/entities/tabs/actions'
import selectSettings from '#store/slices/settings/selectors'
import Tooltip from '#ui/components/common/Tooltip'
import FeedIcon from '#ui/components/Feed/FeedIcon/FeedIcon'
import { useDispatch, useSelector } from '#ui/hooks/store'
import { getRandomHue, isValidUrl } from '#utils'
import type { TabEditMode } from '#types/layout'

import ButtonGroup from './ButtonGroup'

import classes from './EditFeedForm.module.css'

const COLOR_NAMES = [
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'teal',
  'cyan',
  'blue',
  'indigo',
  'violet',
  'grape',
  'pink',
]

function EditFeedForm({ tab, mode }: EditFeedFormProps) {
  const dispatch = useDispatch()
  const [origHue, setOrigHue] = useState<number | undefined>()
  const { tabColors } = useSelector(selectSettings)
  const theme = useMantineTheme()

  // Remember original hue value for edit mode in case of cancel
  useEffect(() => {
    if (mode === 'edit' && origHue === undefined) {
      setOrigHue(tab.hue)
    }
  }, [mode, origHue, tab.hue])

  const initialValues =
    mode === 'create'
      ? {
          customTitle: '',
          hue: tab.hue,
          url: '',
        }
      : {
          customTitle: tab.customTitle ?? '',
          hue: tab.hue,
          url: tab.url,
        }

  const form = useForm({
    initialValues,

    validate: {
      url: isValidUrl,
    },
  })

  const onCancel = () => {
    if (tab.id) {
      dispatch(
        mode === 'create'
          ? removeTab(tab.id)
          : editTab({ id: tab.id, changes: { editMode: undefined, hue: origHue } })
      )
    }
  }

  const onDelete = () => {
    if (tab.id) {
      dispatch(removeTab(tab.id))
    }
  }

  const onSubmit = form.onSubmit((values) => {
    if (tab.id) {
      dispatch(editTab({ id: tab.id, changes: { ...values, editMode: undefined } }))
    }
  })

  const onHueChange = (value: number) => {
    form.setFieldValue('hue', value)
    if (tab.id) {
      dispatch(editTab({ id: tab.id, changes: { hue: value } }))
    }
  }

  const customTitleClearDisabled = form.getValues().customTitle === ''

  const swatches = COLOR_NAMES.map((colorName) => {
    const color = theme.colors[colorName][6]
    const colorNameUpper = colorName[0].toUpperCase() + colorName.slice(1)

    return (
      <Tooltip label={colorNameUpper} key={colorName}>
        <Button
          aria-label={colorNameUpper}
          className={classes.colorSwatch}
          component="button"
          color={color}
          onClick={(event) => {
            event.preventDefault()
            onHueChange(tinycolor(color).toHsl().h)
          }}
          size="xs"
          style={{ backgroundColor: color }}
        />
      </Tooltip>
    )
  })

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.content}>
        <Title className={classes.title} order={2}>
          <FeedIcon tab={tab} />
          {mode === 'create' ? 'Add Feed' : 'Feed Settings'}
        </Title>
        <form onSubmit={onSubmit}>
          <TextInput label="URL" required {...form.getInputProps('url')} />
          <TextInput
            label="Custom title"
            mt="sm"
            placeholder={tab.title}
            rightSection={
              <Tooltip disabled={customTitleClearDisabled} label="Clear">
                <ActionIcon
                  color="red"
                  disabled={customTitleClearDisabled}
                  onClick={() => {
                    form.setFieldValue('customTitle', '')
                  }}
                  variant="subtle"
                >
                  <IconX size="1rem" />
                </ActionIcon>
              </Tooltip>
            }
            {...form.getInputProps('customTitle')}
          />
          <Stack gap={0} mt="sm">
            <InputLabel>Color</InputLabel>
            <Group gap="xs">
              <HueSlider
                className="foobar"
                size="xl"
                value={tab.hue}
                {...form.getInputProps('hue')}
                onChange={onHueChange}
              />
              <Tooltip disabled={!tabColors} label="Random color">
                <ActionIcon
                  disabled={!tabColors}
                  onClick={() => {
                    onHueChange(getRandomHue())
                  }}
                  variant="subtle"
                >
                  <IconPalette size="1rem" />
                </ActionIcon>
              </Tooltip>
            </Group>
            <Button.Group mt="xs">{swatches}</Button.Group>
          </Stack>
          <ButtonGroup mode={mode} onCancel={onCancel} onDelete={onDelete} />
        </form>
      </Box>
    </Box>
  )
}

interface EditFeedFormProps {
  tab: Tab
  mode: TabEditMode
}

export default EditFeedForm
