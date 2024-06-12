import type { TabGroup } from 'rc-dock'

import PanelExtra from './Panel/PanelExtra'

const groups: Record<string, TabGroup> = {
  news: {
    floatable: false,
    maximizable: false,
    panelExtra: (panel) => <PanelExtra panel={panel} />,
  },
}

export default groups
