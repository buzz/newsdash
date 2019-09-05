export const actionTypes = {
  ADD_FEED_BOX: 'ADD_FEED_BOX',
  DELETE_FEED_BOX: 'DELETE_FEED_BOX',
  EDIT_FEED_BOX: 'EDIT_FEED_BOX',
}

export const addFeedBox = () => ({
  type: actionTypes.ADD_FEED_BOX,
})

export const deleteFeedBox = (id) => ({
  type: actionTypes.DELETE_FEED_BOX,
  id,
})

export const editFeedBox = (id, attrs) => ({
  type: actionTypes.EDIT_FEED_BOX,
  id,
  attrs,
})
