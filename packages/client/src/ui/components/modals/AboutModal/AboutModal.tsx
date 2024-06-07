import { Group, Text } from '@mantine/core'
import { IconBrandGithub, IconScale } from '@tabler/icons-react'

import { useGetVersionQuery } from '#store/slices/api/version'
import Logo from '#ui/components/common/Logo'
import Modal from '#ui/components/common/Modal'

import IconButton from './IconButton'

import classes from './AboutModal.module.css'

function AboutModal() {
  const { data, isSuccess } = useGetVersionQuery(undefined, {})

  return (
    <Modal name="about">
      <Logo className={classes.logo} />
      <Text className={classes.text} fz="lg" ta="center">
        A News Dashboard
      </Text>
      <Text fz="md" ta="center">
        A Modern Tribute to iGoogle and Netvibes
      </Text>
      <Text className={classes.text} fz="sm" ta="center">
        Version {isSuccess ? data.version : ''}
      </Text>
      <Group className={classes.links} justify="center">
        <IconButton
          href="https://github.com/buzz/newsdash"
          tooltip="https://github.com/buzz/newsdash"
        >
          <IconBrandGithub />
        </IconButton>
        <IconButton
          href="https://www.gnu.org/licenses/agpl-3.0.en.html"
          tooltip="Licensed under the AGPL-3.0"
        >
          <IconScale />
        </IconButton>
      </Group>
    </Modal>
  )
}

export default AboutModal
