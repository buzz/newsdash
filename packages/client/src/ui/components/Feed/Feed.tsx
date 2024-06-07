import { Box, createStyles, useMantineTheme } from '@mantine/core'
import { Scrollbars } from 'react-custom-scrollbars-2'

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    height: '100%',
  },

  innerWrapper: {
    padding: theme.spacing.xs,
  },
}))

function HTrack() {
  return <div style={{ display: 'none' }} />
}

function Feed({ id }: FeedProps) {
  const { classes } = useStyles()
  const theme = useMantineTheme()

  return (
    <Box className={classes.wrapper}>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={theme.other.transition.duration.default}
        hideTracksWhenNotNeeded
        renderTrackHorizontal={HTrack}
      >
        <Box className={classes.innerWrapper}>Feed placeholder</Box>
      </Scrollbars>
    </Box>
  )
}

interface FeedProps {
  id: string
}

export default Feed
