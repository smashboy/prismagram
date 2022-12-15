import { combine } from 'effector'
import ReactFlow, { applyNodeChanges, Background, OnNodesChange } from 'reactflow'
import { useStore } from 'effector-react'
import { $edgesArray, $nodesArray, nodesChangeEvent } from '../stores'
import { DiagramEditorContextProvider } from '../stores/context'
import '../css/editor.css'
import { ModelNode } from './ModelNode'
import { NodeType } from '@shared/common/configs/diagrams'

const $store = combine({
  nodes: $nodesArray,
  edges: $edgesArray
})

const nodeTypes = {
  [NodeType.MODEL]: ModelNode
}

export const DiagramEditor = () => {
  const { nodes, edges } = useStore($store)

  const handleNodeChanges: OnNodesChange = (changes) =>
    nodesChangeEvent(applyNodeChanges(changes, nodes))

  return (
    <DiagramEditorContextProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        // edgeTypes={edgeTypes}
        onNodesChange={handleNodeChanges}
        snapToGrid
        minZoom={0.05}
      >
        <Background />
      </ReactFlow>
    </DiagramEditorContextProvider>
  )
}
