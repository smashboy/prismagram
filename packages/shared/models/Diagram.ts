import { Edge, Node as ReactNode } from 'reactflow'
import { ScalarType } from '../configs/diagrams'

export type Node = ReactNode<ModelNodeData>

export interface ModelNodeData {
  name: string
  fields: Record<string, ModelField>
}

export interface ModelField {
  type: ScalarType | string
  isList: boolean
  isRequired: boolean
}

export interface Diagram {
  nodes: Record<string, Node>
}
