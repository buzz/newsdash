import type { ListenerEffectAPI } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

import type { AppStartListening } from '#store/middlewares/types'
import { requestNewTab } from '#store/slices/layout/actions'
import { selectDockbox } from '#store/slices/layout/entities/boxes/selectors'
import { addPanel, removePanel, setActiveTab } from '#store/slices/layout/entities/panels/actions'
import {
  selectPanelForTab,
  selectPlaceholderPanel,
} from '#store/slices/layout/entities/panels/selectors'
import { addTab } from '#store/slices/layout/entities/tabs/actions'
import { selectMaxTabOrder } from '#store/slices/layout/entities/tabs/selectors'
import type { AppDispatch, RootState } from '#store/types'

// New tab requested by user
function requestNewTabEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: requestNewTab,
    effect: ({ payload }, listenerApi) => {
      let panelId = payload
      if (panelId === undefined) {
        panelId = findPanelId(listenerApi)
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
          order,
          parentId: panelId,
          title: 'Empty tab',
        })
      )
      listenerApi.dispatch(setActiveTab({ panelId, tabId }))
    },
  })
}

// Find a panel for new tab
function findPanelId(listenerApi: ListenerEffectAPI<RootState, AppDispatch>) {
  const panel = selectPanelForTab(listenerApi.getState())

  if (panel) {
    return panel.id
  }

  // Remove placeholder
  const placeholder = selectPlaceholderPanel(listenerApi.getState())
  if (!placeholder) {
    throw new Error("Couldn't get placeholder when there should be one")
  }
  listenerApi.dispatch(removePanel(placeholder.id))

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
