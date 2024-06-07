import { Alert, Button, Center, Group, Space, Text, useMantineColorScheme } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

import { requestNewTab } from '#store/slices/layout/actions'
import { useDispatch } from '#ui/hooks/store'

function Placeholder() {
  const dispatch = useDispatch()
  const { colorScheme } = useMantineColorScheme()

  return (
    <Center maw="50%" mx="auto" sx={{ height: '100%' }}>
      <Alert
        color={colorScheme === 'light' ? 'dark' : undefined}
        title={
          <Text variant="gradient" gradient={{ from: 'yellow', to: 'red', deg: 45 }} fz="xl">
            Welcome to newsdash
          </Text>
        }
        p="xl"
        variant="outline"
      >
        <Text mt="xs">
          Let&apos;s personalize your experience by adding your first news feed.&nbsp;📰
        </Text>
        <Space h="md" />
        🌍 Simply click the button below and enter the URL of your preferred RSS feed.
        <Space h="md" />✨ <em>Happy reading!</em>&nbsp;📚
        <Group>
          <Button
            leftIcon={<IconPlus />}
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