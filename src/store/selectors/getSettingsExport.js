import { createSelector } from 'redux-orm'
import orm from '../orm'
import getOrm from './orm'

const getSettingsExport = createSelector(
  orm, getOrm,
  (session) => ({
    app: session.App.first().ref,
    feedBoxes: session.FeedBox.all().toRefArray(),
    feeds: session.Feed.all().toRefArray().map((feed) => ({
      ...feed,
      useCorsProxy: undefined,
      lastFetched: undefined,
      status: undefined,
      error: undefined,
    })),
  })
)

export default getSettingsExport
