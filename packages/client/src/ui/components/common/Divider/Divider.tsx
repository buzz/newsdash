import { Divider as MantineDivider } from '@mantine/core'

import classes from './Dividier.module.css'

function Divider({ label }: DividerProps) {
  return <MantineDivider className={classes.divider} label={label} size="sm" />
}

interface DividerProps {
  label?: string
}

export default Divider
