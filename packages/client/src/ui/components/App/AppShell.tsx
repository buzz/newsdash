import { AppShell as MantineAppShell } from '@mantine/core'
import type { ReactNode } from 'react'

import { selectHeaderVisibile } from '#store/slices/app/selectors'
import { useSelector } from '#ui/hooks/store'
import useInit from '#ui/hooks/useInit'

import Header from './Header/Header'
import Modal from './Modal/Modal'

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
      <Modal />
    </>
  )
}

interface AppShellProps {
  children: ReactNode
}

export default AppShell
