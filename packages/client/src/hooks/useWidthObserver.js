import { useEffect, useRef, useState } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

const useWidthObserver = () => {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const { current: element } = ref
    const resizeObserver = new ResizeObserver(
      (entries) => {
        if (!Array.isArray(entries) || !entries.length) {
          return
        }
        setWidth(entries[0].contentRect.width)
      }
    )
    resizeObserver.observe(element)
    return () => resizeObserver.unobserve(element)
  }, [])

  return [ref, width]
}

export default useWidthObserver
