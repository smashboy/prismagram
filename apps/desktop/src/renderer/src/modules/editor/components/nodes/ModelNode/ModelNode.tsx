import { combine } from 'effector'
import { useStore, useStoreMap } from 'effector-react'
import { Handle, NodeProps, Position, useStore as useFlowStore } from 'reactflow'
import { Stack, Table } from '@mantine/core'
import { ModelNodeData } from '@shared/common/models/Diagram'
import {
  $nodesColors,
  $schemaModels,
  $schemaState,
  $selectedNodeId,
  setPrismaSchemaEvent
} from '../../../stores'
import { ModelNodeField } from './ModelNodeField'
import { ModelNodeToolbar } from './ModelNodeToolbar'
import { NodeCard } from '../NodeCard'
import { ModelNameInput } from '../../inputs/ModelNameInput'
import { cloneSchemaState } from '@renderer/core/utils'

const $store = combine({
  nodesColors: $nodesColors,
  selectedNodeId: $selectedNodeId,
  state: $schemaState
})

export const ModelNode: React.FC<NodeProps<ModelNodeData>> = ({ data, id: name }) => {
  const { sourceHandlers, targetHandlers } = data

  const model = useStoreMap({
    store: $schemaModels,
    keys: [name],
    fn: (models, [name]) => models.get(name)!
  })

  const { selectedNodeId, nodesColors, state } = useStore($store)

  const connectionNodeId = useFlowStore((state) => state.connectionNodeId)

  const isSelected = selectedNodeId === name
  const isTarget = connectionNodeId && connectionNodeId !== name

  const fields = [...model.fields.values()]

  const maxAttribuesCount = Math.max(...[...new Set(fields.map((field) => field.attributes.size))])

  // useEffect(() => {
  //   flow.setNodes((nodes) =>
  //     nodes.map((node) =>
  //       node.id === selectedModelNode
  //         ? { ...node, dragHandle: '.custom-drag-handle' }
  //         : { ...node, dragHandle: void 0 }
  //     )
  //   )
  // }, [selectedModelNode])

  const handleSaveNewModelName = async (name: string) => {
    model.setName(name)
    const updatedState = await cloneSchemaState(state)
    setPrismaSchemaEvent(updatedState.toString())
  }

  return (
    <Stack sx={{ minWidth: 150 }}>
      <ModelNodeToolbar isSelected={isSelected} />
      <NodeCard nodeId={name} isSelected={isSelected} selectedNodeId={selectedNodeId}>
        <ModelNameInput model={model} onSave={handleSaveNewModelName} />
        <Table verticalSpacing="md" fontSize="xl">
          <tbody>
            {fields.map((field) => (
              <ModelNodeField
                key={field.name}
                fieldId={field.name}
                field={field}
                nodesColors={nodesColors}
                sourceHandlers={sourceHandlers}
                targetHandlers={targetHandlers}
                maxAttribuesCount={maxAttribuesCount}
              />
            ))}
          </tbody>
        </Table>
        <Handle
          id={name}
          type="source"
          position={Position.Bottom}
          isConnectable={isSelected}
          style={{
            width: 8,
            height: 8,
            ...(!isSelected && { opacity: 0, pointerEvents: 'none' })
          }}
        />
        <Handle
          id={name}
          type="target"
          position={Position.Left}
          isConnectable={!!selectedNodeId}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            transform: 'translate(0%, 0%)',
            borderRadius: 8,
            opacity: 0,
            overflow: 'hidden',
            ...(isTarget && { backgroundColor: 'blue', opacity: 0.25 }),
            ...(!isTarget && { pointerEvents: 'none' })
          }}
        />
      </NodeCard>
    </Stack>
  )
}