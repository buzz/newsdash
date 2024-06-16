import { extractQueryError } from '#store/middlewares/utils'
import layoutApi from '#store/slices/api/layoutApi'
import { init } from '#store/slices/app/actions'
import { layoutRestored, restoreLayout } from '#store/slices/layout/actions'
import { showNotification } from '#store/slices/notifications/actions'
import type { AppStartListening } from '#store/middlewares/types'

/** Restore layout from server */
function restoreLayoutEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: init,
    effect: async (action, listenerApi) => {
      try {
        const getLayout = layoutApi.endpoints.getLayout.initiate()
        const { isError, error, isSuccess, data: layout } = await listenerApi.dispatch(getLayout)

        if (isError) {
          console.error(error)
          listenerApi.dispatch(
            showNotification({
              title: 'Failed to load layout',
              message: extractQueryError(error),
              type: 'error',
            })
          )
        } else if (isSuccess) {
          const { boxes, panels, tabs } = data
          if (boxes.length > 0 && panels.length > 0 && tabs.length > 0) {
            listenerApi.dispatch(
              restoreLayout({
                boxes,
                panels: panels.map((panel) => ({
                  ...panel,
                  activeId: tabs.find((tab) => tab.parentId === panel.id && tab.order === 0)?.id,
                })),
                tabs: tabs.map((tab) => ({
                  ...tab,
                  lastFetched: 0,
                  status: 'loaded',
                })),
              })
            )
          }
        }
      } finally {
        listenerApi.dispatch(layoutRestored())
        listenerApi.unsubscribe()
      }
    },
  })
}

export default restoreLayoutEffect
