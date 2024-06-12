import { AppShell as MantineAppShell } from '@mantine/core'
import type { ReactNode } from 'react'

import { selectHeaderVisibile } from '#store/slices/app/selectors'
import AboutModal from '#ui/components/modals/AboutModal/AboutModal'
import SettingsModal from '#ui/components/modals/SettingsModal/SettingsModal'
import { useSelector } from '#ui/hooks/store'
import useInit from '#ui/hooks/useInit'

import Header from './Header/Header'

import classes from './AppShell.module.css'

function AppShell({ children }: AppShellProps) {
  useInit()

  const headerVisible = useSelector(selectHeaderVisibile)

  return (
    <>
      <MantineAppShell header={{ height: 60 }} padding={0}>
        <Header />
        <MantineAppShell.Main
          className={classes.main}
          data-header={headerVisible ? 'visible' : 'hidden'}
        >
          {children}
        </MantineAppShell.Main>
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
