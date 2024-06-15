import { IconExclamationCircle, IconLoader2, IconRss } from '@tabler/icons-react'
import cx from 'clsx'

import Tooltip from '#ui/components/common/Tooltip'
import type { CustomTab } from '#types/layout'

import classes from './Panel.module.css'

const getFaviconUrl = (url: string) => {
  const { origin } = new URL(url)
  return new URL('favicon.ico', origin)
}

function TabIcon({ tab }: TabProps) {
  const faviconUrl = tab.link ? getFaviconUrl(tab.link) : null
  const feedIcon = faviconUrl ? (
    <img className={classes.favicon} alt={tab.title} src={String(faviconUrl)} />
  ) : (
    <IconRss className={classes.favicon} />
  )

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

function TabTitle({ tab }: TabProps) {
  const title = tab.customTitle ?? tab.title ?? 'New feed'

  return (
    <span className={classes.title}>
      <TabIcon tab={tab} />
      {title}
    </span>
  )
}

interface TabProps {
  tab: CustomTab
}

export default TabTitle
