import { PLACEHOLDER_LAYOUT } from '#constants'
import { handleLayoutChange, layoutReady } from '#store/slices/layout/actions'
import type { AppStartListening } from '#store/middlewares/types'

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
