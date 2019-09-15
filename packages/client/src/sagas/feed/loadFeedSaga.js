import { call, put, select } from 'redux-saga/effects'
import Parser from 'rss-parser'

import feedSelectors from 'newsdash/store/selectors/feed'
import { loadFeedFailure, loadFeedSuccess, setUseCorsProxy } from 'newsdash/store/actions/feed'
import getApp from 'newsdash/store/selectors/app'

const parser = new Parser()

// first time try to fetch feed directly and remember if CORS proxy is necessary
export default function* loadFeedSaga({ id, url }) {
  const feed = yield select(feedSelectors.getFeed, id)
  const fetchUrl = url || feed.url

  if (!feed.useCorsProxy) {
    try {
      yield put(loadFeedSuccess(id, yield call([parser, parser.parseURL], fetchUrl)))
      return
    } catch {
      yield put(setUseCorsProxy(id))
    }
  }

  const { corsProxy } = yield select(getApp)
  try {
    yield put(loadFeedSuccess(id, yield call([parser, parser.parseURL], `${corsProxy}${fetchUrl}`)))
  } catch (e) {
    yield put(loadFeedFailure(id, e.message))
  }
}
