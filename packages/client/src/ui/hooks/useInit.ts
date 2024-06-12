import { useEffect, useRef } from 'react'

import { init } from '#store/slices/app/actions'
import { useDispatch } from '#ui/hooks/store'

function useInit() {
  const dispatch = useDispatch()
  const initialized = useRef(false)
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      dispatch(init())
    }
  }, [dispatch])
}

export default useInit
