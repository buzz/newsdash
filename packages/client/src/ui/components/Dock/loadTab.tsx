import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import EditFeedForm from '#ui/components/Feed/EditFeedForm/EditFeedForm'
import Feed from '#ui/components/Feed/Feed'
import type { RootState } from '#store/types'
import type { CustomTabData } from '#types/layout'

import TabTitle from './Panel/TabTitle'

/** Get tab component */
function loadTab(store: RootState, tabData: CustomTabData) {
  if (tabData.id) {
    // News feed
    const tab = tabsSelectors.selectById(store, tabData.id)

    switch (tabData.editMode) {
      case 'edit': {
        return {
          ...tabData,
          content: <EditFeedForm tab={tab} mode="edit" />,
          title: <TabTitle tab={tab} />,
        }
      }
      case 'create': {
        return {
          ...tabData,
          content: <EditFeedForm tab={tab} mode="create" />,
          title: <TabTitle tab={tab} />,
        }
      }
      default: {
        return {
          ...tabData,
          content: <Feed tab={tab} />,
          title: <TabTitle tab={tab} />,
        }
      }
    }
  }

  throw new Error('Expected tab ID')
}

export default loadTab
