import dagre from 'dagre'
import { groupBy } from 'lodash'
import type { DMMF } from '@prisma/generator-helper'
import { DiagramLayout, NodeType, RelationType, ScalarType } from '@shared/common/configs/diagrams'
import {
  ModelField,
  ModelNodeData,
  Node,
  Diagram,
  Edge,
  Relation
} from '@shared/common/models/Diagram'
import { graphDirectionOption } from '../constants'
import { string2Color } from '../utils'

export const prismaSchema2Diagram = (document: DMMF.Document): Diagram => {
  const {
    datamodel: { models }
  } = document

  const relations = defineModelsRelations(models)

  const nodeModels = models.map((model) => model2NodeModel(model, relations))

  return {
    document,
    relations,
    nodes: nodeModels.reduce((acc, node) => ({ ...acc, [node.id]: node }), {}),
    edges: [...relations.values()].map((relation) => relation2Edge(relation)),
    nodesColors: nodeModels.reduce(
      (acc, node) => ({ ...acc, [node.id]: generateNodeColor(node) }),
      {}
    )
  }
}

export const model2NodeModel = (model: DMMF.Model, relations: Map<string, Relation>): Node => {
  const { name, fields } = model

  const data: ModelNodeData = {
    name,
    fields: fields.reduce(
      (acc, field) => ({ ...acc, [field.name]: modelField2NodeModelField(field) }),
      {}
    ),
    sourceHandlers: {},
    targetHandlers: {}
  }

  const fieldsWithRelations = fields.filter((field) => field.relationName)

  for (const field of fieldsWithRelations) {
    const { name: fieldName, relationName } = field

    const relation = relations.get(relationName!)

    if (relation) {
      const { id, type, from, to } = relation

      if (from.model === name) {
        data.sourceHandlers[fieldName] = {
          relationType: type,
          id: `${id}.${from.model}.${from.field}`
        }
      }

      if (to.model === name) {
        data.targetHandlers[fieldName] = {
          relationType: type,
          id: `${id}.${to.model}.${to.field}`
        }
      }
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
    displayType: `${type}${isList ? '[]' : !isRequired ? '?' : ''}`
  }

  return modelField
}

interface ExtendedModelField extends DMMF.Field {
  modelName: string
}

export const defineModelsRelations = (models: DMMF.Model[]) => {
  const fieldsGroupedByRelations = groupBy<ExtendedModelField>(
    models
      .flatMap((model) => model.fields.map((field) => ({ ...field, modelName: model.name })))
      .filter((field) => field.relationName),
    (field) => field.relationName
  )

  const relations: Map<string, Relation> = new Map()

  for (const [name, [first, second]] of Object.entries(fieldsGroupedByRelations)) {
    if (first.isList && second.isList) {
      relations.set(name, {
        id: name,
        type: RelationType.MANY_TO_MANY,
        from: {
          model: first.modelName,
          field: first.name
        },
        to: {
          model: second.modelName,
          field: second.name
        }
      })

      continue
    }

    const { from, to } = determineSourceTarget(first, second)

    if (first.isList || second.isList) {
      relations.set(name, {
        id: name,
        type: RelationType.ONE_TO_MANY,
        from: {
          model: from.modelName,
          field: from.name
        },
        to: {
          model: to.modelName,
          field: to.name
        }
      })

      continue
    }

    relations.set(name, {
      id: name,
      type: RelationType.ONE_TO_ONE,
      from: {
        model: from.modelName,
        field: from.name
      },
      to: {
        model: to.modelName,
        field: to.name
      }
    })
  }

  return relations
}

export const determineSourceTarget = (first: ExtendedModelField, second: ExtendedModelField) =>
  first.relationFromFields!.length > 0 ? { from: first, to: second } : { from: second, to: first }

// Array.from(
//   new Set(
//     models.flatMap((model) =>
//       model.fields.map(
//         (field) => `${field.relationName}.${model.name}->${field.relationName}.${field.type}`
//       )
//     )
//   )
// ).filter(Boolean) as string[]

export const relation2Edge = (relation: Relation): Edge => {
  const { id, type, from, to } = relation

  return {
    id,
    label: `${id} (${type})`,
    source: from.model,
    target: to.model,
    type: 'smoothstep',
    sourceHandle: `${id}.${from.model}.${from.field}`,
    targetHandle: `${id}.${to.model}.${to.field}`,
    data: {
      color: string2Color(id)
    }
  }
}

export const generateNodeColor = (node: Node) => string2Color(node.data.name)

export const layoutDiagramElements = (diagram: Diagram, layout: DiagramLayout): Diagram => {
  const { nodes, edges, ...other } = diagram

  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))

  dagreGraph.setGraph({ rankdir: graphDirectionOption[layout], nodesep: 50, ranksep: 100 })

  const nodesArray = Object.entries(nodes)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    node.position = {
      x: nodeWithPosition.x - node.width! / 2,
      y: nodeWithPosition.y - node.height! / 2
    }

    return { ...acc, [id]: node }
  }, {})

  return { edges, nodes: nodesWithLayout, ...other }
}
