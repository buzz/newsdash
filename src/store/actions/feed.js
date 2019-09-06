export const actionTypes = {
  ADD_FEED: 'ADD_FEED',
  DELETE_FEED: 'DELETE_FEED',
  EDIT_FEED: 'EDIT_FEED',
  LOAD_FEED_FAILURE: 'LOAD_FEED_FAILURE',
  LOAD_FEED_SUCCESS: 'LOAD_FEED_SUCCESS',
  LOAD_FEED: 'LOAD_FEED',
  REFRESH_FEED: 'REFRESH_FEED',
  SET_USE_CORS_PROXY: 'SET_USE_CORS_PROXY',
}

export const addFeed = (feedBoxId, url) => ({
  type: actionTypes.ADD_FEED,
  feedBoxId,
  url,
})

export const deleteFeed = (id) => ({
  type: actionTypes.DELETE_FEED,
  id,
})

export const editFeed = (id, attrs) => ({
  type: actionTypes.EDIT_FEED,
  id,
  attrs,
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

export const refreshFeed = (id) => ({
  type: actionTypes.REFRESH_FEED,
  id,
})

export const setUseCorsProxy = (id, value = true) => ({
  type: actionTypes.SET_USE_CORS_PROXY,
  id,
  value,
})
