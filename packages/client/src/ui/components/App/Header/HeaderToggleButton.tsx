import { ActionIcon, Box, Transition, useMantineTheme } from '@mantine/core'
import { IconArrowBigDownLinesFilled } from '@tabler/icons-react'

import { changeHeaderVisibile } from '#store/slices/app/actions'
import Tooltip from '#ui/components/common/Tooltip'
import { useDispatch } from '#ui/hooks/store'

import classes from './Header.module.css'

function HeaderToggleButton({ hide }: HeaderToggleButtonProps) {
  const dispatch = useDispatch()
  const theme = useMantineTheme()

  return (
    <Box className={classes.floatingBox}>
      <Transition
        duration={theme.other.transition.duration.default}
        mounted={!hide}
        transition="slide-down"
      >
        {(styles) => (
          <Box style={styles}>
            <Box className={classes.btnWrapper}>
              <Tooltip label="Expand navigation bar">
                <ActionIcon
                  aria-label="Expand navigation bar"
                  color="primary"
                  onClick={() => dispatch(changeHeaderVisibile(true))}
                  radius="xl"
                  size="lg"
                  variant="filled"
                >
                  <IconArrowBigDownLinesFilled />
                </ActionIcon>
              </Tooltip>
            </Box>
          </Box>
        )}
      </Transition>
    </Box>
  )
}

interface HeaderToggleButtonProps {
  hide: boolean
}

export default HeaderToggleButton
