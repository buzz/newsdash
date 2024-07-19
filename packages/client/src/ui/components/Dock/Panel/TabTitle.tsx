import type { Tab } from '@newsdash/common/schema'

import Tooltip from '#ui/components/common/Tooltip'
import { getTitle } from '#utils'

import TabIcon from './TabIcon/TabIcon'

import classes from './Panel.module.css'

function TabTitle({ feedItemCount, tab }: TabTitleProps) {
  const title = getTitle(tab, feedItemCount)

  return (
    <span className={classes.title}>
      <TabIcon tab={tab} />
      {tab.description ? (
        <Tooltip label={tab.description} multiline maw={400}>
          <span>{title}</span>
        </Tooltip>
      ) : (
        <span>{title}</span>
      )}
    </span>
  )
}

interface TabTitleProps {
  feedItemCount: number
  tab: Tab
}

export default TabTitle
