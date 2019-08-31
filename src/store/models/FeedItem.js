import { Model, attr, fk } from 'redux-orm'

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
}
