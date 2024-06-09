import { isAnyOf } from '@reduxjs/toolkit'
import { isEqual } from 'lodash-es'

import type { PersistLayout } from '@newsdash/schema'

import apiLayout from '#store/slices/api/layout'
import { selectPersistLayout } from '#store/slices/api/selectors'
import { updateLayout } from '#store/slices/layout/actions'
import { addPanel, removePanel, updatePanel } from '#store/slices/layout/entities/panels/actions'
import { addTab, editTab, removeTab } from '#store/slices/layout/entities/tabs/actions'
import type { AppStartListening } from '#store/middlewares/types'

const PERSIST_DELAY = 5000

// Persist layout on change
function persistLayoutEffect(startListening: AppStartListening) {
  let lastPersistLayout: PersistLayout | undefined

  startListening({
    matcher: isAnyOf(updateLayout, addPanel, updatePanel, removePanel, addTab, editTab, removeTab),
    effect: async (action, listenerApi) => {
      // Debounce
      listenerApi.cancelActiveListeners()
      await listenerApi.delay(PERSIST_DELAY)

      const state = listenerApi.getState()
      const persistLayout = selectPersistLayout(state)

      // Only persist if layout actually changed
      if (!isEqual(persistLayout, lastPersistLayout)) {
        await listenerApi.dispatch(apiLayout.endpoints.persistLayout.initiate(persistLayout))
        lastPersistLayout = persistLayout
      }
    },
  })
}

export default persistLayoutEffect
