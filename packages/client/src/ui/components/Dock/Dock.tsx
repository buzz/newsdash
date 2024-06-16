import 'rc-dock/dist/rc-dock.css'
import './Dock.css'

import { QueryStatus } from '@reduxjs/toolkit/query'
import RcDockLayout from 'rc-dock'

import layoutApi from '#store/slices/api/layoutApi'
import { rcLayoutChange } from '#store/slices/layout/actions'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import { selectDenormalizedLayout } from '#store/slices/layout/selectors'
import { useDispatch, useSelector, useStore } from '#ui/hooks/store'
import type { CustomTabData } from '#types/layout'

import groups from './groups'
import loadTab from './loadTab'
import Placeholder from './Placeholder/Placeholder'

function DockLayout() {
  const dispatch = useDispatch()
  const layout = useSelector(selectDenormalizedLayout)
  const store = useStore()
  const state = store.getState()

  return (
    <RcDockLayout
      dropMode="edge"
      groups={groups}
      layout={layout}
      loadTab={(tabData: CustomTabData) => loadTab(state, tabData)}
      onLayoutChange={(newLayout) => dispatch(rcLayoutChange(newLayout))}
    />
  )
}

function Dock() {
  const tabCount = useSelector(tabsSelectors.selectTotal)

  // Avoid placeholder FOUC
  const getLayoutStatus = useSelector(layoutApi.endpoints.getLayout.select())
  const layoutRestored = [QueryStatus.fulfilled, QueryStatus.rejected].includes(
    getLayoutStatus.status
  )

  return layoutRestored && tabCount === 0 ? <Placeholder /> : <DockLayout />
}

export default Dock
