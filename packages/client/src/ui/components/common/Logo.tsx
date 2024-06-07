import { useComputedColorScheme } from '@mantine/core'

import LogoDarkSvg from '#assets/logo-dark.svg?react'
import LogoLightSvg from '#assets/logo-light.svg?react'

// TODO: change colors using CSS
function Logo({ className }: LogoProps) {
  const colorScheme = useComputedColorScheme()

  return colorScheme === 'dark' ? (
    <LogoDarkSvg className={className} />
  ) : (
    <LogoLightSvg className={className} />
  )
}

interface LogoProps {
  className?: string
}

export default Logo
