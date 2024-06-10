import 'rc-dock/dist/rc-dock.css'
import './Dock.css'

import { QueryStatus } from '@reduxjs/toolkit/query'
import DockLayout, { type LayoutBase } from 'rc-dock'

import { PLACEHOLDER_LAYOUT } from '#constants'
import layoutApi from '#store/slices/api/layoutApi'
import { rcLayoutChange } from '#store/slices/layout/actions'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import { selectDenormalizedLayout } from '#store/slices/layout/selectors'
import { useDispatch, useSelector, useStore } from '#ui/hooks/store'
import type { CustomTabData } from '#types/layout'

import groups from './groups'
import loadTab from './loadTab'

function Dock() {
  const dispatch = useDispatch()
  const denormalizedLayout = useSelector(selectDenormalizedLayout)
  const tabCount = useSelector(tabsSelectors.selectTotal)
  let layout: LayoutBase = tabCount > 0 ? denormalizedLayout : PLACEHOLDER_LAYOUT
  const store = useStore()
  const state = store.getState()

  // Avoid placeholder FOUC
  const getLayoutStatus = useSelector(layoutApi.endpoints.getLayout.select())
  const layoutRestored = getLayoutStatus.status === QueryStatus.fulfilled
  if (!layoutRestored) {
    layout = { dockbox: { children: [], mode: 'horizontal' } }
  }

  return (
    <DockLayout
      dropMode="edge"
      groups={groups}
      layout={layout}
      loadTab={(tabData: CustomTabData) => loadTab(state, tabData)}
      onLayoutChange={(newLayout) => dispatch(rcLayoutChange(newLayout))}
    />
  )
}

export default Dock
