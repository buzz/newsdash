import { Box, ScrollArea } from '@mantine/core'

import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import { useSelector } from '#ui/hooks/store'
import type { RootState } from '#store/types'

import classes from './Feed.module.css'

function Feed({ id }: FeedProps) {
  const selectTab = (state: RootState) => tabsSelectors.selectById(state, id)
  const tab = useSelector(selectTab)

  return (
    <Box className={classes.wrapper}>
      <ScrollArea>
        <Box className={classes.innerWrapper}>
          {tab.id}
          <br />
          {tab.customTitle}
          <br />
          {tab.url}
        </Box>
      </ScrollArea>
    </Box>
  )
}

interface FeedProps {
  id: string
}

export default Feed
