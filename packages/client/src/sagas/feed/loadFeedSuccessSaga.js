import { put } from 'redux-saga/effects'

import { parseFeedItems } from 'newsdash/store/actions/feedItem'

export default function* loadFeedSuccessSaga({ id, data }) {
  const { items = [] } = data
  yield put(parseFeedItems(id, items))
}
