import { AppShell as MantineAppShell } from '@mantine/core'
import type { ReactNode } from 'react'

import SettingsModal from '#ui/components/Settings/SettingsModal'

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
            '> .dock-layout': { flexGrow: 1 },
          },
        })}
      >
        {children}
      </MantineAppShell>
      <SettingsModal />
    </>
  )
}

interface AppShellProps {
  children: ReactNode
}

export default AppShell
