import { PLACEHOLDER_TAB_ID } from '#constants'
import EditFeedForm from '#ui/components/Feed/EditFeedForm/EditFeedForm'
import Feed from '#ui/components/Feed/Feed'
import type { CustomTabData } from '#types/layout'

import Placeholder from './Placeholder'

/** Get tab component */
function loadTab(tabData: CustomTabData) {
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
    switch (tabData.editMode) {
      case 'edit': {
        return {
          ...tabData,
          content: <EditFeedForm id={tabData.id} mode="edit" />,
          title: 'Edit feed',
        }
      }
      case 'create': {
        return {
          ...tabData,
          content: <EditFeedForm id={tabData.id} mode="create" />,
          title: 'New feed',
        }
        break
      }
      default: {
        return {
          ...tabData,
          content: <Feed id={tabData.id} />,
          // TODO: title
          title: 'TODO',
        }
      }
    }
  }
}

export default loadTab
