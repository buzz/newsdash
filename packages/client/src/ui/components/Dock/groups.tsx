import type { TabGroup } from 'rc-dock'

import PanelExtra from './PanelExtra/PanelExtra'

const groups: Record<string, TabGroup> = {
  news: {
    floatable: false,
    maximizable: false,
    panelExtra: (panel, context) => <PanelExtra panel={panel} />,
  },
}

export default groups