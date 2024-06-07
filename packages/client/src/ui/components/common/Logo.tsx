import { useMantineTheme } from '@mantine/styles'

import LogoDarkSvg from '#assets/logo-dark.svg?react'
import LogoLightSvg from '#assets/logo-light.svg?react'

function Logo({ className }: LogoProps) {
  const theme = useMantineTheme()

  return theme.colorScheme === 'dark' ? (
    <LogoDarkSvg className={className} />
  ) : (
    <LogoLightSvg className={className} />
  )
}

interface LogoProps {
  className?: string
}

export default Logo
