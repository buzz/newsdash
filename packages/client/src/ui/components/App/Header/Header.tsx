import {
  ActionIcon,
  createStyles,
  Group,
  Header as MantineHeader,
  Transition,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { IconSun, IconMoonStars, IconSettings, IconX } from '@tabler/icons-react'

import {
  changeHeaderVisibile,
  changeSettingsModalOpened,
  selectHeaderVisibile,
} from '#store/slices/appSlice'
import { useDispatch, useSelector } from '#ui/hooks/store'

import HeaderToggleButton from './HeaderToggleButton'

const useStyles = createStyles({ group: { height: '100%' } })

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
        transition="slide-down"
      >
        {(styles) => (
          <MantineHeader height={60} p="xs" style={styles}>
            <Group className={classes.group} px={20} position="apart">
              Logo
              <Group className={classes.group} pl={20} position="right" grow={false}>
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
                <ActionIcon
                  variant="default"
                  onClick={() => dispatch(changeHeaderVisibile(false))}
                  size={30}
                >
                  <IconX />
                </ActionIcon>
              </Group>
            </Group>
          </MantineHeader>
        )}
      </Transition>
    </>
  )
}

export default Header
