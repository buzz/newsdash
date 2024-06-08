import type { ListenerEffectAPI } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

import { requestNewTab } from '#store/slices/layout/actions'
import { selectDockbox } from '#store/slices/layout/entities/boxes/selectors'
import { addPanel, setActiveTab } from '#store/slices/layout/entities/panels/actions'
import { selectPanelForTab } from '#store/slices/layout/entities/panels/selectors'
import { addTab } from '#store/slices/layout/entities/tabs/actions'
import { selectMaxTabOrder } from '#store/slices/layout/entities/tabs/selectors'
import type { AppStartListening } from '#store/middlewares/types'
import type { AppDispatch, RootState } from '#store/types'

// New tab requested by user
function requestNewTabEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: requestNewTab,
    effect: ({ payload: requestedPanelId }, listenerApi) => {
      const panelId = requestedPanelId ?? findPanelId(listenerApi)

      // Find tab order
      const selectOrder = (state: RootState) => selectMaxTabOrder(state, panelId)
      const maxOrder = selectOrder(listenerApi.getState())
      const order = maxOrder === -Infinity ? 0 : maxOrder + 1

      // Add new tab and set active
      const tabId = nanoid()
      listenerApi.dispatch(
        addTab({
          id: tabId,
          order,
          parentId: panelId,
        })
      )
      listenerApi.dispatch(setActiveTab({ panelId, tabId }))
    },
  })
}

// Find a panel for new tab
function findPanelId(listenerApi: ListenerEffectAPI<RootState, AppDispatch>): string {
  const panel = selectPanelForTab(listenerApi.getState())

  if (panel) {
    return panel.id
  }

  // Add empty panel
  const panelId = nanoid()
  const dockbox = selectDockbox(listenerApi.getState())
  if (!dockbox) {
    throw new Error("Couldn't get dockbox when there should be one")
  }
  listenerApi.dispatch(addPanel({ id: panelId, order: 0, parentId: dockbox.id }))

  return panelId
}

export default requestNewTabEffect
