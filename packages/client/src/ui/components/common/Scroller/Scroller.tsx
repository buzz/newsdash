import { useElementSize } from '@mantine/hooks'
import cx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import SimpleBarReact from 'simplebar-react'
import type { ReactNode } from 'react'
import type SimpleBarCore from 'simplebar-core'
import type { Props as SimpleBarReactProps } from 'simplebar-react'

import classes from './Scroller.module.css'

const SCROLL_STATE_TOLERANCE = 2

function Scroller({ children }: ScrollerProps) {
  const { ref: wrapperRef, width, height } = useElementSize()
  const [className, setClassName] = useState<string | undefined>()
  const simplebarRef = useRef<SimpleBarCore>(null)
  const rafRef = useRef<number | null>(null)

  const setClassNamesFromScrollState = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      const scrollEl = simplebarRef.current?.getScrollElement()
      if (scrollEl) {
        const { clientHeight, scrollHeight, scrollTop } = scrollEl
        let newClassName: string | undefined

        // content fits into client area? (no fade masks)
        if (clientHeight < scrollHeight) {
          // at top? (bottom fade mask)
          if (scrollTop < SCROLL_STATE_TOLERANCE) {
            newClassName = cx(classes.fadeMask, classes.top)
          }

          // at bottom? (top fade mask)
          else if (Math.abs(scrollHeight - clientHeight - scrollTop) < SCROLL_STATE_TOLERANCE) {
            newClassName = cx(classes.fadeMask, classes.bottom)
          }

          // somewhere in between? (top and bottom fade mask)
          else {
            newClassName = classes.fadeMask
          }
        }

        setClassName(newClassName)
      }
    })
  }, [setClassName])

  // Scroll events
  useEffect(() => {
    const scrollEl = simplebarRef.current?.getScrollElement()

    if (scrollEl) {
      const handleScrollEvent = () => {
        setClassNamesFromScrollState()
      }
      scrollEl.addEventListener('scroll', handleScrollEvent)

      return () => {
        scrollEl.removeEventListener('scroll', handleScrollEvent)
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
        }
      }
    }
  }, [setClassNamesFromScrollState])

  // Resize events
  useEffect(() => {
    const scrollEl = simplebarRef.current?.getScrollElement()
    if (scrollEl && height > 0) {
      setClassNamesFromScrollState()
    }
  }, [height, setClassNamesFromScrollState])

  return (
    <div className={classes.wrapper} ref={wrapperRef}>
      <SimpleBarReact
        className={cx(classes.simplebar, className)}
        clickOnTrack={false}
        ref={simplebarRef}
      >
        {typeof children === 'function'
          ? (props) => children({ ...props, width, height })
          : children}
      </SimpleBarReact>
    </div>
  )
}

type SimpleBarRenderFuncProps = Parameters<
  Extract<SimpleBarReactProps['children'], (props: never) => ReactNode>
>[0]

interface RenderFuncProps extends SimpleBarRenderFuncProps {
  width: number
  height: number
}

interface ScrollerProps {
  children: ReactNode | ((props: RenderFuncProps) => ReactNode)
}

export default Scroller
