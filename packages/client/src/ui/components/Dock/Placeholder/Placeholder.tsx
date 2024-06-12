import { Alert, Button, Center, Group, Space, Text } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

import { requestNewTab } from '#store/slices/layout/actions'
import { useDispatch } from '#ui/hooks/store'

import classes from './Placeholder.module.css'

function Placeholder() {
  const dispatch = useDispatch()

  return (
    <Center maw="50%" mx="auto" style={{ height: '100%' }}>
      <Alert
        className={classes.placeholder}
        title={
          <Text component="h1" className={classes.heading} variant="gradient" fz="xl">
            Welcome to newsdash
          </Text>
        }
        p="xl"
        variant="outline"
      >
        <Text mt="xs">📰 Add your first news feed to get started.</Text>
        <Space h="md" />
        🌍 Click the button below and enter the URL of your preferred RSS feed.
        <Space h="md" />✨ <em>Happy reading!</em>&nbsp;📚
        <Group>
          <Button
            leftSection={<IconPlus />}
            mt="lg"
            onClick={() => dispatch(requestNewTab())}
            variant="gradient"
          >
            Add Feed
          </Button>
        </Group>
      </Alert>
    </Center>
  )
}

export default Placeholder
