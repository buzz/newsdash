import { Box, createStyles } from '@mantine/core'

import Dock from './Dock'

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexGrow: 1,
    padding: theme.spacing.xs,

    '& > *': {
      flexGrow: 1,
    },
  },
}))

function DockWrapper() {
  return (
    <Box className={useStyles().classes.wrapper}>
      <Dock />
    </Box>
  )
}

export default DockWrapper
