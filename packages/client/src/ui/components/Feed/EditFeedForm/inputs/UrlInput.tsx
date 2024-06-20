import { TextInput } from '@mantine/core'

import type { InputProps } from '#ui/components/Feed/EditFeedForm/types'

function UrlInput({ form }: InputProps) {
  return <TextInput label="URL" required {...form.getInputProps('url')} />
}

export default UrlInput
