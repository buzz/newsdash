import 'rc-dock/dist/rc-dock.css'
import './Dock.css'

import DockLayout from 'rc-dock'
import { useCallback, useEffect } from 'react'

import { layoutChange, rcLayoutReady, rcLayoutChange } from '#store/slices/layout/actions'
import { selectDenormalizedLayout } from '#store/slices/layout/selectors'
import { useDispatch, useSelector } from '#ui/hooks/store'

import groups from './groups'
import loadTab from './loadTab'

function Dock() {
  const dispatch = useDispatch()
  const layout = useSelector(selectDenormalizedLayout)

  // useCallback, otherwise ref callback gets fired multiple times
  const setRcDockRef = useCallback(() => {
    dispatch(rcLayoutReady())
  }, [dispatch])

  useEffect(() => {
    dispatch(layoutChange(layout))
  }, [layout])

  return (
    <DockLayout
      dropMode="edge"
      groups={groups}
      layout={layout}
      loadTab={loadTab}
      onLayoutChange={(newLayout) => dispatch(rcLayoutChange(newLayout))}
      ref={setRcDockRef}
    />
  )
}

export default Dock
