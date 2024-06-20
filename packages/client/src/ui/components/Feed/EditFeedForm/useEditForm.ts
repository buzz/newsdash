import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'

import type { Tab } from '@newsdash/schema'

import { editTab, removeTab } from '#store/slices/layout/entities/tabs/actions'
import { useDispatch } from '#ui/hooks/store'
import type { TabEditMode } from '#types/layout'

import { getInitialFormValues, isValidUrl } from './utils'
import type { EditFeedFormValues } from './types'

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
    validate: {
      url: isValidUrl,
    },
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
