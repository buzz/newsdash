import cx from 'clsx'

import type { Tab } from '@newsdash/common/schema'

import { makeFeedItemImageUrl } from '#ui/components/Feed/utils'
import type { FeedItem as FeedItemType } from '#types/feed'

import DISPLAY_COMPONENTS from './display/components'
import FeedHoverCard from './FeedHoverCard/FeedHoverCard'

import classes from './FeedItem.module.css'

function FeedItem({ feedItem, tab: { display, enablePopover, language } }: FeedItemProps) {
  const { component: DisplayComponent, className } = DISPLAY_COMPONENTS[display]
  const imageUrl = makeFeedItemImageUrl(feedItem)

  const props = {
    className: cx(classes.feedItem, classes[className]),
    href: feedItem.link,
    rel: 'noreferrer',
    target: '_blank',
  }

  const feedItemDisplay = (
    <DisplayComponent feedItem={feedItem} imageUrl={imageUrl} language={language} />
  )

  if (enablePopover && display !== 'tiles') {
    return (
      <FeedHoverCard
        content={feedItem.content}
        date={feedItem.date}
        imageUrl={imageUrl}
        language={language}
        title={feedItem.title}
      >
        <a {...props}>{feedItemDisplay}</a>
      </FeedHoverCard>
    )
  }

  return <a {...props}>{feedItemDisplay}</a>
}

interface FeedItemProps {
  feedItem: FeedItemType
  tab: Tab
}

export default FeedItem
