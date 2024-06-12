import { IconRss } from '@tabler/icons-react'

import type { CustomTab } from '#types/layout'

import classes from './Panel.module.css'

const getFaviconUrl = (url: string) => {
  const { origin } = new URL(url)
  return new URL('favicon.ico', origin)
}

function TabTitle({ tab }: TabTitleProps) {
  const title = tab.customTitle ?? tab.title ?? 'NO TITLE'
  const faviconUrl = tab.link ? getFaviconUrl(tab.link) : null
  const icon = faviconUrl ? <img alt={tab.title} src={String(faviconUrl)} /> : <IconRss />

  return (
    <span className={classes.title}>
      {icon}
      {title}
    </span>
  )
}

interface TabTitleProps {
  tab: CustomTab
}

export default TabTitle
