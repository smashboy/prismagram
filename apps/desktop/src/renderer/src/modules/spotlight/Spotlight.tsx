import { Box, Modal, ScrollArea } from '@mantine/core'
import { string2Color } from '@renderer/core/utils'
import { NodeType } from '@shared/common/configs/diagrams'
import { IconBorderAll, IconBriefcase, IconLayoutList } from '@tabler/icons'
import { Command } from 'cmdk'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { useReactFlow } from 'reactflow'
import {
  $schemaEnums,
  $schemaModels,
  schemaStateHistoryApiEvents,
  selectNodeEvent
} from '../editor'
import { zoomToNode } from '../editor/utils'
import { $projects, $selectedProjectId, selectProjectEvent } from '../projects'
import { SpotlightGroup } from './components/SpotlightGroup'
import { SpotlightInput } from './components/SpotlightInput'
import { SpotlightItem } from './components/SpotlightItem'
import { SpotlightList } from './components/SpotlightList'
import { diagramEditorShortcuts, editorShortcuts, generalShortcuts } from './shortcuts'
import { $isOpenSpotlight, toggleOpenSpotlightEvent } from './stores'
import { shortcut2SpotlightAction } from './utils'

const $store = combine({
  isOpen: $isOpenSpotlight,
  projects: $projects,
  schemaModels: $schemaModels,
  schemaEnums: $schemaEnums,
  selectedProjectId: $selectedProjectId
})

const generalSpotlightAction = generalShortcuts
  .filter((shortcut) => shortcut.name !== 'Toggle spotlight')
  .map((shortcut) => (
    <SpotlightItem key={shortcut.name} action={shortcut2SpotlightAction(shortcut)} />
  ))

export const Spotlight = () => {
  const flow = useReactFlow()

  const { isOpen, schemaModels, schemaEnums, projects, selectedProjectId } = useStore($store)

  const handleToggleOpenSpotlight = () => toggleOpenSpotlightEvent()

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

  const projectActions = [...projects.values()].map(({ name, id }) => (
    <SpotlightItem
      key={id}
      action={{
        title: name,
        group: 'Projects',
        icon: <IconBriefcase size={18} color={string2Color(name)} />,
        onTrigger: () => selectProjectEvent(id)
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
    <Modal
      opened={isOpen}
      onClose={handleToggleOpenSpotlight}
      withCloseButton={false}
      size="lg"
      sx={{
        '& .mantine-Modal-modal': {
          padding: 0
        }
      }}
    >
      <Command>
        <SpotlightInput />
        <ScrollArea
          type="scroll"
          sx={(theme) => ({
            borderTop: `1px solid ${
              theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`
          })}
          px="xs"
          pb="xs"
        >
          <Box sx={{ maxHeight: 450 }}>
            <SpotlightList>
              <Command.Empty>No results found.</Command.Empty>
              <SpotlightGroup label="General">{generalSpotlightAction}</SpotlightGroup>
              {editorActions.length > 0 && (
                <SpotlightGroup label="Editor">{editorActions}</SpotlightGroup>
              )}
              {modelActions.length > 0 && (
                <SpotlightGroup label="Models">{modelActions}</SpotlightGroup>
              )}
              {enumActions.length > 0 && (
                <SpotlightGroup label="Enums">{enumActions}</SpotlightGroup>
              )}
              {projectActions.length > 0 && (
                <SpotlightGroup label="Projects">{projectActions}</SpotlightGroup>
              )}
            </SpotlightList>
          </Box>
        </ScrollArea>
      </Command>
    </Modal>
  )
}
