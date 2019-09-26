import { createSelector } from 'redux-orm'

import orm from 'newsdash/store/orm'

const getSettingsExport = createSelector(
  orm,
  (session) => {
    const app = session.App.first().ref
    return {
      app: {
        corsProxy: app.corsProxy,
        feedItemsToKeep: app.feedItemsToKeep,
        fetchInterval: app.fetchInterval,
        gridCols: app.gridCols,
        lightness: app.lightness,
        saturation: app.saturation,
      },
      feedBoxes: session.FeedBox.all().toRefArray(),
      feeds: session.Feed.all().toRefArray().map((feed) => ({
        ...feed,
        lastFetched: undefined,
        status: undefined,
        error: undefined,
      })),
    }
  }
)

export default getSettingsExport
