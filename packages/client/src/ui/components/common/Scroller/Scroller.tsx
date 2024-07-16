import { useElementSize } from '@mantine/hooks'
import { IconSquareRoundedChevronUpFilled } from '@tabler/icons-react'
import cx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import SimpleBarReact from 'simplebar-react'
import type { ReactNode } from 'react'
import type SimpleBarCore from 'simplebar-core'
import type { Props as SimpleBarReactProps } from 'simplebar-react'

import IconButton from '#ui/components/modals/AboutModal/IconButton'

import classes from './Scroller.module.css'

const SCROLL_STATE_TOLERANCE = 2

function Scroller({ children, showScrollToTop }: ScrollerProps) {
  const { ref: wrapperRef, width, height } = useElementSize()
  const [className, setClassName] = useState<string | undefined>()
  const [scrollToTopVisible, setScrollToTopVisible] = useState(false)
  const simplebarRef = useRef<SimpleBarCore>(null)
  const rafRef = useRef<number | null>(null)

  const onClickScrollToTop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      const scrollEl = simplebarRef.current?.getScrollElement()
      if (scrollEl) {
        scrollEl.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
  }, [])

  const setClassNamesFromScrollState = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      const scrollEl = simplebarRef.current?.getScrollElement()
      if (scrollEl) {
        const { clientHeight, scrollHeight, scrollTop } = scrollEl
        let newClassName: string | undefined
        let newScrollToTopVisible = false

        // content fits into client area? (no fade masks)
        if (clientHeight < scrollHeight) {
          // at top? (bottom fade mask)
          if (scrollTop < SCROLL_STATE_TOLERANCE) {
            newClassName = cx(classes.fadeMask, classes.top)
          }

          // at bottom? (top fade mask)
          else if (Math.abs(scrollHeight - clientHeight - scrollTop) < SCROLL_STATE_TOLERANCE) {
            newClassName = cx(classes.fadeMask, classes.bottom)
            newScrollToTopVisible = true
          }

          // somewhere in between? (top and bottom fade mask)
          else {
            newClassName = classes.fadeMask
            newScrollToTopVisible = true
          }
        }

        setClassName(newClassName)
        setScrollToTopVisible(newScrollToTopVisible)
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
      {showScrollToTop && (
        <IconButton
          className={cx(classes.scrollToTop, { [classes.show]: scrollToTopVisible })}
          onClick={onClickScrollToTop}
          tooltip={scrollToTopVisible ? 'Scroll to top' : undefined}
          variant="transparent"
        >
          <IconSquareRoundedChevronUpFilled />
        </IconButton>
      )}
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
  showScrollToTop?: boolean
}

export default Scroller
