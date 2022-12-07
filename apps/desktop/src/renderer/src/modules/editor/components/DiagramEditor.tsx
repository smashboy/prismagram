import ReactFlow, { applyNodeChanges, Background, OnNodesChange } from 'reactflow'
import { useStore } from 'effector-react'
import { nodeTypes } from '../config'
import { $nodesArray, nodesChangeEvent } from '../stores'
import '../css/editor.css'

export const DiagramEditor = () => {
  const nodes = useStore($nodesArray)

  const handleNodeChanges: OnNodesChange = (changes) =>
    nodesChangeEvent(applyNodeChanges(changes, nodes))

  return (
    <ReactFlow nodes={nodes} nodeTypes={nodeTypes} onNodesChange={handleNodeChanges} snapToGrid>
      <Background />
    </ReactFlow>
  )
}
