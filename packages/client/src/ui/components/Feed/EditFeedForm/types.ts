import type { UseFormReturnType } from '@mantine/form'
import type { z } from 'zod'

import type { Tab } from '@newsdash/common/schema'

import type { TabEditMode } from '#types/layout'

import type { formSchema } from './useEditForm'

type EditForm = UseFormReturnType<
  EditFeedFormValues,
  (values: EditFeedFormValues) => EditFeedFormValues
>

interface EditFeedFormProps {
  mode: TabEditMode
  tab: Tab
}

interface InputProps {
  form: EditForm
}

type EditFeedFormValues = z.infer<typeof formSchema>

export type { EditFeedFormProps, EditFeedFormValues, EditForm, InputProps }
