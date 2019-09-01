import { Model, attr, fk } from 'redux-orm'

import { actionTypes as feedItemActionTypes } from '../actions/feedItem'

export default class FeedItem extends Model {
  static get modelName() {
    return 'FeedItem'
  }

  static get fields() {
    return {
      id: attr(),
      link: attr(),
      date: attr(),
      title: attr(),
      content: attr(),
      imageUrl: attr(),
      feed: fk('Feed', 'items'),
    }
  }

  static reducer(action, feedItemModel, session) {
    switch (action.type) {
      case feedItemActionTypes.PRUNE:
        session.Feed.withId(action.feedId).items.toModelArray().forEach(
          (item) => item.delete()
        )
        break
      default:
        break
    }
  }
}
