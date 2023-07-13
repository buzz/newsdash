import type { DropDirection, LayoutBase, TabBase, TabData, TabGroup } from 'rc-dock'
import DockLayout from 'rc-dock'
import 'rc-dock/dist/rc-dock.css'

import { changeLayout, selectLayout } from '#store/slices/layoutSlice'
import { useDispatch, useSelector } from '#ui/hooks/store'

const groups: Record<string, TabGroup> = {
  news: {
    maximizable: true,
    floatable: false,
  },
}

function loadTab({ id }: TabBase): TabData {
  console.log('loadTab id=', id)
  return {
    id,
    content: (
      <div>
        Tab Content <code>ID={id}</code>
      </div>
    ),
    group: 'news',
    title: id ?? 'Default title',
  }
}

function Dock() {
  const dispatch = useDispatch()
  const layout = useSelector(selectLayout)

  console.log('Dock RENDER', layout)

  const onLayoutChange = (
    newLayout: LayoutBase,
    currentTabId?: string,
    direction?: DropDirection
  ) => {
    console.log(`onLayoutChange`, newLayout, currentTabId, direction)

    dispatch(changeLayout(newLayout))
  }

  return (
    <DockLayout layout={layout} groups={groups} loadTab={loadTab} onLayoutChange={onLayoutChange} />
  )
}

export default Dock
