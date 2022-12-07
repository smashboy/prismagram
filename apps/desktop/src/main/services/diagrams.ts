import type { DMMF } from '@prisma/generator-helper'
import { NodeType, ScalarType } from '@shared/common/configs/diagrams'
import { ModelField, ModelNodeData, Node, Diagram } from '@shared/common/models/Diagram'

export const prismaSchema2Diagram = (document: DMMF.Document): Diagram => {
  const {
    datamodel: { models }
  } = document

  const nodeModels = models.map(model2NodeModel)

  return {
    nodes: nodeModels.reduce((acc, node) => ({ ...acc, [node.id]: node }), {})
  }
}

export const model2NodeModel = (model: DMMF.Model): Node => {
  const { name, fields } = model

  const data: ModelNodeData = {
    name,
    fields: fields.reduce(
      (acc, field) => ({ ...acc, [field.name]: modelField2NodeModelField(field) }),
      {}
    )
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

  return {
    type: ScalarType[type] || type,
    isList,
    isRequired
  }
}
