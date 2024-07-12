import type { UseFormReturnType } from '@mantine/form'

import type { Display, Tab } from '@newsdash/common/schema'

import type { TabEditMode } from '#types/layout'

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

interface EditFeedFormValues {
  customTitle: string
  display: Display
  gridView: boolean
  hue: number
  maxColumnWidth: number
  url: string
}

export type { EditFeedFormProps, EditFeedFormValues, EditForm, InputProps }
