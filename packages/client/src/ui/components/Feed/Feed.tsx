import { Box, Image, ScrollArea, Stack, Text } from '@mantine/core'

import { selectByTabId } from '#store/slices/feedItems/selectors'
import { useSelector } from '#ui/hooks/store'
import type { RootState } from '#store/types'
import type { FeedItem } from '#types/feed'
import type { CustomTabData } from '#types/layout'

import classes from './Feed.module.css'

function ListFeedItem({ feedItem }: FeedItemProps) {
  return (
    <a className={classes.feedItem} href={feedItem.link}>
      <Image />
      <Box className={classes.text}>
        <Text className={classes.title} component="h3" truncate="end">
          {feedItem.title}
        </Text>
        <Text className={classes.teaserText} component="p" lineClamp={3}>
          {feedItem.content}
        </Text>
      </Box>
    </a>
  )
}

interface FeedItemProps {
  feedItem: FeedItem
}

function Feed({ tab }: FeedProps) {
  const selector = (state: RootState) => selectByTabId(state, tab.id ?? '')
  const feedItems = useSelector(selector)

  const listItems = feedItems.map((feedItem) => (
    <ListFeedItem feedItem={feedItem} key={feedItem.id} />
  ))

  return (
    <ScrollArea className={classes.scrollArea} scrollbars="y">
      <Stack>{listItems}</Stack>
    </ScrollArea>
  )
}

interface FeedProps {
  tab: CustomTabData
}

export default Feed
