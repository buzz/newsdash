import 'rc-dock/dist/rc-dock.css'
import './Dock.css'

import { QueryStatus } from '@reduxjs/toolkit/query'
import { IconDots } from '@tabler/icons-react'
import RcDockLayout from 'rc-dock'
import { useMemo } from 'react'
import type { TabGroup } from 'rc-dock'

import layoutApi from '#store/slices/api/layoutApi'
import { rcLayoutChange } from '#store/slices/layout/actions'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import { selectDenormalizedLayout } from '#store/slices/layout/selectors'
import selectSettings from '#store/slices/settings/selectors'
import { useDispatch, useSelector, useStore } from '#ui/hooks/store'
import type { CustomTabData } from '#types/layout'

import loadTab from './loadTab'
import PanelExtra from './Panel/PanelExtra'
import Placeholder from './Placeholder/Placeholder'

const makeGroups = (animated: boolean): Record<string, TabGroup> => ({
  news: {
    animated,
    floatable: false,
    maximizable: false,
    panelExtra: (panel) => <PanelExtra panel={panel} />,
    moreIcon: <IconDots />,
  },
})

function DockLayout() {
  const dispatch = useDispatch()
  const layout = useSelector(selectDenormalizedLayout)
  const { slideAnimation } = useSelector(selectSettings)
  const store = useStore()
  const state = store.getState()
  const groups = useMemo(() => makeGroups(slideAnimation), [slideAnimation])

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
