import cx from 'clsx'
import { useOverlayScrollbars, type UseOverlayScrollbarsParams } from 'overlayscrollbars-react'
import { useEffect, useRef, useState } from 'react'
import { FixedSizeList } from 'react-window'
import type { ComponentType } from 'react'
import type { ListChildComponentProps } from 'react-window'

import classes from './Feed.module.css'

const overlayScrollbarsParams: UseOverlayScrollbarsParams = {
  defer: true,
  options: {
    overflow: {
      x: 'hidden',
      y: 'scroll',
    },
    scrollbars: {
      autoHide: 'leave',
      autoHideDelay: 500,
      theme: classes.osTheme,
    },
    update: { elementEvents: null },
  },
}

function WindowedScroller<T>({ children, height, itemHeight, items }: WindowedScrollerProps<T>) {
  const [isAt, setIsAt] = useState<'top' | 'bottom' | undefined>('top')
  const rootRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const [initialize, osInstance] = useOverlayScrollbars(overlayScrollbarsParams)

  useEffect(() => {
    if (rootRef.current && outerRef.current) {
      initialize({
        target: rootRef.current,
        elements: {
          viewport: outerRef.current,
        },
      })
    }
    return () => osInstance()?.destroy()
  }, [initialize, osInstance])

  return (
    <div ref={rootRef}>
      <FixedSizeList
        className={cx(classes.list, {
          [classes.atTop]: isAt === 'top',
          [classes.atBottom]: isAt === 'bottom',
        })}
        height={height}
        width="100%"
        itemCount={items.length}
        itemData={items}
        itemSize={itemHeight}
        outerRef={outerRef}
        onScroll={({ scrollOffset }) => {
          if (scrollOffset < 2) {
            setIsAt('top')
          } else if (scrollOffset + height > itemHeight * items.length - 2) {
            setIsAt('bottom')
          } else {
            setIsAt(undefined)
          }
        }}
        overscanCount={1}
      >
        {children}
      </FixedSizeList>
    </div>
  )
}

interface WindowedScrollerProps<T> {
  children: ComponentType<ListChildComponentProps<T[]>>
  height: number
  itemHeight: number
  items: T[]
}

export default WindowedScroller
