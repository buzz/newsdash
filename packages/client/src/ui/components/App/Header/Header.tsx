import {
  createStyles,
  Group,
  Header as MantineHeader,
  Transition,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { IconInfoSmall, IconMoonStars, IconSettings, IconSun, IconX } from '@tabler/icons-react'

import { changeHeaderVisibile, openModal, selectHeaderVisibile } from '#store/slices/appSlice'
import Logo from '#ui/components/common/Logo'
import { useDispatch, useSelector } from '#ui/hooks/store'

import HeaderButton from './HeaderButton'
import HeaderToggleButton from './HeaderToggleButton'

const useStyles = createStyles({ headerChild: { height: '100%' } })

function Header() {
  const dispatch = useDispatch()
  const headerVisible = useSelector(selectHeaderVisibile)
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const { classes } = useStyles()
  const theme = useMantineTheme()

  return (
    <>
      <HeaderToggleButton hide={headerVisible} />
      <Transition
        duration={theme.other.transition.duration.default}
        mounted={headerVisible}
        timingFunction={theme.transitionTimingFunction}
        transition="slide-down"
      >
        {(styles) => (
          <MantineHeader height={60} p="xs" style={styles}>
            <Group className={classes.headerChild} px={20} position="apart">
              <Logo className={classes.headerChild} />
              <Group className={classes.headerChild} pl={20} position="right" grow={false}>
                <HeaderButton onClick={() => dispatch(openModal('about'))} tooltip="About newsdash">
                  <IconInfoSmall size={32} />
                </HeaderButton>
                <HeaderButton onClick={() => toggleColorScheme()} tooltip="Toggle color scheme">
                  {colorScheme === 'dark' ? <IconSun size="1rem" /> : <IconMoonStars size="1rem" />}
                </HeaderButton>
                <HeaderButton
                  onClick={() => dispatch(openModal('settings'))}
                  tooltip="Open settings"
                >
                  <IconSettings />
                </HeaderButton>
                <HeaderButton
                  onClick={() => dispatch(changeHeaderVisibile(false))}
                  tooltip="Close header"
                >
                  <IconX />
                </HeaderButton>
              </Group>
            </Group>
          </MantineHeader>
        )}
      </Transition>
    </>
  )
}

export default Header
