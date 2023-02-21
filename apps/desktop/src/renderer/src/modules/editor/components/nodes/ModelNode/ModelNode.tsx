import { combine } from 'effector'
import { useStore, useStoreMap } from 'effector-react'
import { Handle, NodeProps, Position, useStore as useFlowStore } from 'reactflow'
import { Paper, Stack, Table } from '@mantine/core'
import { ModelNodeData } from '@shared/common/models/Diagram'
import { $nodesColors, $schemaModels, $schemaState, $selectedNodeId } from '../../../stores'
import { ModelNodeField } from './ModelNodeField'
import { ModelNodeToolbar } from './ModelNodeToolbar'
import { NodeCard } from '../NodeCard'
import { BlockNameInput } from '../../inputs/BlockNameInput'
import { NodeType } from '@shared/common/configs/diagrams'
import { ModelNodeEditForm } from './ModelNodeEditForm'
import { Model } from 'prisma-state/_new/blocks'
import { ModelNodeAttributeField } from './ModelNodeAttributeField'
import { useBoolean } from 'react-use'

const $store = combine({
  nodesColors: $nodesColors,
  selectedNodeId: $selectedNodeId,
  state: $schemaState
})

export const ModelNode: React.FC<NodeProps<ModelNodeData>> = ({ data, id: name }) => {
  const { sourceHandlers, targetHandlers } = data

  const { selectedNodeId, nodesColors, state } = useStore($store)

  const [isOpenNewField, toggleIsOpenNewField] = useBoolean(false)

  const modelData = useStoreMap({
    store: $schemaModels,
    keys: [name],
    fn: (models, [name]) => models.get(name)!
  })

  const model = new Model(modelData.name, state, modelData)

  const connectionNodeId = useFlowStore((state) => state.connectionNodeId)

  const isSelected = selectedNodeId?.nodeId === name
  const isTarget = connectionNodeId && connectionNodeId !== name

  const maxAttribuesCount = Math.max(
    ...[...new Set(model.fieldsArray.map((field) => field.attributes.size))]
  )

  return (
    <Stack sx={{ minWidth: 150, cursor: isSelected ? 'default' : void 0 }}>
      <ModelNodeToolbar
        isSelected={isSelected}
        selectedNodeId={selectedNodeId?.nodeId}
        onOpenNewFieldInput={toggleIsOpenNewField}
      />
      <NodeCard
        nodeId={name}
        isSelected={isSelected}
        selectedNodeId={selectedNodeId?.nodeId}
        type={NodeType.MODEL}
      >
        <BlockNameInput block={model} />
        {isSelected ? (
          <ModelNodeEditForm
            isOpenNewField={isOpenNewField}
            onCloseNewField={toggleIsOpenNewField}
            block={model}
          />
        ) : (
          <Stack sx={{ alignItems: 'center' }}>
            <Table verticalSpacing="md" fontSize="xl">
              <tbody>
                {model.fieldsArray.map((field) => (
                  <ModelNodeField
                    key={field.name}
                    fieldId={field.name}
                    field={field}
                    isSelected={isSelected}
                    nodesColors={nodesColors}
                    sourceHandlers={sourceHandlers}
                    targetHandlers={targetHandlers}
                    maxAttribuesCount={maxAttribuesCount}
                  />
                ))}
              </tbody>
            </Table>
            {model.attributesArray.length > 0 && (
              <Paper bg="gray.1" p="xs" withBorder>
                <Stack>
                  {model.attributesArray.map((attr) => (
                    <ModelNodeAttributeField key={attr.type} attr={attr} />
                  ))}
                </Stack>
              </Paper>
            )}
          </Stack>
        )}

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
