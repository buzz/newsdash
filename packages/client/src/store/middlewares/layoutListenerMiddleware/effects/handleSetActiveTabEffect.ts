import { setActiveTab, updatePanel } from '#store/slices/layout/entities/panels/actions'
import { globalizedTabsSelectors } from '#store/slices/layout/entities/tabs/selectors'
import type { AppStartListening } from '#store/middlewares/types'

// Set active tab on panel (if tab exists)
function handleSetActiveTabEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: setActiveTab,
    effect: ({ payload: { panelId, tabId } }, listenerApi) => {
      const tab = globalizedTabsSelectors.selectById(listenerApi.getState(), tabId)
      if (tab) {
        listenerApi.dispatch(updatePanel({ id: panelId, changes: { activeId: tabId } }))
      }
    },
  })
}

export default handleSetActiveTabEffect
