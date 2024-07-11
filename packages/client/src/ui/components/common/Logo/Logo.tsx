import cx from 'clsx'

import LogoDark from '#assets/logo.svg?react'

import classes from './Logo.module.css'

function Logo({ className }: LogoProps) {
  return <LogoDark className={cx(classes.logo, className)} />
}

interface LogoProps {
  className?: string
}

export default Logo
