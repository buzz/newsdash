export const actionTypes = {
  EDIT_FEED_ITEM: 'EDIT_FEED_ITEM',
  PRUNE: 'PRUNE',
}

export const editFeedItem = (id, attrs) => ({
  type: actionTypes.EDIT_FEED_ITEM,
  id,
  attrs,
})

export const prune = () => ({
  type: actionTypes.PRUNE,
})
