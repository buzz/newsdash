import { ORM } from 'redux-orm'

import App from './models/App'
import Feed from './models/Feed'
import FeedBox from './models/FeedBox'
import FeedItem from './models/FeedItem'
import Notification from './models/Notification'

const orm = new ORM({ stateSelector: (state) => state.orm })
orm.register(App, Feed, FeedBox, FeedItem, Notification)

export default orm
