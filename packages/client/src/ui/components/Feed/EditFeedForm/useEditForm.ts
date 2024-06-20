import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'

import { type Tab, webUrlSchema } from '@newsdash/schema'

import { editTab, removeTab } from '#store/slices/layout/entities/tabs/actions'
import { useDispatch } from '#ui/hooks/store'
import { zodErrorToString } from '#utils'
import type { TabEditMode } from '#types/layout'

import type { EditFeedFormValues } from './types'

function getInitialFormValues(mode: TabEditMode, tab: Tab): EditFeedFormValues {
  return mode === 'new'
    ? {
        customTitle: '',
        display: 'detailed',
        hue: tab.hue,
        url: '',
      }
    : {
        customTitle: tab.customTitle,
        display: tab.display,
        hue: tab.hue,
        url: tab.url,
      }
}

function validateUrl(urlString: string) {
  const result = webUrlSchema.safeParse(urlString)
  return result.success ? null : zodErrorToString(result.error)
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

  const form = useForm<EditFeedFormValues>({
    initialValues: getInitialFormValues(mode, tab),
    validate: { url: validateUrl },
    // Live update tab
    onValuesChange: (values) => {
      dispatch(
        editTab({
          id: tab.id,
          changes: {
            customTitle: values.customTitle,
            display: values.display,
            hue: values.hue,
          },
        })
      )
    },
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

export default useEditForm
