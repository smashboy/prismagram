import { combine } from 'effector'
import ReactFlow, {
  applyNodeChanges,
  Background,
  OnConnect,
  OnMove,
  OnNodesChange
} from 'reactflow'
import { useStore } from 'effector-react'
import {
  $diagramViewport,
  $edgesArray,
  $nodesArray,
  nodesChangeEvent,
  setCreateRelationModalData,
  toggleCreateRelationModal,
  viewportChangeEvent
} from '../stores'
import { DiagramEditorContextProvider } from '../stores/context'
import { ModelNode } from './nodes/ModelNode'
import { NodeType } from '@shared/common/configs/diagrams'
import '../css/editor.css'
import { useDiagramEditorShortcuts } from '@renderer/modules/spotlight'
import { CreateRelationModal } from './CreateRelationModal'

const $store = combine({
  nodes: $nodesArray,
  edges: $edgesArray,
  viewport: $diagramViewport
})

const nodeTypes = {
  [NodeType.MODEL]: ModelNode
}

export const DiagramEditor = () => {
  const { nodes, edges, viewport } = useStore($store)

  useDiagramEditorShortcuts()

  const onNodesChange: OnNodesChange = (changes) =>
    nodesChangeEvent(applyNodeChanges(changes, nodes))

  const onViewportChange: OnMove = (_, viewport) => viewportChangeEvent(viewport)

  const onConnect: OnConnect = ({ source, target }) => {
    if (!source || !target) return

    toggleCreateRelationModal(true)
    setCreateRelationModalData({
      source,
      target
    })
  }

  return (
    <DiagramEditorContextProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        defaultViewport={viewport ?? void 0}
        onMove={onViewportChange}
        // edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        snapToGrid
        minZoom={0.05}
        fitView={!viewport}
      >
        <Background />
      </ReactFlow>
      <CreateRelationModal />
    </DiagramEditorContextProvider>
  )
}
