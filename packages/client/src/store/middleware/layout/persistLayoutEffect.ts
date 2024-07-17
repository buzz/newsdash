import { isAnyOf } from '@reduxjs/toolkit'
import { isEqual } from 'lodash-es'

import type { PersistLayout } from '@newsdash/common/schema'

import { addAppListener, debounce } from '#store/middleware/utils'
import layoutApi from '#store/slices/api/layoutApi'
import { selectPersistLayout } from '#store/slices/api/selectors'
import { updateLayout } from '#store/slices/layout/actions'
import { addPanel, removePanel, updatePanel } from '#store/slices/layout/entities/panels/actions'
import { addTab, editTab, removeTab } from '#store/slices/layout/entities/tabs/actions'
import { selectEditTabs } from '#store/slices/layout/entities/tabs/selectors'
import type { AppListenerEffectAPI } from '#store/middleware/types'

const PERSIST_DELAY = 5000

let lastPersistLayout: PersistLayout | undefined

/** Persist layout on change */
function persistLayoutEffect(listenerApi: AppListenerEffectAPI) {
  listenerApi.dispatch(
    addAppListener({
      matcher: isAnyOf(
        updateLayout,
        addPanel,
        updatePanel,
        removePanel,
        addTab,
        editTab,
        removeTab
      ),
      effect: async (action, listenerApi) => {
        await debounce(listenerApi, PERSIST_DELAY)

        const state = listenerApi.getState()

        // Only if we're not editing
        if (selectEditTabs(state).length === 0) {
          // Only if layout actually changed
          const persistLayout = selectPersistLayout(state)
          if (!isEqual(persistLayout, lastPersistLayout)) {
            await listenerApi.dispatch(layoutApi.endpoints.persistLayout.initiate(persistLayout))
            lastPersistLayout = persistLayout
          }
        }
      },
    })
  )
}

export default persistLayoutEffect
