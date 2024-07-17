import type { Tab } from '@newsdash/common/schema'

import { addAppListener } from '#store/middleware/utils'
import { requestNewTab, updateLayout } from '#store/slices/layout/actions'
import panelsSelectors from '#store/slices/layout/entities/panels/selectors'
import { editTab, removeTab } from '#store/slices/layout/entities/tabs/actions'
import { selectEditTabs } from '#store/slices/layout/entities/tabs/selectors'
import type { AppListenerEffectAPI } from '#store/middleware/types'
import type { AppDispatch } from '#store/types'

function removeEditTab(dispatch: AppDispatch, tab: Tab) {
  dispatch(
    tab.status === 'new'
      ? removeTab(tab.id)
      : editTab({ id: tab.id, changes: { status: 'loaded' } })
  )
}

// Close feed settings, when...
function closeOtherFeedSettingsEffect(listenerApi: AppListenerEffectAPI) {
  // 1) ...another edit tab is opened
  listenerApi.dispatch(
    addAppListener({
      actionCreator: editTab,
      effect: ({ payload: { id: tabId, changes } }, listenerApi) => {
        if (changes.status === 'edit') {
          for (const tab of selectEditTabs(listenerApi.getState())) {
            if (tab.id !== tabId) {
              removeEditTab(listenerApi.dispatch, tab)
            }
          }
        }
      },
    })
  )

  // 2) ...a new tab is requested
  listenerApi.dispatch(
    addAppListener({
      actionCreator: requestNewTab,
      effect: (action, listenerApi) => {
        for (const tab of selectEditTabs(listenerApi.getState())) {
          removeEditTab(listenerApi.dispatch, tab)
        }
      },
    })
  )

  // 3) ...panel holding the edit tab switches tab
  listenerApi.dispatch(
    addAppListener({
      actionCreator: updateLayout,
      effect: (action, listenerApi) => {
        const state = listenerApi.getState()

        for (const tab of selectEditTabs(state)) {
          if (!tab.parentId) {
            throw new Error(`Tab without parent ID: ${tab.id}`)
          }

          if (panelsSelectors.selectById(state, tab.parentId).activeId !== tab.id) {
            // Panel switched away from edit tab
            removeEditTab(listenerApi.dispatch, tab)
          }
        }
      },
    })
  )
}

export default closeOtherFeedSettingsEffect
