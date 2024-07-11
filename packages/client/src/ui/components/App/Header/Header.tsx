import { AppShell, Group, Transition, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import {
  IconInfoSquare,
  IconMoonStars,
  IconPlus,
  IconSettings,
  IconSun,
  IconX,
} from '@tabler/icons-react'

import { changeHeaderVisibile, openModal } from '#store/slices/app/actions'
import { selectHeaderVisibile } from '#store/slices/app/selectors'
import { requestNewTab } from '#store/slices/layout/actions'
import Logo from '#ui/components/common/Logo/Logo'
import { useDispatch, useSelector } from '#ui/hooks/store'

import HeaderButton from './HeaderButton'
import HeaderToggleButton from './HeaderToggleButton'

import classes from './Header.module.css'

function Header() {
  const dispatch = useDispatch()
  const headerVisible = useSelector(selectHeaderVisibile)
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  return (
    <>
      <HeaderToggleButton hide={headerVisible} />
      <Transition
        duration={theme.other.transition.duration.default}
        mounted={headerVisible}
        timingFunction={theme.other.transition.timingFunction}
        transition="slide-down"
      >
        {(styles) => (
          <AppShell.Header className={classes.header} style={styles}>
            <Group justify="space-between" wrap="nowrap">
              <Logo className={classes.logo} />
              <Group pl={20} justify="flex-end" wrap="nowrap">
                <HeaderButton
                  color="primary"
                  onClick={() => dispatch(requestNewTab())}
                  tooltip="Add Feed"
                  variant="gradient"
                >
                  <IconPlus />
                </HeaderButton>
                <HeaderButton
                  onClick={() => {
                    toggleColorScheme()
                  }}
                  tooltip="Toggle color scheme"
                >
                  {colorScheme === 'dark' ? (
                    <IconSun size="1.3rem" />
                  ) : (
                    <IconMoonStars size="1rem" />
                  )}
                </HeaderButton>
                <HeaderButton
                  onClick={() => dispatch(openModal('settings'))}
                  tooltip="Open settings"
                >
                  <IconSettings />
                </HeaderButton>
                <HeaderButton onClick={() => dispatch(openModal('about'))} tooltip="About newsdash">
                  <IconInfoSquare />
                </HeaderButton>
                <HeaderButton
                  color="red"
                  onClick={() => dispatch(changeHeaderVisibile(false))}
                  tooltip="Close navigation bar"
                >
                  <IconX />
                </HeaderButton>
              </Group>
            </Group>
          </AppShell.Header>
        )}
      </Transition>
    </>
  )
}

export default Header
