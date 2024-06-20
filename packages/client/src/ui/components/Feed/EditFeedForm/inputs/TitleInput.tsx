import { ActionIcon, TextInput } from '@mantine/core'
import { IconX } from '@tabler/icons-react'

import InputWrapper from '#ui/components/common/InputWrapper/InputWrapper'
import Tooltip from '#ui/components/common/Tooltip'
import type { InputProps } from '#ui/components/Feed/EditFeedForm/types'

function TitleInput({ disabled, form, placeholder }: TitleInputProps) {
  return (
    <InputWrapper label="Title">
      <TextInput
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
    </InputWrapper>
  )
}

interface TitleInputProps extends InputProps {
  disabled: boolean
  placeholder?: string
}

export default TitleInput
