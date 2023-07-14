import { Group, Text } from '@mantine/core'
import { createStyles } from '@mantine/styles'
import { IconBrandGithub, IconScale } from '@tabler/icons-react'

// eslint-disable-next-line import/no-unresolved
import pkgInfo from '#pkg-info' assert { type: 'json' }
import Logo from '#ui/components/common/Logo'
import Modal from '#ui/components/common/Modal'

import IconButton from './IconButton'

const useStyles = createStyles((theme) => ({
  logo: {
    padding: `0 ${theme.spacing.xl} ${theme.spacing.xl}`,
  },
  text: {
    paddingTop: theme.spacing.xs,
  },
  links: {
    paddingTop: theme.spacing.xl,
  },
}))

function AboutModal() {
  const { classes } = useStyles()

  return (
    <Modal name="about">
      <Logo className={classes.logo} />
      <Text className={classes.text} fz="lg" ta="center">
        A news dashboard
      </Text>
      <Text fz="md" ta="center">
        inspired by iGoogle and Netvibes
      </Text>
      <Text className={classes.text} fz="sm" ta="center">
        Version {pkgInfo.version}
      </Text>
      <Group className={classes.links} position="center">
        <IconButton href={pkgInfo.homepage} tooltip={pkgInfo.homepage}>
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
