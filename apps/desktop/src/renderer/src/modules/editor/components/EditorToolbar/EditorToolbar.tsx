import { Panel } from 'reactflow'
import { Group } from '@mantine/core'
import { PaperGlass } from '@renderer/core/components'
import { DiagramOptionsSection } from './DiagramOptionsSection'
import { GeneralOptionsSection } from './GeneralOptionsSection'

export const EditorToolbar = () => (
  <Panel position="top-center">
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
