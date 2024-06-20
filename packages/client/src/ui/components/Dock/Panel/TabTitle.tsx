import type { Tab } from '@newsdash/schema'

import Tooltip from '#ui/components/common/Tooltip'

import TabIcon from './TabIcon/TabIcon'

import classes from './Panel.module.css'

function TabTitle({ tab }: TabProps) {
  const title = tab.customTitle ?? tab.title ?? 'Add Feed'

  const titleSpan = (
    <span className={classes.title}>
      <TabIcon tab={tab} />
      {title}
    </span>
  )

  return tab.description ? (
    <Tooltip label={tab.description} multiline maw={400}>
      {titleSpan}
    </Tooltip>
  ) : (
    titleSpan
  )
}

interface TabProps {
  tab: Tab
}

export default TabTitle
