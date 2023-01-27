import { combine } from 'effector'
import ReactFlow, {
  applyNodeChanges,
  Background,
  OnConnect,
  OnEdgesChange,
  OnNodesChange
} from 'reactflow'
import { useStore } from 'effector-react'
import {
  $edgesArray,
  $nodesArray,
  $schemaState,
  $selectedRelationType,
  loadEditorDataEffect,
  nodesChangeEvent,
  setPrismaSchemaEvent
} from '../stores'
import { DiagramEditorContextProvider } from '../stores/context'
import { ModelNode } from './nodes/ModelNode'
import { NodeType } from '@shared/common/configs/diagrams'
import '../css/editor.css'
import { useDiagramEditorShortcuts } from '@renderer/modules/spotlight'

const $store = combine({
  nodes: $nodesArray,
  edges: $edgesArray,
  state: $schemaState,
  selectedRelationType: $selectedRelationType
})

const nodeTypes = {
  [NodeType.MODEL]: ModelNode
}

export const DiagramEditor = () => {
  const { nodes, edges, state, selectedRelationType } = useStore($store)

  useDiagramEditorShortcuts()

  const onNodesChange: OnNodesChange = (changes) =>
    nodesChangeEvent(applyNodeChanges(changes, nodes))

  const onEdgesChange: OnEdgesChange = (changes) => console.log(changes)

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
        // edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        snapToGrid
        minZoom={0.05}
      >
        <Background />
      </ReactFlow>
    </DiagramEditorContextProvider>
  )
}
