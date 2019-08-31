export const actionTypes = {
  LOAD_FEED: 'LOAD_FEED',
  LOAD_FEED_FAILURE: 'LOAD_FEED_FAILURE',
  LOAD_FEED_SUCCESS: 'LOAD_FEED_SUCCESS',
}

export function loadFeed() {
  return {
    type: actionTypes.LOAD_FEED,
  }
}

export function loadFeedSuccess(data) {
  return {
    type: actionTypes.LOAD_FEED_SUCCESS,
    data,
  }
}

export function loadFeedFailure(error) {
  return {
    type: actionTypes.LOAD_FEED_FAILURE,
    error,
  }
}
