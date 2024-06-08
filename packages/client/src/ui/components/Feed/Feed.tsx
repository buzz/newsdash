import { Box, useMantineTheme } from '@mantine/core'
import { Scrollbars } from 'react-custom-scrollbars-2'

import { globalizedTabsSelectors } from '#store/slices/layout/entities/tabs/selectors'
import { useSelector } from '#ui/hooks/store'
import type { RootState } from '#store/types'

import classes from './Feed.module.css'

function HTrack() {
  return <div style={{ display: 'none' }} />
}

function Feed({ id }: FeedProps) {
  const theme = useMantineTheme()
  const selectTab = (state: RootState) => globalizedTabsSelectors.selectById(state, id)
  const tab = useSelector(selectTab)

  return (
    <Box className={classes.wrapper}>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={theme.other.transition.duration.default}
        hideTracksWhenNotNeeded
        renderTrackHorizontal={HTrack}
      >
        <Box className={classes.innerWrapper}>
          {tab.id}
          <br />
          {tab.customTitle}
          <br />
          {tab.url}
        </Box>
      </Scrollbars>
    </Box>
  )
}

interface FeedProps {
  id: string
}

export default Feed
