import { addAppListener } from '#store/middleware/utils'
import { rcLayoutChange, updateLayout } from '#store/slices/layout/actions'
import selectLayoutUpdate from '#store/slices/layout/selectors/selectLayoutUpdate'
import type { AppListenerEffectAPI } from '#store/middleware/types'

/**
 * Handle update from rc-dock component.
 *
 * Create normalized layout update and pass to reducer.
 */
function rcLayoutChangeEffect(listenerApi: AppListenerEffectAPI) {
  listenerApi.dispatch(
    addAppListener({
      actionCreator: rcLayoutChange,
      effect: ({ payload: layout }, listenerApi) => {
        const update = selectLayoutUpdate(listenerApi.getState(), layout)
        listenerApi.dispatch(updateLayout(update))
      },
    })
  )
}

export default rcLayoutChangeEffect
