import { nanoid } from 'nanoid'
import { type LayoutBase, placeHolderStyle as placeholderGroup } from 'rc-dock'

export const LOCAL_STORAGE_COLOR_THEME_KEY = 'newdash-color-scheme'

export const FETCH_TIMEOUT = 5000

export const CONNECTIVITY_CHECK_INTERVAL = 60_000

export const PLACEHOLDER_TAB_ID = '__placeholdertab__'

export const PLACEHOLDER_LAYOUT: LayoutBase = {
  dockbox: {
    id: nanoid(),
    children: [
      {
        id: nanoid(),
        group: placeholderGroup,
        tabs: [{ id: PLACEHOLDER_TAB_ID }],
      },
    ],
    mode: 'horizontal',
  },
}

export const EMPTY_LAYOUT = {
  dockbox: {
    mode: 'horizontal' as const,
    children: [{ tabs: [] }],
  },
}
