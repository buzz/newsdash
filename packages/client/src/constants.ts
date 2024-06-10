import { type LayoutBase, placeHolderStyle as placeholderGroup } from 'rc-dock'

const FETCH_TIMEOUT = 5000

const TAB_MIN_WIDTH = 300
const TAB_MIN_HEIGHT = 300

const DOCKBOX_ID = '__dockbox__'

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

export {
  DOCKBOX_ID,
  FETCH_TIMEOUT,
  PLACEHOLDER_LAYOUT,
  PLACEHOLDER_TAB_ID,
  TAB_MIN_HEIGHT,
  TAB_MIN_WIDTH,
}
