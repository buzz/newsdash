import { Box, createStyles } from '@mantine/core'
import type { LayoutBase, TabBase, TabData, TabGroup } from 'rc-dock'
import DockLayout from 'rc-dock'
import 'rc-dock/dist/rc-dock.css'

import { changeLayout, selectLayout } from '#store/slices/layoutSlice'
import { useDispatch, useSelector } from '#ui/hooks/store'

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexGrow: 1,
    padding: theme.spacing.xs,

    '& > .dock-layout': {
      flexGrow: 1,
    },
  },
}))

const groups: Record<string, TabGroup> = {
  news: {
    maximizable: true,
    floatable: false,
  },
}

function loadTab({ id }: TabBase): TabData {
  return {
    id,
    content: (
      <div>
        Tab Content <code>ID={id}</code>
      </div>
    ),
    group: 'news',
    title: id ?? 'Default title',
  }
}

function Dock() {
  const dispatch = useDispatch()
  const layout = useSelector(selectLayout)
  const { classes } = useStyles()

  const onLayoutChange = (newLayout: LayoutBase) => {
    dispatch(changeLayout(newLayout))
  }

  return (
    <Box className={classes.wrapper}>
      <DockLayout
        layout={layout}
        groups={groups}
        loadTab={loadTab}
        onLayoutChange={onLayoutChange}
      />
    </Box>
  )
}

export default Dock
