import { AspectRatio, Badge, Group, HoverCard, Image, Text } from '@mantine/core'
import type { CSSProperties } from 'react'

import type { FeedItem } from '#types/feed'

import TimeAgo from './TimeAgo'

import classes from './Feed.module.css'

function makeFeedItemImageUrl(feedItem: FeedItem) {
  return feedItem.link
    ? `${import.meta.env.NEWSDASH_API_BASE}feed/image?url=${encodeURIComponent(feedItem.link)}`
    : undefined
}

function ListFeedItem({ data, index, style }: FeedItemProps) {
  const feedItem = data[index]
  const imageUrl = makeFeedItemImageUrl(feedItem)

  return (
    <div className={classes.feedItemWrapper} style={style}>
      <HoverCard arrowSize={10} openDelay={500} shadow="md" width={600} withArrow>
        <HoverCard.Target>
          <a className={classes.feedItem} href={feedItem.link} target="_blank" rel="noreferrer">
            {imageUrl ? <Image className={classes.image} src={imageUrl} /> : null}
            <div className={classes.teaserText}>
              <div className={classes.title}>
                <div className={classes.titleText}>{feedItem.title}</div>
                <Badge className={classes.badge} radius="sm" size="sm">
                  <TimeAgo date={feedItem.date} />
                </Badge>
              </div>
              <div className={classes.teaserText}>{feedItem.content}</div>
            </div>
          </a>
        </HoverCard.Target>
        <HoverCard.Dropdown className={classes.hoverCard}>
          <Group className={classes.flexWrap} wrap="nowrap">
            <AspectRatio className={classes.image} ratio={20 / 15} w={300}>
              <Image src={imageUrl} />
            </AspectRatio>
            <div>
              <Text className={classes.title} fw={700} mb="xs">
                {feedItem.title}
              </Text>
              <Text size="sm">{feedItem.content}</Text>
            </div>
          </Group>
        </HoverCard.Dropdown>
      </HoverCard>
    </div>
  )
}

interface FeedItemProps {
  data: FeedItem[]
  index: number
  style: CSSProperties
}

export default ListFeedItem
