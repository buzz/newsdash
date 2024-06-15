import { Alert, Center, Code } from '@mantine/core'
import { IconExclamationCircle, IconInfoCircle, IconLoader } from '@tabler/icons-react'

import type { CustomTabData } from '#types/layout'

import classes from './EmptyList.module.css'

function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <Alert color="red" icon={<IconExclamationCircle />} title="Error" variant="outline">
      Failed to fetch feed items:
      <br />
      <Code>{message}</Code>
    </Alert>
  )
}

interface ErrorAlertProps {
  message: string
}

function LoadingAlert() {
  return (
    <Alert icon={<IconLoader className={classes.loader} />} title="Loading…" variant="outline">
      Loading feed items.
    </Alert>
  )
}

function EmptyAlert() {
  return (
    <Alert icon={<IconInfoCircle />} title="No feed items" variant="outline">
      This tab has no feed icons.
    </Alert>
  )
}

function EmptyList({ tab }: EmptyListProps) {
  let alert: JSX.Element

  if (tab.status === 'loading') {
    alert = <LoadingAlert />
  } else if (tab.error) {
    alert = <ErrorAlert message={tab.error} />
  } else {
    alert = <EmptyAlert />
  }

  return (
    <Center h="100%" p="sm">
      {alert}
    </Center>
  )
}

interface EmptyListProps {
  tab: CustomTabData
}

export default EmptyList
