import { combine } from 'effector'
import ReactFlow, { applyNodeChanges, Background, OnNodesChange } from 'reactflow'
import { useStore } from 'effector-react'
import { nodeTypes } from '../config'
import { $edgesArray, $nodesArray, nodesChangeEvent } from '../stores'
import '../css/editor.css'

const $store = combine({
  nodes: $nodesArray,
  edges: $edgesArray,
})

export const DiagramEditor = () => {
  const {nodes, edges} = useStore($store)

  const handleNodeChanges: OnNodesChange = (changes) =>
    nodesChangeEvent(applyNodeChanges(changes, nodes))

  return (
    <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} onNodesChange={handleNodeChanges} snapToGrid>
      <Background />
    </ReactFlow>
  )
}
