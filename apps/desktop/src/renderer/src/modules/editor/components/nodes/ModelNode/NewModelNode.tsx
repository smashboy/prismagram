import { combine } from 'effector'
import { useStore } from 'effector-react'
import { useReactFlow } from 'reactflow'
import {
  $schemaState,
  $selectedNodeId,
  setPrismaSchemaEvent
} from '@renderer/modules/editor/stores'
import { NodeCard } from '../NodeCard'
import { NEW_MODEL_NODE_ID } from '@renderer/modules/editor/config'
import { BlockNameInput } from '../../inputs/BlockNameInput'
import { cloneSchemaState } from '@renderer/core/utils'

const $store = combine({
  selectedNodeId: $selectedNodeId,
  state: $schemaState
})

export const NewModelNode = () => {
  const { selectedNodeId, state } = useStore($store)

  const flow = useReactFlow()

  const isSelected = selectedNodeId === NEW_MODEL_NODE_ID

  const handleCreateModel = async (name: string) => {
    handleRemoveNewModelNode()
    state.createModel(name)
    const updatedState = await cloneSchemaState(state)

    setPrismaSchemaEvent(updatedState.toString())
  }

  const handleRemoveNewModelNode = () =>
    flow.setNodes((nodes) => nodes.filter((node) => node.id !== NEW_MODEL_NODE_ID))

  return (
    <NodeCard nodeId={NEW_MODEL_NODE_ID} isSelected={isSelected} selectedNodeId={selectedNodeId}>
      <BlockNameInput onSave={handleCreateModel} />
    </NodeCard>
  )
}
