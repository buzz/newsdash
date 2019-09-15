import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import getApp from 'newsdash/store/selectors/app'
import feedBoxSelectors from 'newsdash/store/selectors/feedBox'
import { editFeedBox } from 'newsdash/store/actions/feedBox'
import FeedBox from './FeedBox'
import css from './NewsGrid.sass'

const ResponsiveGridLayout = WidthProvider(Responsive)

const generateLayout = (feedBoxes) => (
  feedBoxes.map((feedBox) => ({
    i: feedBox.id.toString(),
    x: feedBox.x,
    y: feedBox.y,
    w: feedBox.w,
    h: feedBox.h,
    minW: 1,
    maxW: Infinity,
    minH: 2,
    maxH: Infinity,
  }))
)

const NewsGrid = () => {
  const dispatch = useDispatch()
  const { gridCols } = useSelector(getApp)
  const feedBoxes = useSelector(feedBoxSelectors.getFeedBoxes)
  const onLayoutChange = (layout) => {
    layout.forEach(
      (item) => {
        dispatch(
          editFeedBox(
            parseInt(item.i, 10),
            {
              x: item.x, y: item.y, w: item.w, h: item.h,
            })
        )
      }
    )
  }

  return (
    <div className={css.newsGridWrapper}>
      <ResponsiveGridLayout
        breakpoints={{ lg: 1200 }}
        cols={{ lg: gridCols }}
        draggableCancel=".nondraggable"
        layouts={{ lg: generateLayout(feedBoxes) }}
        margin={[16, 16]}
        onLayoutChange={onLayoutChange}
        rowHeight={48}
      >
        {
          feedBoxes.map((feedBox) => (
            <div key={feedBox.id.toString()}>
              <FeedBox feedBox={feedBox} />
            </div>
          ))
        }
      </ResponsiveGridLayout>
    </div>
  )
}

export default NewsGrid
