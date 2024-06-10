import { AppShell as MantineAppShell } from '@mantine/core'
import { useEffect } from 'react'
import type { ReactNode } from 'react'

import { init } from '#store/slices/app/actions'
import { selectHeaderVisibile } from '#store/slices/app/selectors'
import AboutModal from '#ui/components/modals/AboutModal/AboutModal'
import SettingsModal from '#ui/components/modals/SettingsModal/SettingsModal'
import { useDispatch, useSelector } from '#ui/hooks/store'

import Header from './Header/Header'

import classes from './AppShell.module.css'

function AppShell({ children }: AppShellProps) {
  const dispatch = useDispatch()
  const headerVisible = useSelector(selectHeaderVisibile)

  // App init action
  useEffect(() => {
    dispatch(init())
  }, [dispatch])

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
