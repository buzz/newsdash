import { ActionIcon, Group, Header as MantineHeader, useMantineColorScheme } from '@mantine/core'
import { IconSun, IconMoonStars, IconSettings } from '@tabler/icons-react'

import { changeSettingsModalOpened } from '#store/slices/appSlice'
import { useDispatch } from '#ui/hooks/store'

function Header() {
  const dispatch = useDispatch()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <>
      <MantineHeader height={60} p="xs">
        <Group sx={{ height: '100%' }} px={20} position="apart">
          Logo
          <Group sx={{ height: '100%' }} pl={20} position="right" grow={false}>
            <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
              {colorScheme === 'dark' ? <IconSun size="1rem" /> : <IconMoonStars size="1rem" />}
            </ActionIcon>
            <ActionIcon
              variant="default"
              onClick={() => dispatch(changeSettingsModalOpened(true))}
              size={30}
            >
              <IconSettings />
            </ActionIcon>
          </Group>
        </Group>
      </MantineHeader>
    </>
  )
}

export default Header
