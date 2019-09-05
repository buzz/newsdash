import { createSelector } from 'redux-orm'

import orm from '../orm'
import getOrm from './orm'

const getFeedBoxes = createSelector(
  orm,
  getOrm,
  (session) => session
    .FeedBox
    .all()
    .toModelArray()
    .map((feedBox) => ({
      ...feedBox.ref,
      feeds: feedBox.feeds.toRefArray(),
    }))
)

export default {
  getFeedBoxes,
}
