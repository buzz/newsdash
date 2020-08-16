import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import getApp from 'newsdash/store/selectors/app'
import feedBoxSelectors from 'newsdash/store/selectors/feedBox'
import { editFeedBox } from 'newsdash/store/actions/feedBox'
import FeedBox from 'newsdash/components/FeedBox'
import css from './NewsGrid.sss'

const ResponsiveGridLayout = WidthProvider(Responsive)

const generateLayout = (feedBoxes) =>
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

const NewsGrid = () => {
  const dispatch = useDispatch()
  const { gridCols } = useSelector(getApp)
  const feedBoxes = useSelector(feedBoxSelectors.getFeedBoxes)
  const layout = generateLayout(feedBoxes)

  const onLayoutChange = (newLayout) => {
    newLayout.forEach((newItem) => {
      const item = layout.find((layoutItem) => layoutItem.i === newItem.i)
      if (
        newItem.x !== item.x ||
        newItem.y !== item.y ||
        newItem.w !== item.w ||
        newItem.h !== item.h
      ) {
        dispatch(
          editFeedBox(parseInt(newItem.i, 10), {
            x: newItem.x,
            y: newItem.y,
            w: newItem.w,
            h: newItem.h,
          })
        )
      }
    })
  }

  return (
    <div className={css.newsGridWrapper}>
      <ResponsiveGridLayout
        breakpoints={{ lg: 1200 }}
        cols={{ lg: gridCols }}
        containerPadding={[8, 8]}
        draggableCancel=".nondraggable"
        layouts={{ lg: layout }}
        onLayoutChange={onLayoutChange}
        rowHeight={8}
      >
        {feedBoxes.map((feedBox) => (
          <div key={feedBox.id.toString()}>
            <FeedBox feedBox={feedBox} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  )
}

export default NewsGrid
