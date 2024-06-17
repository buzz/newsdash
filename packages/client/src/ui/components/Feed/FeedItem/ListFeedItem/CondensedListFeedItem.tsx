import type { FeedItemProps } from '#ui/components/Feed/Feed'

import ListFeedItem from './ListFeedItem'

function CondensedListFeedItem(props: FeedItemProps) {
  return <ListFeedItem condensed {...props} />
}

export default CondensedListFeedItem
