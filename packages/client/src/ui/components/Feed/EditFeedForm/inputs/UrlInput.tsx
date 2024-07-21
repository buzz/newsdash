import { TextInput } from '@mantine/core'

import InputWrapper from '#ui/components/common/InputWrapper/InputWrapper'
import type { TabEditMode } from '#types/layout'
import type { InputProps } from '#ui/components/Feed/EditFeedForm/types'

function UrlInput({ form, mode }: UrlInputProps) {
  return (
    <InputWrapper label="URL" required>
      <TextInput disabled={mode !== 'new'} {...form.getInputProps('url')} />
    </InputWrapper>
  )
}

interface UrlInputProps extends InputProps {
  mode: TabEditMode
}

export default UrlInput
