import { InputLabel, InputWrapper as MantineInputWrapper, Text } from '@mantine/core'
import { IconHelpCircle } from '@tabler/icons-react'
import type { MantineSpacing, StyleProp } from '@mantine/core'
import type { ReactNode } from 'react'

import Tooltip from '#ui/components/common/Tooltip'

import classes from './InputWrapper.module.css'

function InputWrapper({
  children,
  error,
  help,
  label,
  mb,
  mt,
  required = false,
  rightSection,
}: InputWrapperProps) {
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
    <MantineInputWrapper error={error} mb={mb} mt={mt}>
      <InputLabel className={classes.label} mb={children ? 'xs' : undefined} required={required}>
        {label}
        {help && (
          <Tooltip label={help} maw={350} multiline>
            <IconHelpCircle className={classes.icon} />
          </Tooltip>
        )}
        {rightSectionNode}
      </InputLabel>
      {children}
    </MantineInputWrapper>
  )
}

interface InputWrapperProps {
  children?: ReactNode
  error?: ReactNode
  help?: ReactNode
  label: string
  mb?: StyleProp<MantineSpacing>
  mt?: StyleProp<MantineSpacing>
  required?: boolean
  rightSection?: ReactNode
}

export default InputWrapper
