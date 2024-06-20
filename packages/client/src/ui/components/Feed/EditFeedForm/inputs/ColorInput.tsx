import { ActionIcon, Button, Group, HueSlider, useMantineTheme } from '@mantine/core'
import { IconPalette } from '@tabler/icons-react'
import tinycolor from 'tinycolor2'

import InputWrapper from '#ui/components/common/InputWrapper/InputWrapper'
import Tooltip from '#ui/components/common/Tooltip'
import { getRandomHue } from '#utils'
import type { InputProps } from '#ui/components/Feed/EditFeedForm/types'

import classes from '#ui/components/Feed/EditFeedForm/EditFeedForm.module.css'

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

function ColorSwatches({ form }: InputProps) {
  const theme = useMantineTheme()

  return COLOR_NAMES.map((colorName) => {
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
            form.setFieldValue('hue', tinycolor(color).toHsl().h)
          }}
          size="xs"
        />
      </Tooltip>
    )
  })
}

function ColorInput({ disabled, form }: ColorInputProps) {
  return (
    <InputWrapper label="Color">
      <Group gap="xs">
        <HueSlider
          className="foobar"
          size="xl"
          value={form.values.hue}
          {...form.getInputProps('hue')}
          onChange={(value) => {
            form.setFieldValue('hue', value)
          }}
        />
        <Tooltip disabled={disabled} label="Random color">
          <ActionIcon
            disabled={disabled}
            onClick={() => {
              form.setFieldValue('hue', getRandomHue())
            }}
            variant="subtle"
          >
            <IconPalette size="1rem" />
          </ActionIcon>
        </Tooltip>
      </Group>
      <Button.Group mt="xs">
        <ColorSwatches form={form} />
      </Button.Group>
    </InputWrapper>
  )
}

interface ColorInputProps extends InputProps {
  disabled: boolean
}

export default ColorInput
