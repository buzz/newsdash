import type { Tab } from '@newsdash/schema'

import Tooltip from '#ui/components/common/Tooltip'

import TabIcon from './TabIcon/TabIcon'

import classes from './Panel.module.css'

function getTitle({ customTitle, status, title }: Tab) {
  if (status === 'new') {
    return 'Add Feed'
  }
  if (customTitle.length > 0) {
    return customTitle
  }
  if (title !== undefined && title.length > 0) {
    return title
  }
  return 'NO TITLE'
}

function TabTitle({ tab }: TabProps) {
  const title = tab.description ? (
    <Tooltip label={tab.description} multiline maw={400}>
      <span>{getTitle(tab)}</span>
    </Tooltip>
  ) : (
    <span>{getTitle(tab)}</span>
  )

  return (
    <span className={classes.title}>
      <TabIcon tab={tab} />
      {title}
    </span>
  )
}

interface TabProps {
  tab: Tab
}

export default TabTitle
