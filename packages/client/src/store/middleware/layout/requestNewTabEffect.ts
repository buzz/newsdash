import { nanoid } from 'nanoid'

import { layout } from '@newsdash/common/schema'

import { MAX_COLUMN_WIDTH_DEFAULT, TAB_GROUP } from '#constants'
import { addAppListener } from '#store/middleware/utils'
import { requestNewTab } from '#store/slices/layout/actions'
import { updatePanel } from '#store/slices/layout/entities/panels/actions'
import { selectPanelForTab } from '#store/slices/layout/entities/panels/selectors'
import { addTab } from '#store/slices/layout/entities/tabs/actions'
import { selectMaxTabOrder } from '#store/slices/layout/entities/tabs/selectors'
import { getRandomHue } from '#utils'
import type { AppListenerEffectAPI } from '#store/middleware/types'

// New tab requested by user.
function requestNewTabEffect(listenerApi: AppListenerEffectAPI) {
  listenerApi.dispatch(
    addAppListener({
      actionCreator: requestNewTab,
      effect: ({ payload: requestedPanelId }, listenerApi) => {
        // Find parent panel
        const panelId = requestedPanelId ?? selectPanelForTab(listenerApi.getState())?.id
        if (!panelId) {
          throw new Error('Expected panel to exist')
        }

        // Find tab order
        const maxOrder = selectMaxTabOrder(listenerApi.getState(), panelId)
        const order = maxOrder === -Infinity ? 0 : maxOrder + 1

        // New tab
        const tab = layout.newTabSchema.parse({
          id: nanoid(),
          customTitle: '',
          group: TAB_GROUP,
          hue: getRandomHue(),
          maxColumnWidth: MAX_COLUMN_WIDTH_DEFAULT,
          order,
          parentId: panelId,
          status: 'new',
          url: '',
        })

        // Add new tab and...
        listenerApi.dispatch(addTab(tab))

        // ...set active
        listenerApi.dispatch(updatePanel({ id: panelId, changes: { activeId: tab.id } }))
      },
    })
  )
}

export default requestNewTabEffect
