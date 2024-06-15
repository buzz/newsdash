import { removeFeedItems } from '#store/slices/feedItems/actions'
import { selectByTabId } from '#store/slices/feedItems/selectors'
import { removeTab } from '#store/slices/layout/entities/tabs/actions'
import type { AppStartListening } from '#store/middlewares/types'

/** Remove feed items when tab panel is removed */
function removeTabEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: removeTab,
    effect: ({ payload: tabId }, listenerApi) => {
      const ids = selectByTabId(listenerApi.getState(), tabId).map((item) => item.id)
      listenerApi.dispatch(removeFeedItems(ids))
    },
  })
}

export default removeTabEffect
