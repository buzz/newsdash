import { DEFAULT_THEME as dt, type ColorScheme, rem } from '@mantine/styles'

// TODO: add mantine focusStyles, fontStyles

type DeciderFn = <T>(d: T, l: T) => T

function makeRcDockTheme(colorScheme: ColorScheme, cs: DeciderFn) {
  const { colors: col } = dt

  const primaryShade =
    typeof dt.primaryShade === 'number' ? dt.primaryShade : dt.primaryShade[colorScheme]
  const primaryColor = col[dt.primaryColor][primaryShade]

  const textColor = cs(col.dark[0], dt.black)
  const textDisabledColor = cs(col.dark[8], col.dark[3])

  const tabBg = cs(col.dark[5], dt.fn.lighten(col.dark[1], 0.8))
  const componentBg = cs(col.dark[7], dt.white)
  const panelBorderColor = cs(col.dark[4], dt.fn.darken(tabBg, 0.1))
  const navColorSplit = panelBorderColor
  const dropIndicatorBg = cs(col.dark[5], col.dark[0])

  const dropdownMenuTextColor = cs(col.gray[9], textColor)
  const dropdownMenuBg = cs(col.dark[0], dt.white)
  const dropdownMenuHoverBg = cs(col.dark[2], col.dark[0])

  const boxShadow = dt.shadows.sm

  return {
    // dragging.less

    'body > .dragging-layer': {
      '--default-background-color': componentBg,
      opacity: 0.8,

      '& > *:first-child': {
        boxShadow,
      },
    },

    // tabs.less

    '.dock': {
      '&-ink-bar': {
        backgroundColor: primaryColor,
      },

      '&-tab-btn-disabled': {
        color: textDisabledColor,
      },

      '&-tab': {
        borderBottomColor: panelBorderColor,
        background: tabBg,

        '& > div': {
          outlineColor: primaryColor,
        },
      },

      '&-tab:hover': {
        color: primaryColor,
      },

      '&-tab-active, &-tab-active:hover': {
        color: primaryColor,
      },

      '&-tab-disabled': {
        color: textDisabledColor,
      },

      '&-tab-disabled:hover': {
        color: textDisabledColor,
      },

      '&-top &-bar': {
        background: tabBg,
        borderBottomColor: navColorSplit,
      },

      '&-nav-more': {
        color: textColor,

        '::after': {
          boxShadow,
        },
      },

      '&-dropdown': {
        color: textColor,

        '&-menu': {
          backgroundColor: dropdownMenuBg,
          boxShadow,
        },

        '&-menu-item': {
          color: dropdownMenuTextColor,
        },

        '&-menu-item:hover': {
          background: dropdownMenuHoverBg,
        },

        '&-menu-item-disabled, &-menu-item-disabled:hover': {
          color: textDisabledColor,
        },
      },
    },

    // panel.less

    '.dock-panel': {
      background: componentBg,
      borderColor: panelBorderColor,
      borderRadius: dt.radius[typeof dt.defaultRadius === 'string' ? dt.defaultRadius : 'sm'],
      color: textColor,
    },

    '.dock-divider': {
      flexBasis: dt.spacing.xs,
    },

    '.dock-fbox > .dock-panel': {
      boxShadow,
    },

    '.dock-mbox > .dock-panel': {
      boxShadow,
    },

    '.dock-layout > .dock-drop-indicator': {
      background: dropIndicatorBg,
      border: `${rem(5)} dashed ${cs(col.dark[3], col.dark[2])}`,
      opacity: 0.25,
      boxShadow: 'none',
    },

    '.dock-drop-layer .dock-drop-square': {
      color: textColor,
      background: componentBg,
    },

    '.dock-drop-layer .dock-drop-square .dock-drop-square-box': {
      borderColor: panelBorderColor,
    },

    '.dock-drop-layer .dock-drop-square-dropping': {
      background: primaryColor,
    },
  }
}

export default makeRcDockTheme
