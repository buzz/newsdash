import { PLACEHOLDER_LAYOUT, PLACEHOLDER_TAB_ID } from '#constants'
import { layoutChange, rcLayoutChange } from '#store/slices/layout/actions'
import { removePanel } from '#store/slices/layout/entities/panels/actions'
import { selectPlaceholderPanel } from '#store/slices/layout/entities/panels/selectors'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import type { AppStartListening } from '#store/middlewares/types'

// Add/remove placeholder
function managePlaceholderEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: layoutChange,
    effect: (action, listenerApi) => {
      const state = listenerApi.getState()
      const tabCount = tabsSelectors.selectTotal(state)

      if (tabCount === 0) {
        listenerApi.dispatch(rcLayoutChange(PLACEHOLDER_LAYOUT))
      } else {
        const tabs = tabsSelectors.selectAll(state).filter((tab) => tab.id !== PLACEHOLDER_TAB_ID)
        if (tabs.length > 0) {
          // Remove placeholder
          const placeholder = selectPlaceholderPanel(state)
          if (placeholder) {
            listenerApi.dispatch(removePanel(placeholder.id))
          }
        }
      }
    },
  })
}

export default managePlaceholderEffect
