import { IconExclamationCircle, IconLoader2 } from '@tabler/icons-react'
import cx from 'clsx'

import type { Tab } from '@newsdash/common/schema'

import Tooltip from '#ui/components/common/Tooltip'
import FeedIcon from '#ui/components/Feed/FeedIcon/FeedIcon'

import classes from './TabIcon.module.css'

function TabIcon({ tab }: TabIconProps) {
  const feedIcon = <FeedIcon className={classes.favicon} tab={tab} />

  const loaderIcon =
    tab.status === 'loading' ? (
      <IconLoader2 className={classes.loader} width={16} height={16} />
    ) : null

  const errorIcon =
    tab.status === 'error' ? (
      <Tooltip label={tab.error}>
        <IconExclamationCircle className={classes.error} width={16} height={16} />
      </Tooltip>
    ) : null

  return (
    <span
      className={cx(classes.stackedIcon, {
        [classes.loading]: tab.status === 'loading',
        [classes.error]: tab.status === 'error',
      })}
    >
      {tab.status === 'error' ? null : feedIcon}
      {loaderIcon}
      {errorIcon}
    </span>
  )
}

interface TabIconProps {
  tab: Tab
}

export default TabIcon
