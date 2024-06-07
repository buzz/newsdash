import { Box, useMantineTheme } from '@mantine/core'
import { Scrollbars } from 'react-custom-scrollbars-2'

import classes from './Feed.module.css'

function HTrack() {
  return <div style={{ display: 'none' }} />
}

function Feed({ id }: FeedProps) {
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
