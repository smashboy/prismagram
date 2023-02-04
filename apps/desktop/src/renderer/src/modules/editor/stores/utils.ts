import { string2Color } from '@renderer/core/utils'
import { NodeType, RelationType } from '@shared/common/configs/diagrams'
import { Diagram, Edge, ModelNodeData, Node, Relation } from '@shared/common/models/Diagram'
import { Block, BlockType, Model } from 'prisma-state/blocks'
import { RelationField } from 'prisma-state/fields'
import { PrismaSchemaState, PrismaSchemaStateData } from 'prisma-state/PrismaSchemaState'

export const extractBlocksByType = <B extends Block>(
  type: BlockType,
  list: PrismaSchemaStateData
): Map<string, B> => {
  const blocks = new Map<string, B>()

  for (const block of [...list.values()]) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (block.type === type) blocks.set(block.name, block)
  }

  return blocks
}

export const prismaSchemaState2Diagram = (state: PrismaSchemaState): Diagram => {
  const { models } = state

  const relations = findRelatedFields(models)

  const nodes = models2NodeModels(models, relations)

  return {
    nodes,
    edges: relations2Edges(relations),
    nodesColors: generateNodesColors(nodes)
  }
}

const models2NodeModels = (
  models: Map<string, Model>,
  relations: Map<string, Relation>
): Record<string, Node> => {
  const nodes: Record<string, Node> = {}

  for (const model of [...models.values()]) {
    const { name, fields } = model

    const data: ModelNodeData = {
      sourceHandlers: {},
      targetHandlers: {}
    }

    for (const field of [...fields.values()]) {
      if (field instanceof RelationField) {
        const relation =
          relations.get(`${field.type}-${model.name}`) ||
          relations.get(`${model.name}-${field.type}`)

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
      }
    }

    nodes[name] = {
      id: name,
      type: NodeType.MODEL,
      position: { x: 0, y: 0 },
      data
    }
  }

  return nodes
}

const relations2Edges = (relations: Map<string, Relation>): Edge[] => {
  const edges: Edge[] = []

  for (const relation of [...relations.values()]) {
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

const findRelatedFields = (models: Map<string, Model>) => {
  const relations: Map<string, Relation> = new Map()

  for (const model of [...models.values()]) {
    for (const field of [...model.fields.values()]) {
      if (field instanceof RelationField) {
        const relationModel = models.get(field.type)

        if (relationModel) {
          for (const relationModelField of [...relationModel.fields.values()]) {
            if (relationModelField.type === model.name) {
              if (field.modifier === 'list' && relationModelField.modifier === 'list') {
                const id = `${field.type}-${relationModelField.type}`
                const secondPossibleId = `${relationModelField.type}-${field.type}`

                if (relations.has(id) || relations.has(secondPossibleId)) continue

                relations.set(id, {
                  id,
                  type: RelationType.MANY_TO_MANY,
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

              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const { from, to } = determineSourceTarget(field, relationModelField)

              const id = `${from.model.name}-${to.model.name}`

              if (field.modifier === 'list' || relationModelField.modifier === 'list') {
                relations.set(id, {
                  id,
                  type: RelationType.ONE_TO_MANY,
                  from: {
                    model: from.model.name,
                    field: from.name
                  },
                  to: {
                    model: to.model.name,
                    field: to.name
                  }
                })

                continue
              }

              relations.set(id, {
                id,
                type: RelationType.ONE_TO_ONE,
                from: {
                  model: from.model.name,
                  field: from.name
                },
                to: {
                  model: to.model.name,
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

const determineSourceTarget = (first: RelationField, second: RelationField) =>
  first.attributes.has('relation') ? { from: first, to: second } : { from: second, to: first }
