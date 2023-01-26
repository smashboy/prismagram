import {
  ActionIcon,
  Center,
  Flex,
  Group,
  Menu,
  Paper,
  SegmentedControl,
  Transition
} from '@mantine/core'
import { $selectedProject } from '@renderer/modules/projects'
import { DiagramLayout } from '@shared/common/configs/diagrams'
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBoxMargin,
  IconCode,
  IconDatabase,
  IconHierarchy,
  IconPlayerPlay,
  IconSchema,
  IconZoomInArea
} from '@tabler/icons'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { EditorView } from '../config'
import {
  $diagram,
  $isEditorEnabled,
  $selectedEditorView,
  $selectedRelationType,
  changeEditorViewEvent,
  layoutDiagramEffect
} from '../stores'

const ICON_SIZE = 20
const ICON_BUTTON_SIZE = 'lg'

const $store = combine({
  selectedView: $selectedEditorView,
  diagram: $diagram,
  isEditorEnabled: $isEditorEnabled,
  project: $selectedProject,
  selectedRelationType: $selectedRelationType
})

const OptionsContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Paper align="center" h="100%" component={Flex}>
    <Group spacing={0}>{children}</Group>
  </Paper>
)

export const EditorToolbar = () => {
  const { selectedView, diagram, isEditorEnabled, project, selectedRelationType } = useStore($store)

  const editorViewOptions = [
    {
      label: (
        <Center>
          <IconSchema size={ICON_SIZE} />
        </Center>
      ),
      value: EditorView.DIAGRAM
    },
    {
      label: (
        <Center>
          <IconCode size={ICON_SIZE} />
        </Center>
      ),
      value: EditorView.SCHEMA
    },
    {
      label: (
        <Center>
          <IconDatabase size={ICON_SIZE} />
        </Center>
      ),
      value: EditorView.PRISMA_STUDIO,
      disabled: !project?.projectDirectory
    }
  ]

  const handleChangeEditorView = (view: EditorView) => changeEditorViewEvent(view)
  const handleDiagramLayout = (layout: DiagramLayout) => () =>
    layoutDiagramEffect({ diagram: diagram!, layout })

  return (
    <Group position="right">
      <Transition
        mounted={selectedView === EditorView.DIAGRAM}
        transition="slide-left"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <Group style={styles}>
            <OptionsContainer>
              <ActionIcon size={ICON_BUTTON_SIZE} disabled={!isEditorEnabled}>
                <IconArrowBackUp size={ICON_SIZE} />
              </ActionIcon>
              <ActionIcon size={ICON_BUTTON_SIZE} disabled={!isEditorEnabled}>
                <IconArrowForwardUp size={ICON_SIZE} />
              </ActionIcon>
            </OptionsContainer>
            <OptionsContainer>
              <Menu>
                <Menu.Target>
                  <ActionIcon size={ICON_BUTTON_SIZE} disabled={!isEditorEnabled}>
                    {selectedRelationType}
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>One-to-one</Menu.Item>
                  <Menu.Item>One-to-many</Menu.Item>
                  <Menu.Item>Many-to-many</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </OptionsContainer>
            <OptionsContainer>
              <ActionIcon size={ICON_BUTTON_SIZE} disabled={!isEditorEnabled}>
                <IconZoomInArea size={ICON_SIZE} />
              </ActionIcon>
              <ActionIcon
                onClick={handleDiagramLayout(DiagramLayout.HORIZONTAL)}
                size={ICON_BUTTON_SIZE}
                disabled={!isEditorEnabled}
              >
                <IconBoxMargin size={ICON_SIZE} />
              </ActionIcon>
            </OptionsContainer>
          </Group>
        )}
      </Transition>
      <Paper h="100%">
        <SegmentedControl
          value={selectedView}
          onChange={handleChangeEditorView}
          disabled={!isEditorEnabled}
          data={editorViewOptions}
        />
      </Paper>
      <OptionsContainer>
        <ActionIcon size={ICON_BUTTON_SIZE} disabled={!isEditorEnabled}>
          <IconPlayerPlay size={ICON_SIZE} />
        </ActionIcon>
      </OptionsContainer>
    </Group>
  )
}
