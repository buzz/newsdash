import { IconReload, IconSettings, IconSquarePlus } from '@tabler/icons-react'
import type { PanelData } from 'rc-dock'

import { requestNewTab } from '#store/slices/layout/actions'
import { editTab, refreshTab } from '#store/slices/layout/entities/tabs/actions'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import { isTabEditMode } from '#types/typeGuards'
import { useDispatch, useSelector } from '#ui/hooks/store'
import type { RootState } from '#store/types'

import PanelButton from './PanelButton'

function PanelExtra({ panel }: PanelExtraProps) {
  const dispatch = useDispatch()
  const selectTab = (state: RootState) => tabsSelectors.selectById(state, panel.activeId ?? '')
  const tab = useSelector(selectTab)

  const refreshDisabled = tab.status === 'loading'
  const editDisabled = isTabEditMode(tab.status)

  return (
    <>
      <PanelButton
        label="Add Feed"
        onClick={() => {
          dispatch(requestNewTab(panel.id))
        }}
      >
        <IconSquarePlus />
      </PanelButton>
      <PanelButton
        disabled={refreshDisabled}
        label="Refresh Feed"
        onClick={() => {
          dispatch(refreshTab(tab.id))
        }}
      >
        <IconReload />
      </PanelButton>
      <PanelButton
        disabled={editDisabled}
        label="Feed Settings"
        onClick={() => {
          dispatch(editTab({ id: tab.id, changes: { status: 'edit' } }))
        }}
      >
        <IconSettings />
      </PanelButton>
    </>
  )
}

interface PanelExtraProps {
  panel: PanelData
}

export default PanelExtra
