import { Group, Text } from '@mantine/core'
import { IconBrandGithub, IconScale } from '@tabler/icons-react'

import { useGetVersionQuery } from '#store/slices/api/version'
import ModalInner from '#ui/components/App/Modal/ModalInner'
import Logo from '#ui/components/common/Logo/Logo'

import IconButton from './IconButton'

import classes from './AboutModal.module.css'

function AboutModal() {
  const { data, isSuccess } = useGetVersionQuery()

  return (
    <ModalInner>
      <Logo className={classes.logo} />
      <Text fz="lg" my="xs" ta="center">
        A News Dashboard
      </Text>
      <Text fz="md" my="xs" ta="center">
        Free and open-source alternative
        <br /> to iGoogle and Netvibes
      </Text>
      <Text fz="sm" my="xs" ta="center">
        Version {isSuccess ? data.version : ''}
      </Text>
      <Group justify="center" mt="lg">
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
    </ModalInner>
  )
}

export default AboutModal
