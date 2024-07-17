import { isAnyOf } from '@reduxjs/toolkit'
import { isEqual } from 'lodash-es'

import type { PersistLayout } from '@newsdash/common/schema'

import { debounce } from '#store/middlewares/utils'
import layoutApi from '#store/slices/api/layoutApi'
import { selectPersistLayout } from '#store/slices/api/selectors'
import { updateLayout } from '#store/slices/layout/actions'
import { addPanel, removePanel, updatePanel } from '#store/slices/layout/entities/panels/actions'
import { addTab, editTab, removeTab } from '#store/slices/layout/entities/tabs/actions'
import { selectEditTabs } from '#store/slices/layout/entities/tabs/selectors'
import type { AppStartListening } from '#store/middlewares/types'

const PERSIST_DELAY = 5000

/** Persist layout on change */
function persistLayoutEffect(startListening: AppStartListening) {
  let lastPersistLayout: PersistLayout | undefined

  startListening({
    matcher: isAnyOf(updateLayout, addPanel, updatePanel, removePanel, addTab, editTab, removeTab),
    effect: async (action, listenerApi) => {
      await debounce(listenerApi, PERSIST_DELAY)

      const state = listenerApi.getState()

      // Only persist we're not editing
      if (selectEditTabs(state).length === 0) {
        // Only persist if layout actually changed
        const persistLayout = selectPersistLayout(state)
        if (!isEqual(persistLayout, lastPersistLayout)) {
          await listenerApi.dispatch(layoutApi.endpoints.persistLayout.initiate(persistLayout))
          lastPersistLayout = persistLayout
        }
      }
    },
  })
}

export default persistLayoutEffect
