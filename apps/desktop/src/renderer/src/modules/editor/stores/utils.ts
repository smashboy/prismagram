import { string2Color } from '@renderer/core/utils'
import { NodeType, RelationType } from '@shared/common/configs/diagrams'
import {
  Diagram,
  Edge,
  EnumNode,
  ModelNode,
  ModelNodeData,
  Node,
  Relation
} from '@shared/common/models/Diagram'
import {
  EnumModelFieldData,
  FieldAttributeData,
  ModelData,
  PrismaSchemaStateInstance,
  RelationFieldData
} from 'prisma-state/_new/types'

export const prismaSchemaState2Diagram = (
  state: PrismaSchemaStateInstance,
  diagram: Diagram
): Diagram => {
  const { models, enumIds } = state

  const { viewport, nodes: prevNodes } = diagram

  const relations = findRelatedFields(models)

  const modelNodes = models2NodeModels(
    models,
    relations,
    Object.entries(prevNodes).reduce(
      (acc, [id, node]) => (node.type === NodeType.MODEL ? { ...acc, [id]: node } : acc),
      {}
    )
  )
  const enumNodes = enums2NodeEnums(
    enumIds,
    Object.entries(prevNodes).reduce(
      (acc, [id, node]) => (node.type === NodeType.ENUM ? { ...acc, [id]: node } : acc),
      {}
    )
  )

  const nodes = { ...modelNodes, ...enumNodes }

  const relationEdges = relations2Edges(relations)
  const enumEdges = createEnumEdges(models)

  return {
    viewport,
    nodes,
    edges: [...relationEdges, ...enumEdges],
    nodesColors: generateNodesColors(nodes)
  }
}

const models2NodeModels = (
  models: Map<string, ModelData>,
  relations: Map<string, Relation>,
  prevNodes: Record<string, ModelNode>
): Record<string, ModelNode> => {
  const nodes: Record<string, ModelNode> = {}

  for (const model of models.values()) {
    const { name, fields } = model

    const data: ModelNodeData = {
      sourceHandlers: {},
      targetHandlers: {}
    }

    for (const field of fields.values()) {
      if ((field as RelationFieldData)?.isRelationField) {
        const relationName = field.attributes.get('relation')?.arguments.get('name') || null

        const relation =
          relations.get(`${field.type}-${model.name}${relationName ? `_${relationName}` : ''}`) ||
          relations.get(`${model.name}-${field.type}${relationName ? `_${relationName}` : ''}`)

        if (relation) {
          const { id, type, from, to } = relation

          if (from.model === name) {
            data.sourceHandlers[field.name] = {
              relationType: type,
              id: `${id}.${from.model}.${from.field}`
            }
          }

          if (to.model === name) {
            data.targetHandlers[field.name] = {
              relationType: type,
              id: `${id}.${to.model}.${to.field}`
            }
          }
        }

        continue
      }

      if ((field as EnumModelFieldData)?.isEnumField) {
        data.targetHandlers[field.name] = {
          id: `${field.blockId}.${field.name}.${field.type}`
        }
      }
    }

    nodes[name] = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      id: name,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      type: NodeType.MODEL,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      position: { x: 0, y: 0 },
      ...prevNodes[name],
      data
    }
  }

  return nodes
}

const enums2NodeEnums = (enumIds: string[], prevNodes: Record<string, EnumNode>) => {
  const nodes: Record<string, EnumNode> = {}

  for (const id of enumIds) {
    nodes[id] = prevNodes[id] || {
      id,
      type: NodeType.ENUM,
      position: { x: 0, y: 0 },
      data: {}
    }
  }

  return nodes
}

const createEnumEdges = (models: Map<string, ModelData>): Edge[] => {
  const edges: Edge[] = []

  for (const model of models.values()) {
    const { name: modelName, fields } = model

    for (const field of fields.values()) {
      const { type, name: fieldName } = field

      if ((field as EnumModelFieldData)?.isEnumField) {
        const id = `${modelName}.${fieldName}.${type}`

        edges.push({
          id,
          source: type,
          target: modelName,
          labelShowBg: false,
          type: 'smoothstep',
          sourceHandle: type,
          targetHandle: id,
          style: { stroke: string2Color(id), strokeWidth: 3, strokeDasharray: 5 }
        })
      }
    }
  }

  return edges
}

const relations2Edges = (relations: Map<string, Relation>): Edge[] => {
  const edges: Edge[] = []

  for (const relation of relations.values()) {
    const { id, type, from, to } = relation

    edges.push({
      id,
      label: `${id} (${type})`,
      source: from.model,
      target: to.model,
      labelShowBg: false,
      type: 'smoothstep',
      sourceHandle: `${id}.${from.model}.${from.field}`,
      targetHandle: `${id}.${to.model}.${to.field}`,
      style: { stroke: string2Color(id), strokeWidth: 3 }
    })
  }

  return edges
}

const generateNodesColors = (nodes: Record<string, Node>): Record<string, string> =>
  Object.keys(nodes).reduce((acc, id) => ({ ...acc, [id]: string2Color(id) }), {})

const findRelatedFields = (models: Map<string, ModelData>) => {
  const relations: Map<string, Relation> = new Map()

  for (const model of models.values()) {
    for (const field of model.fields.values()) {
      if ((field as RelationFieldData)?.isRelationField) {
        const relationModel = models.get(field.type)

        if (relationModel) {
          const relationName =
            (field.attributes.get('relation')?.arguments.get('name') as string) || void 0

          for (const relationModelField of relationModel.fields.values()) {
            if (relationModelField.type === model.name) {
              // N-M relation
              if (field.modifier === 'list' && relationModelField.modifier === 'list') {
                const id = `${field.type}-${relationModelField.type}${
                  relationName ? `_${relationName}` : ''
                }`
                const secondPossibleId = `${relationModelField.type}-${field.type}${
                  relationName ? `_${relationName}` : ''
                }`

                if (relations.has(id) || relations.has(secondPossibleId)) continue

                relations.set(id, {
                  id,
                  type: RelationType.MANY_TO_MANY,
                  name: relationName,
                  from: {
                    model: model.name,
                    field: field.name
                  },
                  to: {
                    model: relationModel.name,
                    field: relationModelField.name
                  }
                })

                continue
              }

              const { from, to } = determineSourceTarget(
                field as RelationFieldData,
                relationModelField as RelationFieldData
              )

              const id = `${from.blockId}-${to.blockId}${relationName ? `_${relationName}` : ''}`

              // 1-N relation
              if (field.modifier === 'list' || relationModelField.modifier === 'list') {
                relations.set(id, {
                  id,
                  type: RelationType.ONE_TO_MANY,
                  name: relationName,
                  from: {
                    model: from.blockId,
                    field: from.name
                  },
                  to: {
                    model: to.blockId,
                    field: to.name
                  }
                })

                continue
              }

              relations.set(id, {
                id,
                type: RelationType.ONE_TO_ONE,
                from: {
                  model: from.blockId,
                  field: from.name
                },
                to: {
                  model: to.blockId,
                  field: to.name
                }
              })
            }
          }
        }
      }
    }
  }

  return relations
}

const determineSourceTarget = (first: RelationFieldData, second: RelationFieldData) => {
  const references =
    ((first.attributes.get('relation') as FieldAttributeData)?.arguments.get(
      'references'
    ) as string[]) || []

  return references && references.length > 0
    ? { from: first, to: second }
    : { from: second, to: first }
}
