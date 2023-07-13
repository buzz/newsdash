import { Box } from '@mantine/core'

import Dock from './Dock'

function DockBox() {
  return (
    <Box
      sx={(theme) => ({
        '> div': {
          position: 'absolute',
          top: theme.spacing.xs,
          right: theme.spacing.xs,
          bottom: theme.spacing.xs,
          left: theme.spacing.xs,
        },
      })}
    >
      <Dock />
    </Box>
  )
}

export default DockBox
