import { nanoid } from 'nanoid'
import { type LayoutBase, placeHolderStyle as placeholderGroup } from 'rc-dock'

const FETCH_TIMEOUT = 5000

const TAB_MIN_WIDTH = 300
const TAB_MIN_HEIGHT = 300

const MAX_CONTENT_LENGTH = 600

const PLACEHOLDER_TAB_ID = '__placeholdertab__'

const PLACEHOLDER_LAYOUT: LayoutBase = {
  dockbox: {
    children: [
      {
        group: placeholderGroup,
        tabs: [{ id: PLACEHOLDER_TAB_ID }],
      },
    ],
    mode: 'horizontal',
  },
}

const EMPTY_LAYOUT = {
  dockbox: {
    id: nanoid(),
    children: [],
    mode: 'horizontal' as const,
    order: 0,
  },
}

export {
  EMPTY_LAYOUT,
  FETCH_TIMEOUT,
  MAX_CONTENT_LENGTH,
  PLACEHOLDER_LAYOUT,
  PLACEHOLDER_TAB_ID,
  TAB_MIN_HEIGHT,
  TAB_MIN_WIDTH,
}
