import type { DMMF } from '@prisma/generator-helper'
import { NodeType, RelationIOType, ScalarType } from '@shared/common/configs/diagrams'
import { ModelField, ModelNodeData, Node, Diagram } from '@shared/common/models/Diagram'
import { Edge } from 'reactflow'

export const prismaSchema2Diagram = (document: DMMF.Document): Diagram => {
  const {
    datamodel: { models }
  } = document

  const relations = defineModelsSimplifiedRelations(models)

  const nodeModels = models.map((model) => model2NodeModel(model, relations))

  return {
    nodes: nodeModels.reduce((acc, node) => ({ ...acc, [node.id]: node }), {}),
    edges: relations.map((relation) => simpleRelation2SimpleEdge(relation))
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
    relations: []
  }

  for (const relation of relations) {
    const [from, to] = relation.split('To')

    if (name === from || name === to) {
      if (from === name) {
        data.relations.push({
          type: RelationIOType.SOURCE,
          id: `${relation}-${from}`
        })
        continue
      }

      data.relations.push({
        type: RelationIOType.TARGET,
        id: `${relation}-${to}`
      })
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
