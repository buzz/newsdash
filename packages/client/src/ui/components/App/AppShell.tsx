import { AppShell as MantineAppShell } from '@mantine/core'
import type { ReactNode } from 'react'

import AboutModal from '#ui/components/modals/AboutModal/AboutModal'
import SettingsModal from '#ui/components/modals/SettingsModal/SettingsModal'

import Header from './Header/Header'

function AppShell({ children }: AppShellProps) {
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
