import {
  ActionIcon,
  Box,
  createStyles,
  Transition,
  rem,
  Tooltip,
  useMantineTheme,
} from '@mantine/core'
import { IconArrowBigDownLinesFilled } from '@tabler/icons-react'

import { changeHeaderVisibile } from '#store/slices/appSlice'
import { useDispatch } from '#ui/hooks/store'

const useStyles = createStyles((theme) => ({
  floatingBox: {
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    zIndex: 9999,
  },

  btnWrapper: {
    opacity: 0.5,
    paddingTop: rem(3),
    paddingRight: rem(12),
    paddingBottom: rem(5),
    paddingLeft: rem(12),
    pointerEvents: 'all',
    position: 'relative',
    top: rem(-18),
    transitionDuration: `${theme.other.transition.duration.fast}ms`,
    transitionProperty: 'top, opacity',
    transitionTimingFunction: 'ease-in',
    '&:hover': {
      opacity: 1.0,
      top: 0,
    },
  },
}))

function HeaderToggleButton({ hide }: HeaderToggleButtonProps) {
  const dispatch = useDispatch()
  const { classes } = useStyles()
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
              <Tooltip label="Open header" position="bottom" withArrow>
                <ActionIcon
                  aria-label="Open header"
                  color="primary"
                  onClick={() => dispatch(changeHeaderVisibile(true))}
                  radius="xl"
                  size="lg"
                  title=" bar"
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
