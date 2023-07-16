import { PLACEHOLDER_LAYOUT } from '#constants'
import type { AppStartListening } from '#store/middlewares/types'
import { handleLayoutChange, layoutReady } from '#store/slices/layout/actions'

// Show placeholder when ready
function initializeEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: layoutReady,
    effect: (action, listenerApi) => {
      listenerApi.dispatch(handleLayoutChange(PLACEHOLDER_LAYOUT))
      listenerApi.unsubscribe()
    },
  })
}

export default initializeEffect
