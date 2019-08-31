import { ORM } from 'redux-orm'
import App from './models/App'
import Feed from './models/Feed'

const orm = new ORM()
orm.register(App, Feed)

export default orm
