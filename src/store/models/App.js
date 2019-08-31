import { Model, attr } from 'redux-orm'

import { DEFAULT_CORS_PROXY, DEFAULT_FAVICON_PROXY, DEFAULT_FETCH_INTERVAL } from '../../constants'

export default class App extends Model {
  static get modelName() {
    return 'App'
  }

  static get fields() {
    return {
      id: attr({ getDefault: () => 0 }),
      faviconProxy: attr({ getDefault: () => DEFAULT_FAVICON_PROXY }),
      corsProxy: attr({ getDefault: () => DEFAULT_CORS_PROXY }),
      fetchInterval: attr({ getDefault: () => DEFAULT_FETCH_INTERVAL }),
    }
  }
}