import { Box } from '@mantine/core'

import AddFeedForm from '#ui/components/forms/AddFeedForm'

function NewsFeed({ id, title }: NewsFeedProps) {
  return (
    <Box p="xs">
      <AddFeedForm />
    </Box>
  )
}

interface NewsFeedProps {
  id?: string
  title?: string
}

export default NewsFeed
