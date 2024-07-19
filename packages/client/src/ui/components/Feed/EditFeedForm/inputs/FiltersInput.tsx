import { ActionIcon, Button, Code, Group, Stack, Text, TextInput } from '@mantine/core'
import { useFocusTrap } from '@mantine/hooks'
import { IconFilterPlus, IconTrash } from '@tabler/icons-react'

import InputWrapper from '#ui/components/common/InputWrapper/InputWrapper'
import Tooltip from '#ui/components/common/Tooltip'
import type { InputProps } from '#ui/components/Feed/EditFeedForm/types'

import classes from './FiltersInput.module.css'

function Help() {
  return (
    <>
      Filter the feed list using strings or regular expressions. Items matching a filter will{' '}
      <em>not</em> be displayed. The filter matches the title, teaser text, and link,
      case-insensitively. Filters enclosed in <Code>/</Code> are treated as regular expressions.
    </>
  )
}

function FilterInput({ form, idx }: FilterInputProps) {
  const focusTrapRef = useFocusTrap()

  return (
    <Group gap="xs" align="flex-start">
      <TextInput
        className={classes.filterInput}
        ref={focusTrapRef}
        {...form.getInputProps(`filters.${idx}`)}
      ></TextInput>
      <Tooltip label="Remove Filter">
        <ActionIcon
          color="red"
          onClick={() => {
            form.removeListItem('filters', idx)
          }}
          size="lg"
          variant="subtle"
        >
          <IconTrash className={classes.trashIcon} />
        </ActionIcon>
      </Tooltip>
    </Group>
  )
}

interface FilterInputProps extends InputProps {
  idx: number
}

function FiltersInput({ form }: InputProps) {
  const { filters } = form.getValues()

  const handleNewFilterClick = () => {
    form.insertListItem('filters', '')
  }

  const formError = form.getInputProps('filters').error as unknown
  const error = typeof formError === 'string' ? formError : undefined

  const filterInputs =
    filters.length > 0 ? (
      filters.map((filter, idx) => <FilterInput form={form} idx={idx} key={String(idx)} />)
    ) : (
      <Text c="dimmed" size="sm" ta="center">
        - No filters -
      </Text>
    )

  return (
    <InputWrapper error={error} help={<Help />} label="Manage Filters">
      <Stack gap="xs">
        {filterInputs}
        <Button
          color=""
          leftSection={<IconFilterPlus />}
          onClick={handleNewFilterClick}
          variant="subtle"
        >
          Add Filter
        </Button>
      </Stack>
    </InputWrapper>
  )
}

export default FiltersInput
