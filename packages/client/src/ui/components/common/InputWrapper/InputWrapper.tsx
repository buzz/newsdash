import { InputLabel, InputWrapper as MantineInputWrapper, Text } from '@mantine/core'
import { IconHelpCircle } from '@tabler/icons-react'
import type { ReactNode } from 'react'

import Tooltip from '#ui/components/common/Tooltip'

import classes from './InputWrapper.module.css'

function InputWrapper({
  children,
  help,
  label,
  required = false,
  rightSection,
  show = true,
}: InputWrapperProps) {
  const helpButton = help ? (
    <Tooltip label={help}>
      <IconHelpCircle className={classes.icon} />
    </Tooltip>
  ) : null

  let rightSectionNode: ReactNode = null
  if (rightSection !== undefined) {
    const node =
      typeof rightSection === 'string' ? (
        <Text component="span" fw={500} size="sm">
          {rightSection}
        </Text>
      ) : (
        rightSection
      )

    rightSectionNode = (
      <>
        <span className={classes.spacer} />
        {node}
      </>
    )
  }

  return (
    <MantineInputWrapper display={show ? undefined : 'none'}>
      <InputLabel className={classes.label} mb={children ? 'xs' : undefined} required={required}>
        {label}
        {helpButton}
        {rightSectionNode}
      </InputLabel>
      {children}
    </MantineInputWrapper>
  )
}

interface InputWrapperProps {
  children?: ReactNode
  help?: string
  label: string
  required?: boolean
  rightSection?: ReactNode
  show?: boolean
}

export default InputWrapper
