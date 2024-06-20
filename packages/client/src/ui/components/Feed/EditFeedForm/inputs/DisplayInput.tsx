import {
  CheckIcon,
  Combobox,
  Group,
  InputBase,
  InputLabel,
  InputWrapper,
  useCombobox,
} from '@mantine/core'
import {
  IconBaselineDensityMedium,
  IconBaselineDensitySmall,
  IconLayoutGrid,
  IconListDetails,
} from '@tabler/icons-react'
import type { ReactNode } from 'react'

import { type Display, layout } from '@newsdash/schema'

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

function DisplayInput({ form }: InputProps) {
  return (
    <InputWrapper mt="sm">
      <InputLabel>Display</InputLabel>
      <DisplayCombobox
        onChange={(value) => {
          form.setFieldValue('display', value)
        }}
        value={form.getValues().display}
      />
    </InputWrapper>
  )
}

export default DisplayInput
