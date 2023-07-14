import { AppShell as MantineAppShell } from '@mantine/core'
import type { ReactNode } from 'react'

import { selectHeaderVisibile } from '#store/slices/appSlice'
import AboutModal from '#ui/components/modals/AboutModal/AboutModal'
import SettingsModal from '#ui/components/modals/SettingsModal/SettingsModal'
import { useSelector } from '#ui/hooks/store'

import Header from './Header/Header'

function AppShell({ children }: AppShellProps) {
  const headerVisible = useSelector(selectHeaderVisibile)

  return (
    <>
      <MantineAppShell
        header={<Header />}
        padding={0}
        sx={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            display: 'flex',
            paddingTop: headerVisible ? 'calc(var(--mantine-header-height, 0px) + 0rem)' : 0,
            transitionDuration: `${theme.other.transition.duration.default}ms`,
            transitionProperty: 'padding-top',
            transitionTimingFunction: theme.transitionTimingFunction,
          },
        })}
      >
        {children}
      </MantineAppShell>
      <AboutModal />
      <SettingsModal />
    </>
  )
}

interface AppShellProps {
  children: ReactNode
}

export default AppShell
