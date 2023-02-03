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
import { PaperGlass } from '@renderer/core/components'
import { $selectedProject } from '@renderer/modules/projects'
import {
  toggleCreateProjectModalEvent,
  toggleSelectProjectModalEvent,
  toggleSettingsModalEvent
} from '@renderer/stores/ui/modals'
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBoxMargin,
  IconCode,
  IconDatabase,
  IconList,
  IconPlayerPlay,
  IconPlus,
  IconRelationManyToMany,
  IconRelationOneToMany,
  IconRelationOneToOne,
  IconSchema,
  IconSettings,
  IconZoomIn,
  IconZoomInArea,
  IconZoomOut
} from '@tabler/icons'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { RelationType } from 'prisma-state/constants'
import { useReactFlow } from 'reactflow'
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

const relationIconsMap = {
  [RelationType.ONE_TO_ONE]: IconRelationOneToOne,
  [RelationType.ONE_TO_MANY]: IconRelationOneToMany,
  [RelationType.MANY_TO_MANY]: IconRelationManyToMany
}

export const EditorToolbar = () => {
  const flow = useReactFlow()

  const { selectedView, isEditorEnabled, project, selectedRelationType } = useStore($store)

  const RelationIcon = relationIconsMap[selectedRelationType]

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
  const handleDiagramLayout = () => layoutDiagramEffect()
  const handleFitIntoView = () => flow.fitView()

  const handleOpenSettingsModal = () => toggleSettingsModalEvent(true)
  const handleOpenCreateProjectModal = () => toggleCreateProjectModalEvent(true)
  const handleOpenSelectProjectModal = () => toggleSelectProjectModalEvent(true)

  return (
    <PaperGlass withBorder py={5} px="xs">
      <Group spacing={0}>
        <Group sx={{ flex: 1 }}>
          <ActionIcon onClick={handleOpenSettingsModal}>
            <IconSettings size={ICON_SIZE} />
          </ActionIcon>
          <ActionIcon onClick={handleOpenSelectProjectModal}>
            <IconList size={ICON_SIZE} />
          </ActionIcon>
          <ActionIcon onClick={handleOpenCreateProjectModal}>
            <IconPlus size={ICON_SIZE} />
          </ActionIcon>
        </Group>
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
                    <IconZoomOut size={ICON_SIZE} />
                  </ActionIcon>
                  <ActionIcon size={ICON_BUTTON_SIZE} disabled={!isEditorEnabled}>
                    <IconZoomIn size={ICON_SIZE} />
                  </ActionIcon>
                </OptionsContainer>
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
                        <RelationIcon />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item icon={<IconRelationOneToOne size={14} />}>One-to-one</Menu.Item>
                      <Menu.Item icon={<IconRelationOneToMany size={14} />}>One-to-many</Menu.Item>
                      <Menu.Item icon={<IconRelationManyToMany size={14} />}>
                        Many-to-many
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </OptionsContainer>
                <OptionsContainer>
                  <ActionIcon
                    onClick={handleFitIntoView}
                    size={ICON_BUTTON_SIZE}
                    disabled={!isEditorEnabled}
                  >
                    <IconZoomInArea size={ICON_SIZE} />
                  </ActionIcon>
                  <ActionIcon
                    onClick={handleDiagramLayout}
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
      </Group>
    </PaperGlass>
  )
}
