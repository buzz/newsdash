import cx from 'clsx'

import type { Tab } from '@newsdash/common/schema'

import { makeFeedItemImageUrl } from '#ui/components/Feed/utils'
import type { FeedItem as FeedItemType } from '#types/feed'

import DISPLAY_COMPONENTS from './display/components'
import Popover from './Popover/Popover'

import classes from './FeedItem.module.css'

function FeedItem({ feedItem, tab: { display, language } }: FeedItemProps) {
  const { component: DisplayComponent, className } = DISPLAY_COMPONENTS[display]
  const imageUrl = makeFeedItemImageUrl(feedItem)

  return (
    <Popover
      content={feedItem.content}
      date={feedItem.date}
      imageUrl={imageUrl}
      language={language}
      title={feedItem.title}
    >
      {({ onMouseEnter, onMouseLeave }) => (
        <a
          className={cx(classes.feedItem, classes[className])}
          href={feedItem.link}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          rel="noreferrer"
          target="_blank"
        >
          <DisplayComponent feedItem={feedItem} imageUrl={imageUrl} language={language} />
        </a>
      )}
    </Popover>
  )
}

interface FeedItemProps {
  feedItem: FeedItemType
  tab: Tab
}

export default FeedItem
