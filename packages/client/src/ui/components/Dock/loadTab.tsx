import type { Tab } from '@newsdash/common/schema'

import Feed from '#ui/components/Feed/Feed'
import type { FeedItem } from '#types/feed'
import type { CustomTabData } from '#types/layout'

import TabTitle from './Panel/TabTitle'
import type { TabDataCache } from './makeTabDataCache'

/** Get tab data and components */
function loadTab(
  tabs: Tab[],
  allFeedItems: FeedItem[],
  { selectFeedItems, selectFilters }: TabDataCache,
  tabData: CustomTabData
) {
  const tab = tabs.find((tab) => tab.id === tabData.id)
  if (!tab) {
    throw new Error('Tab not found')
  }

  const filters = selectFilters(tab.filters)
  const feedItems = selectFeedItems(allFeedItems, filters, tab.id)

  const { title, ...tabDataWithoutTitle } = tabData

  return {
    ...tabDataWithoutTitle,
    content: <Feed feedItems={feedItems} tab={tab} />,
    title: <TabTitle feedItemCount={feedItems.length} tab={tab} />,
  }
}

export default loadTab
