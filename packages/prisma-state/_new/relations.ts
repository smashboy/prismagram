import { RelationAttribute } from './attributes'
import { PrismaSchemaStateInstance, RelationsManagerInstance } from './types'

export class RelationsManager implements RelationsManagerInstance {
  private readonly state: PrismaSchemaStateInstance

  constructor(state: PrismaSchemaStateInstance) {
    this.state = state
  }

  // TODO: block attributes cleanup
  removeRelationFields(modelId: string, relatedModelId: string, relationName?: string) {
    const modelData = this.state.model(modelId)

    for (const field of modelData.fields.values()) {
      if (field.type === relatedModelId) {
        const relationAttr = new RelationAttribute(field.attributes.get('relation'))

        if (relationName && relationAttr.name === relationName) {
          modelData.fields.delete(field.name)
          relationAttr.fields.forEach((fieldName) => modelData.fields.delete(fieldName))
          break
        }

        modelData.fields.delete(field.name)
        relationAttr.fields.forEach((fieldName) => modelData.fields.delete(fieldName))
        break
      }
    }
  }

  remove(firstModelId: string, secondModelId: string, relationName?: string) {
    this.removeRelationFields(firstModelId, secondModelId, relationName)
    this.removeRelationFields(secondModelId, firstModelId, relationName)
  }
}
