import orm from './orm'

// create the initial (and only) instance of App
const defaultInitialState = () => {
  const session = orm.session(orm.getEmptyState())
  session.App.create({})

  // session.Feed.create({
  //   url: 'https://www.spiegel.de/schlagzeilen/index.rss',
  //   title: 'Spiegel',
  //   link: 'https://www.spiegel.de/',
  // })
  // session.FeedItem.create({
  //   id: 'aaa',
  //   title: 'A',
  //   link: 'https://www.spiegel.de/',
  //   feed: 'https://www.spiegel.de/schlagzeilen/index.rss',
  //   date: 'Sat, 31 Aug 2019 13:42:40 +0200',
  // })

  return { orm: session.state }
}

export default defaultInitialState
