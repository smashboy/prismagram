import { combine } from 'effector'
import { Handle, NodeProps, Position } from 'reactflow'
import { useStore, useStoreMap } from 'effector-react'
import { Stack, Table } from '@mantine/core'
import { arrayMove } from '@dnd-kit/sortable'
import { DragEndEvent } from '@dnd-kit/core'
import {
  $schemaEnums,
  $schemaState,
  $selectedNodeId,
  setPrismaSchemaEvent
} from '@renderer/modules/editor/stores'
import { EnumNodeData } from '@shared/common/models/Diagram'
import { NodeCard } from '../NodeCard'
import { EnumNodeField } from './EnumNodeField'
import { BlockNameInput } from '../../inputs/BlockNameInput'
import { EnumNodeToolbar } from './EnumNodeToolbar'
import { cloneSchemaState } from '@renderer/core/utils'
import { NodeType } from '@shared/common/configs/diagrams'
import { NodeDnDContext } from '../NodeDnDContext'

const $store = combine({
  selectedNodeId: $selectedNodeId,
  state: $schemaState
})

export const EnumNode: React.FC<NodeProps<EnumNodeData>> = ({ id: name }) => {
  const { selectedNodeId, state } = useStore($store)

  const enumItem = useStoreMap({
    store: $schemaEnums,
    keys: [name],
    fn: (enums, [name]) => enums.get(name)!
  })

  const { fields, fieldNames } = enumItem

  const isSelected = selectedNodeId?.nodeId === name

  const handleSaveName = async (name: string) => {
    enumItem.setName(name)
    const updatedState = await cloneSchemaState(state)
    setPrismaSchemaEvent(updatedState.toString())
  }

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = fieldNames.indexOf(active.id as string)
    const newIndex = fieldNames.indexOf(over.id as string)

    enumItem._setFromArray(arrayMove(fields, oldIndex, newIndex))

    const updatedState = await cloneSchemaState(state)
    setPrismaSchemaEvent(updatedState.toString())
  }

  return (
    <Stack sx={{ minWidth: 150, cursor: isSelected ? 'default' : void 0 }}>
      <EnumNodeToolbar isSelected={isSelected} selectedNodeId={selectedNodeId?.nodeId} />
      <NodeCard
        nodeId={name}
        isSelected={isSelected}
        selectedNodeId={selectedNodeId?.nodeId}
        type={NodeType.ENUM}
      >
        <BlockNameInput block={enumItem} onSave={handleSaveName} />
        <Table verticalSpacing="md" fontSize="xl">
          <tbody>
            <NodeDnDContext fieldNames={fieldNames} onDragEnd={onDragEnd}>
              {fields.map((field) => (
                <EnumNodeField key={field.name} field={field} isSelected={isSelected} />
              ))}
            </NodeDnDContext>
          </tbody>
        </Table>
        <Handle
          id={name}
          type="source"
          position={Position.Right}
          isConnectable={false}
          style={{
            borderColor: 'white',
            marginRight: -6,
            borderWidth: 3,
            boxSizing: 'unset'
          }}
        />
      </NodeCard>
    </Stack>
  )
}
