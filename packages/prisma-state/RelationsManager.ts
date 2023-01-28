import { Model } from './blocks'
// import { PrismaSchemaStateData } from './PrismaSchemaState'
import { RelationType, RelationTypeOption } from './constants'
import { uncapitalize } from './utils/string'
import { ModelField, RelationField } from './fields'
import { createScalarFieldFromType } from './utils/field'
import { RelationAttribute, UniqueAttribute } from './attributes'

export class RelationsManager {
  // private readonly state: PrismaSchemaStateData

  // constructor(state: PrismaSchemaStateData) {
  //   this.state = state
  // }

  createRelation(source: Model, target: Model, type: RelationTypeOption) {
    const sourceName = uncapitalize(source.name)
    const targetName = uncapitalize(target.name)

    const targetNamePlural = `${targetName}s`

    if (type === RelationType.MANY_TO_MANY) {
      const sourceNamePlural = `${sourceName}s`

      const targetRelationField = new RelationField(sourceNamePlural, source.name, target)
      targetRelationField.setModifier('list')

      const sourceRelationField = new RelationField(targetNamePlural, target.name, source)
      sourceRelationField.setModifier('list')

      target.addField(sourceNamePlural, targetRelationField)
      source.addField(targetNamePlural, sourceRelationField)

      return
    }

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

    if (type === RelationType.ONE_TO_ONE) {
      const sourceRelationField = new RelationField(targetName, target.name, source)
      sourceRelationField.setModifier('optional')

      const targetRelationField = new RelationField(sourceName, source.name, target)
      const targetRelationAttr = new RelationAttribute(targetRelationField)

      targetRelationAttr.setFields([targetTypeField.name])
      targetRelationAttr.setReferences([idField.name])

      targetRelationField.attributes.set('relation', targetRelationAttr)
      targetTypeField.attributes.set('unique', new UniqueAttribute(targetTypeField))

      source.addField(targetName, sourceRelationField)
      target.addField(sourceName, targetRelationField)
      target.addField(targetTypeFieldName, targetTypeField)

      return
    }

    if (type === RelationType.ONE_TO_MANY) {
      const sourceRelationField = new RelationField(targetNamePlural, target.name, source)
      sourceRelationField.setModifier('list')

      const targetRelationField = new RelationField(sourceName, source.name, source)
      const targetRelationAttr = new RelationAttribute(targetRelationField)

      targetRelationAttr.setFields([targetTypeField.name])
      targetRelationAttr.setReferences([idField.name])

      targetRelationField.attributes.set('relation', targetRelationAttr)

      source.addField(targetName, sourceRelationField)
      target.addField(sourceName, targetRelationField)
      target.addField(targetTypeFieldName, targetTypeField)
    }
  }
}
