export const actionTypes = {
  ADD_FEED: 'ADD_FEED',
  DELETE_FEED: 'DELETE_FEED',
  EDIT_FEED: 'EDIT_FEED',
  LOAD_FEED_FAILURE: 'LOAD_FEED_FAILURE',
  LOAD_FEED_SUCCESS: 'LOAD_FEED_SUCCESS',
  LOAD_FEED: 'LOAD_FEED',
  STORE_POSITION: 'STORE_POSITION',
}

export const addFeed = () => ({
  type: actionTypes.ADD_FEED,
})

export const deleteFeed = (id) => ({
  type: actionTypes.DELETE_FEED,
  id,
})

export const editFeed = (id, feed, prevFeed) => ({
  type: actionTypes.EDIT_FEED,
  id,
  feed,
  prevFeed,
})

export const loadFeedFailure = (id, error) => ({
  type: actionTypes.LOAD_FEED_FAILURE,
  id,
  error,
})

export const loadFeedSuccess = (id, data) => ({
  type: actionTypes.LOAD_FEED_SUCCESS,
  id,
  data,
})

export const loadFeed = (id, url) => ({
  type: actionTypes.LOAD_FEED,
  id,
  url,
})

export const storePosition = (id, x, y, w, h) => ({
  type: actionTypes.STORE_POSITION,
  id,
  x,
  y,
  w,
  h,
})
