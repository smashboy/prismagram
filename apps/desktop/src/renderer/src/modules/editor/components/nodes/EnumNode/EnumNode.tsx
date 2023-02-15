import { combine } from 'effector'
import { useBoolean } from 'react-use'
import { Handle, NodeProps, Position } from 'reactflow'
import { useStore, useStoreMap } from 'effector-react'
import { Stack, Table } from '@mantine/core'
import {
  $schemaEnums,
  $selectedNodeId,
  updatePrismaSchemaEvent
} from '@renderer/modules/editor/stores'
import { EnumNodeData } from '@shared/common/models/Diagram'
import { NodeCard } from '../NodeCard'
import { BlockNameInput } from '../../inputs/BlockNameInput'
import { EnumNodeToolbar } from './EnumNodeToolbar'
import { NodeType } from '@shared/common/configs/diagrams'
import { EnumEditForm } from './EnumEditForm'

const $store = combine({
  selectedNodeId: $selectedNodeId
})

export const EnumNode: React.FC<NodeProps<EnumNodeData>> = ({ id: name }) => {
  const { selectedNodeId } = useStore($store)

  const [isOpenNewOptionField, toggleIsOpenNewOptionField] = useBoolean(false)

  const enumItem = useStoreMap({
    store: $schemaEnums,
    keys: [name],
    fn: (enums, [name]) => enums.get(name)!
  })

  const { fieldNames } = enumItem

  const isSelected = selectedNodeId?.nodeId === name

  const handleSaveName = (name: string) => {
    enumItem.setName(name)
    updatePrismaSchemaEvent()
  }

  return (
    <Stack sx={{ minWidth: 300, cursor: isSelected ? 'default' : void 0 }}>
      <EnumNodeToolbar
        isSelected={isSelected}
        selectedNodeId={selectedNodeId?.nodeId}
        onOpenNewOptionInput={toggleIsOpenNewOptionField}
      />
      <NodeCard
        nodeId={name}
        isSelected={isSelected}
        selectedNodeId={selectedNodeId?.nodeId}
        type={NodeType.ENUM}
      >
        <Stack>
          <BlockNameInput block={enumItem} onSave={handleSaveName} />
          {isSelected ? (
            <EnumEditForm
              block={enumItem}
              isOpenNewOptionField={isOpenNewOptionField}
              onCloseNewOptionField={toggleIsOpenNewOptionField}
            />
          ) : (
            <Table verticalSpacing="md" fontSize="xl">
              <tbody>
                {fieldNames.map((fieldName) => (
                  <tr key={fieldName}>
                    <td>{fieldName}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Stack>
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
