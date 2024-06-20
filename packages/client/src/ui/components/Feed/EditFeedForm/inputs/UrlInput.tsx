import { TextInput } from '@mantine/core'

import InputWrapper from '#ui/components/common/InputWrapper/InputWrapper'
import type { InputProps } from '#ui/components/Feed/EditFeedForm/types'

function UrlInput({ form }: InputProps) {
  return (
    <InputWrapper label="URL" required>
      <TextInput {...form.getInputProps('url')} />
    </InputWrapper>
  )
}

export default UrlInput
