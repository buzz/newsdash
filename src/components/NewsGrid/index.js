import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Responsive, WidthProvider } from 'react-grid-layout'
import Feed from './Feed'

import getApp from '../../store/selectors/app'
import feedSelectors from '../../store/selectors/feed'
import { storePosition } from '../../store/actions/feed'

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
  const dispatch = useDispatch()
  const { gridCols } = useSelector(getApp)
  const feeds = useSelector(feedSelectors.getFeeds)

  const layouts = { lg: generateLayouts(feeds) }

  const onLayoutChange = (layout) => (
    layout.forEach(
      (item) => {
        dispatch(
          storePosition(item.i, item.x, item.y, item.w, item.h)
        )
      }
    )
  )

  const feedBoxes = feeds.map(({ id, url }) => (
    <div key={id}>
      <Feed id={id} url={url} />
    </div>
  ))

  return (
    <ResponsiveGridLayout
      autoSize={false}
      breakpoints={{ lg: 1200 }}
      cols={{ lg: gridCols }}
      draggableCancel=".nondraggable"
      layouts={layouts}
      margin={[4, 4]}
      onLayoutChange={onLayoutChange}
      rowHeight={48}
    >
      {feedBoxes}
    </ResponsiveGridLayout>
  )
}

export default NewsGrid
