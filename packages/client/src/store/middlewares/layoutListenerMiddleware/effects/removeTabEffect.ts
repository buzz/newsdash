import { updatePanel } from '#store/slices/layout/entities/panels/actions'
import panelsSelectors from '#store/slices/layout/entities/panels/selectors'
import { removeTab } from '#store/slices/layout/entities/tabs/actions'
import { selectChildTabs } from '#store/slices/layout/entities/tabs/selectors'
import type { AppStartListening } from '#store/middlewares/types'

/** Set activeId on panel when active tab is removed */
function removeTabEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: removeTab,
    effect: ({ payload: tabId }, listenerApi) => {
      const state = listenerApi.getState()

      const panel = panelsSelectors.selectAll(state).find((panel) => panel.activeId === tabId)

      if (panel) {
        const tabs = selectChildTabs(state, panel.id)
        if (tabs.length > 0) {
          listenerApi.dispatch(updatePanel({ id: panel.id, changes: { activeId: tabs[0].id } }))
        }
      }
    },
  })
}

export default removeTabEffect
