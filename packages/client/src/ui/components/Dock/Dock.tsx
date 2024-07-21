import 'rc-dock/dist/rc-dock.css'
import './Dock.css'

import { IconDots } from '@tabler/icons-react'
import RcDockLayout from 'rc-dock'
import { useMemo } from 'react'
import type { TabGroup } from 'rc-dock'

import type { Tab } from '@newsdash/common/schema'

import { TAB_GROUP } from '#constants'
import { selectInitDone } from '#store/slices/app/selectors'
import feedItemsSelectors from '#store/slices/feedItems/selectors'
import { rcLayoutChange } from '#store/slices/layout/actions'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import selectDenormalizedLayout from '#store/slices/layout/selectors/selectDenormalizedLayout'
import selectSettings from '#store/slices/settings/selectors'
import { useDispatch, useSelector } from '#ui/hooks/store'
import type { CustomTabData } from '#types/layout'

import loadTab from './loadTab'
import makeTabDataCache from './makeTabDataCache'
import PanelExtra from './Panel/PanelExtra'
import Placeholder from './Placeholder/Placeholder'

const makeGroups = (animated: boolean): Record<string, TabGroup> => ({
  [TAB_GROUP]: {
    animated,
    floatable: false,
    maximizable: false,
    panelExtra: (panel) => <PanelExtra panel={panel} />,
    moreIcon: <IconDots />,
  },
})

function DockLayout({ tabs }: DockLayoutProps) {
  const dispatch = useDispatch()
  const layout = useSelector(selectDenormalizedLayout)
  const feedItems = useSelector(feedItemsSelectors.selectAll)

  const { itemCount, slideAnimation } = useSelector(selectSettings)
  const groups = useMemo(() => makeGroups(slideAnimation), [slideAnimation])

  const tabDataCache = useMemo(
    () => makeTabDataCache(feedItems, tabs.length),
    [feedItems, tabs.length]
  )
  const rcLoadTab = (tabData: CustomTabData) =>
    loadTab(tabs, feedItems, tabDataCache, itemCount, tabData)

  return (
    <RcDockLayout
      dropMode="edge"
      groups={groups}
      layout={layout}
      loadTab={rcLoadTab}
      onLayoutChange={(newLayout) => dispatch(rcLayoutChange(newLayout))}
    />
  )
}

interface DockLayoutProps {
  tabs: Tab[]
}

function Dock() {
  const tabs = useSelector(tabsSelectors.selectAll)

  // Avoid placeholder FOUC
  if (!useSelector(selectInitDone)) {
    return null
  }

  return tabs.length === 0 ? <Placeholder /> : <DockLayout tabs={tabs} />
}

export default Dock
