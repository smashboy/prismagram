import { useStore } from 'effector-react'
import { $selectedNodeId } from '@renderer/modules/editor/stores'
import { NodeCard } from '../NodeCard'
import { NEW_MODEL_NODE_ID } from '@renderer/modules/editor/config'
import { ModelNameInput } from '../../inputs/ModelNameInput'

export const NewModelNode = () => {
  const selectedNodeId = useStore($selectedNodeId)

  const isSelected = selectedNodeId === NEW_MODEL_NODE_ID

  return (
    <NodeCard nodeId={NEW_MODEL_NODE_ID} isSelected={isSelected} selectedNodeId={selectedNodeId}>
      <ModelNameInput />
    </NodeCard>
  )
}
