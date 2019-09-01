import { call, put, select } from 'redux-saga/effects'
import Parser from 'rss-parser'

import feedSelectors from '../../store/selectors/feed'
import { loadFeedFailure, loadFeedSuccess, setUseCorsProxy } from '../../store/actions/feed'
import getApp from '../../store/selectors/app'

const parser = new Parser()

// first time try to fetch feed directly and remember if CORS proxy is necessary
export default function* loadFeed({ id, url }) {
  const feed = yield select(feedSelectors.getFeed, id)

  if (!feed.useCorsProxy) {
    try {
      yield put(loadFeedSuccess(id, yield call([parser, parser.parseURL], url)))
      return
    } catch {
      yield put(setUseCorsProxy(id))
    }
  }

  const { corsProxy } = yield select(getApp)
  try {
    yield put(loadFeedSuccess(id, yield call([parser, parser.parseURL], `${corsProxy}${url}`)))
  } catch (e) {
    yield put(loadFeedFailure(id, e.message))
  }
}
