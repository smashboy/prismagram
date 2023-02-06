import { Edge as ReactEdge, Node as ReactNode } from 'reactflow'
import { RelationType } from '../configs/diagrams'

export type Node = ModelNode | EnumNode
export type Edge = ReactEdge<EdgeData>

export type ModelNode = ReactNode<ModelNodeData>
export type EnumNode = ReactNode<EnumNodeData>

export interface ModelNodeData {
  sourceHandlers: Record<string, ModelHandler>
  targetHandlers: Record<string, ModelHandler | EnumHandler>
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EnumNodeData {}

export interface ModelHandler {
  relationType: RelationType
  id: string
}

export interface EnumHandler {
  id: string
}

export interface EdgeData {
  color: string
}

export interface Diagram {
  nodes: Record<string, Node>
  edges: Edge[]
  nodesColors: Record<string, string>
}

export interface Relation {
  id: string
  name?: string
  type: RelationType
  from: RelationTarget
  to: RelationTarget
}

interface RelationTarget {
  model: string
  field: string
}
