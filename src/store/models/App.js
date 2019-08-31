import { Model, attr } from 'redux-orm'

import { CORS_PROXY, FAVICON_PROXY } from '../../constants'

export default class App extends Model {
  static get modelName() {
    return 'App'
  }

  static get fields() {
    return {
      id: attr({ getDefault: () => 0 }),
      faviconProxy: attr({ getDefault: () => FAVICON_PROXY }),
      corsProxy: attr({ getDefault: () => CORS_PROXY }),
    }
  }

  // static reducer(action, appModel) {
  //   const app = appModel.first()
  //   if (app) {
  //     switch (action.type) {
  //       case feedActionTypes.LOAD_FEED_SUCCESS:
  //         // app.set('error', action.error)
  //         break
  //       default:
  //         break
  //     }
  //   }
  // }
}
