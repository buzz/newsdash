import type { AppStartListening } from '#store/middlewares/types'
import { removePanel } from '#store/slices/layout/entities/panels/actions'
import { removeTab } from '#store/slices/layout/entities/tabs/actions'
import { selectChildTabs } from '#store/slices/layout/entities/tabs/selectors'

// Remove tabs when parent panel is removed
function handleRemovePanelEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: removePanel,
    effect: ({ payload: panelId }, listenerApi) => {
      for (const tab of selectChildTabs(listenerApi.getState(), panelId)) {
        listenerApi.dispatch(removeTab(tab.id))
      }
    },
  })
}

export default handleRemovePanelEffect