import { ActionIcon, Flex } from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'
import type { PanelData } from 'rc-dock'

import { editTab } from '#store/slices/layout/entities/tabs/actions'
import Tooltip from '#ui/components/common/Tooltip'
import { useDispatch } from '#ui/hooks/store'

import classes from './Panel.module.css'

function PanelExtra({ panel }: PanelExtraProps) {
  const dispatch = useDispatch()

  return (
    <Flex gap="xs" align="center" direction="row" px="xs" wrap="nowrap">
      <Tooltip label="Edit tab">
        <ActionIcon
          aria-label="Edit tab"
          className={classes.editButton}
          onClick={() => {
            if (panel.activeId) {
              dispatch(editTab({ id: panel.activeId, changes: { editMode: 'edit' } }))
            }
          }}
          size="xs"
          variant="transparent"
        >
          <IconSettings />
        </ActionIcon>
      </Tooltip>
    </Flex>
  )
}

interface PanelExtraProps {
  panel: PanelData
}

export default PanelExtra
