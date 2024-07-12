import type { Tab } from '@newsdash/common/schema'

import Tooltip from '#ui/components/common/Tooltip'
import { getTitle } from '#utils'

import TabIcon from './TabIcon/TabIcon'

import classes from './Panel.module.css'

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
