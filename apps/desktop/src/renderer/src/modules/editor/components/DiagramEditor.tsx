import { useRef, useState } from 'react'
import { combine } from 'effector'
import ReactFlow, {
  applyNodeChanges,
  Background,
  Node,
  OnConnect,
  OnMove,
  OnNodesChange,
  ReactFlowInstance
} from 'reactflow'
import { useStore } from 'effector-react'
import {
  $diagramViewport,
  $edgesArray,
  $nodesArray,
  $schemaState,
  nodesChangeEvent,
  selectNodeEvent,
  setCreateRelationModalData,
  setPrismaSchemaEvent,
  toggleCreateRelationModalEvent,
  viewportChangeEvent
} from '../stores'
import { ModelNode, NewModelNode } from './nodes/ModelNode'
import { NodeType } from '@shared/common/configs/diagrams'
import '../css/editor.css'
import { useDiagramEditorShortcuts } from '@renderer/modules/spotlight'
import { CreateRelationModal } from './CreateRelationModal'
import { NodesToolbar } from './NodesToolbar'
import { NEW_MODEL_NODE_ID } from '../config'
import { EditorToolbar } from './EditorToolbar'
import { zoomToNode } from '../utils'
import { EnumNode } from './nodes/EnumNode'
import { Enum, Model } from 'prisma-state/blocks'
import { cloneSchemaState } from '@renderer/core/utils'

const $store = combine({
  nodes: $nodesArray,
  edges: $edgesArray,
  schemaState: $schemaState,
  viewport: $diagramViewport
})

const nodeTypes = {
  [NodeType.MODEL]: ModelNode,
  [NodeType.NEW_MODEL]: NewModelNode,
  [NodeType.ENUM]: EnumNode
}

export const DiagramEditor = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)

  const { nodes, edges, viewport, schemaState } = useStore($store)

  useDiagramEditorShortcuts()

  const onNodesChange: OnNodesChange = (changes) =>
    nodesChangeEvent(applyNodeChanges(changes, nodes))

  const onViewportChange: OnMove = (_, viewport) => viewportChangeEvent(viewport)

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const onDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    if (!reactFlowInstance) return

    const reactFlowBounds = containerRef.current!.getBoundingClientRect()
    const type = event.dataTransfer.getData('application/reactflow') as NodeType

    if (!type) return

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    })

    const id = `New${type}`

    const node: Node = {
      id,
      type,
      position,
      data: {}
    }

    if (type === NodeType.MODEL) schemaState.createModel(id)
    if (type === NodeType.ENUM) schemaState.createEnum(id)

    const updatedState = await cloneSchemaState(schemaState)

    setPrismaSchemaEvent(updatedState.toString())

    reactFlowInstance.setNodes((nodes) => [...nodes, node])

    selectNodeEvent({ nodeId: id, type: type as NodeType })

    zoomToNode(reactFlowInstance, node)
  }

  const onConnect: OnConnect = ({ source, target }) => {
    if (!source || !target) return

    toggleCreateRelationModalEvent(true)
    setCreateRelationModalData({
      source,
      target
    })
  }

  return (
    <>
      <ReactFlow
        ref={containerRef}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        defaultViewport={viewport ?? void 0}
        onMove={onViewportChange}
        // edgeTypes={edgeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        snapToGrid
        minZoom={0.05}
        fitView={!viewport}
      >
        <Background />
        <EditorToolbar />
        <NodesToolbar />
      </ReactFlow>
      <CreateRelationModal />
    </>
  )
}
