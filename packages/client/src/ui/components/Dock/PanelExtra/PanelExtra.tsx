import { Flex } from '@mantine/core'
import { IconAdjustments, IconTrash } from '@tabler/icons-react'
import type { PanelData } from 'rc-dock'

import { removeTab } from '#store/slices/layout/entities/tabs/actions'
import { useDispatch } from '#ui/hooks/store'

import IconButton from './IconButton'

function PanelExtra({ panel }: PanelExtraProps) {
  const dispatch = useDispatch()

  return (
    <Flex gap="xs" align="center" direction="row" px="xs" wrap="nowrap">
      <IconButton icon={<IconAdjustments />} />
      <IconButton
        color="red.5"
        icon={<IconTrash />}
        onClick={() => dispatch(removeTab(panel.activeId))}
      />
    </Flex>
  )
}

interface PanelExtraProps {
  panel: PanelData
}

export default PanelExtra
