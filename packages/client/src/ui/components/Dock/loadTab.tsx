import type { TabBase, TabData } from 'rc-dock'

import { PLACEHOLDER_TAB_ID } from '#constants'

import Placeholder from './Placeholder'

function loadTab(tab: TabBase): TabData {
  if (tab.id === PLACEHOLDER_TAB_ID) {
    return {
      id: tab.id,
      content: <Placeholder />,
      title: '', // not used
    }
  }

  return {
    id: tab.id,
    content: (
      <div>
        Tab Content <code>ID={tab.id}</code>
      </div>
    ),
    group: 'news',
    title: tab.id ?? 'Default title',
  }
}

export default loadTab
