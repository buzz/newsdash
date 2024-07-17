import { AppShell, Group, Transition, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import {
  IconArrowsUpDown,
  IconInfoSquare,
  IconMoonStars,
  IconPlus,
  IconRefresh,
  IconSettings,
  IconSun,
  IconX,
} from '@tabler/icons-react'

import { changeHeaderVisibile, openModal } from '#store/slices/app/actions'
import { selectHeaderVisibile } from '#store/slices/app/selectors'
import { refreashAllTabs, requestNewTab } from '#store/slices/layout/actions'
import { selectNonEditTabs } from '#store/slices/layout/entities/tabs/selectors'
import Logo from '#ui/components/common/Logo/Logo'
import { useDispatch, useSelector } from '#ui/hooks/store'

import HeaderButton from './HeaderButton'
import HeaderToggleButton from './HeaderToggleButton'

import classes from './Header.module.css'

function Header() {
  const dispatch = useDispatch()
  const headerVisible = useSelector(selectHeaderVisibile)
  const tabCount = useSelector(selectNonEditTabs).length
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
                  disabled={tabCount === 0}
                  onClick={() => dispatch(refreashAllTabs())}
                  tooltip="Refresh Feeds"
                >
                  <IconRefresh />
                </HeaderButton>
                <HeaderButton
                  onClick={() => {
                    toggleColorScheme()
                  }}
                  tooltip="Toggle Color Scheme"
                >
                  {colorScheme === 'dark' ? (
                    <IconSun size="1.3rem" />
                  ) : (
                    <IconMoonStars size="1rem" />
                  )}
                </HeaderButton>
                <HeaderButton
                  onClick={() => dispatch(openModal('settings'))}
                  tooltip="Open Settings"
                >
                  <IconSettings />
                </HeaderButton>
                <HeaderButton
                  onClick={() => dispatch(openModal('import-export'))}
                  tooltip="Import/Export Settings"
                >
                  <IconArrowsUpDown />
                </HeaderButton>
                <HeaderButton onClick={() => dispatch(openModal('about'))} tooltip="About newsdash">
                  <IconInfoSquare />
                </HeaderButton>
                <HeaderButton
                  color="red"
                  onClick={() => dispatch(changeHeaderVisibile(false))}
                  tooltip="Close Navigation Bar"
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
