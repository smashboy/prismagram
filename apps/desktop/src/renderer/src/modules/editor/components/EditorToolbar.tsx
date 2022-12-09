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
import { DiagramLayout } from '@shared/common/configs/diagrams'
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBoxMargin,
  IconCode,
  IconSchema,
  IconZoomInArea
} from '@tabler/icons'
import { useStore } from 'effector-react'
import { EditorView } from '../config'
import {
  $diagram,
  $selectedEditorView,
  changeEditorViewEvent,
  layoutDiagramEffect
} from '../stores'

const ICON_SIZE = 20
const ICON_BUTTON_SIZE = 'lg'

const OptionsContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Paper align="center" px={3} py={3} h="100%" component={Flex}>
    <Group>{children}</Group>
  </Paper>
)

export const EditorToolbar = () => {
  const selectedView = useStore($selectedEditorView)
  const diagram = useStore($diagram)

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
              <ActionIcon size={ICON_BUTTON_SIZE}>
                <IconArrowBackUp size={ICON_SIZE} />
              </ActionIcon>
              <ActionIcon size={ICON_BUTTON_SIZE}>
                <IconArrowForwardUp size={ICON_SIZE} />
              </ActionIcon>
            </OptionsContainer>
            <OptionsContainer>
              <ActionIcon size={ICON_BUTTON_SIZE}>
                <IconZoomInArea size={ICON_SIZE} />
              </ActionIcon>
            </OptionsContainer>
            <OptionsContainer>
              <ActionIcon
                onClick={handleDiagramLayout(DiagramLayout.VERTICAL)}
                size={ICON_BUTTON_SIZE}
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
          data={[
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
            }
          ]}
        />
      </Paper>
    </Group>
  )
}
