import { createSelector } from 'redux-orm'
import escapeStringRegexp from 'escape-string-regexp'

import orm from 'newsdash/store/orm'
import selectId from './id'

const filterItems = (items, pattern) => {
  const testFields = ['link', 'title', 'content']
  const regexps = pattern.split(',').reduce((acc, word) => {
    try {
      acc.push(new RegExp(escapeStringRegexp(word.trim()), 'i'))
    } catch {
      //
    }
    return acc
  }, [])
  return items.filter((item) => {
    for (let i = 0; i < testFields.length; i += 1) {
      for (let j = 0; j < regexps.length; j += 1) {
        if (regexps[j].test(item[testFields[i]])) {
          return false
        }
      }
    }
    return true
  })
}

const getAllFeedItems = createSelector(orm, (session) =>
  session.FeedItem.all().toRefArray()
)

const makeGetFeedItems = () =>
  createSelector(orm, selectId, (session, id) => {
    const feed = session.Feed.withId(id)
    if (!feed) {
      return []
    }
    const items = feed.items.toRefArray().sort((a, b) => b.date - a.date) // sort by date
    return feed.filter ? filterItems(items, feed.filter) : items
  })

export default {
  getAllFeedItems,
  makeGetFeedItems,
}
