import React, { useEffect, useRef, useState } from 'react'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import ReactFlow, {
  applyNodeChanges,
  OnConnect,
  OnMove,
  OnNodesChange,
  ReactFlowInstance
} from 'reactflow'
import {
  $diagramViewport,
  $edgesArray,
  $nodesArray,
  $schemaState,
  addNodeEvent,
  nodesChangeEvent,
  selectNodeEvent,
  setCreateEnumFieldModalDataEvent,
  setCreateRelationModalDataEvent,
  setPrismaSchemaEvent,
  toggleCreateEnumFieldModalEvent,
  toggleCreateRelationModalEvent,
  viewportChangeEvent
} from '../stores'
import { ModelNode } from './nodes/ModelNode'
import { EnumNode } from './nodes/EnumNode'
import { NodeType } from '@shared/common/configs/diagrams'
import { useDiagramEditorShortcuts } from '@renderer/modules/spotlight'
import { ipcRenderer } from '@renderer/core/electron'
import { createPrismaSchemaState } from 'prisma-state/_new/state'
import { EDITOR_REMOTE_SCHEMA_CHANGES } from '@shared/common/configs/api'
import { Node } from '@shared/common/models/Diagram'
import { zoomToNode } from '../utils'

const $store = combine({
  nodes: $nodesArray,
  edges: $edgesArray,
  schemaState: $schemaState,
  viewport: $diagramViewport
})

const nodeTypes = {
  [NodeType.MODEL]: ModelNode,
  [NodeType.ENUM]: EnumNode
}

export const DiagramEditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)

  const { nodes, edges, viewport, schemaState } = useStore($store)

  useDiagramEditorShortcuts()

  useEffect(() => {
    const handleSetSchemaState = (_: unknown, schema: string) => {
      const state = createPrismaSchemaState()
      state.fromString(schema)
      setPrismaSchemaEvent(state)
    }

    ipcRenderer.on(EDITOR_REMOTE_SCHEMA_CHANGES, handleSetSchemaState)

    return () => {
      ipcRenderer.removeListener(EDITOR_REMOTE_SCHEMA_CHANGES, handleSetSchemaState)
    }
  }, [])

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

    setPrismaSchemaEvent(schemaState._clone())

    addNodeEvent(node)
    selectNodeEvent({ nodeId: id, type: type as NodeType })
    zoomToNode(reactFlowInstance, node)
  }

  const onConnect: OnConnect = ({ source, target }) => {
    if (!source || !target) return

    if (schemaState.isModel(source) && schemaState.isModel(target)) {
      toggleCreateRelationModalEvent(true)
      setCreateRelationModalDataEvent({
        source,
        target,
        name: '',
        onDelete: null,
        onUpdate: null,
        isOptional: false,
        isExplicit: false
      })

      return
    }

    if (schemaState.isEnum(source) && schemaState.isModel(target)) {
      toggleCreateEnumFieldModalEvent(true)
      setCreateEnumFieldModalDataEvent({
        model: target,
        fieldName: '',
        enum: source
      })
    }
  }

  return (
    <ReactFlow
      ref={containerRef}
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      defaultViewport={viewport ?? void 0}
      onMove={onViewportChange}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onNodesChange={onNodesChange}
      onConnect={onConnect}
      onInit={setReactFlowInstance}
      snapToGrid
      minZoom={0.05}
      fitView={!viewport}
    >
      {children}
    </ReactFlow>
  )
}
