import { Model } from './blocks'
import { PrismaSchemaStateData } from './PrismaSchemaState'
import { RelationType, RelationTypeOption } from './constants'
import { uncapitalize } from './utils/string'
import { ModelField, RelationField } from './fields'
import { createScalarFieldFromType } from './utils/field'
import { RelationAttribute, UniqueAttribute } from './attributes'

export class RelationsManager {
  private readonly state: PrismaSchemaStateData

  constructor(state: PrismaSchemaStateData) {
    this.state = state
  }

  createRelation(source: Model, target: Model, type: RelationTypeOption) {
    const sourceName = uncapitalize(source.name)
    const targetName = uncapitalize(target.name)

    if (type === RelationType.ONE_TO_ONE) {
      let idField: ModelField | null = null

      for (const field of [...source.fields.values()]) {
        if (field.attributes.has('id')) {
          idField = field
          break
        }
      }

      if (!idField) return

      const targetTypeFieldName = `${uncapitalize(source.name)}Id`

      const targetTypeField = createScalarFieldFromType(targetTypeFieldName, idField.type, target)

      if (!targetTypeField) return

      const sourceRelationField = new RelationField(targetName, target.name, source)
      sourceRelationField.setModifier('optional')

      source.addField(targetName, sourceRelationField)

      const targetRelationField = new RelationField(sourceName, source.name, target)
      const targetRelationAttr = new RelationAttribute(targetRelationField)

      targetRelationAttr.setFields([targetTypeField.name])
      targetRelationAttr.setReferences([idField.name])

      targetRelationField.attributes.set('relation', targetRelationAttr)
      targetTypeField.attributes.set('unique', new UniqueAttribute(targetTypeField))

      target.addField(sourceName, targetRelationField)
      target.addField(targetTypeFieldName, targetTypeField)
    }

    if (type === RelationType.MANY_TO_MANY) {
      const sourceNamePlural = `${sourceName}s`
      const targetNamePlural = `${targetName}s`

      const targetRelationField = new RelationField(sourceNamePlural, source.name, target)
      targetRelationField.setModifier('list')

      const sourceRelationField = new RelationField(targetNamePlural, target.name, source)
      sourceRelationField.setModifier('list')

      target.addField(sourceNamePlural, targetRelationField)
      source.addField(targetNamePlural, sourceRelationField)
    }
  }
}
