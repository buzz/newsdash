export const actionTypes = {
  EDIT_FEED_ITEM: 'EDIT_FEED_ITEM',
  PARSE_FEED_ITEMS: 'PARSE_FEED_ITEMS',
  PRUNE: 'PRUNE',
  RESTORE_FEED_ITEMS: 'RESTORE_FEED_ITEMS',
}

export const editFeedItem = (id, attrs) => ({
  type: actionTypes.EDIT_FEED_ITEM,
  id,
  attrs,
})

export const parseFeedItems = (feedId, items) => ({
  type: actionTypes.PARSE_FEED_ITEMS,
  feedId,
  items,
})

export const prune = () => ({
  type: actionTypes.PRUNE,
})

export const restoreFeedItems = (items) => ({
  type: actionTypes.RESTORE_FEED_ITEMS,
  items,
})
