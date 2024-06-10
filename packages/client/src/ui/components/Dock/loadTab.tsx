import { PLACEHOLDER_TAB_ID } from '#constants'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import EditFeedForm from '#ui/components/Feed/EditFeedForm/EditFeedForm'
import Feed from '#ui/components/Feed/Feed'
import type { RootState } from '#store/types'
import type { CustomTabData } from '#types/layout'

import Placeholder from './Placeholder'

/** Get tab component */
function loadTab(store: RootState, tabData: CustomTabData) {
  if (!tabData.id) {
    throw new Error('Expected tab ID')
  }

  // Placeholder
  if (tabData.id === PLACEHOLDER_TAB_ID) {
    return {
      ...tabData,
      content: <Placeholder />,
      title: 'Welcome to newsdash',
    }
  }

  // News feed
  else {
    const tab = tabsSelectors.selectById(store, tabData.id)

    switch (tabData.editMode) {
      case 'edit': {
        return {
          ...tabData,
          content: <EditFeedForm tab={tab} mode="edit" />,
          title: 'Edit feed',
        }
      }
      case 'create': {
        return {
          ...tabData,
          content: <EditFeedForm tab={tab} mode="create" />,
          title: 'New feed',
        }
      }
      default: {
        return {
          ...tabData,
          content: <Feed tab={tab} />,
          title: tab.customTitle ?? tab.title ?? 'NO TITLE',
        }
      }
    }
  }
}

export default loadTab
