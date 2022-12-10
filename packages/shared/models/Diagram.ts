import { Edge as ReactEdge, Node as ReactNode } from 'reactflow'
import { RelationIOType, ScalarType } from '../configs/diagrams'

export type Node = ReactNode<ModelNodeData>
export type Edge = ReactEdge<EdgeData>

export interface ModelNodeData {
  name: string
  fields: Record<string, ModelField>
  sourceRelations: string[]
  targetRelations: string[]
}

export interface EdgeData {
  color: string
}

export interface ModelField {
  type: ScalarType | string
  isList: boolean
  isRequired: boolean
  // relation?: FieldRelationIO
}

export interface Diagram {
  nodes: Record<string, Node>
  edges: Edge[]
  nodesColors: Record<string, string>
}

export interface FieldRelationIO {
  type: RelationIOType
  id: string
}
