import { ORM } from 'redux-orm'

import App from './models/App'
import Feed from './models/Feed'
import FeedBox from './models/FeedBox'
import FeedItem from './models/FeedItem'

const orm = new ORM()
orm.register(App, Feed, FeedBox, FeedItem)

export default orm
