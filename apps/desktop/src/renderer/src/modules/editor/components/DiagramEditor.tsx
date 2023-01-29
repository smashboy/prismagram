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
  $schemaState,
  $selectedRelationType,
  loadEditorDataEffect,
  nodesChangeEvent,
  setPrismaSchemaEvent,
  viewportChangeEvent
} from '../stores'
import { DiagramEditorContextProvider } from '../stores/context'
import { ModelNode } from './nodes/ModelNode'
import { NodeType } from '@shared/common/configs/diagrams'
import '../css/editor.css'
import { useDiagramEditorShortcuts } from '@renderer/modules/spotlight'

const $store = combine({
  nodes: $nodesArray,
  edges: $edgesArray,
  viewport: $diagramViewport,
  state: $schemaState,
  selectedRelationType: $selectedRelationType
})

const nodeTypes = {
  [NodeType.MODEL]: ModelNode
}

const Hooks = () => {
  useDiagramEditorShortcuts()

  return null
}

export const DiagramEditor = () => {
  const { nodes, edges, state, selectedRelationType, viewport } = useStore($store)

  const onNodesChange: OnNodesChange = (changes) =>
    nodesChangeEvent(applyNodeChanges(changes, nodes))

  const onViewportChange: OnMove = (_, viewport) => viewportChangeEvent(viewport)

  const onConnect: OnConnect = ({ source, target }) => {
    if (!source || !target) return

    const sourceModel = state.model(source)
    const targetModel = state.model(target)

    if (!sourceModel || !targetModel) return

    state.relations.createRelation(sourceModel, targetModel, selectedRelationType)

    setPrismaSchemaEvent(state.toString())

    setTimeout(() => {
      loadEditorDataEffect()
    }, 5000)
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
        <Hooks />
        <Background />
      </ReactFlow>
    </DiagramEditorContextProvider>
  )
}
