import DockLayout from 'rc-dock'
import { useCallback } from 'react'
import 'rc-dock/dist/rc-dock.css'

import { handleLayoutChange, layoutReady } from '#store/slices/layout/actions'
import { selectDenormalizedLayout } from '#store/slices/layout/selectors'
import { useDispatch, useSelector } from '#ui/hooks/store'

import groups from './groups'
import loadTab from './loadTab'

function Dock() {
  const dispatch = useDispatch()
  const layout = useSelector(selectDenormalizedLayout)

  // useCallback, otherwise ref callback gets fired multiple times
  const setRcDockRef = useCallback(
    (ref: DockLayout) => {
      if (ref) {
        dispatch(layoutReady())
      }
    },
    [dispatch]
  )

  return (
    <DockLayout
      groups={groups}
      layout={layout}
      loadTab={loadTab}
      onLayoutChange={(newLayout) => dispatch(handleLayoutChange(newLayout))}
      ref={setRcDockRef}
    />
  )
}

export default Dock
