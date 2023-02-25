import { string2Color } from '@renderer/core/utils'
import {
  $schemaEnums,
  $schemaModels,
  schemaStateHistoryApiEvents,
  selectNodeEvent
} from '@renderer/modules/editor'
import { zoomToNode } from '@renderer/modules/editor/utils'
import { $projects, $selectedProjectId, selectProjectEvent } from '@renderer/modules/projects'
import { NodeType } from '@shared/common/configs/diagrams'
import { IconBorderAll, IconBriefcase, IconLayoutList } from '@tabler/icons'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { useReactFlow } from 'reactflow'
import { diagramEditorShortcuts, editorShortcuts, generalShortcuts } from '../shortcuts'
import { shortcut2SpotlightAction } from '../utils'
import { SpotlightGroup } from './SpotlightGroup'
import { SpotlightItem } from './SpotlightItem'

const $store = combine({
  projects: $projects,
  schemaModels: $schemaModels,
  schemaEnums: $schemaEnums,
  selectedProjectId: $selectedProjectId
})

export const SpotlightMainActions = () => {
  const flow = useReactFlow()

  const { schemaModels, schemaEnums, projects, selectedProjectId } = useStore($store)

  const generalSpotlightAction = generalShortcuts
    .filter((shortcut) => shortcut.name !== 'Toggle spotlight')
    .map((shortcut) => (
      <SpotlightItem
        key={shortcut.name}
        action={
          shortcut.name === 'Select project'
            ? {
                ...shortcut2SpotlightAction({
                  name: shortcut.name,
                  icon: shortcut.icon,
                  keys: shortcut.keys,
                  onExecute: () => {}
                }),
                actions: [...projects.values()].map(({ name, id }) => ({
                  title: name,
                  group: 'Projects',
                  icon: <IconBriefcase size={18} color={string2Color(name)} />,
                  onTrigger: () => selectProjectEvent(id)
                }))
              }
            : shortcut2SpotlightAction(shortcut)
        }
      />
    ))

  const modelActions = [...schemaModels.values()].map(({ name }) => (
    <SpotlightItem
      key={name}
      action={{
        title: name,

        icon: <IconBorderAll size={18} color={string2Color(name)} />,
        onTrigger: () => {
          const node = flow.getNode(name)

          if (node) {
            zoomToNode(flow, node)
            selectNodeEvent({ nodeId: node.id, type: node.type! as NodeType })
          }
        }
      }}
    />
  ))

  const enumActions = [...schemaEnums.values()].map(({ name }) => (
    <SpotlightItem
      key={name}
      action={{
        title: name,

        icon: <IconLayoutList size={18} color={string2Color(name)} />,
        onTrigger: () => {
          const node = flow.getNode(name)

          if (node) {
            zoomToNode(flow, node)
            selectNodeEvent({ nodeId: node.id, type: node.type! as NodeType })
          }
        }
      }}
    />
  ))

  const editorActions = selectedProjectId
    ? [
        ...diagramEditorShortcuts(flow),
        ...editorShortcuts({
          undo: schemaStateHistoryApiEvents.undo,
          redo: schemaStateHistoryApiEvents.redo
        })
      ].map((shortcut) => (
        <SpotlightItem key={shortcut.name} action={shortcut2SpotlightAction(shortcut)} />
      ))
    : []

  return (
    <>
      <SpotlightGroup label="General">{generalSpotlightAction}</SpotlightGroup>
      {editorActions.length > 0 && <SpotlightGroup label="Editor">{editorActions}</SpotlightGroup>}
      {modelActions.length > 0 && <SpotlightGroup label="Models">{modelActions}</SpotlightGroup>}
      {enumActions.length > 0 && <SpotlightGroup label="Enums">{enumActions}</SpotlightGroup>}
    </>
  )
}
