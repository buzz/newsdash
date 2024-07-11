import { useElementSize } from '@mantine/hooks'
import cx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import SimpleBarReact from 'simplebar-react'
import type { ReactNode, RefCallback } from 'react'

import classes from './Scroller.module.css'

const SCROLL_STATE_TOLERANCE = 2

function Scroller({ children }: ScrollerProps) {
  const { ref: wrapperRef, width, height } = useElementSize()
  const [className, setClassName] = useState<string | undefined>()
  const scrollableNodeRef = useRef<HTMLElement>()

  const setClassNamesFromScrollState = useCallback(
    ({ scrollHeight, scrollTop, clientHeight }: HTMLElement) => {
      // content fits into client area (no fade masks)
      if (clientHeight >= scrollHeight) {
        setClassName(undefined)
      }

      // scrolled to top (bottom fade mask)
      else if (scrollTop < SCROLL_STATE_TOLERANCE) {
        setClassName(cx(classes.fadeMask, classes.top))
      }

      // scrolled to bottom (top fade mask)
      else if (Math.abs(scrollHeight - clientHeight - scrollTop) < SCROLL_STATE_TOLERANCE) {
        setClassName(cx(classes.fadeMask, classes.bottom))
      }

      // scrolled somewhere in between (top and bottom fade mask)
      else {
        setClassName(classes.fadeMask)
      }
    },
    []
  )

  // Listen to scroll events
  useEffect(() => {
    if (scrollableNodeRef.current) {
      const node = scrollableNodeRef.current

      const handleScrollEvent = (event: Event) => {
        if (event.target instanceof HTMLElement) {
          setClassNamesFromScrollState(event.target)
        }
      }

      node.addEventListener('scroll', handleScrollEvent)
      return () => {
        node.removeEventListener('scroll', handleScrollEvent)
      }
    }
  }, [scrollableNodeRef, setClassNamesFromScrollState])

  // Scroll events are not enough, we also have to account for resize events
  useEffect(() => {
    if (height > 0 && scrollableNodeRef.current) {
      setClassNamesFromScrollState(scrollableNodeRef.current)
    }
  }, [height, scrollableNodeRef, setClassNamesFromScrollState])

  return (
    <div className={classes.wrapper} ref={wrapperRef}>
      <SimpleBarReact className={cx(classes.simplebar, className)} clickOnTrack={false}>
        {({ contentNodeRef, scrollableNodeRef: providedScrollableNodeRef }) =>
          children({
            className: classes.hideNativeScrollbars,
            width,
            height,
            contentNodeRef: (node: HTMLElement | null) => {
              contentNodeRef.current = node ?? undefined
            },
            scrollableNodeRef: (node: HTMLElement | null) => {
              providedScrollableNodeRef.current = node ?? undefined
              // Save a reference to scrollable node
              scrollableNodeRef.current = providedScrollableNodeRef.current
            },
          })
        }
      </SimpleBarReact>
    </div>
  )
}

type RenderFunc = (props: {
  className: string
  width: number
  height: number
  contentNodeRef: RefCallback<HTMLElement>
  scrollableNodeRef: RefCallback<HTMLElement>
}) => ReactNode

interface ScrollerProps {
  children: RenderFunc
}

export default Scroller
