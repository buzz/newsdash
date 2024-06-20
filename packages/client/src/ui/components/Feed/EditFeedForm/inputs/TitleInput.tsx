import { ActionIcon, TextInput } from '@mantine/core'
import { IconX } from '@tabler/icons-react'

import Tooltip from '#ui/components/common/Tooltip'
import type { InputProps } from '#ui/components/Feed/EditFeedForm/types'

function TitleInput({ disabled, form, placeholder }: TitleInputProps) {
  return (
    <TextInput
      label="Title"
      mt="sm"
      placeholder={placeholder}
      rightSection={
        <Tooltip disabled={disabled} label="Clear">
          <ActionIcon
            color="red"
            disabled={disabled}
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
  )
}

interface TitleInputProps extends InputProps {
  disabled: boolean
  placeholder?: string
}

export default TitleInput
