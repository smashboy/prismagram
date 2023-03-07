import { useStore } from 'effector-react'
import { Panel } from 'reactflow'
import { Group } from '@mantine/core'
import { PaperGlass } from '@renderer/core/components'
import { DiagramOptionsSection } from './DiagramOptionsSection'
import { GeneralOptionsSection } from './GeneralOptionsSection'
import { $selectedNodeId } from '../../stores'

export const EditorToolbar = () => {
  const selectedNodeId = useStore($selectedNodeId)

  return (
    <Panel
      position={selectedNodeId ? 'top-right' : 'top-center'}
      style={selectedNodeId ? { width: '35%' } : void 0}
    >
      <PaperGlass py={5} px="xs">
        <Group spacing={0}>
          <GeneralOptionsSection />
          <Group position="right">
            <DiagramOptionsSection />
            {/* <NavigationOptionsSection /> */}
            {/* <ActionIcon size={ICON_BUTTON_SIZE} disabled={!isEditorEnabled}>
            <IconPlayerPlay size={ICON_SIZE} />
          </ActionIcon> */}
          </Group>
        </Group>
      </PaperGlass>
    </Panel>
  )
}
