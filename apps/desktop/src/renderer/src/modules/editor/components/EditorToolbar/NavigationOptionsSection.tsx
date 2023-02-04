import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Center, Paper, SegmentedControl } from '@mantine/core'
import { $selectedProject } from '@renderer/modules/projects'
import { IconCode, IconDatabase, IconSchema } from '@tabler/icons'
import { EditorView } from '../../config'
import { $isEditorEnabled, $selectedEditorView, changeEditorViewEvent } from '../../stores'
import { ICON_SIZE } from './constants'

const $store = combine({
  selectedView: $selectedEditorView,
  isEditorEnabled: $isEditorEnabled,
  project: $selectedProject
})

export const NavigationOptionsSection = () => {
  const { selectedView, isEditorEnabled, project } = useStore($store)

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

  return (
    <Paper h="100%">
      <SegmentedControl
        value={selectedView}
        onChange={handleChangeEditorView}
        disabled={!isEditorEnabled}
        data={editorViewOptions}
      />
    </Paper>
  )
}
