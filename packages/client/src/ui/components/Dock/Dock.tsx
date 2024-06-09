import 'rc-dock/dist/rc-dock.css'
import './Dock.css'

import DockLayout from 'rc-dock'
import { useCallback } from 'react'

import { EMPTY_LAYOUT, PLACEHOLDER_LAYOUT } from '#constants'
import { selectIsLoadingInitialState } from '#store/slices/app/selectors'
import { rcLayoutChange, rcLayoutReady } from '#store/slices/layout/actions'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import { selectDenormalizedLayout } from '#store/slices/layout/selectors'
import { useDispatch, useSelector } from '#ui/hooks/store'
import type { CustomLayoutBase } from '#types/layout'

import groups from './groups'
import loadTab from './loadTab'

function Dock() {
  const dispatch = useDispatch()
  const denormalizedLayout = useSelector(selectDenormalizedLayout)
  const tabCount = useSelector(tabsSelectors.selectTotal)
  let layout = tabCount > 0 ? denormalizedLayout : PLACEHOLDER_LAYOUT

  const isLoadingInitialState = useSelector(selectIsLoadingInitialState)

  if (isLoadingInitialState) {
    layout = EMPTY_LAYOUT
  }

  // useCallback, otherwise ref callback gets fired multiple times
  const setRcDockRef = useCallback(() => {
    dispatch(rcLayoutReady())
  }, [dispatch])

  return (
    <DockLayout
      dropMode="edge"
      groups={groups}
      layout={layout}
      loadTab={loadTab}
      onLayoutChange={(newLayout) => dispatch(rcLayoutChange(newLayout as CustomLayoutBase))}
      ref={setRcDockRef}
    />
  )
}

export default Dock
