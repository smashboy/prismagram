import { Edge } from 'reactflow'
import dagre from 'dagre'
import type { DMMF } from '@prisma/generator-helper'
import {
  DiagramLayout,
  NodeType,
  RelationIOType,
  ScalarType
} from '@shared/common/configs/diagrams'
import { ModelField, ModelNodeData, Node, Diagram } from '@shared/common/models/Diagram'
import { graphDirectionOption } from '../constants'
import { string2Color } from '../utils'

export const prismaSchema2Diagram = (document: DMMF.Document): Diagram => {
  const {
    datamodel: { models }
  } = document

  const relations = defineModelsSimplifiedRelations(models)

  const nodeModels = models.map((model) => model2NodeModel(model, relations))

  return {
    nodes: nodeModels.reduce((acc, node) => ({ ...acc, [node.id]: node }), {}),
    edges: relations.map((relation) => simpleRelation2SimpleEdge(relation)),
    nodesColors: nodeModels.reduce(
      (acc, node) => ({ ...acc, [node.id]: generateNodeColor(node) }),
      {}
    )
  }
}

export const model2NodeModel = (model: DMMF.Model, relations: string[]): Node => {
  const { name, fields } = model

  const data: ModelNodeData = {
    name,
    fields: fields.reduce(
      (acc, field) => ({ ...acc, [field.name]: modelField2NodeModelField(field) }),
      {}
    ),
    sourceRelations: [],
    targetRelations: []
  }

  for (const relation of relations) {
    const [from, to] = relation.split('To')

    if (name === from || name === to) {
      if (from === name) {
        data.sourceRelations.push(`${relation}-${from}`)
        continue
      }

      data.targetRelations.push(`${relation}-${to}`)
    }
  }

  return {
    id: name,
    type: NodeType.MODEL,
    position: { x: 0, y: 0 },
    data
  }
}

export const modelField2NodeModelField = (field: DMMF.Field): ModelField => {
  const { type, isList, isRequired } = field

  const modelField: ModelField = {
    type: ScalarType[type] || type,
    isList,
    isRequired
  }

  return modelField
}

export const defineModelsSimplifiedRelations = (models: DMMF.Model[]) =>
  Array.from(
    new Set(models.flatMap((model) => model.fields.map((field) => field.relationName)))
  ).filter(Boolean) as string[]

export const simpleRelation2SimpleEdge = (relation: string): Edge => {
  const [from, to] = relation.split('To')

  return {
    id: relation,
    label: relation,
    source: from,
    target: to,
    type: 'smoothstep',
    sourceHandle: `${relation}-${from}`,
    targetHandle: `${relation}-${to}`
  }
}

export const generateNodeColor = (node: Node) => string2Color(node.data.name)

export const layoutDiagramElements = (diagram: Diagram, layout: DiagramLayout): Diagram => {
  const { nodes, edges, ...other } = diagram

  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))

  dagreGraph.setGraph({ rankdir: graphDirectionOption[layout], nodesep: 50, ranksep: 100 })

  const nodesArray = Object.entries(nodes)

  nodesArray.forEach(([_, node]) => {
    dagreGraph.setNode(node.id, {
      width: node.width,
      height: node.height
    })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const nodesWithLayout = nodesArray.reduce((acc, [id, node]) => {
    const nodeWithPosition = dagreGraph.node(id)

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - node.width! / 2,
      y: nodeWithPosition.y - node.height! / 2
    }

    return { ...acc, [id]: node }
  }, {})

  return { edges, nodes: nodesWithLayout, ...other }
}
