import { combine } from 'effector'
import { useStore } from 'effector-react'
import { SpotlightAction, SpotlightProvider } from '@mantine/spotlight'
import { string2Color } from '@renderer/core/utils'
import {
  $schemaEnums,
  $schemaModels,
  $selectedEditorView,
  selectNodeEvent
} from '@renderer/modules/editor'
import { $projects, $selectedProjectId, selectProjectEvent } from '@renderer/modules/projects'
import { IconBorderAll, IconBriefcase, IconLayoutList, IconSearch } from '@tabler/icons'
import { diagramEditorShortcuts, editorShortcuts, generalShortcuts } from '../shortcuts'
import { shortcut2SpotlightAction } from '../utils'
import { SpotlightActionsWrapper } from './SpotlightActionsWrapper'
import { EditorView } from '@renderer/modules/editor/config'
import { useReactFlow } from 'reactflow'
import { zoomToNode } from '@renderer/modules/editor/utils'

interface SpotlightProps {
  children: React.ReactNode
}

const $store = combine({
  projects: $projects,
  schemaModels: $schemaModels,
  schemaEnums: $schemaEnums,
  selectedProjectId: $selectedProjectId,
  selectedEditorView: $selectedEditorView
})

export const Spotlight: React.FC<SpotlightProps> = ({ children }) => {
  const flow = useReactFlow()
  const { projects, schemaModels, selectedProjectId, schemaEnums, selectedEditorView } =
    useStore($store)

  const generalSpotlightAction = generalShortcuts
    .filter((shortcut) => shortcut.name !== 'Toggle spotlight')
    .map((shortcut) => shortcut2SpotlightAction(shortcut, 'General'))

  const modelActions: SpotlightAction[] = [...schemaModels.values()].map(({ name }) => ({
    title: name,
    group: 'Models',
    icon: <IconBorderAll size={18} color={string2Color(name)} />,
    onTrigger: () => {
      const node = flow.getNode(name)

      if (node) zoomToNode(flow, node)

      selectNodeEvent(name)
    }
  }))

  const enumActions: SpotlightAction[] = [...schemaEnums.values()].map(({ name }) => ({
    title: name,
    group: 'Enums',
    icon: <IconLayoutList size={18} color={string2Color(name)} />,
    onTrigger: () => {
      const node = flow.getNode(name)

      if (node) zoomToNode(flow, node)

      selectNodeEvent(name)
    }
  }))

  const editorActions = selectedProjectId
    ? editorShortcuts.map((shortcut) => shortcut2SpotlightAction(shortcut, 'Editor'))
    : []

  const selectedEditorViewActions = !selectedProjectId
    ? []
    : selectedEditorView === EditorView.DIAGRAM
    ? diagramEditorShortcuts(flow).map((shortcut) => shortcut2SpotlightAction(shortcut, 'Diagram'))
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
    ...enumActions,
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
