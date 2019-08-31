import { createSelector } from 'redux-orm'

import orm from '../orm'
import getOrm from './orm'

const selectId = (state, id) => id

const getFeed = createSelector(
  orm, getOrm, selectId,
  (session, id) => session.Feed.withId(id).ref
)

export default {
  getFeed,
}
