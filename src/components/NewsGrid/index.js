import React from 'react'
import { useSelector } from 'react-redux'
import { Responsive, WidthProvider } from 'react-grid-layout'
import Feed from './Feed'

import feedSelectors from '../../store/selectors/feed'

const ResponsiveGridLayout = WidthProvider(Responsive)

const generateLayouts = (feeds) => feeds.map((feed) => ({
  i: feed.id,
  x: feed.x,
  y: feed.y,
  w: feed.w,
  h: feed.h,
  minW: 1,
  maxW: 2,
  minH: 2,
  maxH: 12,
}))

const NewsGrid = () => {
  const feeds = useSelector(feedSelectors.getFeeds)

  const breakpoints = {
    lg: 1200, md: 996, sm: 768, xs: 480,
  }
  const cols = {
    lg: 4, md: 4, sm: 3, xs: 2,
  }

  const feedBoxes = feeds.map(({ id, url }) => (
    <div key={id}>
      <Feed id={id} url={url} />
    </div>
  ))

  const layouts = { lg: generateLayouts(feeds) }

  return (
    <ResponsiveGridLayout
      autoSize={false}
      breakpoints={breakpoints}
      cols={cols}
      draggableCancel=".nondraggable"
      margin={[4, 4]}
      layouts={layouts}
      rowHeight={48}
    >
      {feedBoxes}
    </ResponsiveGridLayout>
  )
}

export default NewsGrid
