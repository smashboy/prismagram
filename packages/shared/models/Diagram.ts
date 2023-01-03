import { Edge as ReactEdge, Node as ReactNode } from 'reactflow'
import { ScalarType } from '../configs/prisma'
import { RelationType } from '../configs/diagrams'

export type Node = ReactNode<ModelNodeData>
export type Edge = ReactEdge<EdgeData>

export interface ModelNodeData {
  name: string
  fields: Record<string, ModelField>
  sourceHandlers: Record<string, Handler>
  targetHandlers: Record<string, Handler>
}

export interface Handler {
  relationType: RelationType
  id: string
}

export interface EdgeData {
  color: string
}

export interface ModelField {
  type: ScalarType | string
  displayType: string
  // isList: boolean
  // isRequired: boolean
  // relation?: FieldRelationIO
}

export interface Diagram {
  nodes: Record<string, Node>
  edges: Edge[]
  nodesColors: Record<string, string>
}

export interface Relation {
  id: string
  type: RelationType
  from: RelationTarget
  to: RelationTarget
}

interface RelationTarget {
  model: string
  field: string
}
