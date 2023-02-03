import { combine } from 'effector'
import { useStore } from 'effector-react'
import { SpotlightAction, SpotlightProvider } from '@mantine/spotlight'
import { string2Color } from '@renderer/core/utils'
import { $schemaModels, $selectedEditorView, selectModelEvent } from '@renderer/modules/editor'
import { $projects, $selectedProjectId, selectProjectEvent } from '@renderer/modules/projects'
import { toggleModelNodeSidebarEvent } from '@renderer/stores/ui/modals'
import { IconBorderAll, IconBriefcase, IconSearch } from '@tabler/icons'
import { diagramEditorShortcuts, editorShortcuts, generalShortcuts } from '../shortcuts'
import { shortcut2SpotlightAction } from '../utils'
import { SpotlightActionsWrapper } from './SpotlightActionsWrapper'
import { EditorView } from '@renderer/modules/editor/config'
import { useReactFlow } from 'reactflow'

interface SpotlightProps {
  children: React.ReactNode
}

const $store = combine({
  projects: $projects,
  schemaModels: $schemaModels,
  selectedProjectId: $selectedProjectId,
  selectedEditorView: $selectedEditorView
})

export const Spotlight: React.FC<SpotlightProps> = ({ children }) => {
  const flow = useReactFlow()
  const { projects, schemaModels, selectedProjectId, selectedEditorView } = useStore($store)

  const generalSpotlightAction = generalShortcuts
    .filter((shortcut) => shortcut.name !== 'Toggle spotlight')
    .map((shortcut) => shortcut2SpotlightAction(shortcut, 'General'))

  const modelActions: SpotlightAction[] = [...schemaModels.values()].map(({ name }) => ({
    title: name,
    group: 'Models',
    icon: <IconBorderAll size={18} color={string2Color(name)} />,
    onTrigger: () => {
      const node = flow.getNode(name)

      if (node) {
        flow.setCenter(
          node.position.x + (node.width || 0) / 2,
          node.position.y + (node.height || 0) / 2,
          { duration: 1000 }
        )
      }

      toggleModelNodeSidebarEvent(true)
      selectModelEvent(name)
    }
  }))

  const editorActions = selectedProjectId
    ? editorShortcuts.map((shortcut) => shortcut2SpotlightAction(shortcut, 'Editor'))
    : []

  const selectedEditorViewActions = !selectedProjectId
    ? []
    : selectedEditorView === EditorView.DIAGRAM
    ? diagramEditorShortcuts.map((shortcut) => shortcut2SpotlightAction(shortcut, 'Diagram'))
    : []

  const projectActions: SpotlightAction[] = [...projects.values()].map(({ name, id }) => ({
    title: name,
    group: 'Projects',
    icon: <IconBriefcase size={18} color={string2Color(name)} />,
    onTrigger: () => selectProjectEvent(id)
  }))

  const sportlightActions = [
    ...generalSpotlightAction,
    ...selectedEditorViewActions,
    ...editorActions,
    ...modelActions,
    ...projectActions
  ]

  return (
    <SpotlightProvider
      searchIcon={<IconSearch size={18} />}
      searchPlaceholder="Search..."
      nothingFoundMessage="Nothing found..."
      actions={sportlightActions}
      centered
      limit={sportlightActions.length}
      actionsWrapperComponent={SpotlightActionsWrapper}
    >
      {children}
    </SpotlightProvider>
  )
}
