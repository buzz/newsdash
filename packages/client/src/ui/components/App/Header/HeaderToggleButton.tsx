import { ActionIcon, Box, createStyles, Transition, rem, useMantineTheme } from '@mantine/core'
import { IconArrowBigDownLinesFilled } from '@tabler/icons-react'

import { changeHeaderVisibile } from '#store/slices/app/actions'
import Tooltip from '#ui/components/common/Tooltip'
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
    paddingTop: rem(3),
    paddingRight: rem(12),
    paddingBottom: rem(5),
    paddingLeft: rem(12),
    pointerEvents: 'all',
    position: 'relative',
    top: rem(-24),
    transitionDuration: `${theme.other.transition.duration.fast}ms`,
    transitionProperty: 'top',
    transitionTimingFunction: 'ease-in',

    '& .mantine-ActionIcon-root': {
      backgroundColor: 'transparent',
      color: theme.colorScheme === 'dark' ? theme.colors.gray[6] : theme.colors.gray[5],
      transitionDuration: `${theme.other.transition.duration.fast}ms`,
      transitionProperty: 'background-color, color',
      transitionTimingFunction: 'ease-in',
    },

    '&:hover': {
      top: 0,

      '& .mantine-ActionIcon-root': {
        backgroundColor: theme.fn.primaryColor(),
        color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.white,
      },
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
