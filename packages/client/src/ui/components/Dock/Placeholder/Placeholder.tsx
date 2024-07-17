import { Alert, Button, Center, Stack, Text } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

import { requestNewTab } from '#store/slices/layout/actions'
import { useDispatch } from '#ui/hooks/store'

import classes from './Placeholder.module.css'

function Placeholder() {
  const dispatch = useDispatch()

  return (
    <Center maw="50%" mx="auto">
      <Alert
        className={classes.placeholder}
        title={
          <Text component="h1" className={classes.heading} variant="gradient" fw="bold" fz="h1">
            Welcome to newsdash!
          </Text>
        }
        p="lg"
        variant="outline"
      >
        <Stack>
          <Text fz="h3">Add your first news feed to get started.</Text>
          <Text>Click the button below and enter the URL of your favorite RSS feed.</Text>
          <Text className={classes.happyReading}>🎉 Happy reading!</Text>
          <Button
            leftSection={<IconPlus />}
            onClick={() => dispatch(requestNewTab())}
            variant="gradient"
          >
            Add Feed
          </Button>
        </Stack>
      </Alert>
    </Center>
  )
}

export default Placeholder
