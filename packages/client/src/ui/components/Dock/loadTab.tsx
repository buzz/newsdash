import type { TabData } from 'rc-dock'

import { PLACEHOLDER_TAB_ID } from '#constants'
import EditFeedForm from '#ui/components/Feed/EditFeedForm/EditFeedForm'
import Feed from '#ui/components/Feed/Feed'
import type { Tab } from '#types/layout'

import Placeholder from './Placeholder'

type InputTabData = Tab & Pick<TabData, 'content'>
type OutputTab = Tab & Pick<TabData, 'content' | 'title'>

/** Get tab component */
function loadTab(tabData: InputTabData) {
  console.log('loadTab', tabData)

  const tab: OutputTab = {
    editMode: 'off',
    ...tabData,
    content: null,
    title: '',
  }

  // Placeholder
  if (tabData.id === PLACEHOLDER_TAB_ID) {
    tab.content = <Placeholder />
  }

  // News feed
  else {
    tab.group = 'news'
    switch (tab.editMode) {
      case 'edit': {
        tab.content = <EditFeedForm id={tab.id} mode="edit" />
        tab.title = 'Edit feed'
        break
      }
      case 'create': {
        tab.content = <EditFeedForm id={tab.id} mode="create" />
        tab.title = 'New feed'
        break
      }
      default: {
        tab.content = <Feed id={tab.id} />
      }
    }
  }

  return tab
}

export default loadTab
