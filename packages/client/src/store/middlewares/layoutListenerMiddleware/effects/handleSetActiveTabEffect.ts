import { setActiveTab, updatePanel } from '#store/slices/layout/entities/panels/actions'
import type { AppStartListening } from '#store/middlewares/types'

// Set active tab on panel (if tab exists)
function handleSetActiveTabEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: setActiveTab,
    effect: ({ payload: { panelId, tabId } }, listenerApi) => {
      listenerApi.dispatch(updatePanel({ id: panelId, changes: { activeId: tabId } }))
    },
  })
}

export default handleSetActiveTabEffect
