import { useMantineTheme } from '@mantine/styles'

import { ReactComponent as LogoDarkSvg } from '#assets/logo-dark.svg'
import { ReactComponent as LogoLightSvg } from '#assets/logo-light.svg'

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
