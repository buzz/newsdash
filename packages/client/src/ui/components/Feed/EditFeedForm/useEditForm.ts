import { useForm } from '@mantine/form'
import { throttle } from 'lodash-es'
import { useEffect, useState } from 'react'

import { layout } from '@newsdash/common/schema'
import type { Tab } from '@newsdash/common/schema'

import { MAX_COLUMN_WIDTH_DEFAULT } from '#constants'
import { editTab, removeTab } from '#store/slices/layout/entities/tabs/actions'
import { useDispatch } from '#ui/hooks/store'
import type { TabEditMode } from '#types/layout'

import type { EditFeedFormValues } from './types'

const formSchema = layout.storeTabSchema.pick({
  customTitle: true,
  display: true,
  enablePopover: true,
  filters: true,
  gridView: true,
  hue: true,
  maxColumnWidth: true,
  url: true,
})

function getInitialFormValues(mode: TabEditMode, tab: Tab): EditFeedFormValues {
  return mode === 'new'
    ? {
        customTitle: '',
        display: 'detailed',
        enablePopover: true,
        filters: [],
        gridView: false,
        hue: tab.hue,
        maxColumnWidth: MAX_COLUMN_WIDTH_DEFAULT,
        url: '',
      }
    : {
        customTitle: tab.customTitle,
        display: tab.display,
        enablePopover: tab.enablePopover,
        filters: tab.filters,
        gridView: tab.gridView,
        hue: tab.hue,
        maxColumnWidth: tab.maxColumnWidth,
        url: tab.url,
      }
}

function useEditForm(mode: TabEditMode, tab: Tab) {
  const dispatch = useDispatch()
  const [tabBackup, setTabBackup] = useState<Tab | undefined>()

  // Remember original values for edit mode in case of cancel
  useEffect(() => {
    if (mode === 'edit' && tabBackup === undefined) {
      setTabBackup({ ...tab })
    }
  }, [mode, tab, tabBackup])

  const throttledUpdateFeed = throttle(
    (values: EditFeedFormValues) =>
      dispatch(
        editTab({
          id: tab.id,
          changes: {
            customTitle: values.customTitle,
            display: values.display,
            gridView: values.gridView,
            hue: values.hue,
            maxColumnWidth: values.maxColumnWidth,
          },
        })
      ),
    250
  )

  const form = useForm<EditFeedFormValues>({
    initialValues: getInitialFormValues(mode, tab),
    validate: (values) => {
      const result = formSchema.safeParse(values)
      return result.success
        ? {}
        : Object.fromEntries(
            Object.entries(result.error.formErrors.fieldErrors).map(([field, errors]) => [
              field,
              Array.isArray(errors) ? errors[0] : undefined,
            ])
          )
    },
    // Live update tab
    onValuesChange: throttledUpdateFeed,
  })

  const onCancel = () => {
    if (tab.id) {
      dispatch(
        mode === 'new'
          ? removeTab(tab.id)
          : editTab({ id: tab.id, changes: { ...tabBackup, status: 'loaded' } })
      )
    }
  }

  const onDelete = () => {
    if (tab.id) {
      dispatch(removeTab(tab.id))
    }
  }

  const onSubmit = form.onSubmit((values) => {
    if (tab.id) {
      dispatch(editTab({ id: tab.id, changes: { ...values, status: 'loaded' } }))
    }
  })

  return { form, onCancel, onDelete, onSubmit }
}

export type { formSchema }
export default useEditForm
