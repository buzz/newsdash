import orm from './orm'

// create the initial (and only) instance of App
const defaultInitialState = () => {
  const session = orm.session(orm.getEmptyState())
  session.App.create({})
  return { orm: session.state }
}

export default defaultInitialState
