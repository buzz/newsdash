import { IconRss } from '@tabler/icons-react'
import cx from 'clsx'

import type { Tab } from '@newsdash/schema'

import classes from './FeedIcon.module.css'

const getFaviconUrl = (url: string) => {
  const { origin } = new URL(url)
  return new URL('favicon.ico', origin)
}

function FeedIcon({ className, tab }: FeedIconProps) {
  const faviconUrl = tab.link ? getFaviconUrl(tab.link) : null
  return faviconUrl ? (
    <img className={cx(className, classes.favicon)} alt={tab.title} src={String(faviconUrl)} />
  ) : (
    <IconRss className={cx(className, classes.favicon)} />
  )
}

interface FeedIconProps {
  className?: string
  tab: Tab
}

export default FeedIcon
