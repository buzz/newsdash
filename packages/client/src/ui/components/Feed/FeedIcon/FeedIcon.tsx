import { IconRss } from '@tabler/icons-react'
import cx from 'clsx'

import type { Tab } from '@newsdash/schema'

import { makeTabLogoUrl } from '#ui/components/Feed/utils'

import classes from './FeedIcon.module.css'

function FeedIcon({ className, tab }: FeedIconProps) {
  const logoUrl = makeTabLogoUrl(tab)
  return logoUrl ? (
    <img className={cx(className, classes.favicon)} alt={tab.title} src={String(logoUrl)} />
  ) : (
    <IconRss className={cx(className, classes.favicon)} />
  )
}

interface FeedIconProps {
  className?: string
  tab: Tab
}

export default FeedIcon
