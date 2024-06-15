import { ActionIcon } from '@mantine/core'
import { IconReload, IconSettings } from '@tabler/icons-react'
import type { PanelData } from 'rc-dock'

import { editTab, refreshTab } from '#store/slices/layout/entities/tabs/actions'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import Tooltip from '#ui/components/common/Tooltip'
import { useDispatch, useSelector } from '#ui/hooks/store'
import type { RootState } from '#store/types'

import classes from './Panel.module.css'

function PanelExtra({ panel }: PanelExtraProps) {
  const dispatch = useDispatch()
  const selectTab = (state: RootState) => tabsSelectors.selectById(state, panel.activeId ?? '')
  const tab = useSelector(selectTab)

  const refreshDisabled = tab.status === 'loading'
  const editDisabled = tab.editMode !== undefined

  return (
    <>
      <Tooltip disabled={refreshDisabled} label="Refresh tab">
        <ActionIcon
          aria-label="Refresh tab"
          className={classes.actionButton}
          disabled={refreshDisabled}
          onClick={() => {
            dispatch(refreshTab(tab.id))
          }}
          size="xs"
          variant="transparent"
        >
          <IconReload />
        </ActionIcon>
      </Tooltip>
      <Tooltip disabled={editDisabled} label="Tab settings">
        <ActionIcon
          aria-label="Tab settings"
          className={classes.actionButton}
          disabled={editDisabled}
          onClick={() => {
            dispatch(editTab({ id: tab.id, changes: { editMode: 'edit' } }))
          }}
          size="xs"
          variant="transparent"
        >
          <IconSettings />
        </ActionIcon>
      </Tooltip>
    </>
  )
}

interface PanelExtraProps {
  panel: PanelData
}

export default PanelExtra
