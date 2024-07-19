import type { UseFormReturnType } from '@mantine/form'
import type { z } from 'zod'

import type { formSchema } from './useEditForm'

type EditForm = UseFormReturnType<
  EditFeedFormValues,
  (values: EditFeedFormValues) => EditFeedFormValues
>

interface InputProps {
  form: EditForm
}

type EditFeedFormValues = z.infer<typeof formSchema>

export type { EditFeedFormValues, EditForm, InputProps }
