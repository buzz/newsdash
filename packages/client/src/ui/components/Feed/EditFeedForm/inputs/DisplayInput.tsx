import { CheckIcon, Combobox, Group, InputBase, Slider, Switch, useCombobox } from '@mantine/core'
import {
  IconBaselineDensityMedium,
  IconBaselineDensitySmall,
  IconLayoutGrid,
  IconListDetails,
} from '@tabler/icons-react'
import type { ReactNode } from 'react'

import { type Display, layout } from '@newsdash/common/schema'

import { MAX_COLUMN_WIDTH_MAX, MAX_COLUMN_WIDTH_MIN } from '#constants'
import InputWrapper from '#ui/components/common/InputWrapper/InputWrapper'
import type { InputProps } from '#ui/components/Feed/EditFeedForm/types'

import classes from '#ui/components/Feed/EditFeedForm/EditFeedForm.module.css'

function OptionLabel({ active = false, children, icon }: OptionLabelProps) {
  return (
    <Group className={classes.option}>
      {icon}
      <span className={classes.label}>{children}</span>
      {active && <CheckIcon size={12} />}
    </Group>
  )
}

interface OptionLabelProps {
  active?: boolean
  children: string
  icon: ReactNode
}

const displayOptions: Record<Display, { icon: ReactNode; label: string }> = {
  condensedList: {
    icon: <IconBaselineDensitySmall />,
    label: 'List (condensed)',
  },
  list: {
    icon: <IconBaselineDensityMedium />,
    label: 'List',
  },
  detailed: {
    icon: <IconListDetails />,
    label: 'Detailed',
  },
  tiles: {
    icon: <IconLayoutGrid />,
    label: 'Tiles',
  },
}

function DisplayCombobox({ onChange, value }: DisplayComboboxProps) {
  const comboboxStore = useCombobox({
    onDropdownClose: () => {
      comboboxStore.resetSelectedOption()
    },
  })

  const options = Object.entries(displayOptions).map(([key, { label, icon }]) => (
    <Combobox.Option active={key === value} value={key} key={key}>
      <OptionLabel active={key === value} icon={icon}>
        {label}
      </OptionLabel>
    </Combobox.Option>
  ))

  const { icon, label } = displayOptions[value]

  return (
    <Combobox
      store={comboboxStore}
      onOptionSubmit={(val: string) => {
        onChange(layout.displaySchema.parse(val))
        comboboxStore.closeDropdown()
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => {
            comboboxStore.toggleDropdown()
          }}
        >
          <OptionLabel icon={icon}>{label}</OptionLabel>
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}

interface DisplayComboboxProps {
  onChange: (value: Display) => void
  value: Display
}

const maxColumnWidthMid = (MAX_COLUMN_WIDTH_MIN + MAX_COLUMN_WIDTH_MAX) / 2

function DisplayInput({ form }: InputProps) {
  return (
    <>
      <InputWrapper label="Display">
        <DisplayCombobox
          onChange={(value) => {
            form.setFieldValue('display', value)
          }}
          value={form.getValues().display}
        />
      </InputWrapper>
      <InputWrapper
        help="Displays feed items in a grid."
        label="Enable Grid View"
        show={form.values.display !== 'tiles'}
        rightSection={
          <Switch
            checked={form.values.gridView}
            onLabel="ON"
            offLabel="OFF"
            onChange={(event) => {
              form.setFieldValue('gridView', event.currentTarget.checked)
            }}
            size="lg"
          />
        }
      />
      <InputWrapper
        label="Maximum Column Width"
        rightSection={`${form.values.maxColumnWidth} Pixel`}
        show={form.values.display !== 'tiles'}
      >
        <Slider
          disabled={!form.values.gridView || form.values.display === 'tiles'}
          marks={[
            { value: MAX_COLUMN_WIDTH_MIN, label: MAX_COLUMN_WIDTH_MIN },
            { value: maxColumnWidthMid, label: maxColumnWidthMid },
            { value: MAX_COLUMN_WIDTH_MAX, label: MAX_COLUMN_WIDTH_MAX },
          ]}
          mb="lg"
          min={MAX_COLUMN_WIDTH_MIN}
          max={MAX_COLUMN_WIDTH_MAX}
          step={10}
          px={18}
          label={null}
          onChange={(value) => {
            form.setFieldValue('maxColumnWidth', value)
          }}
          value={form.values.maxColumnWidth}
        />
      </InputWrapper>
    </>
  )
}

export default DisplayInput
