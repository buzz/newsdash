import { nanoid } from 'nanoid'

import { MAX_COLUMN_WIDTH_DEFAULT } from '#constants'
import { requestNewTab } from '#store/slices/layout/actions'
import { updatePanel } from '#store/slices/layout/entities/panels/actions'
import { selectPanelForTab } from '#store/slices/layout/entities/panels/selectors'
import { addTab } from '#store/slices/layout/entities/tabs/actions'
import { selectMaxTabOrder } from '#store/slices/layout/entities/tabs/selectors'
import type { AppStartListening } from '#store/middlewares/types'
import type { RootState } from '#store/types'

/** New tab requested by user */
function requestNewTabEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: requestNewTab,
    effect: ({ payload: requestedPanelId }, listenerApi) => {
      // Find parent panel
      // const panelId = requestedPanelId ?? findPanelId(listenerApi)
      const panelId = requestedPanelId ?? selectPanelForTab(listenerApi.getState())?.id
      if (!panelId) {
        throw new Error('Expected panel to exist')
      }

      // Find tab order
      const selectOrder = (state: RootState) => selectMaxTabOrder(state, panelId)
      const maxOrder = selectOrder(listenerApi.getState())
      const order = maxOrder === -Infinity ? 0 : maxOrder + 1

      // Add new tab and set active
      const tabId = nanoid()
      listenerApi.dispatch(
        addTab({
          id: tabId,
          customTitle: '',
          display: 'detailed',
          enablePopover: true,
          gridView: false,
          maxColumnWidth: MAX_COLUMN_WIDTH_DEFAULT,
          lastFetched: 0,
          order,
          parentId: panelId,
          status: 'new',
          url: '',
        })
      )
      listenerApi.dispatch(updatePanel({ id: panelId, changes: { activeId: tabId } }))
    },
  })
}

export default requestNewTabEffect
