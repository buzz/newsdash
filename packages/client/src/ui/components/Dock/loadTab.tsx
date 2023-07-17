import type { TabData } from 'rc-dock'

import { PLACEHOLDER_TAB_ID } from '#constants'
import NewsFeed from '#ui/components/NewsFeed/NewsFeed'

import Placeholder from './Placeholder'

function loadTab({ id, title }: TabData): TabData {
  if (id === PLACEHOLDER_TAB_ID) {
    return {
      id,
      content: <Placeholder />,
      title: '', // not used
    }
  }

  return {
    id,
    content: <NewsFeed id={id} title={typeof title === 'string' ? title : undefined} />,
    group: 'news',
    title: title ?? 'Default title',
  }
}

export default loadTab
